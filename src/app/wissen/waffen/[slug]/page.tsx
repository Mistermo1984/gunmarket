import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, ExternalLink, Shield } from 'lucide-react'
import { wissenWaffen } from '@/lib/wissen-data'
import type { PriceGuide } from '@/lib/wissen-data'
import KommentarSection from '@/components/wissen/KommentarSection'
import WikiLanguageBanner from '@/components/wissen/WikiLanguageBanner'
import YouTubeEmbed from '@/components/wissen/YouTubeEmbed'
import WissenInserate from '@/components/wissen/WissenInserate'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return wissenWaffen.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const waffe = wissenWaffen.find((w) => w.slug === slug)
  if (!waffe) return {}
  return {
    title: `${waffe.titel} — GunMarket.ch Waffen-Wiki`,
    description: waffe.kurzbeschreibung,
    alternates: {
      canonical: `https://gunmarket.ch/wissen/waffen/${slug}`,
    },
    openGraph: {
      title: `${waffe.titel} — GunMarket.ch Waffen-Wiki`,
      description: waffe.kurzbeschreibung,
      url: `https://gunmarket.ch/wissen/waffen/${slug}`,
    },
  }
}

const RECHTS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  frei: { label: 'Frei erwerbbar (Kat. C)', color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
  wes: { label: 'WES-pflichtig (Kat. B)', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  'abk-klein': { label: 'ABK Klein (Kat. A)', color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
  ordonnanz: { label: 'Ordonnanz (WES)', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
}

function renderContent(content: string) {
  // Detect if content uses HTML tags
  const isHtml = content.includes('<h2>') || content.includes('<p>') || content.includes('<h3>')
  if (isHtml) {
    return (
      <div
        className="wiki-prose"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }

  // Markdown-style rendering
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let currentParagraph: string[] = []
  let listItems: string[] = []
  let key = 0

  function flushParagraph() {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ')
      if (text.trim()) {
        elements.push(
          <p key={key++} className="mb-4 text-neutral-600 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: text
                .replace(/\*\*(.+?)\*\*/g, '<strong class="text-brand-dark font-semibold">$1</strong>')
            }}
          />
        )
      }
      currentParagraph = []
    }
  }

  function flushList() {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key++} className="mb-4 space-y-1.5 pl-5">
          {listItems.map((item, i) => (
            <li key={i} className="list-disc text-neutral-600 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: item
                  .replace(/\*\*(.+?)\*\*/g, '<strong class="text-brand-dark font-semibold">$1</strong>')
              }}
            />
          ))}
        </ul>
      )
      listItems = []
    }
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed.startsWith('## ')) {
      flushList()
      flushParagraph()
      elements.push(
        <h2 key={key++} className="mb-3 mt-8 font-display text-xl font-bold uppercase tracking-tight text-brand-dark first:mt-0">
          {trimmed.slice(3)}
        </h2>
      )
    } else if (trimmed.startsWith('- ')) {
      flushParagraph()
      listItems.push(trimmed.slice(2))
    } else if (trimmed === '') {
      flushList()
      flushParagraph()
    } else {
      flushList()
      currentParagraph.push(trimmed)
    }
  }

  flushList()
  flushParagraph()

  return elements
}

