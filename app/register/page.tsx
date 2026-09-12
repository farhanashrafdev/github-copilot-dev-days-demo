import { RegisterForm } from '@/components/RegisterForm';
import { Card, CardBody, SectionHeading } from '@/components/ui/Card';

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <SectionHeading
        eyebrow="New patients"
        title="Register your cat"
        description="Tell us who you are and who we will be treating. We will confirm by email."
      />

      <Card>
        <CardBody>
          <RegisterForm />
        </CardBody>
      </Card>
    </div>
  );
}
