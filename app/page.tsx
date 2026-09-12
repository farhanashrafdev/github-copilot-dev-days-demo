import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Card, CardBody, SectionHeading } from '@/components/ui/Card';
import { formatPrice } from '@/lib/format';
import { MENU_ITEMS, OPENING_HOURS, RESTAURANT } from '@/lib/restaurant';

export default function HomePage() {
  const featuredItems = MENU_ITEMS.filter((item) => item.featured);
  const hoursSummary = OPENING_HOURS.map((hours) => ({
    day: hours.day,
    summary: hours.summary,
  })).filter((hours) => hours.summary !== 'Closed');

  return (
    <>
      <section className="bg-linear-to-br from-amber-700 via-orange-700 to-rose-700">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-3xl">
            <p className="mb-6 text-base font-bold tracking-[0.2em] text-amber-100 uppercase">
              Placeholder brand for the owner to replace
            </p>

            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
              {RESTAURANT.name}
            </h1>
            <p className="mt-4 text-2xl font-semibold text-amber-100">
              {RESTAURANT.tagline}
            </p>
            <p className="mt-6 text-xl leading-relaxed text-orange-50">
              {RESTAURANT.description}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/menu"
                className="rounded-xl bg-white px-6 py-3.5 text-lg font-bold text-amber-800 shadow-lg transition hover:bg-amber-50 focus:outline-2 focus:outline-offset-2 focus:outline-white"
              >
                Explore the menu
              </Link>
              <Link
                href="/reserve"
                className="rounded-xl bg-amber-500/25 px-6 py-3.5 text-lg font-bold text-white ring-1 ring-inset ring-white/40 transition hover:bg-amber-500/35 focus:outline-2 focus:outline-offset-2 focus:outline-white"
              >
                Request a table
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading
          eyebrow="About"
          title="A warm, modern neighbourhood dining room"
          description="Keep the stack, simplify the content, and present clear placeholder information the owner can swap for real restaurant copy later."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {RESTAURANT.highlights.map((highlight) => (
            <Card key={highlight.title}>
              <CardBody>
                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  {highlight.title}
                </h3>
                <p className="mt-2 text-base text-slate-600">{highlight.body}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <SectionHeading
          eyebrow="Highlights"
          title="Popular dishes"
          description="A quick sample of the static placeholder menu."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {featuredItems.map((item) => (
            <Card key={item.id}>
              <CardBody>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold tracking-widest text-amber-700 uppercase">
                      {item.category}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-lg font-bold text-slate-900">
                    {formatPrice(item.priceInCents)}
                  </p>
                </div>
                <p className="mt-3 text-base text-slate-600">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.dietaryTags.map((tag) => (
                    <Badge key={tag} tone="info">
                      {tag}
                    </Badge>
                  ))}
                  {item.spicy ? <Badge tone="warning">Spicy</Badge> : null}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <SectionHeading
          eyebrow="Hours"
          title="Plan your visit"
          description="Opening hours are shown as placeholder values. Replace them with the restaurant's real service times."
        />
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Card>
            <CardBody>
              <div className="grid gap-3 sm:grid-cols-2">
                {hoursSummary.map((hours) => (
                  <div key={hours.day} className="rounded-xl bg-slate-50 px-4 py-3">
                    <p className="text-base font-bold text-slate-900">{hours.day}</p>
                    <p className="mt-1 text-base text-slate-600">{hours.summary}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
          <Card className="bg-slate-900 text-white">
            <CardBody>
              <h3 className="text-2xl font-bold">Reserve a table</h3>
              <p className="mt-3 text-lg text-slate-200">
                Request a table for lunch, dinner, or a small celebration. We will
                keep everything browser-only until the owner chooses a real booking
                system.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/reserve"
                  className="rounded-xl bg-white px-5 py-3 text-base font-bold text-slate-900 transition hover:bg-slate-100 focus:outline-2 focus:outline-offset-2 focus:outline-white"
                >
                  Start a reservation
                </Link>
                <Link
                  href="/contact"
                  className="rounded-xl border border-white/30 px-5 py-3 text-base font-bold text-white transition hover:bg-white/10 focus:outline-2 focus:outline-offset-2 focus:outline-white"
                >
                  Contact the restaurant
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
    </>
  );
}
