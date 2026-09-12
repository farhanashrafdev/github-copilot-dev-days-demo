import Link from 'next/link';
import { SpeciesBadge } from '@/components/SpeciesBadge';
import { Badge } from '@/components/ui/Badge';
import { Card, CardBody, SectionHeading } from '@/components/ui/Card';
import {
  CLINIC_DAY,
  appointmentsAt,
  findPatient,
  findVet,
  slotOccupancy,
} from '@/lib/clinic';
import { formatClinicDay, pluralize } from '@/lib/format';

export default function SchedulePage() {
  const slots = slotOccupancy();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SectionHeading
        eyebrow="Schedule"
        title={formatClinicDay(CLINIC_DAY)}
        description="Two consulting rooms run in parallel throughout the clinic day."
      />

      <div className="space-y-5">
        {slots.map((slot) => {
          const appointments = appointmentsAt(slot.time);

          return (
            <Card key={slot.time}>
              <CardBody>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    {slot.time}
                  </h2>
                  {slot.isFull ? (
                    <Badge tone="danger">Fully booked</Badge>
                  ) : (
                    <Badge tone="success">
                      {slot.roomsFree} of 2 {pluralize(slot.roomsFree, 'room')} free
                    </Badge>
                  )}
                </div>

                {appointments.length === 0 ? (
                  <p className="mt-5 text-lg text-slate-600">
                    No appointments booked yet.
                  </p>
                ) : (
                  <ul className="mt-5 space-y-3">
                    {appointments.map((appointment) => {
                      const patient = findPatient(appointment.patientSlug);

                      return (
                        <li
                          key={appointment.id}
                          className="flex flex-wrap items-center gap-4 rounded-xl bg-slate-50 px-4 py-3"
                        >
                          <span aria-hidden="true" className="text-3xl">
                            {patient?.emoji ?? '❓'}
                          </span>
                          <div className="min-w-40">
                            <Link
                              href={`/patients/${appointment.patientSlug}`}
                              className="text-lg font-bold text-slate-900 underline decoration-slate-300 decoration-2 underline-offset-4 hover:decoration-indigo-500"
                            >
                              {patient?.name ?? 'Unknown patient'}
                            </Link>
                            <p className="text-base text-slate-600">
                              {appointment.reason}
                            </p>
                          </div>
                          <div className="ml-auto flex flex-wrap items-center gap-2">
                            {patient ? <SpeciesBadge species={patient.species} /> : null}
                            <Badge tone="neutral">
                              {findVet(appointment.vetId)?.name ?? 'Unassigned'}
                            </Badge>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
