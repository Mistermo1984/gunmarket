import type { Metadata } from 'next';
import Link from 'next/link';
import { ALL_EVENTS, formatEventDate } from '@/components/home/bannerData';

export const metadata: Metadata = {
  title: 'Schiessen & Waffenbörsen 2026 — Events Schweiz | GunMarket.ch',
  description:
    'Alle Schiessanlässe, Waffenbörsen und Waffenläufe 2026 in der Schweiz. Historische Schiessen, Ordonnanz-Events, Sammler-Börsen und mehr.',
  alternates: { canonical: 'https://gunmarket.ch/events' },
};

const sorted = [...ALL_EVENTS].sort(
  (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
);

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Schiessen & Waffenbörsen 2026 Schweiz',
  numberOfItems: sorted.length,
  itemListElement: sorted.map((ev, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Event',
      name: ev.name,
      startDate: ev.date,
      endDate: ev.dateEnd,
      location: {
        '@type': 'Place',
        name: ev.ort,
        address: { '@type': 'PostalAddress', addressCountry: 'CH' },
      },
      url: ev.href,
      description: ev.inhalt,
    },
  })),
};

function isPast(dateEnd: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dateEnd) < today;
}

export default function EventsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      <div className="border-b border-brand-border bg-brand-grey/50">
        <div className="mx-auto flex max-w-7xl items-center gap-1.5 px-4 py-3 text-xs text-neutral-500">
          <Link href="/" className="hover:text-brand-green transition-colors">Startseite</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-brand-dark">Events 2026</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="font-display text-2xl font-black uppercase tracking-tight text-brand-dark md:text-3xl">
          Schiessen & Waffenbörsen 2026
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-500">
          {ALL_EVENTS.length} Anlässe in der ganzen Schweiz — historische Schiessen,
          Waffenbörsen, Waffenläufe und Spezialevents.
        </p>

        <div className="mt-8 space-y-3">
          {sorted.map((ev) => {
            const past = isPast(ev.dateEnd);
            return (
              <a
                key={`${ev.name}-${ev.date}`}
                href={ev.href}
                target={ev.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`flex items-center gap-4 rounded-xl border bg-white p-4 transition-colors ${
                  past
                    ? 'border-neutral-100 opacity-50'
                    : 'border-brand-border hover:border-[#4d8230]'
                }`}
              >
                {/* Date block */}
                <div className="flex h-12 w-20 shrink-0 flex-col items-center justify-center rounded-lg bg-[#eef5e8]">
                  <span className="text-xs font-bold text-[#4d8230] leading-tight">
                    {formatEventDate(ev.date, ev.dateEnd)}
                  </span>
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-brand-dark">{ev.name}</div>
                  <div className="mt-0.5 text-xs text-neutral-500">
                    {ev.ort} · {ev.inhalt}
                    {past && <span className="ml-2 text-neutral-400">(vergangen)</span>}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
