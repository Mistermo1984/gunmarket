"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  X,
  Search,
  RotateCcw,
} from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import SearchInput from "@/components/suche/SearchInput";
import {
  HAUPTKATEGORIEN,
  WAFFEN_IDS,
  ZUBEHOER_IDS,
  RECHTSSTATUS_FILTER,
  KALIBER_GRUPPEN,
  ZUSTAND_OPTIONEN,
  KANTONE,
} from "@/lib/constants";
import type { TranslationKey } from "@/lib/i18n";
import PriceHistogramSlider from "@/components/filters/PriceHistogramSlider";

const CAT_LABEL_MAP: Record<string, string> = {
  kurzwaffen: "cat_kurzwaffen",
  langwaffen: "cat_langwaffen",
  ordonnanzwaffen: "cat_ordonnanz",
  luftdruckwaffen: "cat_luftdruck",
  optik: "cat_optik",
  zubehoer: "cat_zubehoer",
  munition: "cat_munition",
};

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
  neuSeitTagen: number | null;
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
  neuSeitTagen: null,
};

export interface FilterCounts {
  total: number;
  categories: Record<string, number>;
  conditions: Record<string, number>;
  statuses: Record<string, number>;
  types: Record<string, number>;
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClose?: () => void;
  resultCount: number;
  isMobile?: boolean;
  counts?: FilterCounts | null;
}

// ─── Shared Components ───────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.08em] text-neutral-400">
      {children}
    </span>
  );
}

