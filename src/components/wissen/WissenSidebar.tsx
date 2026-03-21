"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Target,
  Shield,
  ChevronRight,
} from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import {
  KurzwaffenIcon,
  BuechsenIcon,
  FlintenGruppeIcon,
  OrdonnanzIcon,
  FreieWaffenIcon,
  JagdwaffenIcon,
  RevolverIcon,
  RepetierIcon,
  LuftwaffeIcon,
  PistolenmunitionIcon,
  BuechsenmunitionIcon,
  RandfeuermunitionIcon,
} from "@/components/ui/WeaponIcons";

const WAFFEN_KATEGORIEN = [
  { id: "Ordonnanzwaffe", label: "Ordonnanzwaffen", icon: OrdonnanzIcon, color: "#4b5563" },
  { id: "Pistole", label: "Pistolen", icon: KurzwaffenIcon, color: "#dc2626" },
  { id: "Revolver", label: "Revolver", icon: RevolverIcon, color: "#7c3aed" },
  { id: "Büchse", label: "Büchsen", icon: BuechsenIcon, color: "#2563eb" },
  { id: "Flinte", label: "Flinten", icon: FlintenGruppeIcon, color: "#16a34a" },
  { id: "Jagdwaffe", label: "Jagdwaffen", icon: JagdwaffenIcon, color: "#92400e" },
  { id: "Historische Waffe", label: "Historische Waffen", icon: RepetierIcon, color: "#78350f" },
  { id: "Luftgewehr", label: "Luftgewehre", icon: LuftwaffeIcon, color: "#0891b2" },
  { id: "Freie Waffe", label: "Freie Waffen", icon: FreieWaffenIcon, color: "#0d9488" },
];

const MUNITION_TYPEN = [
  { id: "Pistole", label: "Pistolenmunition", icon: PistolenmunitionIcon, color: "#dc2626" },
  { id: "Revolver", label: "Revolvermunition", icon: RevolverIcon, color: "#7c3aed" },
  { id: "Büchse", label: "Büchsenmunition", icon: BuechsenmunitionIcon, color: "#2563eb" },
  { id: "Kleinkaliber", label: "Kleinkaliber", icon: RandfeuermunitionIcon, color: "#16a34a" },
];

interface WissenSidebarProps {
  waffenCounts?: Record<string, number>;
  munitionCounts?: Record<string, number>;
  activeKategorie?: string;
  onKategorieChange?: (kategorie: string) => void;
  activeMunTyp?: string;
  onMunTypChange?: (typ: string) => void;
}

