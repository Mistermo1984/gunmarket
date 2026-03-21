"use client";

import { useState } from "react";

interface BannerItem {
  name: string;
  meta: string;
  url: string;
}

interface BannerTab {
  key: string;
  label: string;
  items: BannerItem[];
}

const TABS: BannerTab[] = [
  {
    key: "ev",
    label: "Events",
    items: [
      { name: "Waffenbörse Bernexpo", meta: "Börse · 15.–16. März · Bern", url: "#" },
      { name: "Ordonnanz-Schiessen BEJV", meta: "Schiessen · 22. März · Thun", url: "#" },
      { name: "Kantonales Pistolenschiessen ZH", meta: "Meisterschaft · 5. April · Zürich", url: "#" },
    ],
  },
  {
    key: "sh",
    label: "Händler",
    items: [
      { name: "Ingold Waffen", meta: "Partnerhändler · Schaffhausen", url: "#" },
      { name: "Aebi Waffen", meta: "Partnerhändler · Luzern", url: "#" },
      { name: "Swiss Guns", meta: "Partnerhändler · Bern", url: "#" },
    ],
  },
  {
    key: "pr",
    label: "Aktionen",
    items: [
      { name: "Frühjahrsputz bei Ingold", meta: "10% auf Reinigungssets bis 31. März", url: "#" },
      { name: "7.5×55 Swiss ab CHF 0.65", meta: "Munitions-Abverkauf · Solange Vorrat", url: "#" },
      { name: "Inserat aufgeben — kostenlos", meta: "gunmarket.ch · Jetzt starten", url: "/dashboard/inserat-erstellen" },
    ],
  },
];

export default function BannerZone() {
  const [activeKey, setActiveKey] = useState("ev");
  const active = TABS.find((t) => t.key === activeKey) ?? TABS[0];

  return (
    <div className="hidden md:flex items-center h-[42px] px-6 bg-white border-b border-neutral-200 overflow-hidden">
      {/* Label */}
      <span className="shrink-0 pr-4 mr-4 border-r border-neutral-200 text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
        {active.label}
      </span>

      {/* Chips */}
      <div className="flex items-center gap-1.5 flex-1 overflow-hidden">
        {active.items.map((item, i) => (
          <div key={item.name} className="contents">
            {i > 0 && <div className="w-px h-4 bg-neutral-200 shrink-0 mx-0.5" />}
            <a
              href={item.url}
              className="flex items-center gap-2 px-3 py-1 border border-neutral-200 rounded-md shrink-0 bg-white hover:border-[#4d8230] transition-colors no-underline"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#4d8230] shrink-0" />
              <div>
                <div className="text-xs font-medium text-neutral-900">{item.name}</div>
                <div className="text-[10px] text-neutral-500">{item.meta}</div>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Tab switcher */}
      <div className="flex items-center shrink-0 pl-4 ml-auto border-l border-neutral-200 h-[42px]">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveKey(tab.key)}
            className={`text-xs px-2.5 h-[42px] bg-transparent border-0 border-b-2 cursor-pointer whitespace-nowrap transition-all ${
              tab.key === activeKey
                ? "text-[#4d8230] border-b-[#4d8230] font-medium"
                : "text-neutral-500 border-b-transparent hover:text-neutral-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
