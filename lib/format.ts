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
