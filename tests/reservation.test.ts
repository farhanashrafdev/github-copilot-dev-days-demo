import { describe, expect, it } from 'vitest';
import { validateReservation } from '@/lib/reservation';

const NOW = new Date('2026-09-12T10:00:00.000Z');

describe('validateReservation', () => {
  it('accepts a complete reservation during opening hours', () => {
    expect(
      validateReservation(
        {
          name: 'Alex Morgan',
          email: 'alex@example.com',
          phone: '+44 20 7946 0123',
          date: '2026-09-12',
          time: '19:30',
          partySize: '4',
          notes: 'Window seat if possible',
        },
        NOW,
      ),
    ).toEqual({});
  });

  it('accepts an exact opening time and rejects the exact closing time', () => {
    expect(
      validateReservation(
        {
          name: 'Alex Morgan',
          email: 'alex@example.com',
          phone: '+44 20 7946 0123',
          date: '2026-09-12',
          time: '12:00',
          partySize: '4',
          notes: '',
        },
        NOW,
      ),
    ).toEqual({});

    expect(
      validateReservation(
        {
          name: 'Alex Morgan',
          email: 'alex@example.com',
          phone: '+44 20 7946 0123',
          date: '2026-09-12',
          time: '22:00',
          partySize: '4',
          notes: '',
        },
        NOW,
      ),
    ).toEqual({
      time: 'Choose a time during service hours: 12:00–22:00.',
    });
  });

  it('returns specific errors for missing required fields', () => {
    expect(
      validateReservation(
        {
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          partySize: '',
          notes: '',
        },
        NOW,
      ),
    ).toEqual({
      name: 'Enter the guest name for this reservation.',
      email: 'Enter an email address for the booking confirmation.',
      phone: 'Enter a phone number so the restaurant can call you back.',
      date: 'Choose a reservation date.',
      time: 'Choose a reservation time.',
      partySize: 'Enter how many guests are in your party.',
    });
  });

  it('rejects invalid contact details, past dates, and out-of-range party sizes', () => {
    expect(
      validateReservation(
        {
          name: 'Alex Morgan',
          email: 'alex-at-example.com',
          phone: '1234',
          date: '2026-09-11',
          time: '19:30',
          partySize: '16',
          notes: '',
        },
        NOW,
      ),
    ).toEqual({
      email: 'Enter a valid email address, such as name@example.com.',
      phone: 'Enter a valid phone number with at least 10 digits.',
      date: 'Choose today or a future date for the reservation.',
      partySize: 'Party size must be a whole number between 1 and 12.',
    });
  });

  it('rejects impossible calendar dates and invalid times', () => {
    expect(
      validateReservation(
        {
          name: 'Alex Morgan',
          email: 'alex@example.com',
          phone: '+44 20 7946 0123',
          date: '2026-02-30',
          time: '25:15',
          partySize: '2',
          notes: '',
        },
        NOW,
      ),
    ).toEqual({
      date: 'Choose a valid reservation date.',
      time: 'Choose a valid reservation time.',
    });
  });

  it('rejects closed days and times outside service hours', () => {
    expect(
      validateReservation(
        {
          name: 'Alex Morgan',
          email: 'alex@example.com',
          phone: '+44 20 7946 0123',
          date: '2026-09-14',
          time: '18:30',
          partySize: '2',
          notes: '',
        },
        NOW,
      ),
    ).toEqual({
      date: 'The restaurant is closed on Monday.',
    });

    expect(
      validateReservation(
        {
          name: 'Alex Morgan',
          email: 'alex@example.com',
          phone: '+44 20 7946 0123',
          date: '2026-09-12',
          time: '23:00',
          partySize: '2',
          notes: '',
        },
        NOW,
      ),
    ).toEqual({
      time: 'Choose a time during service hours: 12:00–22:00.',
    });
  });
});
