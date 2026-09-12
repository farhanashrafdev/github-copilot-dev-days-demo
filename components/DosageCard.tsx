import { Card, CardBody } from './ui/Card';
import { dosageGuidance } from '@/lib/dosage';
import type { Species } from '@/lib/types';

/**
 * Pre-consultation dosage guidance.
 *
 * Shows the clinic's signed-off figure for this patient's species, or an
 * explicit refusal when no signed-off figure exists. It never falls back to
 * another species' value.
 */
export function DosageCard({
  species,
  weightKg,
}: {
  species: Species;
  weightKg: number;
}) {
  const guidance = dosageGuidance(species, weightKg);

  return (
    <Card>
      <CardBody>
        <h3 className="text-xl font-bold text-slate-900">
          Pre-consultation dosage
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Maropitant citrate, clinic formulary
        </p>

        {guidance.available ? (
          <>
            <p className="mt-5 text-4xl font-bold tracking-tight text-indigo-700">
              {guidance.doseMg} mg
            </p>
            <p className="mt-2 text-base text-slate-600">
              {weightKg} kg × {guidance.mgPerKg} mg/kg
              {guidance.cappedByMaximum ? ' (capped at the single-dose maximum)' : ''}
            </p>
            <p className="mt-4 text-sm text-slate-500">
              Signed off by {guidance.signedOffBy} on {guidance.signedOffOn}.
            </p>
          </>
        ) : (
          <div
            role="alert"
            className="mt-5 rounded-xl border-2 border-amber-300 bg-amber-50 p-4"
          >
            <p className="text-base font-bold text-amber-900">
              No dosage guidance available
            </p>
            <p className="mt-1 text-base text-amber-800">{guidance.reason}</p>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
