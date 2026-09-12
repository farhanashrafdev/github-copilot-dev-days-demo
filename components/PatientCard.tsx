import Link from 'next/link';
import { SpeciesBadge } from './SpeciesBadge';
import { Badge } from './ui/Badge';
import { appointmentsForPatient } from '@/lib/clinic';
import { pluralize } from '@/lib/format';
import type { Patient } from '@/lib/types';

export function PatientCard({ patient }: { patient: Patient }) {
  const bookedCount = appointmentsForPatient(patient.slug).length;

  return (
    <Link
      href={`/patients/${patient.slug}`}
      className="group block rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-indigo-300 hover:shadow-md focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
    >
      <div
        className={`flex h-28 items-center justify-center rounded-t-2xl bg-linear-to-br ${patient.accent}`}
      >
        <span aria-hidden="true" className="text-6xl">
          {patient.emoji}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-2xl font-bold tracking-tight text-slate-900">
            {patient.name}
          </h3>
          <SpeciesBadge species={patient.species} />
        </div>

        <p className="mt-2 text-base text-slate-600">
          {patient.breed} · {patient.ageYears}{' '}
          {pluralize(patient.ageYears, 'year')} · {patient.weightKg} kg
        </p>

        <p className="mt-4 text-sm font-medium text-slate-500">
          Owner: {patient.ownerName}
        </p>

        <div className="mt-4">
          {bookedCount > 0 ? (
            <Badge tone="success">
              {bookedCount} booked {pluralize(bookedCount, 'appointment')}
            </Badge>
          ) : (
            <Badge tone="neutral">No appointments booked</Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
