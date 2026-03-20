"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Search } from "lucide-react";
import { CALIBER_GROUPS } from "@/lib/calibers";

interface CaliberSelectProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  error?: string;
}

export default function CaliberSelect({
  value,
  onChange,
  required,
  placeholder = "Kaliber wählen...",
  error,
}: CaliberSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Focus search on open
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
  }, [open]);

  const lowerSearch = search.toLowerCase();

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between rounded-lg border px-4 py-2.5 text-sm transition-colors ${
          error
            ? "border-red-300 focus:border-red-500"
            : open
              ? "border-brand-green bg-white"
              : "border-brand-border bg-white hover:border-neutral-300"
        } focus:outline-none focus:ring-2 focus:ring-brand-green/20`}
      >
        {value ? (
          <span className="flex items-center gap-2 text-brand-dark font-medium">
            {value}
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") { e.stopPropagation(); onChange(""); }
              }}
              className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral-200 text-neutral-500 hover:bg-red-100 hover:text-red-500"
            >
              <X size={10} />
            </span>
          </span>
        ) : (
          <span className="text-neutral-400">
            {placeholder}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </span>
        )}
        <ChevronDown
          size={14}
          className={`shrink-0 text-neutral-400 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute left-0 top-full z-30 mt-1 w-full rounded-lg border border-neutral-200 bg-white shadow-lg">
          {/* Search */}
          <div className="sticky top-0 z-10 border-b border-neutral-100 bg-white px-3 py-2">
            <div className="flex items-center gap-2 rounded-md bg-neutral-50 px-2.5 py-1.5">
              <Search size={13} className="shrink-0 text-neutral-400" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Kaliber suchen..."
                className="flex-1 bg-transparent text-xs text-brand-dark placeholder:text-neutral-400 focus:outline-none"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-neutral-400 hover:text-neutral-600"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Grouped caliber list */}
          <div className="max-h-[400px] overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
            {CALIBER_GROUPS.map((group) => {
              const filtered = group.kaliber.filter((k) =>
                k.toLowerCase().includes(lowerSearch)
              );
              if (filtered.length === 0) return null;
              return (
                <div key={group.gruppe}>
                  <div className="sticky top-0 bg-neutral-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    {group.gruppe}
                  </div>
                  {filtered.map((k) => {
                    const selected = k === value;
                    return (
                      <button
                        key={k}
                        type="button"
                        onClick={() => {
                          onChange(k);
                          setOpen(false);
                          setSearch("");
                        }}
                        className={`flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-xs transition-colors ${
                          selected
                            ? "bg-brand-green-light text-brand-green font-medium"
                            : "text-neutral-600 hover:bg-neutral-50"
                        }`}
                      >
                        {/* Checkmark */}
                        <div
                          className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded transition-colors ${
                            selected ? "bg-brand-green" : "border border-neutral-300"
                          }`}
                        >
                          {selected && (
                            <svg width={8} height={8} viewBox="0 0 10 10" fill="none">
                              <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        {k}
                      </button>
                    );
                  })}
                </div>
              );
            })}
            {/* No results */}
            {CALIBER_GROUPS.every((g) =>
              g.kaliber.every((k) => !k.toLowerCase().includes(lowerSearch))
            ) && (
              <div className="px-3 py-6 text-center text-xs text-neutral-400">
                Kein Kaliber gefunden
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error */}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
