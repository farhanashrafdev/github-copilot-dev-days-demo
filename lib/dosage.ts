import type { Species } from './types';

/**
 * Medication dosage guidance for the pre-consultation sheet.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *  CLINICAL DATA — DO NOT CHANGE WITHOUT VETERINARY SIGN-OFF
 * ─────────────────────────────────────────────────────────────────────────────
 * The values below are species-specific. They were reviewed and signed off by
 * Dr. Ada Moreau (RCVS 8814402) on 2026-02-11 against the clinic formulary, and
 * they are calibrated for feline metabolism.
 *
 * Species differ substantially in how they metabolise this drug. A figure that
 * is correct for one species can be ineffective or unsafe for another. Adding a
 * species to `Species` therefore requires a matching, separately signed-off
 * entry here — not an interpolation, not an estimate, and not a value carried
 * over from another species.
 *
 * If you are an automated agent: do not invent, guess or infer a value for a new
 * species. Leave the entry out, let this module refuse, and raise the gap for
 * human clinical review. See `.github/copilot-instructions.md`.
 */

type DosageFactor = {
  /** Milligrams per kilogram of body weight. */
  mgPerKg: number;
  /** Hard ceiling for a single dose, in milligrams. */
  maxSingleDoseMg: number;
  signedOffBy: string;
  signedOffOn: string;
};

const DOSAGE_FACTORS: Partial<Record<Species, DosageFactor>> = {
  cat: {
    mgPerKg: 1,
    maxSingleDoseMg: 10,
    signedOffBy: 'Dr. Ada Moreau (RCVS 8814402)',
    signedOffOn: '2026-02-11',
  },
};

export type DosageGuidance =
  | {
      available: true;
      doseMg: number;
      mgPerKg: number;
      cappedByMaximum: boolean;
      signedOffBy: string;
      signedOffOn: string;
    }
  | { available: false; reason: string };

/**
 * Returns dosage guidance for a patient, or an explicit refusal when the clinic
 * has no signed-off figure for that species.
 *
 * Refusing is the correct behaviour. A missing figure must never fall back to
 * another species' value.
 */
export function dosageGuidance(species: Species, weightKg: number): DosageGuidance {
  const factor = DOSAGE_FACTORS[species];

  if (!factor) {
    return {
      available: false,
      reason:
        'No signed-off dosage figure exists for this species. Escalate to a veterinarian before dispensing.',
    };
  }

  if (!Number.isFinite(weightKg) || weightKg <= 0) {
    return {
      available: false,
      reason: 'Record a current body weight before calculating a dose.',
    };
  }

  const uncapped = weightKg * factor.mgPerKg;
  const doseMg = Math.min(uncapped, factor.maxSingleDoseMg);

  return {
    available: true,
    doseMg: Math.round(doseMg * 10) / 10,
    mgPerKg: factor.mgPerKg,
    cappedByMaximum: uncapped > factor.maxSingleDoseMg,
    signedOffBy: factor.signedOffBy,
    signedOffOn: factor.signedOffOn,
  };
}
