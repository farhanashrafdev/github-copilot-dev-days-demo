import { Card, CardBody, SectionHeading } from '@/components/ui/Card';
import { OPENING_HOURS, RESTAURANT } from '@/lib/restaurant';

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SectionHeading
        eyebrow="Contact"
        title="Find the restaurant"
        description="Every detail on this page is placeholder copy for the owner to replace before launch."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Card>
          <CardBody>
            <h2 className="text-2xl font-bold text-slate-900">Contact details</h2>
            <dl className="mt-6 space-y-4 text-lg">
              <div>
                <dt className="font-semibold text-slate-900">Address</dt>
                <dd className="mt-1 text-slate-600">{RESTAURANT.address}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Phone</dt>
                <dd className="mt-1 text-slate-600">
                  <a
                    href={`tel:${RESTAURANT.phone}`}
                    className="rounded underline decoration-2 underline-offset-4 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
                  >
                    {RESTAURANT.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Email</dt>
                <dd className="mt-1 text-slate-600">
                  <a
                    href={`mailto:${RESTAURANT.email}`}
                    className="rounded underline decoration-2 underline-offset-4 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
                  >
                    {RESTAURANT.email}
                  </a>
                </dd>
              </div>
            </dl>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="text-2xl font-bold text-slate-900">Opening hours</h2>
            <table className="mt-6 w-full border-separate border-spacing-y-2 text-left text-lg">
              <caption className="sr-only">Restaurant opening hours</caption>
              <tbody>
                {OPENING_HOURS.map((hours) => (
                  <tr key={hours.day}>
                    <th
                      scope="row"
                      className="rounded-l-xl bg-slate-50 px-4 py-3 font-semibold text-slate-900"
                    >
                      {hours.day}
                    </th>
                    <td className="rounded-r-xl bg-slate-50 px-4 py-3 text-slate-600">
                      {hours.summary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
