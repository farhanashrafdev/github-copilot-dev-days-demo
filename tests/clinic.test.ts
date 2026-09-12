import { describe, expect, it } from 'vitest';
import {
  APPOINTMENTS,
  PATIENTS,
  ROOMS_PER_SLOT,
  appointmentsForPatient,
  findPatient,
  findVet,
  slotOccupancy,
} from '@/lib/clinic';
import { SUPPORTED_SPECIES } from '@/lib/types';

describe('clinic data', () => {
  it('only registers patients of a supported species', () => {
    expect(
      PATIENTS.every((patient) => SUPPORTED_SPECIES.includes(patient.species)),
    ).toBe(true);
  });

  it('has both cat and dog patients', () => {
    expect(PATIENTS.some((patient) => patient.species === 'cat')).toBe(true);
    expect(PATIENTS.some((patient) => patient.species === 'dog')).toBe(true);
  });

  it('gives every patient a unique slug', () => {
    const slugs = PATIENTS.map((patient) => patient.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('assigns every appointment to a real patient and a real vet', () => {
    for (const appointment of APPOINTMENTS) {
      expect(findPatient(appointment.patientSlug)).toBeDefined();
      expect(findVet(appointment.vetId)).toBeDefined();
    }
  });
});

describe('findPatient', () => {
  it('finds a patient by slug', () => {
    expect(findPatient('mochi')?.name).toBe('Mochi');
  });

  it('returns undefined for an unknown slug', () => {
    expect(findPatient('no-such-cat')).toBeUndefined();
  });
});

describe('appointmentsForPatient', () => {
  it('returns only that patient\u2019s appointments', () => {
    expect(appointmentsForPatient('pepper')).toHaveLength(1);
    expect(appointmentsForPatient('mochi')).toHaveLength(0);
  });
});

describe('slotOccupancy', () => {
  it('reports occupancy for every offered slot', () => {
    const byTime = new Map(slotOccupancy().map((slot) => [slot.time, slot]));

    expect(byTime.get('10:00')).toMatchObject({ booked: 2, roomsFree: 0, isFull: true });
    expect(byTime.get('09:00')).toMatchObject({ booked: 1, roomsFree: 1, isFull: false });
    expect(byTime.get('11:30')).toMatchObject({
      booked: 0,
      roomsFree: ROOMS_PER_SLOT,
      isFull: false,
    });
  });

  it('never reports more rooms free than the clinic has', () => {
    for (const slot of slotOccupancy()) {
      expect(slot.roomsFree).toBeLessThanOrEqual(ROOMS_PER_SLOT);
      expect(slot.roomsFree).toBeGreaterThanOrEqual(0);
    }
  });
});
