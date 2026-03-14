import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, ExternalLink } from 'lucide-react'
import { wissenWaffen } from '@/lib/wissen-data'
import KommentarSection from '@/components/wissen/KommentarSection'
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
  }
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

export default async function WaffeArtikelPage({ params }: Props) {
  const { slug } = await params
  const waffe = wissenWaffen.find((w) => w.slug === slug)
  if (!waffe) notFound()

  const related = wissenWaffen.filter((w) => w.slug !== slug).slice(0, 3)

  return (
    <>
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
          <div className="mt-3 flex items-center gap-2">
            <span className="rounded-full bg-brand-green px-3 py-1 text-xs font-semibold text-white">
              {waffe.kategorie}
            </span>
          </div>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            {/* Main content */}
            <div className="min-w-0">
              <article>
                {renderContent(waffe.inhalt)}
              </article>
              <KommentarSection type="waffen" slug={slug} titel={waffe.titel} />
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Steckbrief */}
              <div className="rounded-xl border border-brand-border bg-brand-grey p-6">
                <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-brand-dark">
                  Steckbrief
                </h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="font-medium text-neutral-500">Hersteller</dt>
                    <dd className="mt-0.5 font-medium text-brand-dark">{waffe.hersteller}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-neutral-500">Baujahr</dt>
                    <dd className="mt-0.5 font-medium text-brand-dark">{waffe.baujahr}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-neutral-500">Typische Kaliber</dt>
                    <dd className="mt-1 flex flex-wrap gap-1.5">
                      {waffe.typischeKaliber.map((k) => (
                        <span key={k} className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-brand-dark border border-brand-border">
                          {k}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-neutral-500">Tags</dt>
                    <dd className="mt-1 flex flex-wrap gap-1.5">
                      {waffe.tags.map((t) => (
                        <span key={t} className="rounded-full bg-brand-green-light px-2.5 py-0.5 text-xs font-medium text-brand-green">
                          {t}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Inserate Link */}
              <Link
                href={`/suche?kategorie=${waffe.slug}`}
                className="flex items-center justify-between rounded-xl border border-brand-green bg-brand-green-light p-5 transition-colors hover:bg-brand-green hover:text-white group"
              >
                <span className="text-sm font-semibold text-brand-green group-hover:text-white">
                  Inserate ansehen
                </span>
                <ExternalLink size={16} className="text-brand-green group-hover:text-white" />
              </Link>

              {/* Related */}
              <div className="rounded-xl border border-brand-border p-6">
                <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-brand-dark">
                  Weitere Artikel
                </h3>
                <div className="space-y-3">
                  {related.map((r) => (
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
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
