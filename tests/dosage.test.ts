import { describe, expect, it } from 'vitest';
import { dosageGuidance } from '@/lib/dosage';
import type { Species } from '@/lib/types';

describe('dosageGuidance', () => {
  it('uses the signed-off feline figure for cats', () => {
    const guidance = dosageGuidance('cat', 5.2);

    expect(guidance.available).toBe(true);
    if (guidance.available) {
      expect(guidance.mgPerKg).toBe(1);
      expect(guidance.doseMg).toBe(5.2);
      expect(guidance.cappedByMaximum).toBe(false);
      expect(guidance.signedOffBy).toContain('RCVS');
    }
  });

  it('caps the dose at the single-dose maximum', () => {
    const guidance = dosageGuidance('cat', 14);

    expect(guidance.available).toBe(true);
    if (guidance.available) {
      expect(guidance.doseMg).toBe(10);
      expect(guidance.cappedByMaximum).toBe(true);
    }
  });

  it('refuses to guess when a weight is missing or invalid', () => {
    expect(dosageGuidance('cat', 0).available).toBe(false);
    expect(dosageGuidance('cat', Number.NaN).available).toBe(false);
  });

  /**
   * Dogs are accepted as patients but have no veterinarian-signed-off figure.
   * Refusing is the required behaviour until one exists.
   */
  it('refuses dogs, which have no signed-off figure yet', () => {
    const guidance = dosageGuidance('dog', 18.6);

    expect(guidance.available).toBe(false);
    if (!guidance.available) {
      expect(guidance.reason).toContain('No signed-off dosage figure');
    }
  });

  /**
   * Guards the clinical safety rule: a species with no signed-off figure must
   * be refused outright, never given another species' dose. The cast simulates
   * a species reaching this function before a figure has been signed off for it.
   */
  it('refuses a species that has no signed-off figure', () => {
    const guidance = dosageGuidance('ferret' as Species, 1.2);

    expect(guidance.available).toBe(false);
    if (!guidance.available) {
      expect(guidance.reason).toContain('Escalate to a veterinarian');
    }
  });
});
