"use client";

import React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { LogoIcon } from "@/components/ui/Logo";

export default function KartenVorschau() {
  return (
    <div className="mb-10 rounded-2xl border border-brand-border bg-brand-grey p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        {/* Left: Text */}
        <div className="flex-1">
          <span className="mb-2 inline-flex rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
            NEU
          </span>
          <h2 className="mb-2 font-display text-lg font-black uppercase tracking-tight text-brand-dark md:text-xl">
            Inserate in deiner Nähe
          </h2>
          <p className="mb-4 max-w-sm text-sm leading-relaxed text-neutral-600">
            Suche mit Umkreisfilter — gib eine Stadt oder PLZ ein und entdecke Inserate in deiner Region.
          </p>
          <div className="mb-3 flex max-w-sm gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-brand-border bg-white px-3 py-2">
              <MapPin size={14} className="shrink-0 text-neutral-400" />
              <input
                type="text"
                placeholder="Stadt oder PLZ..."
                className="flex-1 bg-transparent text-sm text-brand-dark placeholder:text-neutral-400 focus:outline-none"
              />
            </div>
            <select className="rounded-lg border border-brand-border bg-white px-2 py-2 text-xs text-neutral-600 focus:outline-none">
              <option>25 km</option>
              <option>10 km</option>
              <option>50 km</option>
              <option>100 km</option>
            </select>
          </div>
          <Link
            href="/?map=true"
            className="inline-flex items-center rounded-lg bg-brand-green px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-green-dark"
          >
            Auf Karte suchen
          </Link>
        </div>

        {/* Right: Map placeholder */}
        <div className="w-full lg:w-[280px]">
          <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-brand-border bg-gray-200">
            <LogoIcon size={48} />
            <div className="absolute left-[30%] top-[35%] h-2.5 w-2.5 rounded-full border-2 border-white bg-brand-green shadow" />
            <div className="absolute left-[55%] top-[28%] h-2.5 w-2.5 rounded-full border-2 border-white bg-brand-green shadow" />
            <div className="absolute left-[45%] top-[55%] h-2.5 w-2.5 rounded-full border-2 border-white bg-brand-green shadow" />
            <div className="absolute left-[65%] top-[45%] h-2 w-2 rounded-full border-2 border-white bg-brand-amber shadow" />
          </div>
        </div>
      </div>
    </div>
  );
}
