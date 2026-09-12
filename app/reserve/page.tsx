import { ReservationForm } from '@/components/ReservationForm';
import { Card, CardBody, SectionHeading } from '@/components/ui/Card';

export default function ReservePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <SectionHeading
        eyebrow="Reserve"
        title="Request a table"
        description="This is a browser-only reservation request form. It validates your details and shows a confirmation on the page without sending data anywhere."
      />

      <Card>
        <CardBody>
          <ReservationForm />
        </CardBody>
      </Card>
    </div>
  );
}
