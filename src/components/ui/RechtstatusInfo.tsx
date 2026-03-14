"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { RECHTSSTATUS_FILTER } from "@/lib/constants";

interface RechtstatusInfoProps {
  statusId: string;
  compact?: boolean;
}

export default function RechtstatusInfo({ statusId, compact = false }: RechtstatusInfoProps) {
  const [expanded, setExpanded] = useState(false);
  const status = RECHTSSTATUS_FILTER.find((rs) => rs.id === statusId);

  if (!status) return null;

  if (compact) {
    return (
      <span
        className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${status.farbe} ${status.textfarbe}`}
      >
        {status.kurzlabel}
      </span>
    );
  }

  return (
    <div className="rounded-lg border border-brand-border bg-white">
      {/* Badge + Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-2.5 px-3 py-2.5"
      >
        <span
          className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${status.farbe} ${status.textfarbe}`}
        >
          {status.kurzlabel}
        </span>
        <span className="flex-1 text-left text-sm text-neutral-600">
          {status.label}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-neutral-400 transition-transform duration-150 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expanded: Dokumente */}
      {expanded && (
        <div className="border-t border-brand-border px-3 pb-3 pt-2.5">
          <p className="mb-2 text-xs leading-relaxed text-neutral-500">
            {status.tooltip}
          </p>
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
            Benötigte Dokumente
          </p>
          <ul className="mb-3 space-y-1">
            {status.dokumente.map((dok, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-neutral-600">
                <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                {dok}
              </li>
            ))}
          </ul>
          <Link
            href="/waffenrecht"
            className="text-xs font-medium text-brand-green hover:underline"
          >
            Mehr erfahren &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}
