"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Plus } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

const KANTONE_OPTIONS = [
  { id: "", labelKey: "hero_all_cantons" as const },
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

function CountUp({ end }: { end: number }) {
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

  return <span ref={ref}>{count.toLocaleString("de-CH")}</span>;
}

export default function HeroSection() {
  const router = useRouter();
  const { t } = useLocale();
  const [query, setQuery] = useState("");
  const [searchKanton, setSearchKanton] = useState("");
  const [stats, setStats] = useState({ inserate: 0, haendler: 0, kantone: 0 });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const suggestTimer = useRef<ReturnType<typeof setTimeout>>();
  const searchContainerRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((data) => {
        setStats({
          inserate: data.inserate || 0,
          haendler: data.haendler || 0,
          kantone: data.kantone || 0,
        });
      })
      .catch(() => {});
  }, []);

  // Autocomplete suggestions
  useEffect(() => {
    if (query.length < 2) { setSuggestions([]); return; }
    clearTimeout(suggestTimer.current);
    suggestTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search/suggestions?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions((data.suggestions || []).slice(0, 6));
          setShowSuggestions(true);
          setActiveIdx(-1);
        }
      } catch { /* ignore */ }
    }, 200);
    return () => clearTimeout(suggestTimer.current);
  }, [query]);

  // Close suggestions on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const doSearch = useCallback((term: string) => {
    const params = new URLSearchParams();
    if (term.trim()) params.set("suche", term.trim());
    if (searchKanton) params.set("kanton", searchKanton);
    if (params.toString()) router.push(`/?${params.toString()}`);
    else router.push("/");
    setShowSuggestions(false);
  }, [router, searchKanton]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    doSearch(query);
  }

  function handleSuggestionSelect(s: string) {
    setQuery(s);
    doSearch(s);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && activeIdx >= 0) {
      e.preventDefault();
      handleSuggestionSelect(suggestions[activeIdx]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  }

  function handleChipClick(q: string) {
    setQuery(q);
    router.push(`/?suche=${encodeURIComponent(q)}`);
  }

  return (
    <section className="relative overflow-hidden rounded-b-xl" style={{ minHeight: 320 }}>
      {/* Background image + gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(10,26,10,0.6) 0%, rgba(10,26,10,0.95) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-0 pt-10 md:pt-14">
        <div className="mx-auto max-w-2xl text-center">

          {/* 1. Badge */}
          <div className="mb-5 flex justify-center animate-fade-in">
            <span
              className="inline-block rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em]"
              style={{
                background: "rgba(74,222,128,0.12)",
                border: "0.5px solid rgba(74,222,128,0.3)",
                color: "#4ade80",
              }}
            >
              {t("hero_badge")}
            </span>
          </div>

          {/* 2. Headline */}
          <h1 className="mb-6 animate-fade-in" style={{ animationDelay: "0.05s" }}>
            <span className="block text-[28px] font-bold leading-tight text-white md:text-[32px]">
              {t("hero_title")}
            </span>
            <span className="block text-[28px] font-bold leading-tight md:text-[32px]" style={{ color: "#4ade80" }}>
              {t("hero_subtitle")}
            </span>
          </h1>

          {/* 3. Search Bar */}
          <form ref={searchContainerRef} action="/" method="get" onSubmit={handleSearch} className="relative mx-auto max-w-[580px] animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center overflow-hidden rounded-xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all focus-within:ring-2 focus-within:ring-[#4ade80]/40">
              <div className="flex flex-1 items-center gap-2 px-4">
                <Search size={18} className="shrink-0 text-neutral-400" />
                <input
                  type="text"
                  name="suche"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                  placeholder={t("hero_placeholder")}
                  className="min-w-0 flex-1 py-3.5 text-sm text-[#1a1a1f] placeholder:text-neutral-400 focus:outline-none"
                  autoComplete="off"
                />
              </div>
              <div className="hidden h-8 w-px bg-neutral-200 sm:block" />
              <select
                name="kanton"
                value={searchKanton}
                onChange={(e) => setSearchKanton(e.target.value)}
                className="hidden w-[130px] shrink-0 border-none bg-transparent px-3 py-3.5 text-sm text-neutral-600 focus:outline-none sm:block"
              >
                {KANTONE_OPTIONS.map((k) => (
                  <option key={k.id} value={k.id}>
                    {"labelKey" in k ? t(k.labelKey as "hero_all_cantons") : k.label}
                  </option>
                ))}
              </select>
              <div className="m-1.5 shrink-0">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:brightness-110"
                  style={{ backgroundColor: "#16a34a" }}
                >
                  <Search size={15} />
                  <span className="hidden sm:inline">{t("hero_search")}</span>
                </button>
              </div>
            </div>

            {/* Autocomplete suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg">
                {suggestions.map((s, i) => (
                  <li key={s}>
                    <button
                      type="button"
                      onMouseDown={() => handleSuggestionSelect(s)}
                      className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-neutral-700 transition-colors hover:bg-neutral-50 ${i === activeIdx ? "bg-neutral-100" : ""}`}
                    >
                      <Search size={14} className="shrink-0 text-neutral-400" />
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </form>

          {/* 4. Quick Search Tags */}
          <div className="mt-4 flex flex-wrap justify-center gap-2 animate-fade-in" style={{ animationDelay: "0.15s" }}>
            {QUICK_CHIPS.map((chip) => (
              <button
                key={chip.q}
                onClick={() => handleChipClick(chip.q)}
                className="rounded-full border px-3 py-1 text-xs font-medium text-white/80 transition-all hover:border-[#4ade80]/60 hover:bg-[#4ade80]/10 hover:text-white"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  borderColor: "rgba(255,255,255,0.12)",
                }}
              >
                {chip.label}
              </button>
            ))}
            <Link
              href="/dashboard/inserat-erstellen"
              className="flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-all hover:brightness-125"
              style={{
                background: "rgba(74,222,128,0.12)",
                borderColor: "rgba(74,222,128,0.3)",
                color: "#4ade80",
              }}
            >
              <Plus size={12} />
              {t("hero_create")}
            </Link>
          </div>
        </div>
      </div>

      {/* 5. Stats Bar */}
      <div className="relative mt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="mx-auto flex max-w-xs items-center justify-center divide-x divide-white/[0.08] py-4">
          <div className="flex flex-col items-center px-8">
            <span className="font-display text-xl font-black md:text-2xl" style={{ color: "#4ade80" }}>
              <CountUp end={stats.haendler} />
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">{t("stats_dealers")}</span>
          </div>
          <div className="flex flex-col items-center px-8">
            <span className="font-display text-xl font-black md:text-2xl" style={{ color: "#4ade80" }}>
              <CountUp end={stats.kantone} />
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">{t("stats_cantons")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
