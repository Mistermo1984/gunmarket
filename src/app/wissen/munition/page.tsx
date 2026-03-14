'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronRight, Target } from 'lucide-react'
import { wissenMunition } from '@/lib/wissen-data'
import WissenSidebar from '@/components/wissen/WissenSidebar'

const TYP_COLORS: Record<string, string> = {
  Pistole: 'bg-amber-50 text-amber-700',
  'Büchse': 'bg-blue-50 text-blue-700',
  Revolver: 'bg-purple-50 text-purple-700',
  Kleinkaliber: 'bg-green-50 text-green-700',
  Flinte: 'bg-red-50 text-red-700',
}

export default function MunitionsGuidePage() {
  const [activeMunTyp, setActiveMunTyp] = useState('')

  const munitionCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    wissenMunition.forEach((m) => {
      counts[m.typ] = (counts[m.typ] || 0) + 1
    })
    return counts
  }, [])

  const filtered = activeMunTyp
    ? wissenMunition.filter((m) => m.typ === activeMunTyp)
    : wissenMunition

  return (
    <>
      {/* Header */}
      <section className="bg-brand-dark py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <Link href="/wissen" className="hover:text-white">Waffen-Wiki</Link>
            <ChevronRight size={14} />
            <span className="text-white">Kaliber & Munition</span>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2d5a8e]">
              <Target size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-black uppercase tracking-tight text-white md:text-4xl">
                Kaliber & Munition
              </h1>
              <p className="text-sm text-neutral-400">
                {wissenMunition.length} Kaliber
              </p>
            </div>
          </div>
          <p className="mt-3 max-w-2xl text-neutral-400">
            Alle wichtigen Kaliber erklärt — mit technischen Daten, Geschichte und Einsatzgebieten in der Schweiz.
          </p>
        </div>
      </section>

      {/* Two-column layout */}
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8">
        <WissenSidebar
          munitionCounts={munitionCounts}
          activeMunTyp={activeMunTyp}
          onMunTypChange={setActiveMunTyp}
        />

        <div className="min-w-0 flex-1">
          {/* Active filter info */}
          {activeMunTyp && (
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm text-neutral-500">
                {filtered.length} Kaliber
              </span>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-[#2d5a8e]">
                {activeMunTyp}
              </span>
              <button
                onClick={() => setActiveMunTyp('')}
                className="text-sm text-neutral-400 hover:text-red-500"
              >
                ✕
              </button>
            </div>
          )}

          {/* Mobile filter tabs */}
          <div className="mb-6 flex flex-wrap gap-2 lg:hidden">
            <button
              onClick={() => setActiveMunTyp('')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                !activeMunTyp
                  ? 'bg-[#2d5a8e] text-white'
                  : 'bg-brand-grey text-neutral-600 hover:bg-blue-50 hover:text-[#2d5a8e]'
              }`}
            >
              Alle
            </button>
            {Object.entries(munitionCounts).map(([typ, count]) => (
              <button
                key={typ}
                onClick={() => setActiveMunTyp(typ)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeMunTyp === typ
                    ? 'bg-[#2d5a8e] text-white'
                    : 'bg-brand-grey text-neutral-600 hover:bg-blue-50 hover:text-[#2d5a8e]'
                }`}
              >
                {typ} ({count})
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((muni) => {
              const typColor = TYP_COLORS[muni.typ] || 'bg-neutral-50 text-neutral-700'
              return (
                <Link
                  key={muni.slug}
                  href={`/wissen/munition/${muni.slug}`}
                  className="group rounded-xl border border-brand-border bg-white p-5 transition-all hover:border-[#2d5a8e] hover:shadow-card"
                >
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${typColor}`}>
                    {muni.typ}
                  </span>
                  <h2 className="mt-3 font-display text-base font-bold uppercase tracking-tight text-brand-dark group-hover:text-[#2d5a8e]">
                    {muni.bezeichnung}
                  </h2>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {muni.aliase.slice(0, 3).map((a) => (
                      <span key={a} className="rounded bg-brand-grey px-1.5 py-0.5 text-[11px] text-neutral-500">
                        {a}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-neutral-500">
                    {muni.kurzbeschreibung}
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-neutral-400">
                    <span>Energie: <strong className="text-brand-dark">{muni.standardenergie}</strong></span>
                    <span>V₀: <strong className="text-brand-dark">{muni.muzzleVelocity}</strong></span>
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#2d5a8e]">
                    Details
                    <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              )
            })}
          </div>

          {/* Comparison table */}
          <div className="mt-10">
            <h2 className="mb-4 font-display text-xl font-black uppercase tracking-tight text-brand-dark">
              Kaliber-Vergleich
            </h2>
            <div className="overflow-x-auto rounded-xl border border-brand-border bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-brand-border bg-brand-grey text-left">
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-brand-dark">Kaliber</th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-brand-dark">Typ</th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-brand-dark">Durchmesser</th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-brand-dark">Energie</th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-brand-dark">V₀</th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-brand-dark">Seit</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((m, i) => (
                    <tr
                      key={m.slug}
                      className={`border-b border-brand-border last:border-0 ${i % 2 === 0 ? '' : 'bg-brand-grey/50'}`}
                    >
                      <td className="whitespace-nowrap px-4 py-3">
                        <Link href={`/wissen/munition/${m.slug}`} className="font-medium text-brand-dark hover:text-[#2d5a8e]">
                          {m.bezeichnung}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-neutral-500">{m.typ}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-neutral-500">{m.geschossdurchmesser}</td>
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-brand-dark">{m.standardenergie}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-neutral-500">{m.muzzleVelocity}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-neutral-500">{m.entwickelt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