function TechnischeDaten({ waffe }: { waffe: typeof wissenWaffen[0] }) {
  const rechts = RECHTS_LABELS[waffe.rechtsstatus] || RECHTS_LABELS.frei

  return (
    <div className="rounded-xl border border-brand-border bg-brand-grey p-5 md:p-6">
      <h2 className="mb-4 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-brand-dark">
        <Shield size={16} className="text-brand-green" />
        Technische Daten
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {waffe.hersteller && (
          <div className="rounded-lg bg-white p-3 border border-brand-border">
            <dt className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">Hersteller</dt>
            <dd className="mt-1 text-sm font-semibold text-brand-dark">{waffe.hersteller}</dd>
          </div>
        )}
        {waffe.baujahr && (
          <div className="rounded-lg bg-white p-3 border border-brand-border">
            <dt className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">Baujahr</dt>
            <dd className="mt-1 text-sm font-semibold text-brand-dark">{waffe.baujahr}</dd>
          </div>
        )}
        <div className="rounded-lg bg-white p-3 border border-brand-border">
          <dt className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">Kategorie</dt>
          <dd className="mt-1 text-sm font-semibold text-brand-dark">{waffe.kategorie}</dd>
        </div>
        <div className={`rounded-lg p-3 border ${rechts.bg}`}>
          <dt className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">Rechtsstatus CH</dt>
          <dd className={`mt-1 text-sm font-semibold ${rechts.color}`}>{rechts.label}</dd>
        </div>
        {waffe.typischeKaliber.length > 0 && (
          <div className="rounded-lg bg-white p-3 border border-brand-border col-span-2 sm:col-span-3 lg:col-span-4">
            <dt className="text-[11px] font-medium uppercase tracking-wider text-neutral-400 mb-1.5">Kaliber</dt>
            <dd className="flex flex-wrap gap-1.5">
              {waffe.typischeKaliber.map((k) => (
                <span key={k} className="rounded-full bg-brand-grey px-2.5 py-0.5 text-xs font-medium text-brand-dark border border-brand-border">
                  {k}
                </span>
              ))}
            </dd>
          </div>
        )}
      </div>
    </div>
  )
}

