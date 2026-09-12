/**
 * Formatting helpers.
 *
 * Keep formatting explicit so rendered output is stable across developer
 * machines, CI, preview deployments, and the conference laptop.
 */

const LOCALE = 'en-GB';

export function formatPrice(priceInCents: number): string {
  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: 'GBP',
  }).format(priceInCents / 100);
}

export function formatReservationDate(date: string): string {
  return new Intl.DateTimeFormat(LOCALE, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T12:00:00.000Z`));
}

export function formatReservationTime(time: string): string {
  return new Intl.DateTimeFormat(LOCALE, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  }).format(new Date(`1970-01-01T${time}:00.000Z`));
}