function Pill({
  label,
  active,
  onClick,
  count,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-150 ${
        active
          ? "bg-brand-green text-white shadow-sm"
          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
      }`}
    >
      {label}
      {count != null && count > 0 && (
        <span
          className={`text-[10px] tabular-nums ${
            active ? "text-white/70" : "text-neutral-400"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function FilterDivider() {
  return <div className="my-4 border-t border-neutral-100" />;
}

// ─── Dropdown component ──────────────────────────────────────

function FilterDropdown({
  label,
  placeholder,
  children,
  selectedCount,
}: {
  label: string;
  placeholder: string;
  children: React.ReactNode;
  selectedCount?: number;
}) {
  const { t } = useLocale();
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
    <div ref={ref} className="relative">
      <SectionLabel>{label}</SectionLabel>
      <button
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-xs transition-colors ${
          open
            ? "border-brand-green bg-white"
            : "border-neutral-200 bg-neutral-50 hover:border-neutral-300"
        }`}
      >
        <span className={selectedCount ? "text-brand-dark font-medium" : "text-neutral-400"}>
          {selectedCount ? `${selectedCount} ${t("filter_selected")}` : placeholder}
        </span>
        <ChevronDown
          size={14}
          className={`text-neutral-400 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
}

function DropdownCheckItem({
  checked,
  label,
  onChange,
  groupLabel,
}: {
  checked: boolean;
  label: string;
  onChange: () => void;
  groupLabel?: boolean;
}) {
  return (
    <button
      onClick={onChange}
      className={`flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-xs transition-colors hover:bg-neutral-50 ${
        groupLabel ? "font-semibold text-neutral-500 pt-2" : ""
      }`}
    >
      <div
        className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded transition-colors ${
          checked ? "bg-brand-green" : "border border-neutral-300"
        }`}
      >
        {checked && (
          <svg width={8} height={8} viewBox="0 0 10 10" fill="none">
            <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className={checked ? "text-brand-dark font-medium" : "text-neutral-600"}>{label}</span>
    </button>
  );
}

// ─── Marke quick-pills ──────────────────────────────────────

const MARKE_PILLS = [
  "SIG Sauer", "Glock", "Beretta", "Walther",
  "CZ", "Browning", "Steyr", "H&K", "Ruger", "S&W",
];

// ─── Category pill with inline subcategories ────────────────

function CategoryPillWithSubs({
  hk,
  filters,
  counts,
  onToggleCategory,
  onToggleSub,
}: {
  hk: { id: string; label: string; unterkategorien: { id: string; label: string }[] };
  filters: FilterState;
  counts?: FilterCounts | null;
  onToggleCategory: () => void;
  onToggleSub: (subId: string) => void;
}) {
  const { t } = useLocale();
  const catLabel = CAT_LABEL_MAP[hk.id] ? t(CAT_LABEL_MAP[hk.id] as TranslationKey) : hk.label;
  const active = filters.kategorien.includes(hk.id);
  const hasSubs = active && hk.unterkategorien.length > 0;

  if (!hasSubs) {
    return (
      <Pill
        label={catLabel}
        active={active}
        onClick={onToggleCategory}
        count={counts?.categories?.[hk.id]}
      />
    );
  }

  // Active with subcategories: take full width so subs render below
  return (
    <div className="flex w-full flex-col">
      <Pill
        label={catLabel}
        active={active}
        onClick={onToggleCategory}
        count={counts?.categories?.[hk.id]}
      />
      <div className="ml-2 mt-1.5 flex flex-wrap gap-1">
        {hk.unterkategorien.map((uk) => (
          <button
            key={uk.id}
            onClick={() => onToggleSub(uk.id)}
            className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all duration-150 ${
              filters.unterkategorien.includes(uk.id)
                ? "border-brand-green bg-brand-green/10 text-brand-green"
                : "border-neutral-200 bg-white text-neutral-500 hover:border-neutral-300"
            }`}
          >
            {uk.label}
          </button>
        ))}
      </div>
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
  counts,
}: FilterSidebarProps) {
  const { t } = useLocale();
  const [kaliberSuche, setKaliberSuche] = useState("");
  const [kantonSuche, setKantonSuche] = useState("");

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

  // Count active filters
  let activeCount = 0;
  if (filters.anbieter !== "alle") activeCount++;
  activeCount += filters.kategorien.length;
  activeCount += filters.rechtsstatus.length;
  activeCount += filters.kaliber.length;
  activeCount += filters.zustand.length;
  if (filters.preisMin || filters.preisMax) activeCount++;
  activeCount += filters.kantone.length;
  if (filters.marke) activeCount++;

  const filteredKantone = KANTONE.filter((k) =>
    k.label.toLowerCase().includes(kantonSuche.toLowerCase())
  );

  // Map zustand groups for simplified pills
  const neuCount = (counts?.conditions?.["neu"] ?? 0) + (counts?.conditions?.["Neu"] ?? 0);
  const gebrauchtCount = Object.entries(counts?.conditions ?? {})
    .filter(([k]) => k !== "neu" && k !== "Neu")
    .reduce((s, [, v]) => s + v, 0);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pb-3 pt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-brand-dark">{t("filter_title")}</span>
          {activeCount > 0 && (
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-green px-1 text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <button
              onClick={() => onChange(INITIAL_FILTERS)}
              className="flex items-center gap-1 text-[11px] font-medium text-neutral-400 transition-colors hover:text-brand-green"
            >
              <RotateCcw size={11} />
              {t("filter_reset")}
            </button>
          )}
          {isMobile && onClose && (
            <button onClick={onClose} className="ml-1 text-neutral-400 hover:text-brand-dark">
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* ── SEARCH ── */}
        <div className="mb-3">
          <SearchInput
            value={filters.marke}
            onChange={(v) => update({ marke: v })}
          />
        </div>

        {/* ── KATEGORIE ── */}
        <SectionLabel>{t("filter_category")}</SectionLabel>
        <span className="mb-1 block text-[9px] font-semibold uppercase tracking-wider text-neutral-300">{t("filter_weapons")}</span>
        <div className="flex flex-wrap gap-1.5">
          {HAUPTKATEGORIEN.filter((hk) => WAFFEN_IDS.includes(hk.id)).map((hk) => (
            <CategoryPillWithSubs
              key={hk.id}
              hk={hk}
              filters={filters}
              counts={counts}
              onToggleCategory={() => {
                const active = filters.kategorien.includes(hk.id);
                const nextKat = active
                  ? filters.kategorien.filter((k) => k !== hk.id)
                  : [...filters.kategorien, hk.id];
                const subIds = hk.unterkategorien.map((uk) => uk.id);
                const nextSub = active
                  ? filters.unterkategorien.filter((u) => !subIds.includes(u))
                  : filters.unterkategorien;
                update({ kategorien: nextKat, unterkategorien: nextSub });
              }}
              onToggleSub={(subId) => toggleArray("unterkategorien", subId)}
            />
          ))}
        </div>
        <span className="mb-1 mt-2.5 block text-[9px] font-semibold uppercase tracking-wider text-neutral-300">{t("filter_accessories")}</span>
        <div className="flex flex-wrap gap-1.5">
          {HAUPTKATEGORIEN.filter((hk) => ZUBEHOER_IDS.includes(hk.id)).map((hk) => (
            <CategoryPillWithSubs
              key={hk.id}
              hk={hk}
              filters={filters}
              counts={counts}
              onToggleCategory={() => {
                const active = filters.kategorien.includes(hk.id);
                const nextKat = active
                  ? filters.kategorien.filter((k) => k !== hk.id)
                  : [...filters.kategorien, hk.id];
                const subIds = hk.unterkategorien.map((uk) => uk.id);
                const nextSub = active
                  ? filters.unterkategorien.filter((u) => !subIds.includes(u))
                  : filters.unterkategorien;
                update({ kategorien: nextKat, unterkategorien: nextSub });
              }}
              onToggleSub={(subId) => toggleArray("unterkategorien", subId)}
            />
          ))}
        </div>

        <FilterDivider />

        {/* ── ZUSTAND ── */}
        <SectionLabel>{t("filter_condition")}</SectionLabel>
        <div className="flex flex-wrap gap-1.5">
          <Pill
            label={t("filter_all")}
            active={filters.zustand.length === 0}
            onClick={() => update({ zustand: [] })}
            count={counts?.total}
          />
          <Pill
            label={t("filter_new")}
            active={filters.zustand.length === 1 && filters.zustand[0] === "neu"}
            onClick={() =>
              filters.zustand.length === 1 && filters.zustand[0] === "neu"
                ? update({ zustand: [] })
                : update({ zustand: ["neu"] })
            }
            count={neuCount}
          />
          <Pill
            label={t("filter_used")}
            active={filters.zustand.length > 0 && !filters.zustand.includes("neu")}
            onClick={() => {
              const gebrauchtIds = ZUSTAND_OPTIONEN.filter((z) => z.id !== "neu").map((z) => z.id);
              const isGebraucht = filters.zustand.length > 0 && !filters.zustand.includes("neu");
              update({ zustand: isGebraucht ? [] : gebrauchtIds });
            }}
            count={gebrauchtCount}
          />
        </div>

        <FilterDivider />

        {/* ── NEUIGKEIT ── */}
        <SectionLabel>{t("filter_recency")}</SectionLabel>
        <div className="flex flex-wrap gap-1.5">
          {[
            { label: t("filter_today"), days: 1 },
            { label: `2 ${t("filter_n_days")}`, days: 2 },
            { label: `3 ${t("filter_n_days")}`, days: 3 },
            { label: `5 ${t("filter_n_days")}`, days: 5 },
          ].map(({ label, days }) => (
            <Pill
              key={days}
              label={label}
              active={filters.neuSeitTagen === days}
              onClick={() =>
                update({ neuSeitTagen: filters.neuSeitTagen === days ? null : days })
              }
            />
          ))}
        </div>

        <FilterDivider />

        {/* ── PREIS (Histogram Range Slider) ── */}
        <SectionLabel>{t("filter_price")}</SectionLabel>
        <PriceHistogramSlider
          minPrice={parseInt(filters.preisMin) || 0}
          maxPrice={parseInt(filters.preisMax) || 0}
          onChange={(min, max) => {
            update({
              preisMin: min > 0 ? String(min) : "",
              preisMax: max > 0 ? String(max) : "",
            });
          }}
          filterParams={{
            ...(filters.kategorien.length > 0 && { kategorie: filters.kategorien.join(",") }),
            ...(filters.kantone.length > 0 && { kanton: filters.kantone.join(",") }),
            ...(filters.rechtsstatus.length > 0 && { rechtsstatus: filters.rechtsstatus.join(",") }),
            ...(filters.zustand.length > 0 && { zustand: filters.zustand.join(",") }),
          }}
        />

        <FilterDivider />

        {/* ── KALIBER ── */}
        <FilterDropdown
          label={t("filter_caliber")}
          placeholder={t("filter_all_calibers")}
          selectedCount={filters.kaliber.length || undefined}
        >
          <div className="sticky top-0 z-10 border-b border-neutral-100 bg-white px-3 py-2">
            <div className="flex items-center gap-2 rounded-md bg-neutral-50 px-2 py-1.5">
              <Search size={12} className="text-neutral-400" />
              <input
                type="text"
                value={kaliberSuche}
                onChange={(e) => setKaliberSuche(e.target.value)}
                placeholder={t("filter_search")}
                className="flex-1 bg-transparent text-xs text-brand-dark placeholder:text-neutral-400 focus:outline-none"
              />
            </div>
          </div>
          {KALIBER_GRUPPEN.map((gruppe) => {
            const filtered = gruppe.kaliber.filter((k) =>
              k.toLowerCase().includes(kaliberSuche.toLowerCase())
            );
            if (filtered.length === 0) return null;
            return (
              <div key={gruppe.gruppe}>
                <div className="px-3 pt-2.5 pb-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  {gruppe.gruppe}
                </div>
                {filtered.map((k) => (
                  <DropdownCheckItem
                    key={k}
                    checked={filters.kaliber.includes(k)}
                    label={k}
                    onChange={() => toggleArray("kaliber", k)}
                  />
                ))}
              </div>
            );
          })}
        </FilterDropdown>

        <FilterDivider />

        {/* ── KANTON ── */}
        <FilterDropdown
          label={t("filter_canton")}
          placeholder={t("filter_all_cantons")}
          selectedCount={filters.kantone.length || undefined}
        >
          <div className="sticky top-0 z-10 border-b border-neutral-100 bg-white px-3 py-2">
            <div className="flex items-center gap-2 rounded-md bg-neutral-50 px-2 py-1.5">
              <Search size={12} className="text-neutral-400" />
              <input
                type="text"
                value={kantonSuche}
                onChange={(e) => setKantonSuche(e.target.value)}
                placeholder={t("filter_search")}
                className="flex-1 bg-transparent text-xs text-brand-dark placeholder:text-neutral-400 focus:outline-none"
              />
            </div>
          </div>
          {filteredKantone.map((k) => (
            <DropdownCheckItem
              key={k.id}
              checked={filters.kantone.includes(k.id)}
              label={k.label}
              onChange={() => toggleArray("kantone", k.id)}
            />
          ))}
        </FilterDropdown>

        <FilterDivider />

        {/* ── MARKE ── */}
        <SectionLabel>{t("filter_brand")}</SectionLabel>
        <input
          type="text"
          value={filters.marke}
          onChange={(e) => update({ marke: e.target.value })}
          placeholder={t("filter_brand_placeholder")}
          className="mb-2.5 w-full rounded-lg border-0 bg-neutral-50 px-3 py-2 text-xs text-brand-dark placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-brand-green/30"
        />
        <div className="flex flex-wrap gap-1.5">
          {MARKE_PILLS.map((m) => (
            <Pill
              key={m}
              label={m}
              active={filters.marke === m}
              onClick={() => update({ marke: filters.marke === m ? "" : m })}
            />
          ))}
        </div>

        <FilterDivider />

        {/* ── RECHTSSTATUS ── */}
        <SectionLabel>{t("filter_legal_status")} <em className="text-[9px] font-normal normal-case tracking-normal text-neutral-300">beta</em></SectionLabel>
        <div className="flex flex-wrap gap-1.5">
          <Pill
            label={t("filter_all")}
            active={filters.rechtsstatus.length === 0}
            onClick={() => update({ rechtsstatus: [] })}
          />
          {RECHTSSTATUS_FILTER.map((rs) => (
            <Pill
              key={rs.id}
              label={rs.kurzlabel}
              active={filters.rechtsstatus.includes(rs.id)}
              onClick={() => toggleArray("rechtsstatus", rs.id)}
              count={counts?.statuses?.[rs.id]}
            />
          ))}
        </div>
      </div>

      {/* Mobile footer */}
      {isMobile && (
        <div className="border-t border-neutral-100 p-4">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-brand-green py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
          >
            {resultCount.toLocaleString("de-CH")} {t("filter_show_listings")}
          </button>
        </div>
      )}
    </div>
  );
}
