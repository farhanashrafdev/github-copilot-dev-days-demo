import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Whiskers & Co. — Cat & Dog Clinic',
  description:
    'A veterinary clinic for cats and dogs. Patients, appointments and clinical guidance.',
};

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/patients', label: 'Patients' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/register', label: 'Register' },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
            <Link href="/" className="flex items-center gap-3">
              <span aria-hidden="true" className="text-3xl">
                🐈
              </span>
              <span>
                <span className="block text-xl leading-tight font-bold tracking-tight text-slate-900">
                  Whiskers &amp; Co.
                </span>
                <span className="block text-sm font-medium text-slate-500">
                  Cat &amp; Dog Clinic
                </span>
              </span>
            </Link>

            <nav aria-label="Main">
              <ul className="flex flex-wrap items-center gap-1">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="rounded-lg px-4 py-2 text-base font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900"
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
              Whiskers &amp; Co. Cat &amp; Dog Clinic
            </p>
            <p className="mt-1">
              A fictional clinic. All patients, owners and clinical figures are
              synthetic demo data.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