function PreisGuideSection({ priceGuide, titel }: { priceGuide: PriceGuide; titel: string }) {
  const items = [
    { label: 'Gut', sublabel: 'Gebrauchsspuren', value: priceGuide.gut, accent: 'border-neutral-300' },
    { label: 'Sehr gut', sublabel: 'Gepflegt', value: priceGuide.sehrGut, accent: 'border-brand-green/50' },
    { label: 'Neuwertig', sublabel: 'Wie neu', value: priceGuide.neuwertig, accent: 'border-brand-green' },
  ]
  if (priceGuide.sammler) {
    items.push({ label: 'Sammler', sublabel: 'Selten / OVP', value: priceGuide.sammler, accent: 'border-amber-500' })
  }

  return (
    <div className="rounded-xl border border-brand-border bg-white p-5 md:p-6">
      <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-brand-dark">
        Preisguide Schweiz 2026 — {titel}
      </h2>
      <div className={`grid gap-3 ${items.length === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-3'}`}>
        {items.map((item) => (
          <div
            key={item.label}
            className={`rounded-lg border-t-[3px] bg-brand-grey p-3 text-center ${item.accent}`}
          >
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">{item.label}</p>
            <p className="text-[10px] text-neutral-400 mb-1">{item.sublabel}</p>
            <p className="text-sm font-bold text-brand-dark">{item.value}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-neutral-400">
        Richtwerte basierend auf Schweizer Marktdaten. Tatsächliche Preise variieren je nach Zustand, Zubehör und Nachfrage.
      </p>
    </div>
  )
}

export default async function WaffeArtikelPage({ params }: Props) {
  const { slug } = await params
  const waffe = wissenWaffen.find((w) => w.slug === slug)
  if (!waffe) notFound()

  // Smart related articles: use relatedSlugs if available, else same category
  const related = waffe.relatedSlugs
    ? waffe.relatedSlugs
        .map((s) => wissenWaffen.find((w) => w.slug === s))
        .filter(Boolean)
        .slice(0, 4)
    : wissenWaffen
        .filter((w) => w.slug !== slug && w.kategorie === waffe.kategorie)
        .slice(0, 4)

  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: waffe.titel,
    description: waffe.kurzbeschreibung,
    url: `https://gunmarket.ch/wissen/waffen/${slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'GunMarket.ch',
      url: 'https://gunmarket.ch',
      logo: { '@type': 'ImageObject', url: 'https://gunmarket.ch/og-image.png' },
    },
    mainEntity: {
      '@type': 'Product',
      name: waffe.titel,
      description: waffe.kurzbeschreibung,
      category: waffe.kategorie,
      brand: waffe.hersteller ? { '@type': 'Brand', name: waffe.hersteller } : undefined,
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'CHF',
        availability: 'https://schema.org/InStock',
        url: `https://gunmarket.ch/?suche=${encodeURIComponent(waffe.tags[1] || waffe.titel)}`,
      },
    },
  }

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gunmarket.ch' },
      { '@type': 'ListItem', position: 2, name: 'Waffen-Wiki', item: 'https://gunmarket.ch/wissen' },
      { '@type': 'ListItem', position: 3, name: 'Waffen', item: 'https://gunmarket.ch/wissen/waffen' },
      { '@type': 'ListItem', position: 4, name: waffe.titel, item: `https://gunmarket.ch/wissen/waffen/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />

      {/* Header */}
      <section className="bg-brand-dark py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <Link href="/wissen" className="hover:text-white">Waffen-Wiki</Link>
            <ChevronRight size={14} />
            <Link href="/wissen/waffen" className="hover:text-white">Waffen</Link>
            <ChevronRight size={14} />
            <span className="text-white">{waffe.titel}</span>
          </div>
          <h1 className="mt-4 font-display text-2xl font-black uppercase tracking-tight text-white md:text-4xl">
            {waffe.titel}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-neutral-400">{waffe.kurzbeschreibung}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-brand-green px-3 py-1 text-xs font-semibold text-white">
              {waffe.kategorie}
            </span>
            {waffe.hersteller && (
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-neutral-300">
                {waffe.hersteller}
              </span>
            )}
          </div>
        </div>
      </section>

      <WikiLanguageBanner />

      {/* Technische Daten + Preisguide — scannable cards */}
      <section className="border-b border-brand-border bg-white py-6 md:py-8">
        <div className="mx-auto max-w-7xl px-4 space-y-4">
          <TechnischeDaten waffe={waffe} />
          {waffe.priceGuide && (
            <PreisGuideSection priceGuide={waffe.priceGuide} titel={waffe.titel} />
          )}
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            {/* Main content */}
            <div className="min-w-0">
              <article className="wiki-article">
                {renderContent(waffe.inhalt)}
              </article>

              {/* YouTube video embed */}
              {waffe.youtubeVideoId && (
                <YouTubeEmbed
                  videoId={waffe.youtubeVideoId}
                  titel={waffe.titel}
                  quelle={waffe.youtubeQuelle}
                  start={waffe.youtubeStart}
                />
              )}

              {/* Live listings from gunmarket.ch */}
              <WissenInserate
                suchbegriff={waffe.tags[1] || waffe.titel}
                waffenTitel={waffe.titel}
              />

              <KommentarSection type="waffen" slug={slug} titel={waffe.titel} />
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Inserate CTA — prominent */}
              <Link
                href={`/?suche=${encodeURIComponent(waffe.tags[1] || waffe.titel)}`}
                className="block rounded-xl border-2 border-brand-green bg-brand-green p-5 text-white shadow-md transition-all hover:shadow-lg hover:brightness-110 group"
              >
                <p className="font-display text-sm font-bold uppercase tracking-wider">
                  Aktuelle Inserate
                </p>
                <p className="mt-1 text-xs text-white/80">
                  {waffe.titel} jetzt auf GunMarket.ch kaufen
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-brand-green transition-colors group-hover:bg-brand-green-light">
                  Inserate ansehen
                  <ExternalLink size={12} />
                </span>
              </Link>

              {/* Tags */}
              <div className="rounded-xl border border-brand-border bg-brand-grey p-5">
                <h3 className="mb-3 font-display text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {waffe.tags.map((t) => (
                    <span key={t} className="rounded-full bg-brand-green-light px-2.5 py-0.5 text-xs font-medium text-brand-green">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related */}
              {related.length > 0 && (
                <div className="rounded-xl border border-brand-border p-5">
                  <h3 className="mb-3 font-display text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Ähnliche Waffen
                  </h3>
                  <div className="space-y-2">
                    {related.map((r) => r && (
                      <Link
                        key={r.slug}
                        href={`/wissen/waffen/${r.slug}`}
                        className="block rounded-lg p-3 text-sm transition-colors hover:bg-brand-grey"
                      >
                        <span className="font-medium text-brand-dark">{r.titel}</span>
                        <span className="mt-0.5 block text-xs text-neutral-500">{r.kategorie}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Waffenrecht Link */}
              <Link
                href="/waffenrecht"
                className="block rounded-xl border border-brand-border p-5 text-sm transition-colors hover:bg-brand-grey"
              >
                <span className="font-medium text-brand-dark">Waffenrecht Schweiz</span>
                <span className="mt-0.5 block text-xs text-neutral-500">Alles zu WES, Kategorien & Bewilligungen</span>
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
