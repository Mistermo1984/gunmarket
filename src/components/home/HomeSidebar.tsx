"use client";

import React from "react";
import Link from "next/link";
import { HAUPTKATEGORIEN } from "@/lib/constants";
import { useLocale } from "@/lib/locale-context";
import { BookOpen, Target, ChevronRight, Shield } from "lucide-react";

const CATEGORY_COLORS: Record<string, string> = {
  kurzwaffen: "#dc2626",
  langwaffen: "#2563eb",
  ordonnanzwaffen: "#4b5563",
  luftdruckwaffen: "#0891b2",
  optik: "#ea580c",
  zubehoer: "#7c3aed",
  munition: "#991b1b",
};

interface HomeSidebarProps {
  inserateCounts?: Record<string, number>;
}

export default function HomeSidebar({ inserateCounts }: HomeSidebarProps) {
  const { t } = useLocale();
  return (
    <aside className="hidden w-[240px] shrink-0 lg:block">
      <div className="sticky top-[60px] space-y-4">
        {/* Kategorien */}
        <div className="rounded-xl border border-brand-border bg-white">
          <div className="border-b border-brand-border px-4 py-3">
            <h3 className="text-sm font-semibold text-brand-dark">{t("sidebar_categories")}</h3>
          </div>
          <nav className="p-2">
            {HAUPTKATEGORIEN.map((hk) => {
              const IconComp = hk.iconComponent;
              const count = inserateCounts?.[hk.id] ?? 0;
              const color = CATEGORY_COLORS[hk.id] || "#6b7280";
              return (
                <Link
                  key={hk.id}
                  href={`/suche?kategorie=${hk.id}`}
                  className="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-brand-grey"
                >
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                    style={{ backgroundColor: color }}
                  >
                    <IconComp size={14} className="text-white" />
                  </div>
                  <span className="flex-1 font-medium text-neutral-700 group-hover:text-brand-dark">
                    {hk.label}
                  </span>
                  {count > 0 && (
                    <span className="text-[11px] text-neutral-400">{count}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Wissen Quick Links */}
        <div className="rounded-xl border border-brand-border bg-white">
          <div className="border-b border-brand-border px-4 py-3">
            <h3 className="text-sm font-semibold text-brand-dark">{t("nav_wiki")}</h3>
          </div>
          <nav className="p-2">
            <Link
              href="/wissen/waffen"
              className="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-brand-grey"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-green">
                <BookOpen size={14} className="text-white" />
              </div>
              <span className="flex-1 font-medium text-neutral-700 group-hover:text-brand-dark">
                {t("nav_wiki")}
              </span>
              <ChevronRight size={14} className="text-neutral-400 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/wissen/munition"
              className="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-brand-grey"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#2d5a8e]">
                <Target size={14} className="text-white" />
              </div>
              <span className="flex-1 font-medium text-neutral-700 group-hover:text-brand-dark">
                {t("sidebar_caliber_guide")}
              </span>
              <ChevronRight size={14} className="text-neutral-400 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/waffenrecht"
              className="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-brand-grey"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-amber-600">
                <Shield size={14} className="text-white" />
              </div>
              <span className="flex-1 font-medium text-neutral-700 group-hover:text-brand-dark">
                {t("sidebar_gun_law")}
              </span>
              <ChevronRight size={14} className="text-neutral-400 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </nav>
        </div>

        {/* CTA */}
        <Link
          href="/dashboard/inserat-erstellen"
          className="flex items-center justify-center gap-2 rounded-xl bg-brand-green px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
        >
          {t("nav_create_long")}
        </Link>
      </div>
    </aside>
  );
}
