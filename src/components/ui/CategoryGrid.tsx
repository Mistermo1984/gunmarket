"use client";

import React from "react";
import { HAUPTKATEGORIEN } from "@/lib/constants";

const CATEGORY_COLORS: Record<string, string> = {
  kurzwaffen: "#dc2626",
  langwaffen: "#2563eb",
  ordonnanzwaffen: "#4b5563",
  luftdruckwaffen: "#0891b2",
  optik: "#ea580c",
  zubehoer: "#7c3aed",
  munition: "#991b1b",
};

interface CategoryGridProps {
  onSelect?: (hauptkategorieId: string) => void;
  inserateCounts?: Record<string, number>;
}

export default function CategoryGrid({ onSelect, inserateCounts }: CategoryGridProps) {
  return (
    <div className="snap-x snap-mandatory overflow-x-auto scrollbar-hide md:overflow-visible">
      <div className="flex gap-6 px-2 py-2 md:flex-wrap md:justify-center">
        {HAUPTKATEGORIEN.map((hk) => {
          const IconComp = hk.iconComponent;
          const count = inserateCounts?.[hk.id] ?? 0;
          const color = CATEGORY_COLORS[hk.id] || "#6b7280";
          return (
            <button
              key={hk.id}
              onClick={() => onSelect?.(hk.id)}
              className="group flex shrink-0 snap-start flex-col items-center gap-2 transition-transform duration-200 hover:scale-110"
            >
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full shadow-sm transition-shadow duration-200 group-hover:shadow-lg"
                style={{ backgroundColor: color }}
              >
                <IconComp size={32} className="text-white" />
              </div>
              <span className="text-xs font-medium text-neutral-500 group-hover:text-brand-dark">
                {hk.label}
              </span>
              {count > 0 && (
                <span className="text-[10px] text-neutral-400">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
