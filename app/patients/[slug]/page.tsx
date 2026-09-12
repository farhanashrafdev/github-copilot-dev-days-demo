import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DosageCard } from '@/components/DosageCard';
import { SpeciesBadge } from '@/components/SpeciesBadge';
import { Badge } from '@/components/ui/Badge';
import { Card, CardBody } from '@/components/ui/Card';
import { PATIENTS, appointmentsForPatient, findPatient, findVet } from '@/lib/clinic';
import { pluralize } from '@/lib/format';

export function generateStaticParams() {
  return PATIENTS.map((patient) => ({ slug: patient.slug }));
}

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const patient = findPatient(slug);

  if (!patient) {
    notFound();
  }

  const appointments = appointmentsForPatient(patient.slug);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link
        href="/patients"
        className="text-base font-semibold text-indigo-700 underline decoration-2 underline-offset-4 hover:text-indigo-900"
      >
        ← All patients
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-5">
        <span aria-hidden="true" className="text-7xl">
          {patient.emoji}
        </span>
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {patient.name}
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            {patient.breed} · {patient.ageYears}{' '}
            {pluralize(patient.ageYears, 'year')} old · {patient.weightKg} kg
          </p>
        </div>
        <div className="ml-auto">
          <SpeciesBadge species={patient.species} />
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <Card>
            <CardBody>
              <h2 className="text-xl font-bold text-slate-900">Clinical notes</h2>
              <p className="mt-3 text-lg text-slate-700">{patient.notes}</p>
              <p className="mt-6 text-base font-medium text-slate-500">
                Owner: {patient.ownerName}
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h2 className="text-xl font-bold text-slate-900">
                Booked appointments
              </h2>

              {appointments.length === 0 ? (
                <p className="mt-4 text-lg text-slate-600">
                  No appointments booked yet.
                </p>
              ) : (
                <ul className="mt-4 divide-y divide-slate-200">
                  {appointments.map((appointment) => (
                    <li
                      key={appointment.id}
                      className="flex flex-wrap items-center justify-between gap-3 py-4"
                    >
                      <div>
                        <p className="text-lg font-bold text-slate-900">
                          {appointment.time}
                        </p>
                        <p className="text-base text-slate-600">
                          {appointment.reason}
                        </p>
                      </div>
                      <Badge tone="neutral">
                        {findVet(appointment.vetId)?.name ?? 'Unassigned'}
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}
            </CardBody>
          </Card>
        </div>

        <div className="space-y-8">
          <DosageCard species={patient.species} weightKg={patient.weightKg} />

          <Card>
            <CardBody>
              <h2 className="text-xl font-bold text-slate-900">
                Not registered yet?
              </h2>
              <p className="mt-2 text-base text-slate-600">
                New patients can join the clinic in a couple of minutes.
              </p>
              <Link
                href="/register"
                className="mt-5 inline-block rounded-xl bg-indigo-600 px-5 py-3 text-base font-bold text-white transition hover:bg-indigo-700 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
              >
                Register your pet
              </Link>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
