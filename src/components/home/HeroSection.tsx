"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, PlusCircle, Users, ShieldCheck, Sparkles, ArrowRight, Loader2, X } from "lucide-react";
import ListingCard, { type ListingCardData } from "@/components/ui/ListingCard";
import { apiListingToCard } from "@/lib/listing-helpers";

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

const AI_CHIPS = [
  "Günstige Pistole zum Schiessen",
  "Ordonnanzwaffen zum Sammeln",
  "Jagdgewehr unter 2000 CHF",
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

interface AiResult {
  erklärung: string;
  annotationen: Record<string, string>;
  listings: Record<string, unknown>[];
  total: number;
  filter: Record<string, string | number | null>;
}

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [searchKanton, setSearchKanton] = useState("");
  const [stats, setStats] = useState({ inserate: 0, verkaeufer: 0, kantone: 0 });

  // AI Search state
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AiResult | null>(null);
  const [aiError, setAiError] = useState("");
  const [aiQueryUsed, setAiQueryUsed] = useState("");
  const aiResultsRef = useRef<HTMLDivElement>(null);

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

  // Normal search
  function handleNormalSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    const params = new URLSearchParams();
    params.set("q", query.trim());
    if (searchKanton) params.set("kanton", searchKanton);
    router.push(`/suche?${params.toString()}`);
  }

  // AI search
  async function triggerAiSearch(searchText: string) {
    if (!searchText.trim() || searchText.trim().length < 3) return;

    setAiLoading(true);
    setAiError("");
    setAiResult(null);
    setAiQueryUsed(searchText.trim());

    try {
      const res = await fetch("/api/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchText.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setAiError(data.error || "Fehler bei der KI-Suche");
      } else {
        setAiResult(data);
        setTimeout(() => {
          aiResultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } catch {
      setAiError("Netzwerkfehler. Bitte versuche es erneut.");
    }

    setAiLoading(false);
  }

  function handleAiChipClick(text: string) {
    setQuery(text);
    triggerAiSearch(text);
  }

  function closeAiResults() {
    setAiResult(null);
    setAiError("");
    setAiQueryUsed("");
  }

  const aiListings: ListingCardData[] = aiResult
    ? aiResult.listings.map((l) => apiListingToCard(l))
    : [];

  const annotationText = aiResult?.annotationen
    ? Object.values(aiResult.annotationen)[0] || ""
    : "";

  const showAiSection = aiResult || aiLoading || aiError;

  return (
    <>
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
            <form onSubmit={handleNormalSearch} className="mx-auto max-w-xl">
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

                {/* Two buttons: Normal + KI */}
                <div className="m-1.5 flex shrink-0 items-center gap-1">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 rounded-lg bg-brand-green px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
                  >
                    <Search size={15} />
                    <span className="hidden sm:inline">Suchen</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerAiSearch(query)}
                    disabled={aiLoading || query.trim().length < 3}
                    title="KI-Suche — beschreibe in eigenen Worten was du suchst"
                    className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 px-3 py-2.5 text-sm font-semibold text-white transition-all hover:from-purple-600 hover:to-blue-600 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {aiLoading ? (
                      <Loader2 size={15} className="animate-spin" />
                    ) : (
                      <Sparkles size={15} />
                    )}
                    <span className="hidden md:inline">KI</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Chips: normal + AI examples */}
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
              <span className="hidden items-center text-white/20 sm:flex">|</span>
              {AI_CHIPS.map((text, i) => (
                <button
                  key={i}
                  onClick={() => handleAiChipClick(text)}
                  className={`animate-chip-in stagger-${QUICK_CHIPS.length + i + 1} flex items-center gap-1 rounded-full border border-purple-400/30 px-3 py-1 text-xs font-medium text-purple-300/70 transition-all hover:border-purple-400 hover:bg-purple-500/20 hover:text-white`}
                >
                  <Sparkles size={10} />
                  {text}
                </button>
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

      {/* AI Results Section */}
      {showAiSection && (
        <div ref={aiResultsRef} className="bg-gradient-to-b from-gray-50 to-white">
          <div className="mx-auto max-w-7xl px-4 py-8">

            {/* Loading */}
            {aiLoading && (
              <div className="py-12 text-center">
                <div className="inline-flex items-center gap-3 rounded-xl border border-purple-200 bg-purple-50 px-6 py-4">
                  <Loader2 size={20} className="animate-spin text-purple-500" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-purple-800">KI analysiert deine Anfrage...</p>
                    <p className="text-xs text-purple-600">&laquo;{aiQueryUsed}&raquo;</p>
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {aiError && !aiLoading && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center">
                <p className="text-sm text-red-700">{aiError}</p>
                <button
                  onClick={closeAiResults}
                  className="mt-2 text-xs font-medium text-red-500 hover:underline"
                >
                  Schliessen
                </button>
              </div>
            )}

            {/* Results */}
            {aiResult && !aiLoading && (
              <>
                {/* Header with close */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-purple-500" />
                    <span className="text-sm font-bold text-brand-dark">KI-Suchergebnisse</span>
                    <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-semibold text-purple-600">
                      {aiResult.total} Treffer
                    </span>
                  </div>
                  <button
                    onClick={closeAiResults}
                    className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-neutral-400 transition-colors hover:bg-gray-100 hover:text-neutral-600"
                  >
                    <X size={14} />
                    Schliessen
                  </button>
                </div>

                {/* AI Explanation */}
                <div className="mb-6 rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 p-4">
                  <p className="text-sm leading-relaxed text-purple-800">
                    {aiResult.erklärung}
                  </p>
                  {annotationText && (
                    <p className="mt-2 rounded-lg bg-white/60 px-3 py-2 text-xs leading-relaxed text-purple-700">
                      {annotationText}
                    </p>
                  )}
                </div>

                {/* Applied filters */}
                {aiResult.filter && (
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-neutral-400">Filter:</span>
                    {aiResult.filter.kategorie && (
                      <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-700">
                        {aiResult.filter.kategorie}
                      </span>
                    )}
                    {aiResult.filter.suchbegriff && (
                      <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
                        &quot;{aiResult.filter.suchbegriff}&quot;
                      </span>
                    )}
                    {aiResult.filter.rechtsstatus && (
                      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
                        {aiResult.filter.rechtsstatus}
                      </span>
                    )}
                    {aiResult.filter.preisMax && (
                      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                        bis CHF {aiResult.filter.preisMax}
                      </span>
                    )}
                  </div>
                )}

                {/* Listings Grid */}
                {aiListings.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {aiListings.map((listing) => (
                      <ListingCard key={listing.id} listing={listing} />
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-base font-semibold text-brand-dark">Keine passenden Inserate gefunden</p>
                    <p className="mt-1 text-sm text-neutral-500">
                      Versuche eine andere Beschreibung.
                    </p>
                  </div>
                )}

                {/* More results link */}
                {aiResult.total > 20 && (
                  <div className="mt-6 text-center">
                    <Link
                      href={`/suche${aiResult.filter.kategorie ? `?kategorie=${aiResult.filter.kategorie}` : ""}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-600 hover:text-purple-800 hover:underline"
                    >
                      Alle {aiResult.total} Ergebnisse anzeigen
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                )}

                <p className="mt-6 text-center text-[10px] text-neutral-400">
                  KI-generierte Empfehlungen — keine Rechtsberatung.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
