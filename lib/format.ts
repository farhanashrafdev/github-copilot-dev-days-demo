/**
 * Formatting helpers.
 *
 * Formatting uses an explicit UTC time zone and a fixed locale so the rendered
 * output is identical on a developer machine, in CI, on a Vercel preview and on
 * the conference laptop. Never rely on the ambient locale or time zone here.
 */

const LOCALE = 'en-GB';

export function formatClinicDay(day: string): string {
  return new Intl.DateTimeFormat(LOCALE, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${day}T09:00:00.000Z`));
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}
