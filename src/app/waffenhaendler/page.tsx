import type { Metadata } from 'next';
import Link from 'next/link';
import { DEALERS } from '@/components/home/bannerData';

export const metadata: Metadata = {
  title: 'Waffenhändler Schweiz — Alle Fachgeschäfte | GunMarket.ch',
  description:
    `${DEALERS.length} Schweizer Waffenhändler und Armurerien auf einen Blick. Fachgeschäfte für Pistolen, Revolver, Büchsen, Jagdwaffen, Munition und Zubehör in allen Kantonen.`,
  alternates: { canonical: 'https://gunmarket.ch/waffenhaendler' },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Waffenhändler Schweiz',
  numberOfItems: DEALERS.length,
  itemListElement: DEALERS.map((d, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'LocalBusiness',
      name: d.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: d.meta.split(' ')[0],
        addressCountry: 'CH',
      },
      url: d.href,
    },
  })),
};

export default function WaffenhaendlerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <div className="border-b border-brand-border bg-brand-grey/50">
        <div className="mx-auto flex max-w-7xl items-center gap-1.5 px-4 py-3 text-xs text-neutral-500">
          <Link href="/" className="hover:text-brand-green transition-colors">Startseite</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-brand-dark">Waffenhändler</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="font-display text-2xl font-black uppercase tracking-tight text-brand-dark md:text-3xl">
          Waffenhändler Schweiz
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-500">
          {DEALERS.length} Fachgeschäfte und Armurerien für Waffen, Munition und Zubehör in der Schweiz.
          Alle Kantone, von Zürich bis Genf.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DEALERS.map((dealer) => (
            <a
              key={dealer.name}
              href={dealer.href}
              target={dealer.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-brand-border bg-white p-4 transition-colors hover:border-[#4d8230]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef5e8]">
                <div className="h-2 w-2 rounded-full bg-[#4d8230]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-brand-dark">{dealer.name}</div>
                <div className="text-xs text-neutral-500">{dealer.meta}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-brand-border bg-brand-grey/30 p-6">
          <h2 className="text-lg font-bold text-brand-dark">Ihr Waffengeschäft eintragen</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Sie betreiben ein Waffengeschäft oder eine Armurerie in der Schweiz?
            Kontaktieren Sie uns, um kostenlos in unser Verzeichnis aufgenommen zu werden.
          </p>
          <Link
            href="/kontakt"
            className="mt-3 inline-block rounded-lg bg-[#4d8230] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#3d6826]"
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </div>
    </>
  );
}
