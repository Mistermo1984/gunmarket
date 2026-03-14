'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronRight, BookOpen } from 'lucide-react'
import { wissenWaffen } from '@/lib/wissen-data'
import WissenSidebar from '@/components/wissen/WissenSidebar'

const KATEGORIE_TOOLTIPS: Record<string, string> = {
  'Ordonnanzwaffe': 'Militärwaffen der Schweizer Armee — historisch und aktuell.',
  'Pistole': 'Halbautomatische Kurzwaffen mit Magazin im Griff.',
  'Revolver': 'Kurzwaffen mit Drehtrommel, meist 5–6 Schuss.',
  'Büchse': 'Langwaffen mit gezogenem Lauf für präzise Schüsse auf Distanz.',
  'Flinte': 'Langwaffen mit glattem Lauf für Schrot, Jagd und Tontauben.',
  'Jagdwaffe': 'Speziell für die Jagd konzipierte Lang- und Kurzwaffen.',
  'Historische Waffe': 'Waffen mit historischer Bedeutung, oft Sammlerstücke.',
  'Luftgewehr': 'Druckluft- oder CO₂-betriebene Waffen, meist bewilligungsfrei.',
  'Freie Waffe': 'Waffen ohne Bewilligungspflicht, z.B. Schreckschuss oder Vorderlader.',
}

export default function WaffenWikiPage() {
  const [activeKategorie, setActiveKategorie] = useState('')

  const waffenCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    wissenWaffen.forEach((w) => {
      counts[w.kategorie] = (counts[w.kategorie] || 0) + 1
    })
    return counts
  }, [])

  const filtered = activeKategorie
    ? wissenWaffen.filter((w) => w.kategorie === activeKategorie)
    : wissenWaffen

  return (
    <>
      {/* Header */}
      <section className="bg-brand-dark py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <Link href="/wissen" className="hover:text-white">Waffen-Wiki</Link>
            <ChevronRight size={14} />
            <span className="text-white">Waffen-Wiki</span>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green">
              <BookOpen size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-black uppercase tracking-tight text-white md:text-4xl">
                Waffen-Wiki
              </h1>
              <p className="text-sm text-neutral-400">
                {wissenWaffen.length} Artikel
              </p>
            </div>
          </div>
          <p className="mt-3 max-w-2xl text-neutral-400">
            Alle Waffenarten erklärt — Funktionsweise, Rechtsstatus in der Schweiz und bekannte Modelle.
          </p>
        </div>
      </section>

      {/* Two-column layout */}
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8">
        <WissenSidebar
          waffenCounts={waffenCounts}
          activeKategorie={activeKategorie}
          onKategorieChange={setActiveKategorie}
        />

        <div className="min-w-0 flex-1">
          {/* Active filter info */}
          {activeKategorie && (
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm text-neutral-500">
                {filtered.length} Artikel in
              </span>
              <span className="rounded-full bg-brand-green-light px-3 py-1 text-sm font-semibold text-brand-green">
                {activeKategorie}
              </span>
              <button
                onClick={() => setActiveKategorie('')}
                className="text-sm text-neutral-400 hover:text-red-500"
              >
                ✕
              </button>
            </div>
          )}

          {/* Mobile filter tabs */}
          <div className="mb-6 flex flex-wrap gap-2 lg:hidden">
            <button
              onClick={() => setActiveKategorie('')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                !activeKategorie
                  ? 'bg-brand-green text-white'
                  : 'bg-brand-grey text-neutral-600 hover:bg-brand-green-light hover:text-brand-green'
              }`}
            >
              Alle
            </button>
            {Object.entries(waffenCounts).map(([kat, count]) => (
              <button
                key={kat}
                onClick={() => setActiveKategorie(kat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeKategorie === kat
                    ? 'bg-brand-green text-white'
                    : 'bg-brand-grey text-neutral-600 hover:bg-brand-green-light hover:text-brand-green'
                }`}
              >
                {kat} ({count})
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((waffe) => {
              const tooltip = KATEGORIE_TOOLTIPS[waffe.kategorie] || ''
              return (
                <Link
                  key={waffe.slug}
                  href={`/wissen/waffen/${waffe.slug}`}
                  className="group rounded-xl border border-brand-border bg-white p-5 transition-all hover:border-brand-green hover:shadow-card"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="rounded-full bg-brand-green-light px-2.5 py-0.5 text-xs font-semibold text-brand-green cursor-help"
                      title={tooltip}
                    >
                      {waffe.kategorie}
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-base font-bold uppercase tracking-tight text-brand-dark group-hover:text-brand-green">
                    {waffe.titel}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500">
                    {waffe.kurzbeschreibung}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-green">
                    Mehr lesen
                    <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
