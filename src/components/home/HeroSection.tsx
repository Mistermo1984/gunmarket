"use client";

import React, { useState, useEffect, useRef } from "react";
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
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (searchKanton) params.set("kanton", searchKanton);
    if (params.toString()) router.push(`/suche?${params.toString()}`);
    else router.push("/suche");
  }

  function handleChipClick(q: string) {
    setQuery(q);
    router.push(`/suche?q=${encodeURIComponent(q)}`);
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
          <form onSubmit={handleSearch} className="mx-auto max-w-[580px] animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center overflow-hidden rounded-xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all focus-within:ring-2 focus-within:ring-[#4ade80]/40">
              <div className="flex flex-1 items-center gap-2 px-4">
                <Search size={18} className="shrink-0 text-neutral-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("hero_placeholder")}
                  className="min-w-0 flex-1 py-3.5 text-sm text-[#1a1a1f] placeholder:text-neutral-400 focus:outline-none"
                />
              </div>
              <div className="hidden h-8 w-px bg-neutral-200 sm:block" />
              <select
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
        <div className="mx-auto flex max-w-md items-center justify-center divide-x divide-white/[0.08] py-4">
          <div className="flex flex-col items-center px-8">
            <span className="font-display text-xl font-black md:text-2xl" style={{ color: "#4ade80" }}>
              <CountUp end={stats.inserate} />
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">{t("stats_listings")}</span>
          </div>
          <div className="flex flex-col items-center px-8">
            <span className="font-display text-xl font-black md:text-2xl" style={{ color: "#4ade80" }}>
              <CountUp end={stats.verkaeufer} />
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">{t("stats_sellers")}</span>
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
