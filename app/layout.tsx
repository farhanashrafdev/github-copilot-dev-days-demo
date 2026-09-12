import type { Metadata } from 'next';
import Link from 'next/link';
import { OPENING_HOURS, RESTAURANT } from '@/lib/restaurant';
import './globals.css';

export const metadata: Metadata = {
  title: `${RESTAURANT.name} — ${RESTAURANT.tagline}`,
  description: RESTAURANT.description,
};

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/reserve', label: 'Reserve' },
  { href: '/contact', label: 'Contact' },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const hoursSummary = OPENING_HOURS.filter((hours) => hours.summary !== 'Closed')
    .map((hours) => `${hours.day}: ${hours.summary}`)
    .join(' · ');

  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
            <Link
              href="/"
              className="rounded-lg focus:outline-2 focus:outline-offset-4 focus:outline-indigo-600"
            >
              <span className="block text-xl leading-tight font-bold tracking-tight text-slate-900">
                {RESTAURANT.name}
              </span>
              <span className="block text-sm font-medium text-slate-500">
                {RESTAURANT.tagline}
              </span>
            </Link>

            <nav aria-label="Main">
              <ul className="flex flex-wrap items-center gap-1">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="rounded-lg px-4 py-2 text-base font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        <main id="main">{children}</main>

        <footer className="mt-20 border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-slate-500">
            <p className="font-semibold text-slate-700">
              {RESTAURANT.name}
            </p>
            <p className="mt-1">{RESTAURANT.address}</p>
            <p className="mt-2 text-sm leading-relaxed">
              Placeholder restaurant branding, contact details, opening hours, and
              menu items for the owner to replace before launch.
            </p>
            <p className="mt-2 text-sm leading-relaxed">{hoursSummary}</p>
            <p className="mt-2">
              <a
                href={`tel:${RESTAURANT.phone}`}
                className="rounded focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
              >
                {RESTAURANT.phone}
              </a>{' '}
              ·{' '}
              <a
                href={`mailto:${RESTAURANT.email}`}
                className="rounded focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
              >
                {RESTAURANT.email}
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
