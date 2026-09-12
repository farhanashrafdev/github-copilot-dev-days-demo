import Link from 'next/link';
import { PatientCard } from '@/components/PatientCard';
import { Card, CardBody, SectionHeading } from '@/components/ui/Card';
import { PATIENTS, VETS } from '@/lib/clinic';
import { SPECIES_EMOJI, SPECIES_LABELS, SUPPORTED_SPECIES } from '@/lib/types';

const SERVICES = [
  {
    icon: '🩺',
    title: 'Wellness examinations',
    body: 'Annual and senior checks, weight tracking and early detection screening.',
  },
  {
    icon: '💉',
    title: 'Vaccination programmes',
    body: 'Kitten courses and adult boosters, scheduled around your household.',
  },
  {
    icon: '🦷',
    title: 'Dentistry',
    body: 'Scale, polish and extraction under monitored anaesthesia.',
  },
  {
    icon: '🧪',
    title: 'In-house diagnostics',
    body: 'Bloodwork and urinalysis processed on site, usually within the hour.',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="bg-linear-to-br from-indigo-600 via-violet-600 to-fuchsia-600">
        <div className="max-w-6xl px-6 py-20">
          <div className="max-w-3xl">
            <div className="mb-6 flex flex-wrap gap-2">
              {SUPPORTED_SPECIES.map((species) => (
                <span
                  key={species}
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-base font-semibold text-white ring-1 ring-inset ring-white/30"
                >
                  <span aria-hidden="true">{SPECIES_EMOJI[species]}</span>
                  {SPECIES_LABELS[species]}s welcome
                </span>
              ))}
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
              A clinic built around cats and dogs.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-indigo-100">
              Two consulting rooms, kept separate so cats and dogs never share
              a waiting space. Every protocol and every dosage figure at
              Whiskers &amp; Co. is calibrated per species, never carried over
              from one to another.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="rounded-xl bg-white px-6 py-3.5 text-lg font-bold text-indigo-700 shadow-lg transition hover:bg-indigo-50 focus:outline-2 focus:outline-offset-2 focus:outline-white"
              >
                Register your pet
              </Link>
              <Link
                href="/patients"
                className="rounded-xl bg-indigo-500/30 px-6 py-3.5 text-lg font-bold text-white ring-1 ring-inset ring-white/40 transition hover:bg-indigo-500/50 focus:outline-2 focus:outline-offset-2 focus:outline-white"
              >
                Browse patients
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl px-6 py-16">
        <SectionHeading
          eyebrow="What we do"
          title="Veterinary care for cats and dogs"
          description="A small team, a quiet building, and clinical protocols written per species."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <Card key={service.title}>
              <CardBody>
                <span aria-hidden="true" className="text-4xl">
                  {service.icon}
                </span>
                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-base text-slate-600">{service.body}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section className="max-w-6xl px-6 pb-16">
        <SectionHeading eyebrow="The team" title="Who you will meet" />
        <div className="grid gap-6 sm:grid-cols-2">
          {VETS.map((vet) => (
            <Card key={vet.id}>
              <CardBody>
                <div className="flex items-center gap-4">
                  <span aria-hidden="true" className="text-4xl">
                    {vet.emoji}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{vet.name}</h3>
                    <p className="text-base text-slate-600">{vet.title}</p>
                    <p className="mt-1 text-sm font-medium text-indigo-700">
                      {vet.focus}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section className="max-w-6xl px-6 pb-20">
        <SectionHeading eyebrow="Registered patients" title="Our current caseload" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PATIENTS.slice(0, 3).map((patient) => (
            <PatientCard key={patient.slug} patient={patient} />
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/patients"
            className="text-lg font-bold text-indigo-700 underline decoration-2 underline-offset-4 hover:text-indigo-900"
          >
            See all {PATIENTS.length} patients →
          </Link>
        </div>
      </section>
    </>
  );
}
