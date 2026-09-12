import { getHoursForDay, isWithinOpeningHours } from '@/lib/restaurant';

export type ReservationFormValues = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: string;
  notes: string;
};

export type ReservationValidationErrors = Partial<
  Record<keyof ReservationFormValues, string>
>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^\d{2}:\d{2}$/;

function isValidEmail(email: string) {
  return EMAIL_PATTERN.test(email);
}

function isValidPhone(phone: string) {
  const digitsOnly = phone.replace(/\D/g, '');

  return digitsOnly.length >= 10 && digitsOnly.length <= 15;
}

function isValidDateValue(date: string) {
  if (!DATE_PATTERN.test(date)) {
    return false;
  }

  const parsedDate = new Date(`${date}T00:00:00.000Z`);

  return !Number.isNaN(parsedDate.getTime()) && parsedDate.toISOString().startsWith(date);
}

function isValidTimeValue(time: string) {
  if (!TIME_PATTERN.test(time)) {
    return false;
  }

  const [hourPart, minutePart] = time.split(':');
  const hours = Number(hourPart);
  const minutes = Number(minutePart);

  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
}

export function validateReservation(
  values: ReservationFormValues,
  now = new Date(),
): ReservationValidationErrors {
  const errors: ReservationValidationErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const date = values.date.trim();
  const time = values.time.trim();
  const partySize = values.partySize.trim();

  if (!name) {
    errors.name = 'Enter the guest name for this reservation.';
  }

  if (!email) {
    errors.email = 'Enter an email address for the booking confirmation.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Enter a valid email address, such as name@example.com.';
  }

  if (!phone) {
    errors.phone = 'Enter a phone number so the restaurant can call you back.';
  } else if (!isValidPhone(phone)) {
    errors.phone = 'Enter a valid phone number with at least 10 digits.';
  }

  if (!date) {
    errors.date = 'Choose a reservation date.';
  } else if (!isValidDateValue(date)) {
    errors.date = 'Choose a valid reservation date.';
  } else if (date < now.toISOString().slice(0, 10)) {
    errors.date = 'Choose today or a future date for the reservation.';
  }

  if (!time) {
    errors.time = 'Choose a reservation time.';
  } else if (!isValidTimeValue(time)) {
    errors.time = 'Choose a valid reservation time.';
  }

  if (!partySize) {
    errors.partySize = 'Enter how many guests are in your party.';
  } else {
    const parsedPartySize = Number(partySize);

    if (!Number.isInteger(parsedPartySize) || parsedPartySize < 1 || parsedPartySize > 12) {
      errors.partySize = 'Party size must be a whole number between 1 and 12.';
    }
  }

  if (!errors.date && !errors.time) {
    const reservationDate = new Date(`${date}T12:00:00.000Z`);
    const hours = getHoursForDay(reservationDate);

    if (!hours?.opensAt || !hours.closesAt) {
      errors.date = `The restaurant is closed on ${hours?.day ?? 'that day'}.`;
    } else if (!isWithinOpeningHours(reservationDate.getUTCDay(), time)) {
      errors.time = `Choose a time during service hours: ${hours.summary}.`;
    }
  }

  return errors;
}
