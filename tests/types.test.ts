import { describe, expect, it } from 'vitest';
import {
  SPECIES_EMOJI,
  SPECIES_LABELS,
  SUPPORTED_SPECIES,
  isSupportedSpecies,
} from '@/lib/types';

describe('supported species', () => {
  it('accepts cats and dogs', () => {
    expect([...SUPPORTED_SPECIES]).toEqual(['cat', 'dog']);
  });

  it('labels and illustrates every supported species', () => {
    for (const species of SUPPORTED_SPECIES) {
      expect(SPECIES_LABELS[species]).toBeTruthy();
      expect(SPECIES_EMOJI[species]).toBeTruthy();
    }
  });
});

describe('isSupportedSpecies', () => {
  it('accepts a species the clinic treats', () => {
    expect(isSupportedSpecies('cat')).toBe(true);
    expect(isSupportedSpecies('dog')).toBe(true);
  });

  it('rejects anything else', () => {
    expect(isSupportedSpecies('ferret')).toBe(false);
    expect(isSupportedSpecies('')).toBe(false);
  });
});
