import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, ExternalLink } from 'lucide-react'
import { wissenMunition } from '@/lib/wissen-data'
import KommentarSection from '@/components/wissen/KommentarSection'
import WikiLanguageBanner from '@/components/wissen/WikiLanguageBanner'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return wissenMunition.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const muni = wissenMunition.find((m) => m.slug === slug)
  if (!muni) return {}
  return {
    title: `${muni.bezeichnung} — GunMarket.ch Kaliber-Guide`,
    description: muni.kurzbeschreibung,
    alternates: {
      canonical: `https://gunmarket.ch/wissen/munition/${slug}`,
    },
    openGraph: {
      title: `${muni.bezeichnung} — GunMarket.ch Kaliber-Guide`,
      description: muni.kurzbeschreibung,
      url: `https://gunmarket.ch/wissen/munition/${slug}`,
    },
  }
}

const TYP_COLORS: Record<string, string> = {
  Pistole: 'bg-amber-50 text-amber-700 border-amber-200',
  'Büchse': 'bg-blue-50 text-blue-700 border-blue-200',
  Revolver: 'bg-purple-50 text-purple-700 border-purple-200',
  Kleinkaliber: 'bg-green-50 text-green-700 border-green-200',
  Flinte: 'bg-red-50 text-red-700 border-red-200',
}

function renderContent(content: string) {
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

export default async function MunitionArtikelPage({ params }: Props) {
  const { slug } = await params
  const muni = wissenMunition.find((m) => m.slug === slug)
  if (!muni) notFound()

  const typColor = TYP_COLORS[muni.typ] || 'bg-neutral-50 text-neutral-700 border-neutral-200'

  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: muni.bezeichnung,
    description: muni.kurzbeschreibung,
    url: `https://gunmarket.ch/wissen/munition/${slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'GunMarket.ch',
      url: 'https://gunmarket.ch',
      logo: { '@type': 'ImageObject', url: 'https://gunmarket.ch/og-image.png' },
    },
  }

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gunmarket.ch' },
      { '@type': 'ListItem', position: 2, name: 'Waffen-Wiki', item: 'https://gunmarket.ch/wissen' },
      { '@type': 'ListItem', position: 3, name: 'Munition', item: 'https://gunmarket.ch/wissen/munition' },
      { '@type': 'ListItem', position: 4, name: muni.bezeichnung, item: `https://gunmarket.ch/wissen/munition/${slug}` },
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
            <Link href="/wissen/munition" className="hover:text-white">Munition</Link>
            <ChevronRight size={14} />
            <span className="text-white">{muni.bezeichnung}</span>
          </div>
          <h1 className="mt-4 font-display text-2xl font-black uppercase tracking-tight text-white md:text-4xl">
            {muni.bezeichnung}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${typColor}`}>
              {muni.typ}
            </span>
            {muni.aliase.map((a) => (
              <span key={a} className="rounded-full bg-white/10 px-3 py-1 text-xs text-neutral-300">
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      <WikiLanguageBanner />

      {/* Content + Sidebar */}
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            {/* Main content */}
            <div className="min-w-0">
              {/* Tech specs box */}
              <div className="mb-8 rounded-xl border border-brand-border bg-brand-grey p-6">
                <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-brand-dark">
                  Technische Daten
                </h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div>
                    <dt className="text-xs font-medium text-neutral-500">Geschossdurchmesser</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-brand-dark">{muni.geschossdurchmesser}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-neutral-500">Hülsenlänge</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-brand-dark">{muni.huelsenlaenge}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-neutral-500">Mündungsenergie</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-brand-dark">{muni.standardenergie}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-neutral-500">Mündungsgeschwindigkeit</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-brand-dark">{muni.muzzleVelocity}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-neutral-500">Entwickelt</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-brand-dark">{muni.entwickelt}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-neutral-500">Entwickler</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-brand-dark">{muni.entwickler}</dd>
                  </div>
                </div>
              </div>

              {/* Article content */}
              <article>
                {renderContent(muni.beschreibung)}
              </article>
              <KommentarSection type="munition" slug={slug} titel={muni.bezeichnung} />
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Typische Waffen */}
              <div className="rounded-xl border border-brand-border bg-brand-grey p-6">
                <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-brand-dark">
                  Typische Waffen
                </h3>
                <ul className="space-y-2">
                  {muni.typischeWaffen.map((w) => (
                    <li key={w} className="flex items-center gap-2 text-sm text-neutral-600">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Inserate Link */}
              <Link
                href={`/?kaliber=${muni.slug}`}
                className="flex items-center justify-between rounded-xl border border-[#2d5a8e] bg-blue-50 p-5 transition-colors hover:bg-[#2d5a8e] hover:text-white group"
              >
                <span className="text-sm font-semibold text-[#2d5a8e] group-hover:text-white">
                  Inserate mit diesem Kaliber
                </span>
                <ExternalLink size={16} className="text-[#2d5a8e] group-hover:text-white" />
              </Link>

              {/* Other calibers */}
              <div className="rounded-xl border border-brand-border p-6">
                <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-brand-dark">
                  Weitere Kaliber
                </h3>
                <div className="space-y-3">
                  {wissenMunition
                    .filter((m) => m.slug !== slug)
                    .slice(0, 4)
                    .map((m) => (
                      <Link
                        key={m.slug}
                        href={`/wissen/munition/${m.slug}`}
                        className="block rounded-lg p-3 text-sm transition-colors hover:bg-brand-grey"
                      >
                        <span className="font-medium text-brand-dark">{m.bezeichnung}</span>
                        <span className="mt-0.5 block text-xs text-neutral-500">{m.typ} · {m.standardenergie}</span>
                      </Link>
                    ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
