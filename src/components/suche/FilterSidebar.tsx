"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  ChevronDown,
  X,
  Info,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import {
  HAUPTKATEGORIEN,
  RECHTSSTATUS_FILTER,
  KALIBER_GRUPPEN,
  ZUSTAND_OPTIONEN,
  KANTONE,
  ANBIETER_TYP,
} from "@/lib/constants";

// ─── Types ───────────────────────────────────────────────────

export interface FilterState {
  anbieter: string;
  kategorien: string[];
  unterkategorien: string[];
  rechtsstatus: string[];
  kaliber: string[];
  zustand: string[];
  preisMin: string;
  preisMax: string;
  kantone: string[];
  marke: string;
  mitFotos: boolean;
  neuEingestellt: boolean;
  preisreduziert: boolean;
}

export const INITIAL_FILTERS: FilterState = {
  anbieter: "alle",
  kategorien: [],
  unterkategorien: [],
  rechtsstatus: [],
  kaliber: [],
  zustand: [],
  preisMin: "",
  preisMax: "",
  kantone: [],
  marke: "",
  mitFotos: false,
  neuEingestellt: false,
  preisreduziert: false,
};

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClose?: () => void;
  resultCount: number;
  isMobile?: boolean;
}

// ─── Collapsible Section with smooth animation ───────────────

function FilterSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>(defaultOpen ? "1000px" : "0px");

  useEffect(() => {
    if (open) {
      setMaxHeight(`${contentRef.current?.scrollHeight ?? 1000}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [open]);

  return (
    <div className="border-b border-brand-border py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-sm font-semibold text-brand-dark">{title}</span>
        <ChevronDown
          size={16}
          className={`text-neutral-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-200 ease-out"
        style={{ maxHeight }}
      >
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}

// ─── Quick pills ─────────────────────────────────────────────

const MARKE_PILLS = [
  "SIG Sauer", "Glock", "Beretta", "Walther",
  "CZ", "Browning", "Steyr", "H&K", "Ruger", "S&W",
];

const PREIS_PILLS = [
  { label: "< 500", min: "0", max: "500" },
  { label: "500–1500", min: "500", max: "1500" },
  { label: "1500–3000", min: "1500", max: "3000" },
  { label: "3000+", min: "3000", max: "10000" },
];

// ─── Custom Preis Slider ─────────────────────────────────────

function PreisSlider({ min, max, onMinChange, onMaxChange }: {
  min: string; max: string;
  onMinChange: (v: string) => void;
  onMaxChange: (v: string) => void;
}) {
  const minVal = parseInt(min) || 0;
  const maxVal = parseInt(max) || 10000;
  const rangeMin = 0;
  const rangeMax = 10000;

  return (
    <div className="mb-3">
      <div className="relative mb-4 h-2 rounded-full bg-gray-200">
        <div
          className="absolute h-2 rounded-full bg-brand-green"
          style={{
            left: `${(minVal / rangeMax) * 100}%`,
            right: `${100 - (maxVal / rangeMax) * 100}%`,
          }}
        />
        <input
          type="range"
          min={rangeMin}
          max={rangeMax}
          step={50}
          value={minVal}
          onChange={(e) => onMinChange(e.target.value === "0" ? "" : e.target.value)}
          className="pointer-events-none absolute inset-0 h-2 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-green [&::-webkit-slider-thumb]:shadow-md"
        />
        <input
          type="range"
          min={rangeMin}
          max={rangeMax}
          step={50}
          value={maxVal}
          onChange={(e) => onMaxChange(e.target.value === "10000" ? "" : e.target.value)}
          className="pointer-events-none absolute inset-0 h-2 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-green [&::-webkit-slider-thumb]:shadow-md"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={min}
          onChange={(e) => onMinChange(e.target.value)}
          placeholder="Min"
          className="w-full rounded-lg border border-brand-border bg-brand-grey px-3 py-2 text-xs text-brand-dark placeholder:text-neutral-400 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20"
        />
        <span className="text-xs text-neutral-400">–</span>
        <input
          type="number"
          value={max}
          onChange={(e) => onMaxChange(e.target.value)}
          placeholder="Max"
          className="w-full rounded-lg border border-brand-border bg-brand-grey px-3 py-2 text-xs text-brand-dark placeholder:text-neutral-400 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20"
        />
      </div>
    </div>
  );
}

// ─── Custom Checkbox ─────────────────────────────────────────

function GreenCheckbox({ checked, onChange, label, small = false }: {
  checked: boolean; onChange: () => void; label: string; small?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <div
        onClick={onChange}
        className={`flex items-center justify-center rounded transition-colors ${
          small ? "h-3.5 w-3.5" : "h-4 w-4"
        } ${checked ? "bg-brand-green" : "border border-neutral-300 bg-white"}`}
      >
        {checked && (
          <svg width={small ? 8 : 10} height={small ? 8 : 10} viewBox="0 0 10 10" fill="none">
            <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <span className={`${small ? "text-xs text-neutral-600" : "text-sm text-neutral-700"}`}>{label}</span>
    </label>
  );
}

// ─── Rechtsinfo Tooltip (click-based, always readable) ──────

function RechtsinfoTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative ml-auto">
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(!open); }}
        className="flex h-5 w-5 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
      >
        <Info size={13} className={`transition-colors ${open ? "text-brand-green" : "text-neutral-400 hover:text-neutral-600"}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-[60] mt-1.5 w-64 rounded-lg border border-neutral-200 bg-white p-3.5 text-xs leading-relaxed text-neutral-700 shadow-lg">
          <div className="absolute -top-1.5 right-2 h-3 w-3 rotate-45 border-l border-t border-neutral-200 bg-white" />
          {text}
        </div>
      )}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────

export default function FilterSidebar({
  filters,
  onChange,
  onClose,
  resultCount,
  isMobile = false,
}: FilterSidebarProps) {
  const [kaliberSuche, setKaliberSuche] = useState("");
  const [kantonSuche, setKantonSuche] = useState("");
  const [kantonDropdownOpen, setKantonDropdownOpen] = useState(false);

  // Count active filters
  const activeCount = useMemo(() => {
    let c = 0;
    if (filters.anbieter !== "alle") c++;
    c += filters.kategorien.length;
    c += filters.unterkategorien.length;
    c += filters.rechtsstatus.length;
    c += filters.kaliber.length;
    c += filters.zustand.length;
    if (filters.preisMin || filters.preisMax) c++;
    c += filters.kantone.length;
    if (filters.marke) c++;
    if (filters.mitFotos) c++;
    if (filters.neuEingestellt) c++;
    if (filters.preisreduziert) c++;
    return c;
  }, [filters]);

  function update(partial: Partial<FilterState>) {
    onChange({ ...filters, ...partial });
  }

  function toggleArray(key: keyof FilterState, value: string) {
    const arr = filters[key] as string[];
    const next = arr.includes(value)
      ? arr.filter((v) => v !== value)
      : [...arr, value];
    update({ [key]: next });
  }

  function removeChip(key: keyof FilterState, value: string) {
    const arr = filters[key] as string[];
    update({ [key]: arr.filter((v) => v !== value) });
  }

  // Active filter chips
  const chips: { key: keyof FilterState; value: string; label: string }[] = [];
  if (filters.anbieter !== "alle") {
    const t = ANBIETER_TYP.find((a) => a.id === filters.anbieter);
    chips.push({ key: "anbieter", value: filters.anbieter, label: `Nur ${t?.label ?? filters.anbieter}` });
  }
  filters.kategorien.forEach((k) => {
    const hk = HAUPTKATEGORIEN.find((h) => h.id === k);
    chips.push({ key: "kategorien", value: k, label: hk?.label ?? k });
  });
  filters.rechtsstatus.forEach((r) => {
    const rs = RECHTSSTATUS_FILTER.find((s) => s.id === r);
    chips.push({ key: "rechtsstatus", value: r, label: rs?.kurzlabel ?? r });
  });
  filters.zustand.forEach((z) => {
    chips.push({ key: "zustand", value: z, label: z });
  });
  filters.kaliber.forEach((k) => {
    chips.push({ key: "kaliber", value: k, label: k });
  });
  filters.kantone.forEach((k) => {
    const kt = KANTONE.find((kn) => kn.id === k);
    chips.push({ key: "kantone", value: k, label: `Kanton: ${kt?.label ?? k}` });
  });
  if (filters.preisMin || filters.preisMax) {
    chips.push({
      key: "preisMin",
      value: "",
      label: `Preis: CHF ${filters.preisMin || "0"} – ${filters.preisMax || "∞"}`,
    });
  }
  if (filters.marke) {
    chips.push({ key: "marke", value: filters.marke, label: filters.marke });
  }

  const filteredKantone = KANTONE.filter((k) =>
    k.label.toLowerCase().includes(kantonSuche.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-brand-border px-4 py-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-brand-green" />
          <span className="text-base font-semibold text-brand-dark">Filter</span>
          {activeCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-green text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {activeCount > 0 && (
            <button
              onClick={() => onChange(INITIAL_FILTERS)}
              className="text-xs font-medium text-brand-green hover:underline"
            >
              Alle Filter löschen
            </button>
          )}
          {isMobile && onClose && (
            <button onClick={onClose} className="text-neutral-500 hover:text-brand-dark">
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4">
        {/* Active chips */}
        {chips.length > 0 && (
          <div className="flex flex-wrap gap-1.5 border-b border-brand-border py-3">
            {chips.map((chip, i) => (
              <span
                key={`${chip.key}-${chip.value}-${i}`}
                className="inline-flex items-center gap-1 rounded-full bg-brand-green-light px-2.5 py-1 text-xs font-medium text-brand-green animate-chip-in"
              >
                {chip.label}
                <button
                  onClick={() => {
                    if (chip.key === "anbieter") update({ anbieter: "alle" });
                    else if (chip.key === "marke") update({ marke: "" });
                    else if (chip.key === "preisMin") update({ preisMin: "", preisMax: "" });
                    else removeChip(chip.key, chip.value);
                  }}
                  className="ml-0.5 hover:text-brand-green-dark"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* A) Anbieter */}
        <FilterSection title="Anbieter">
          <div className="space-y-2">
            {[{ id: "alle", label: "Alle" }, ...ANBIETER_TYP].map((a) => (
              <label key={a.id} className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="anbieter"
                  checked={filters.anbieter === a.id}
                  onChange={() => update({ anbieter: a.id })}
                  className="h-4 w-4 accent-brand-green"
                />
                <span className="text-sm text-neutral-700">{a.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* B) Kategorie */}
        <FilterSection title="Kategorie">
          <div className="space-y-1.5">
            {HAUPTKATEGORIEN.map((hk) => {
              const checked = filters.kategorien.includes(hk.id);
              return (
                <div key={hk.id}>
                  <GreenCheckbox
                    checked={checked}
                    onChange={() => toggleArray("kategorien", hk.id)}
                    label={hk.label}
                  />
                  {checked && (
                    <div className="ml-6 mt-1 space-y-1">
                      {hk.unterkategorien.map((uk) => (
                        <GreenCheckbox
                          key={uk.id}
                          checked={filters.unterkategorien.includes(uk.id)}
                          onChange={() => toggleArray("unterkategorien", uk.id)}
                          label={uk.label}
                          small
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </FilterSection>

        {/* C) Rechtsstatus */}
        <FilterSection title="Rechtsstatus">
          <div className="space-y-2">
            {RECHTSSTATUS_FILTER.map((rs) => (
              <div key={rs.id} className="flex cursor-pointer items-center gap-2">
                <GreenCheckbox
                  checked={filters.rechtsstatus.includes(rs.id)}
                  onChange={() => toggleArray("rechtsstatus", rs.id)}
                  label=""
                />
                <span
                  className={`text-sm font-medium ${rs.textfarbe}`}
                  onClick={() => toggleArray("rechtsstatus", rs.id)}
                >
                  {rs.kurzlabel}
                </span>
                <RechtsinfoTooltip text={rs.tooltip} />
              </div>
            ))}
          </div>
        </FilterSection>

        {/* D) Kaliber */}
        <FilterSection title="Kaliber" defaultOpen={false}>
          <div className="mb-3 flex items-center gap-2 rounded-lg border border-brand-border bg-brand-grey px-3 py-2">
            <Search size={14} className="text-neutral-400" />
            <input
              type="text"
              value={kaliberSuche}
              onChange={(e) => setKaliberSuche(e.target.value)}
              placeholder="Kaliber suchen..."
              className="flex-1 bg-transparent text-xs text-brand-dark placeholder:text-neutral-400 focus:outline-none"
            />
          </div>
          <div className="space-y-3">
            {KALIBER_GRUPPEN.map((gruppe) => {
              const filtered = gruppe.kaliber.filter((k) =>
                k.toLowerCase().includes(kaliberSuche.toLowerCase())
              );
              if (filtered.length === 0) return null;
              return (
                <KaliberGruppeSection key={gruppe.gruppe} label={gruppe.gruppe}>
                  {filtered.map((k) => (
                    <GreenCheckbox
                      key={k}
                      checked={filters.kaliber.includes(k)}
                      onChange={() => toggleArray("kaliber", k)}
                      label={k}
                      small
                    />
                  ))}
                </KaliberGruppeSection>
              );
            })}
          </div>
        </FilterSection>

        {/* E) Zustand */}
        <FilterSection title="Zustand">
          <div className="space-y-2">
            {ZUSTAND_OPTIONEN.map((z) => (
              <GreenCheckbox
                key={z.id}
                checked={filters.zustand.includes(z.id)}
                onChange={() => toggleArray("zustand", z.id)}
                label={z.label}
              />
            ))}
          </div>
        </FilterSection>

        {/* F) Preis */}
        <FilterSection title="Preis (CHF)">
          <PreisSlider
            min={filters.preisMin}
            max={filters.preisMax}
            onMinChange={(v) => update({ preisMin: v })}
            onMaxChange={(v) => update({ preisMax: v })}
          />
          <div className="flex flex-wrap gap-1.5">
            {PREIS_PILLS.map((p) => {
              const active = filters.preisMin === p.min && filters.preisMax === p.max;
              return (
                <button
                  key={p.label}
                  onClick={() =>
                    active
                      ? update({ preisMin: "", preisMax: "" })
                      : update({ preisMin: p.min, preisMax: p.max })
                  }
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    active
                      ? "bg-brand-green text-white"
                      : "bg-brand-grey text-neutral-600 hover:bg-brand-green-light hover:text-brand-green"
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </FilterSection>

        {/* G) Kanton */}
        <FilterSection title="Kanton" defaultOpen={false}>
          {filters.kantone.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1">
              {filters.kantone.map((kid) => {
                const kt = KANTONE.find((k) => k.id === kid);
                return (
                  <span
                    key={kid}
                    className="inline-flex items-center gap-1 rounded-full bg-brand-green-light px-2 py-0.5 text-[10px] font-medium text-brand-green"
                  >
                    {kt?.label}
                    <button onClick={() => removeChip("kantone", kid)}>
                      <X size={10} />
                    </button>
                  </span>
                );
              })}
            </div>
          )}
          <div className="relative">
            <div className="flex items-center gap-2 rounded-lg border border-brand-border bg-brand-grey px-3 py-2">
              <Search size={14} className="text-neutral-400" />
              <input
                type="text"
                value={kantonSuche}
                onChange={(e) => {
                  setKantonSuche(e.target.value);
                  setKantonDropdownOpen(true);
                }}
                onFocus={() => setKantonDropdownOpen(true)}
                placeholder="Kanton suchen..."
                className="flex-1 bg-transparent text-xs text-brand-dark placeholder:text-neutral-400 focus:outline-none"
              />
            </div>
            {kantonDropdownOpen && (
              <div className="absolute left-0 top-full z-10 mt-1 max-h-40 w-full overflow-y-auto rounded-lg border border-brand-border bg-white py-1 shadow-lg">
                {filteredKantone.map((k) => (
                  <button
                    key={k.id}
                    onClick={() => {
                      toggleArray("kantone", k.id);
                      setKantonSuche("");
                      setKantonDropdownOpen(false);
                    }}
                    className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs hover:bg-brand-grey ${
                      filters.kantone.includes(k.id) ? "text-brand-green font-medium" : "text-neutral-700"
                    }`}
                  >
                    {filters.kantone.includes(k.id) && (
                      <span className="text-brand-green">✓</span>
                    )}
                    {k.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </FilterSection>

        {/* H) Marke */}
        <FilterSection title="Marke" defaultOpen={false}>
          <input
            type="text"
            value={filters.marke}
            onChange={(e) => update({ marke: e.target.value })}
            placeholder="Marke eingeben..."
            className="mb-3 w-full rounded-lg border border-brand-border bg-brand-grey px-3 py-2 text-xs text-brand-dark placeholder:text-neutral-400 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20"
          />
          <div className="flex flex-wrap gap-1.5">
            {MARKE_PILLS.map((m) => (
              <button
                key={m}
                onClick={() => update({ marke: filters.marke === m ? "" : m })}
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  filters.marke === m
                    ? "bg-brand-green text-white"
                    : "bg-brand-grey text-neutral-600 hover:bg-brand-green-light hover:text-brand-green"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* I) Nur anzeigen */}
        <FilterSection title="Nur anzeigen" defaultOpen={false}>
          <div className="space-y-2">
            {[
              { key: "mitFotos" as const, label: "Mit Fotos" },
              { key: "neuEingestellt" as const, label: "Neu eingestellt (7 Tage)" },
              { key: "preisreduziert" as const, label: "Preisreduziert" },
            ].map((opt) => (
              <GreenCheckbox
                key={opt.key}
                checked={filters[opt.key]}
                onChange={() => update({ [opt.key]: !filters[opt.key] })}
                label={opt.label}
              />
            ))}
          </div>
        </FilterSection>
      </div>

      {/* Mobile footer */}
      {isMobile && (
        <div className="border-t border-brand-border p-4">
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-brand-green py-3 text-sm font-medium text-white transition-colors hover:bg-brand-green-dark touch-target"
          >
            {resultCount} Inserate anzeigen
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Kaliber Gruppe (collapsible) ────────────────────────────

function KaliberGruppeSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-xs font-semibold text-neutral-500">{label}</span>
        <ChevronDown
          size={12}
          className={`text-neutral-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="ml-1 mt-1.5 space-y-1">{children}</div>}
    </div>
  );
}
