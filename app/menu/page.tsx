import { Badge } from '@/components/ui/Badge';
import { Card, CardBody, SectionHeading } from '@/components/ui/Card';
import { formatPrice } from '@/lib/format';
import { getMenuByCategory } from '@/lib/restaurant';

export default function MenuPage() {
  const groupedMenu = getMenuByCategory();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SectionHeading
        eyebrow="Menu"
        title="Seasonal placeholder menu"
        description="All dishes and prices are placeholder content for the owner to replace."
      />

      <div className="space-y-8">
        {groupedMenu.map(({ category, items }) => (
          <section key={category} aria-labelledby={`menu-${category}`}>
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2
                id={`menu-${category}`}
                className="text-3xl font-bold tracking-tight text-slate-900"
              >
                {category}
              </h2>
              <p className="text-base text-slate-500">{items.length} items</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardBody>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">
                          {item.name}
                        </h3>
                        <p className="mt-3 text-base text-slate-600">
                          {item.description}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-slate-900">
                        {formatPrice(item.priceInCents)}
                      </p>
                    </div>
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
        ))}
      </div>
    </div>
  );
}
