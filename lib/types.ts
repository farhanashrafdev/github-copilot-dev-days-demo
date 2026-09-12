/**
 * Domain types for Whiskers & Co., a small-animal veterinary clinic.
 *
 * This is a front-end demonstration application. There is no database and no
 * API: every page renders from the static data in `lib/clinic.ts`.
 */

/**
 * The species this clinic is able to treat.
 *
 * Parts of the system are calibrated per species — most importantly the
 * medication dosage figures in `lib/dosage.ts`. Widening this type is not, on
 * its own, enough to make the clinic safe for another species: each species
 * needs its own veterinarian sign-off before a dose can be produced for it.
 */
export type Species = 'cat' | 'dog';

export const SUPPORTED_SPECIES: readonly Species[] = ['cat', 'dog'] as const;

export const SPECIES_LABELS: Record<Species, string> = {
  cat: 'Cat',
  dog: 'Dog',
};

export const SPECIES_EMOJI: Record<Species, string> = {
  cat: '🐈',
  dog: '🐕',
};

/** Narrows arbitrary input, such as a form value, to a species we accept. */
export function isSupportedSpecies(value: string): value is Species {
  return SUPPORTED_SPECIES.includes(value as Species);
}

export type Patient = {
  id: string;
  slug: string;
  name: string;
  species: Species;
  breed: string;
  ageYears: number;
  weightKg: number;
  ownerName: string;
  emoji: string;
  /** Tailwind gradient classes for the card header. Presentation only. */
  accent: string;
  notes: string;
};

export type Vet = {
  id: string;
  name: string;
  title: string;
  focus: string;
  emoji: string;
};

export type Appointment = {
  id: string;
  patientSlug: string;
  vetId: string;
  /** One of `SLOT_TIMES`, for example "09:30". */
  time: string;
  reason: string;
};
