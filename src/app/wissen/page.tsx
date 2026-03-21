import Link from 'next/link'
import { BookOpen, Target, ChevronRight } from 'lucide-react'
import { wissenWaffen, wissenMunition } from '@/lib/wissen-data'
import WissenSidebar from '@/components/wissen/WissenSidebar'
import WikiLanguageBanner from '@/components/wissen/WikiLanguageBanner'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Waffen-Wiki — Lexikon für Schweizer Schützen & Jäger',
  description: 'Alles über Waffen und Munition auf einen Blick. Waffen-Wiki und Kaliber-Guide für Schweizer Schützen, Jäger und Sammler. Pistolen, Revolver, Büchsen, Flinten und alle gängigen Kaliber erklärt.',
  alternates: {
    canonical: 'https://gunmarket.ch/wissen',
  },
  openGraph: {
    title: 'Waffen-Wiki — GunMarket.ch',
    description: 'Waffen-Wiki und Kaliber-Guide für Schweizer Schützen, Jäger und Sammler.',
    url: 'https://gunmarket.ch/wissen',
  },
}

function getWaffenCounts() {
  const counts: Record<string, number> = {}
  wissenWaffen.forEach((w) => {
    counts[w.kategorie] = (counts[w.kategorie] || 0) + 1
  })
  return counts
}

function getMunitionCounts() {
  const counts: Record<string, number> = {}
  wissenMunition.forEach((m) => {
    counts[m.typ] = (counts[m.typ] || 0) + 1
  })
  return counts
}

const recentWaffen = wissenWaffen.slice(0, 4)
const recentMunition = wissenMunition.slice(0, 4)

export default function WissenPage() {
  const waffenCounts = getWaffenCounts()
  const munitionCounts = getMunitionCounts()

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-dark py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-display text-3xl font-black uppercase tracking-tight text-white md:text-5xl">
            Waffen-Wiki
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
            Alles über Waffen und Munition auf einen Blick — für Schweizer Schützen, Jäger und Sammler.
          </p>
        </div>
      </section>

      <WikiLanguageBanner />

      {/* Two-column layout */}
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8">
        <WissenSidebar
          waffenCounts={waffenCounts}
          munitionCounts={munitionCounts}
        />

        <div className="min-w-0 flex-1">
          {/* Two main cards */}
          <div className="mb-8 grid gap-4 md:grid-cols-2">
            {/* Waffen-Wiki */}
            <Link
              href="/wissen/waffen"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-green-dark to-brand-green p-6 text-white transition-shadow hover:shadow-hover md:p-8"
            >
              <div className="relative z-10">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                  <BookOpen size={24} />
                </div>
                <h2 className="font-display text-xl font-black uppercase tracking-tight md:text-2xl">
                  Waffen-Wiki
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  Pistolen, Revolver, Gewehre, Flinten — wie sie funktionieren, Rechtsstatus und bekannte Modelle.
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold">
                  {wissenWaffen.length} Artikel
                  <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-white/5" />
            </Link>

            {/* Kaliber & Munition */}
            <Link
              href="/wissen/munition"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] p-6 text-white transition-shadow hover:shadow-hover md:p-8"
            >
              <div className="relative z-10">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                  <Target size={24} />
                </div>
                <h2 className="font-display text-xl font-black uppercase tracking-tight md:text-2xl">
                  Kaliber & Munition
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  9mm bis .308 Win — alle wichtigen Kaliber erklärt mit Daten und Einsatzgebieten.
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold">
                  {wissenMunition.length} Kaliber
                  <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-white/5" />
            </Link>
          </div>

          {/* Recent Waffen */}
          <div className="mb-8">
            <div className="mb-4 flex items-end justify-between">
              <h2 className="font-display text-lg font-black uppercase tracking-tight text-brand-dark">
                Neueste Waffen-Artikel
              </h2>
              <Link href="/wissen/waffen" className="text-sm font-medium text-brand-green hover:underline">
                Alle anzeigen &rarr;
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {recentWaffen.map((waffe) => (
                <Link
                  key={waffe.slug}
                  href={`/wissen/waffen/${waffe.slug}`}
                  className="group rounded-xl border border-brand-border bg-white p-5 transition-all hover:border-brand-green hover:shadow-card"
                >
                  <span className="rounded-full bg-brand-green-light px-2.5 py-0.5 text-xs font-semibold text-brand-green">
                    {waffe.kategorie}
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold uppercase tracking-tight text-brand-dark group-hover:text-brand-green">
                    {waffe.titel}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500">
                    {waffe.kurzbeschreibung}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mb-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-800">
            Die Informationen im Waffen-Wiki dienen ausschliesslich der allgemeinen Orientierung und ersetzen keine Rechtsberatung. Angaben zu Rechtsstatus und technischen Daten ohne Gewähr. Massgebend ist das geltende Bundesgesetz über Waffen (WG).
          </p>

          {/* Recent Munition */}
          <div>
            <div className="mb-4 flex items-end justify-between">
              <h2 className="font-display text-lg font-black uppercase tracking-tight text-brand-dark">
                Neueste Kaliber-Artikel
              </h2>
              <Link href="/wissen/munition" className="text-sm font-medium text-[#2d5a8e] hover:underline">
                Alle anzeigen &rarr;
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {recentMunition.map((muni) => (
                <Link
                  key={muni.slug}
                  href={`/wissen/munition/${muni.slug}`}
                  className="group rounded-xl border border-brand-border bg-white p-5 transition-all hover:border-[#2d5a8e] hover:shadow-card"
                >
                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                    {muni.typ}
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold uppercase tracking-tight text-brand-dark group-hover:text-[#2d5a8e]">
                    {muni.bezeichnung}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500">
                    {muni.kurzbeschreibung}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
