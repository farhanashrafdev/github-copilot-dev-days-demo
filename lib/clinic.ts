import type { Appointment, Patient, Vet } from './types';

/**
 * All clinic data.
 *
 * Static constants, no randomness, no database. Every page, every preview
 * deployment and every test sees byte-identical data. That is a hard
 * requirement: this application is demonstrated live, and a demo that shows
 * different numbers on every reload is not a demo.
 */

/** The clinic day the schedule shows. Fixed, so it never drifts. */
export const CLINIC_DAY = '2026-10-05';

/** Appointment times offered on the clinic day. */
export const SLOT_TIMES = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'] as const;

/** Consulting rooms available per time slot. Two rooms means two parallel visits. */
export const ROOMS_PER_SLOT = 2;

export const VETS: Vet[] = [
  {
    id: 'vet_ada',
    name: 'Dr. Ada Moreau',
    title: 'Lead Veterinarian',
    focus: 'Feline internal medicine',
    emoji: '🩺',
  },
  {
    id: 'vet_bo',
    name: 'Dr. Bo Lindqvist',
    title: 'Veterinarian',
    focus: 'Dentistry and surgery',
    emoji: '🦷',
  },
];

export const PATIENTS: Patient[] = [
  {
    id: 'pat_mochi', slug: 'mochi', name: 'Mochi', species: 'cat',
    breed: 'British Shorthair', ageYears: 4, weightKg: 5.2, ownerName: 'Priya Sharma',
    emoji: '🐈', accent: 'from-indigo-500 to-violet-600',
    notes: 'Dislikes the carrier. Very food motivated, which helps.',
  },
  {
    id: 'pat_pepper', slug: 'pepper', name: 'Pepper', species: 'cat',
    breed: 'Domestic Shorthair', ageYears: 9, weightKg: 4.1, ownerName: 'Jonas Weber',
    emoji: '🐈‍⬛', accent: 'from-slate-600 to-slate-800',
    notes: 'Senior bloodwork due. Mild dental tartar noted last visit.',
  },
  {
    id: 'pat_yuzu', slug: 'yuzu', name: 'Yuzu', species: 'cat',
    breed: 'Ragdoll', ageYears: 2, weightKg: 6.4, ownerName: 'Mei Chen',
    emoji: '🐱', accent: 'from-teal-500 to-emerald-600',
    notes: 'Extremely relaxed patient. Sheds enthusiastically.',
  },
  {
    id: 'pat_biscuit', slug: 'biscuit', name: 'Biscuit', species: 'cat',
    breed: 'Maine Coon', ageYears: 6, weightKg: 8.1, ownerName: 'Tomas Silva',
    emoji: '🐈', accent: 'from-amber-500 to-orange-600',
    notes: 'Large frame. Weigh before every dosage calculation.',
  },
  {
    id: 'pat_olive', slug: 'olive', name: 'Olive', species: 'cat',
    breed: 'Siamese', ageYears: 1, weightKg: 3.3, ownerName: 'Aisha Khan',
    emoji: '🐱', accent: 'from-rose-500 to-pink-600',
    notes: 'Kitten. Vocal throughout the entire consultation.',
  },
  {
    id: 'pat_tofu', slug: 'tofu', name: 'Tofu', species: 'cat',
    breed: 'Scottish Fold', ageYears: 11, weightKg: 4.8, ownerName: 'Lukas Berg',
    emoji: '🐈‍⬛', accent: 'from-sky-500 to-blue-600',
    notes: 'Arthritis management. Prefers the quiet consulting room.',
  },
  {
    id: 'pat_rufus', slug: 'rufus', name: 'Rufus', species: 'dog',
    breed: 'Border Collie', ageYears: 3, weightKg: 18.6, ownerName: 'Elena Rossi',
    emoji: '🐕', accent: 'from-lime-500 to-green-600',
    notes: 'Second consulting room only. No signed-off dosage figure yet for dogs.',
  },
  {
    id: 'pat_nala', slug: 'nala', name: 'Nala', species: 'dog',
    breed: 'Dachshund', ageYears: 7, weightKg: 8.9, ownerName: 'Samuel Okafor',
    emoji: '🐩', accent: 'from-yellow-500 to-amber-600',
    notes: 'Back pain review. Keep away from the feline waiting area.',
  },
];

/**
 * Appointments booked for the clinic day.
 *
 * Chosen so the schedule shows three distinct visual states side by side:
 *   10:00  2 of 2 rooms  → fully booked
 *   09:00  1 of 2 rooms  → one room left
 *   11:30  0 of 2 rooms  → wide open
 */
export const APPOINTMENTS: Appointment[] = [
  { id: 'apt_001', patientSlug: 'pepper', vetId: 'vet_ada', time: '09:00', reason: 'Senior wellness check' },
  { id: 'apt_002', patientSlug: 'biscuit', vetId: 'vet_bo', time: '10:00', reason: 'Dental scale and polish' },
  { id: 'apt_003', patientSlug: 'olive', vetId: 'vet_ada', time: '10:00', reason: 'Second kitten vaccination' },
  { id: 'apt_004', patientSlug: 'tofu', vetId: 'vet_ada', time: '10:30', reason: 'Arthritis review' },
  { id: 'apt_005', patientSlug: 'yuzu', vetId: 'vet_bo', time: '11:00', reason: 'Microchip and weight check' },
  { id: 'apt_006', patientSlug: 'rufus', vetId: 'vet_bo', time: '09:30', reason: 'New patient examination' },
];

export function findPatient(slug: string): Patient | undefined {
  return PATIENTS.find((patient) => patient.slug === slug);
}

export function findVet(id: string): Vet | undefined {
  return VETS.find((vet) => vet.id === id);
}

export function appointmentsAt(time: string): Appointment[] {
  return APPOINTMENTS.filter((appointment) => appointment.time === time);
}

export function appointmentsForPatient(slug: string): Appointment[] {
  return APPOINTMENTS.filter((appointment) => appointment.patientSlug === slug);
}

export type SlotOccupancy = {
  time: string;
  booked: number;
  roomsFree: number;
  isFull: boolean;
};

export function slotOccupancy(): SlotOccupancy[] {
  return SLOT_TIMES.map((time) => {
    const booked = appointmentsAt(time).length;
    return {
      time,
      booked,
      roomsFree: Math.max(0, ROOMS_PER_SLOT - booked),
      isFull: booked >= ROOMS_PER_SLOT,
    };
  });
}
