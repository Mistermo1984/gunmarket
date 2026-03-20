"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, PlusCircle, Users, ShieldCheck } from "lucide-react";

const KANTONE_OPTIONS = [
  { id: "", label: "Alle Kantone" },
  { id: "AG", label: "Aargau" },
  { id: "AI", label: "Appenzell I." },
  { id: "AR", label: "Appenzell A." },
  { id: "BE", label: "Bern" },
  { id: "BL", label: "Basel-Land" },
  { id: "BS", label: "Basel-Stadt" },
  { id: "FR", label: "Freiburg" },
  { id: "GE", label: "Genf" },
  { id: "GL", label: "Glarus" },
  { id: "GR", label: "Graubünden" },
  { id: "JU", label: "Jura" },
  { id: "LU", label: "Luzern" },
  { id: "NE", label: "Neuenburg" },
  { id: "NW", label: "Nidwalden" },
  { id: "OW", label: "Obwalden" },
  { id: "SG", label: "St. Gallen" },
  { id: "SH", label: "Schaffhausen" },
  { id: "SO", label: "Solothurn" },
  { id: "SZ", label: "Schwyz" },
  { id: "TG", label: "Thurgau" },
  { id: "TI", label: "Tessin" },
  { id: "UR", label: "Uri" },
  { id: "VD", label: "Waadt" },
  { id: "VS", label: "Wallis" },
  { id: "ZG", label: "Zug" },
  { id: "ZH", label: "Zürich" },
];

const QUICK_CHIPS = [
  { label: "SIG Sauer", q: "SIG Sauer" },
  { label: "Glock", q: "Glock" },
  { label: "K31", q: "K31" },
  { label: "Stgw 90", q: "Stgw 90" },
  { label: ".308 Win", q: ".308" },
  { label: "Zeiss", q: "Zeiss" },
];

function CountUpNumber({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (end === 0) return;
    setCount(0);
    const duration = 1200;
    const steps = 40;
    const increment = end / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [end]);

  return (
    <span ref={ref} className="font-display text-xl font-black text-brand-green md:text-2xl animate-count-up">
      {count.toLocaleString("de-CH")}{suffix}
    </span>
  );
}

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [searchKanton, setSearchKanton] = useState("");
  const [stats, setStats] = useState({ inserate: 0, verkaeufer: 0, kantone: 0 });

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((data) => {
        setStats({
          inserate: data.inserate || 0,
          verkaeufer: data.verkaeufer || 0,
          kantone: data.kantone || 0,
        });
      })
      .catch(() => {});
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    const params = new URLSearchParams();
    params.set("q", query.trim());
    if (searchKanton) params.set("kanton", searchKanton);
    router.push(`/suche?${params.toString()}`);
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-[1px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="mx-auto max-w-2xl text-center animate-fade-in">
          <h1 className="mb-2 font-display text-2xl font-black uppercase tracking-tight text-white md:text-3xl">
            Der Schweizer Waffenmarktplatz
          </h1>
          <p className="mb-6 text-sm text-neutral-400">
            Kaufen &amp; verkaufen — einfach, kostenlos, sicher.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mx-auto max-w-xl">
            <div className="flex items-center overflow-hidden rounded-xl bg-white shadow-lg transition-all focus-within:ring-2 focus-within:ring-brand-green/40">
              <div className="flex flex-1 items-center gap-2 px-4">
                <Search size={18} className="shrink-0 text-neutral-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Waffe, Kaliber oder Marke suchen..."
                  className="min-w-0 flex-1 py-3.5 text-sm text-brand-dark placeholder:text-neutral-400 focus:outline-none"
                />
              </div>
              <div className="hidden h-8 w-px bg-brand-border sm:block" />
              <select
                value={searchKanton}
                onChange={(e) => setSearchKanton(e.target.value)}
                className="hidden w-[130px] shrink-0 border-none bg-transparent px-3 py-3.5 text-sm text-neutral-600 focus:outline-none sm:block"
              >
                {KANTONE_OPTIONS.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.label}
                  </option>
                ))}
              </select>

              <div className="m-1.5 shrink-0">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-lg bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
                >
                  <Search size={15} />
                  <span className="hidden sm:inline">Suchen</span>
                </button>
              </div>
            </div>
          </form>

          {/* Quick Search Chips */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {QUICK_CHIPS.map((chip, i) => (
              <Link
                key={chip.q}
                href={`/suche?q=${encodeURIComponent(chip.q)}`}
                className={`animate-chip-in stagger-${i + 1} rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/70 transition-all hover:border-brand-green hover:bg-brand-green hover:text-white`}
              >
                {chip.label}
              </Link>
            ))}
          </div>

          {/* CTA Icons */}
          <div className="mt-8 flex justify-center gap-8">
            <Link href="/dashboard/inserat-erstellen">
              <div className="flex flex-col items-center gap-2 text-white transition hover:text-green-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white/20">
                  <PlusCircle className="h-6 w-6" />
                </div>
                <span className="text-[11px] font-medium">Inserat aufgeben</span>
              </div>
            </Link>
            <Link href="/vereine">
              <div className="flex flex-col items-center gap-2 text-white transition hover:text-green-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white/20">
                  <Users className="h-6 w-6" />
                </div>
                <span className="text-[11px] font-medium">Schützenvereine</span>
              </div>
            </Link>
            <Link href="/waffenrecht">
              <div className="flex flex-col items-center gap-2 text-white transition hover:text-green-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white/20">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <span className="text-[11px] font-medium">Waffenrecht</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative border-t border-white/10 bg-brand-dark/80">
        <div className="mx-auto flex max-w-xl items-center justify-center divide-x divide-white/10 py-3">
          <div className="flex flex-col items-center px-6 md:px-10">
            <CountUpNumber end={stats.inserate} suffix="" />
            <span className="text-[10px] text-neutral-400">Inserate</span>
          </div>
          <div className="flex flex-col items-center px-6 md:px-10">
            <CountUpNumber end={stats.verkaeufer} suffix="" />
            <span className="text-[10px] text-neutral-400">Verkäufer</span>
          </div>
          <div className="flex flex-col items-center px-6 md:px-10">
            <CountUpNumber end={stats.kantone} suffix="" />
            <span className="text-[10px] text-neutral-400">Kantone</span>
          </div>
        </div>
      </div>
    </section>
  );
}