export default function WissenSidebar({
  waffenCounts,
  munitionCounts,
  activeKategorie,
  onKategorieChange,
  activeMunTyp,
  onMunTypChange,
}: WissenSidebarProps) {
  const { t } = useLocale();
  const pathname = usePathname();
  const isWaffen = pathname.startsWith("/wissen/waffen");
  const isMunition = pathname.startsWith("/wissen/munition");

  return (
    <aside className="hidden w-[240px] shrink-0 lg:block">
      <div className="sticky top-[60px] space-y-4">
        {/* Wissen Navigation */}
        <div className="rounded-xl border border-brand-border bg-white">
          <div className="border-b border-brand-border px-4 py-3">
            <h3 className="text-sm font-semibold text-brand-dark">Waffen-Wiki</h3>
          </div>
          <nav className="p-2">
            <Link
              href="/wissen/waffen"
              className={`group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                isWaffen ? "bg-brand-green-light" : "hover:bg-brand-grey"
              }`}
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-green">
                <BookOpen size={14} className="text-white" />
              </div>
              <span className={`flex-1 font-medium ${isWaffen ? "text-brand-green" : "text-neutral-700 group-hover:text-brand-dark"}`}>
                Waffen-Wiki
              </span>
              <ChevronRight size={14} className="text-neutral-400" />
            </Link>
            <Link
              href="/wissen/munition"
              className={`group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                isMunition ? "bg-blue-50" : "hover:bg-brand-grey"
              }`}
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#2d5a8e]">
                <Target size={14} className="text-white" />
              </div>
              <span className={`flex-1 font-medium ${isMunition ? "text-[#2d5a8e]" : "text-neutral-700 group-hover:text-brand-dark"}`}>
                Kaliber-Guide
              </span>
              <ChevronRight size={14} className="text-neutral-400" />
            </Link>
            <Link
              href="/waffenrecht"
              className="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-brand-grey"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-amber-600">
                <Shield size={14} className="text-white" />
              </div>
              <span className="flex-1 font-medium text-neutral-700 group-hover:text-brand-dark">
                Waffenrecht CH
              </span>
              <ChevronRight size={14} className="text-neutral-400" />
            </Link>
          </nav>
        </div>

        {/* Waffen Kategorien */}
        {(isWaffen || (!isWaffen && !isMunition)) && (
          <div className="rounded-xl border border-brand-border bg-white">
            <div className="border-b border-brand-border px-4 py-3">
              <h3 className="text-sm font-semibold text-brand-dark">{t("wiki_weapon_categories")}</h3>
            </div>
            <nav className="p-2">
              {onKategorieChange && (
                <button
                  onClick={() => onKategorieChange("")}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    !activeKategorie ? "bg-brand-green-light font-medium text-brand-green" : "text-neutral-700 hover:bg-brand-grey"
                  }`}
                >
                  Alle Waffen
                  {waffenCounts && (
                    <span className="ml-auto text-[11px] text-neutral-400">
                      {Object.values(waffenCounts).reduce((a, b) => a + b, 0)}
                    </span>
                  )}
                </button>
              )}
              {WAFFEN_KATEGORIEN.map((kat) => {
                const IconComp = kat.icon;
                const count = waffenCounts?.[kat.id] ?? 0;
                const isActive = activeKategorie === kat.id;
                return onKategorieChange ? (
                  <button
                    key={kat.id}
                    onClick={() => onKategorieChange(kat.id)}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      isActive ? "bg-brand-green-light" : "hover:bg-brand-grey"
                    }`}
                  >
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                      style={{ backgroundColor: kat.color }}
                    >
                      <IconComp size={14} className="text-white" />
                    </div>
                    <span className={`flex-1 font-medium ${isActive ? "text-brand-green" : "text-neutral-700"}`}>
                      {kat.label}
                    </span>
                    {count > 0 && (
                      <span className="text-[11px] text-neutral-400">{count}</span>
                    )}
                  </button>
                ) : (
                  <Link
                    key={kat.id}
                    href={`/wissen/waffen?kategorie=${encodeURIComponent(kat.id)}`}
                    className="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-brand-grey"
                  >
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                      style={{ backgroundColor: kat.color }}
                    >
                      <IconComp size={14} className="text-white" />
                    </div>
                    <span className="flex-1 font-medium text-neutral-700 group-hover:text-brand-dark">
                      {kat.label}
                    </span>
                    {count > 0 && (
                      <span className="text-[11px] text-neutral-400">{count}</span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}

        {/* Munition Typen */}
        {(isMunition || (!isWaffen && !isMunition)) && (
          <div className="rounded-xl border border-brand-border bg-white">
            <div className="border-b border-brand-border px-4 py-3">
              <h3 className="text-sm font-semibold text-brand-dark">{t("wiki_ammo_types")}</h3>
            </div>
            <nav className="p-2">
              {onMunTypChange && (
                <button
                  onClick={() => onMunTypChange("")}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    !activeMunTyp ? "bg-blue-50 font-medium text-[#2d5a8e]" : "text-neutral-700 hover:bg-brand-grey"
                  }`}
                >
                  Alle Kaliber
                  {munitionCounts && (
                    <span className="ml-auto text-[11px] text-neutral-400">
                      {Object.values(munitionCounts).reduce((a, b) => a + b, 0)}
                    </span>
                  )}
                </button>
              )}
              {MUNITION_TYPEN.map((typ) => {
                const IconComp = typ.icon;
                const count = munitionCounts?.[typ.id] ?? 0;
                const isActive = activeMunTyp === typ.id;
                return onMunTypChange ? (
                  <button
                    key={typ.id}
                    onClick={() => onMunTypChange(typ.id)}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      isActive ? "bg-blue-50" : "hover:bg-brand-grey"
                    }`}
                  >
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                      style={{ backgroundColor: typ.color }}
                    >
                      <IconComp size={14} className="text-white" />
                    </div>
                    <span className={`flex-1 font-medium ${isActive ? "text-[#2d5a8e]" : "text-neutral-700"}`}>
                      {typ.label}
                    </span>
                    {count > 0 && (
                      <span className="text-[11px] text-neutral-400">{count}</span>
                    )}
                  </button>
                ) : (
                  <Link
                    key={typ.id}
                    href={`/wissen/munition?typ=${encodeURIComponent(typ.id)}`}
                    className="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-brand-grey"
                  >
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                      style={{ backgroundColor: typ.color }}
                    >
                      <IconComp size={14} className="text-white" />
                    </div>
                    <span className="flex-1 font-medium text-neutral-700 group-hover:text-brand-dark">
                      {typ.label}
                    </span>
                    {count > 0 && (
                      <span className="text-[11px] text-neutral-400">{count}</span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </aside>
  );
}
