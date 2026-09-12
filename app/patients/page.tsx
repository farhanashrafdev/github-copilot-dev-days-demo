import { PatientCard } from '@/components/PatientCard';
import { SectionHeading } from '@/components/ui/Card';
import { PATIENTS } from '@/lib/clinic';
import { SPECIES_LABELS, SUPPORTED_SPECIES } from '@/lib/types';

export default function PatientsPage() {
  const speciesSummary = SUPPORTED_SPECIES.map(
    (species) => `${SPECIES_LABELS[species]}s`,
  ).join(', ');

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SectionHeading
        eyebrow="Patients"
        title="Registered patients"
        description={`Whiskers & Co. currently accepts: ${speciesSummary}.`}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PATIENTS.map((patient) => (
          <PatientCard key={patient.slug} patient={patient} />
        ))}
      </div>
    </div>
  );
}
