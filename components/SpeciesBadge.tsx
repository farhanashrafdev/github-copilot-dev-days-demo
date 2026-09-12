import { Badge } from './ui/Badge';
import { SPECIES_EMOJI, SPECIES_LABELS } from '@/lib/types';
import type { Species } from '@/lib/types';

/**
 * Shows which species a patient is.
 *
 * Species must always be visible wherever a patient is shown. Clinical
 * decisions depend on it, so it is never implied and never abbreviated away.
 */
export function SpeciesBadge({ species }: { species: Species }) {
  return (
    <Badge tone="info">
      <span aria-hidden="true">{SPECIES_EMOJI[species]}</span>
      <span>{SPECIES_LABELS[species]}</span>
    </Badge>
  );
}
