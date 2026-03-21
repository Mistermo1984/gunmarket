'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

const ALL_EVENTS = [
  { name: 'Grauholzschiessen',              date: '2026-02-28', dateEnd: '2026-03-01', ort: 'Grauholz',      href: 'https://www.grauholzschiessen.ch' },
  { name: 'Erinnerungsschiessen Burgdorf',  date: '2026-02-28', dateEnd: '2026-02-28', ort: 'Burgdorf',      href: 'https://www.stadtschuetzen-burgdorf.ch' },
  { name: '50. Int. Waffen-Sammlerbörse',   date: '2026-03-27', dateEnd: '2026-03-29', ort: 'KKL Luzern',    href: 'https://www.waffenboerse-luzern.ch' },
  { name: 'Wiedlisbacher Waffenlauf',       date: '2026-04-12', dateEnd: '2026-04-12', ort: 'Wiedlisbach',   href: 'https://www.fruehlingsslauf-wiedlisbach.ch' },
  { name: 'Fahrtschiessen Mollis',          date: '2026-04-18', dateEnd: '2026-04-19', ort: 'Mollis',        href: 'https://www.schuetzenveteranen-zh.ch' },
  { name: 'Gedenkschiessen Rothenthurm',    date: '2026-04-25', dateEnd: '2026-04-26', ort: 'Rothenthurm',   href: 'https://www.gedenkschiessen.ch' },
  { name: 'Fricktaler Waffenlauf',          date: '2026-05-07', dateEnd: '2026-05-07', ort: 'Kaisten',       href: 'https://www.vckaisten.ch' },
  { name: 'Tir de Bourbaki',               date: '2026-05-08', dateEnd: '2026-05-09', ort: 'Les Verrières', href: 'https://www.laverrisanne.ch' },
  { name: 'Staudenschlacht',               date: '2026-05-09', dateEnd: '2026-05-09', ort: 'Bremgarten',    href: 'https://www.staudenschlacht.ch' },
  { name: 'Domleschger Waffenlauf',        date: '2026-05-03', dateEnd: '2026-05-03', ort: 'Scharans',      href: 'https://www.domleschger-lauf.org' },
  { name: 'Murtenschiessen',               date: '2026-05-21', dateEnd: '2026-05-21', ort: 'Murten',        href: 'https://www.murtenschiessen.ch' },
  { name: 'Calvenschiessen Davos',          date: '2026-05-23', dateEnd: '2026-05-23', ort: 'Davos',         href: 'https://www.calvenschiessen.ch' },
  { name: '5-Schlösserlauf',              date: '2026-05-24', dateEnd: '2026-05-24', ort: 'Holderbank',    href: 'https://www.5schloesserlauf.ch' },
  { name: 'Lenzburger Waffenlauf',         date: '2026-05-30', dateEnd: '2026-05-30', ort: 'Lenzburg',      href: 'https://www.lenzburgerrlauf.ch' },
  { name: 'Sempacher Schiessen',           date: '2026-06-24', dateEnd: '2026-06-27', ort: 'Sempach',       href: '#' },
  { name: 'Stoss-Schiessen',               date: '2026-08-29', dateEnd: '2026-08-30', ort: 'Stoss AR',      href: '#' },
  { name: 'Murianer Waffenlauf',           date: '2026-09-05', dateEnd: '2026-09-05', ort: 'Muri AG',       href: 'https://www.herbstlauf.ch' },
  { name: 'STAC 2026',                     date: '2026-09-18', dateEnd: '2026-09-18', ort: 'Thun BE',       href: 'https://www.vtg.admin.ch' },
  { name: 'Schwaderloh-Schiessen',         date: '2026-09-19', dateEnd: '2026-09-27', ort: 'Schwaderloh',   href: '#' },
  { name: 'Bauernkriegs-Gedenkschiessen',  date: '2026-10-03', dateEnd: '2026-10-03', ort: 'Entlebuch',     href: 'https://www.asg-entlebuch.ch' },
  { name: 'Gotthardschiessen',             date: '2026-10-09', dateEnd: '2026-10-10', ort: 'Airolo',        href: 'https://www.tirostoricosangottardo.ch' },
  { name: 'Burgdorfer Waffenlauf',         date: '2026-10-17', dateEnd: '2026-10-17', ort: 'Burgdorf',      href: '#' },
  { name: 'Niederbipper Waffenlauf',       date: '2026-11-01', dateEnd: '2026-11-01', ort: 'Niederbipp',    href: '#' },
  { name: 'Rütlischiessen',               date: '2026-11-04', dateEnd: '2026-11-04', ort: 'Rütli',         href: 'https://www.ruetlischiessen.ch' },
  { name: 'Morgartenschiessen',            date: '2026-11-14', dateEnd: '2026-11-14', ort: 'Morgarten',     href: 'https://www.morgartenschiessen.ch' },
];

// Händler nach Kanton gruppiert
const DEALERS_BY_CANTON: Record<string, { name: string; ort: string; href: string }[]> = {
  ZH: [
    { name: 'W. Glaser Waffen',         ort: 'Zürich',       href: 'https://www.wglaser.ch' },
    { name: 'Natur Aktiv / Waffenbörse',ort: 'Dietikon',     href: 'https://www.waffenboerse.ch' },
    { name: 'Schild Waffen',            ort: 'Wallisellen',  href: 'https://www.schildwaffen.ch' },
    { name: 'Treehuggers Supply',       ort: 'Bülach',       href: 'https://www.treehuggers.ch' },
    { name: 'Forney Waffen',            ort: 'Zürich',       href: 'https://www.forney-waffen.ch' },
    { name: 'Bürchler Waffen',          ort: 'Zürich',       href: 'https://www.waffen-buerchler.ch' },
    { name: 'Hebeisen Hunting',         ort: 'Zürich',       href: 'https://www.hebeisen.ch' },
    { name: 'Waffen-Pfister',           ort: 'Pfäffikon',    href: 'https://www.waffen-pfister.ch' },
    { name: 'Waffen Widmer',            ort: 'Horgen',       href: 'https://www.waffen-widmer.ch' },
    { name: 'Gun Factory',              ort: 'Rümlang',      href: 'https://www.gunfactory.ch' },
  ],
  BE: [
    { name: 'Aebi Waffen',              ort: 'Hasle-Rüegsau',href: 'https://www.aebiwaffen.ch' },
    { name: 'Wyss Waffen',              ort: 'Burgdorf',     href: 'https://www.wysswaffen.ch' },
    { name: 'Poyet AG',                 ort: 'Bern',         href: 'https://www.poyet.ch' },
    { name: 'Salvisberg Waffen',        ort: 'Bern',         href: 'https://www.salvisberg-waffen.ch' },
    { name: 'Waffen-Zentrum',           ort: 'Gampelen',     href: 'https://www.waffen-zentrum.ch' },
    { name: 'Waffenshop Gerber',        ort: 'Trubschachen', href: 'https://www.waffenshop-gerber.ch' },
    { name: 'B&T Shop',                 ort: 'Thun',         href: 'https://www.bt-ag.ch' },
    { name: 'Swiss P Defence / RUAG',   ort: 'Thun',         href: 'https://www.swissp-defence.com' },
    { name: 'Militaria-Shop',           ort: 'Bern (Online)',href: 'https://www.militaria-shop.ch' },
  ],
  LU: [
    { name: 'Felder Jagdhof',           ort: 'Ebikon',       href: 'https://www.felder-jagdhof.ch' },
    { name: 'Grünig & Elmiger',         ort: 'Malters',      href: 'https://www.gruenel.ch' },
    { name: 'Waffen Zimmermann',        ort: 'Luzern',       href: 'https://www.waffen-zimmermann.ch' },
    { name: 'Brownells Schweiz',        ort: 'Luzern (Online)',href: 'https://www.brownells.ch' },
  ],
  SO: [
    { name: 'Waffen Ingold',            ort: 'Oensingen',    href: 'https://www.waffen-ingold.ch' },
    { name: 'Geissbühler Schiesssport', ort: 'Zuchwil',      href: 'https://www.geissbuehler.ch' },
  ],
  BL: [
    { name: 'Munitionsdepot.ch',        ort: 'Zwingen',      href: 'https://www.munitionsdepot.ch' },
  ],
  SG: [
    { name: 'Waffen Dobler',            ort: 'Kaltbrunn',    href: 'https://www.waffendobler.ch' },
    { name: 'Birkenast',                ort: 'Zuzwil',       href: 'https://www.birkenast.ch' },
    { name: 'Kessler Waffen',           ort: 'Degersheim',   href: 'https://www.kesslerwaffen.ch' },
  ],
  AG: [
    { name: 'Richner Waffen',           ort: 'Lenzburg',     href: 'https://www.richner-waffen.ch' },
  ],
  TG: [
    { name: 'Gundam.ch / René Hild',    ort: 'Friltschen',   href: 'https://www.gundam.ch' },
    { name: 'Antikschuss',              ort: 'Aadorf',       href: 'https://www.antikschuss.ch' },
    { name: 'Hausammann',               ort: 'Uttwil',       href: 'https://www.hausammann.ch' },
  ],
  SZ: [
    { name: 'Schwyzer Waffen',          ort: 'Goldau',       href: 'https://www.schwyzerwaffen.ch' },
    { name: 'Fischlin Waffen',          ort: 'Goldau',       href: 'https://www.fischlin-waffen.ch' },
    { name: 'Waffen Schuler',           ort: 'Brunnen',      href: 'https://www.waffenschuler.ch' },
  ],
  SH: [
    { name: 'Tanner Waffen',            ort: 'Thayngen',     href: 'https://www.tanner-waffen.ch' },
  ],
  ZG: [
    { name: 'Waffen-Friedlin',          ort: 'Zug',          href: 'https://www.waffenfriedlin.ch' },
  ],
  OW: [
    { name: 'Brünig Indoor',            ort: 'Brünig',       href: 'https://www.bruenigindoor.ch' },
  ],
  VD: [
    { name: 'Lagardère',               ort: 'Morges',       href: 'https://www.lagardere.ch' },
    { name: 'Outdoor Enterprise',       ort: 'Le Mont-sur-Lausanne', href: 'https://www.outdoor-enterprise.ch' },
    { name: 'Armurerie du Château',     ort: 'Puidoux',      href: 'https://www.armurerie-du-chateau.ch' },
    { name: 'Ducret Armurerie',         ort: 'Orbe',         href: 'https://www.armurerie-ducret.ch' },
  ],
  GE: [
    { name: 'Armurerie de la Bourse',   ort: 'Genève',       href: 'https://www.armurerie-bourse.ch' },
  ],
  NE: [
    { name: 'Petitpierre Armurerie',    ort: 'Auvernier',    href: 'https://www.armurerie-petitpierre.ch' },
  ],
  FR: [
    { name: 'Tissot Armurerie',         ort: 'Fribourg',     href: 'https://www.tissot-armurerie.ch' },
  ],
  TI: [
    { name: 'Armeria Bioggio',          ort: 'Bioggio',      href: 'https://www.armeriabioggio.ch' },
    { name: 'Armeria del Ceresio',      ort: 'Melano',       href: 'https://www.armeriadelceresio.ch' },
  ],
  VS: [
    { name: 'Armurerie Saint-Hubert',   ort: 'Martigny',     href: 'https://www.armureriesainthubert.ch' },
  ],
};

// Leere Kantone herausfiltern
const CANTONS = Object.entries(DEALERS_BY_CANTON)
  .filter(([, dealers]) => dealers.length > 0)
  .map(([kt]) => kt);

const TOTAL_DEALERS = Object.values(DEALERS_BY_CANTON).flat().length;

const PROMOS = [
  { name: 'Frühjahrsputz bei Ingold',     meta: 'Aktion · 10% auf Reinigungssets bis 31. März', href: '#' },
  { name: '7.5×55 Swiss ab CHF 0.65',    meta: 'Aktion · Munitions-Abverkauf · Solange Vorrat', href: '#' },
  { name: 'Inserat aufgeben — kostenlos', meta: 'Info · gunmarket.ch · Jetzt starten',           href: '/inserat/neu' },
];

type TabKey = 'ev' | 'sh' | 'pr';

type EventItem = typeof ALL_EVENTS[number];

function formatDateRange(date: string, dateEnd: string): string {
  const d = new Date(date);
  const dEnd = new Date(dateEnd);
  const dayStart = d.getDate();
  const dayEnd = dEnd.getDate();
  const month = d.toLocaleDateString('de-CH', { month: 'short' });
  const monthEnd = dEnd.toLocaleDateString('de-CH', { month: 'short' });
  if (date === dateEnd) return `${dayStart}. ${month}`;
  if (month === monthEnd) return `${dayStart}.–${dayEnd}. ${month}`;
  return `${dayStart}. ${month} – ${dayEnd}. ${monthEnd}`;
}

function getEventsByMonth(): { key: string; label: string; events: EventItem[] }[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const year = today.getFullYear();
  const endOfYear = new Date(year, 11, 31, 23, 59, 59);

  const upcoming = ALL_EVENTS
    .filter(ev => new Date(ev.dateEnd) >= today && new Date(ev.date) <= endOfYear)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const grouped = new Map<string, EventItem[]>();
  for (const ev of upcoming) {
    const d = new Date(ev.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(ev);
  }

  return Array.from(grouped.entries()).map(([key, events]) => {
    const [y, m] = key.split('-');
    const label = new Date(Number(y), Number(m) - 1, 1).toLocaleDateString('de-CH', { month: 'short' });
    return { key, label, events };
  });
}

/* ── Pill sub-components with portal dropdowns ── */

function clampLeft(left: number, dropdownWidth: number): number {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const maxLeft = vw - dropdownWidth - 8;
  return Math.max(8, Math.min(left, maxLeft));
}

function CantonPill({
  kt,
  isOpen,
  onToggle,
}: {
  kt: string;
  isOpen: boolean;
  onToggle: (kt: string) => void;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    if (isOpen && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 4, left: clampLeft(rect.left, 220) });
    } else {
      setPos(null);
    }
  }, [isOpen]);

  const dealers = DEALERS_BY_CANTON[kt];

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => onToggle(kt)}
        className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full border transition-colors whitespace-nowrap shrink-0 ${
          isOpen
            ? 'bg-[#4d8230] text-white border-[#4d8230]'
            : 'bg-white text-gray-600 border-gray-200 hover:border-[#4d8230] hover:text-[#4d8230]'
        }`}
      >
        {kt}
        <span className={`text-[9px] rounded-full px-1 ${
          isOpen ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'
        }`}>
          {dealers.length}
        </span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
      {isOpen && pos && createPortal(
        <div
          data-banner-dropdown
          className="fixed bg-white border border-gray-200 rounded-xl shadow-lg z-50 min-w-[220px] max-h-[70vh] overflow-y-auto py-1"
          style={{ top: pos.top, left: pos.left }}
        >
          <div className="px-3 py-1.5 text-[9px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 sticky top-0 bg-white">
            Kanton {kt} — {dealers.length} Händler
          </div>
          {dealers.map((dealer, i) => (
            <a
              key={i}
              href={dealer.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 hover:bg-[#f5faf2] transition-colors group"
            >
              <div>
                <div className="text-[12px] font-medium text-gray-800 group-hover:text-[#4d8230] transition-colors">
                  {dealer.name}
                </div>
                <div className="text-[10px] text-gray-400">{dealer.ort}</div>
              </div>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300 group-hover:text-[#4d8230] ml-2 shrink-0">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </a>
          ))}
        </div>,
        document.body,
      )}
    </>
  );
}

function MonthPill({
  month,
  isOpen,
  onToggle,
}: {
  month: { key: string; label: string; events: EventItem[] };
  isOpen: boolean;
  onToggle: (key: string) => void;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    if (isOpen && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 4, left: clampLeft(rect.left, 260) });
    } else {
      setPos(null);
    }
  }, [isOpen]);

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => onToggle(month.key)}
        className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full border transition-colors whitespace-nowrap shrink-0 ${
          isOpen
            ? 'bg-[#4d8230] text-white border-[#4d8230]'
            : 'bg-white text-gray-600 border-gray-200 hover:border-[#4d8230] hover:text-[#4d8230]'
        }`}
      >
        {month.label}
        <span className={`text-[9px] rounded-full px-1 ${
          isOpen ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'
        }`}>
          {month.events.length}
        </span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
      {isOpen && pos && createPortal(
        <div
          data-banner-dropdown
          className="fixed bg-white border border-gray-200 rounded-xl shadow-lg z-50 min-w-[260px] max-h-[70vh] overflow-y-auto py-1"
          style={{ top: pos.top, left: pos.left }}
        >
          <div className="px-3 py-1.5 text-[9px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 sticky top-0 bg-white">
            {month.label} — {month.events.length} Events
          </div>
          {month.events.map((ev, i) => (
            <a
              key={i}
              href={ev.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 hover:bg-[#f5faf2] transition-colors group"
            >
              <div>
                <div className="text-[12px] font-medium text-gray-800 group-hover:text-[#4d8230] transition-colors">
                  {ev.name}
                </div>
                <div className="text-[10px] text-gray-400">
                  {formatDateRange(ev.date, ev.dateEnd)} · {ev.ort}
                </div>
              </div>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300 group-hover:text-[#4d8230] ml-2 shrink-0">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </a>
          ))}
        </div>,
        document.body,
      )}
    </>
  );
}

/* ── Main component ── */

export default function BannerZone() {
  const [active, setActive] = useState<TabKey>('ev');
  const [openCanton, setOpenCanton] = useState<string | null>(null);
  const [openMonth, setOpenMonth] = useState<string | null>(null);

  // Promos drag-scroll refs
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  // Close all dropdowns on click outside
  const bannerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => {
      // Don't close if clicking inside a portal dropdown (which is on document.body)
      const target = e.target as HTMLElement;
      if (target.closest('[data-banner-dropdown]')) return;
      // Don't close if clicking inside the banner zone itself (pills handle their own toggle)
      if (bannerRef.current?.contains(target)) return;
      setOpenCanton(null);
      setOpenMonth(null);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const eventsByMonth = useMemo(() => getEventsByMonth(), []);

  const totalUpcoming = useMemo(
    () => eventsByMonth.reduce((sum, m) => sum + m.events.length, 0),
    [eventsByMonth],
  );

  // Promos drag-scroll handlers
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    startScrollLeft.current = scrollRef.current?.scrollLeft || 0;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grabbing';
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = startScrollLeft.current - (x - startX.current) * 1.5;
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  const tabs: { key: TabKey; label: string; count?: number }[] = [
    { key: 'ev', label: 'Events', count: totalUpcoming },
    { key: 'sh', label: 'Waffenhändler', count: TOTAL_DEALERS },
    { key: 'pr', label: 'Aktionen' },
  ];

  return (
    <div ref={bannerRef} className="w-full bg-gray-50 border-t border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8">

        {/* Top row: tabs */}
        <div className="flex items-center h-11 gap-0">
          {tabs.map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => { setActive(key as TabKey); setOpenCanton(null); setOpenMonth(null); }}
              className={`text-xs px-2.5 h-11 whitespace-nowrap font-medium transition-colors outline-none ${
                active === key ? 'text-[#4d8230] border-b-2 border-[#4d8230]' : 'text-gray-400 hover:text-gray-600 border-b-2 border-transparent'
              }`}
            >
              {label}
              {count !== undefined && (
                <span className={`ml-1 text-[10px] rounded-full px-1.5 py-0.5 transition-colors ${
                  active === key ? 'bg-[#4d8230] text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content row: pills wrap */}
        <div className="pb-2.5">
          {/* EVENTS: month pills */}
          {active === 'ev' && (
            <div className="flex flex-wrap items-center gap-1.5">
              {eventsByMonth.map(month => (
                <MonthPill
                  key={month.key}
                  month={month}
                  isOpen={openMonth === month.key}
                  onToggle={(key) => { setOpenMonth(openMonth === key ? null : key); setOpenCanton(null); }}
                />
              ))}
            </div>
          )}

          {/* WAFFENHÄNDLER: canton pills — wrap so all are visible */}
          {active === 'sh' && (
            <div className="flex flex-wrap items-center gap-1.5">
              {CANTONS.map(kt => (
                <CantonPill
                  key={kt}
                  kt={kt}
                  isOpen={openCanton === kt}
                  onToggle={(k) => { setOpenCanton(openCanton === k ? null : k); setOpenMonth(null); }}
                />
              ))}
            </div>
          )}

          {/* AKTIONEN: horizontal scroll cards */}
          {active === 'pr' && (
            <div
              ref={scrollRef}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              className="flex items-center gap-2 overflow-x-auto select-none scrollbar-none"
              style={{ cursor: 'grab', touchAction: 'pan-x', WebkitOverflowScrolling: 'touch' }}
            >
              {PROMOS.map((item, i) => (
                <div key={i} className="flex items-center gap-2 shrink-0">
                  {i > 0 && <div className="w-px h-4 bg-gray-200 shrink-0" />}
                  <a
                    href={item.href}
                    onMouseDown={e => e.stopPropagation()}
                    className="flex items-center gap-0 bg-white border border-gray-200 rounded-lg hover:border-[#4d8230] transition-colors group overflow-hidden whitespace-nowrap shrink-0"
                  >
                    <div className="bg-[#eef5e8] px-2.5 self-stretch flex items-center border-r border-gray-100">
                      <span className="text-[10px] font-semibold text-[#4d8230] leading-none">
                        {item.meta.split('·')[0].trim()}
                      </span>
                    </div>
                    <div className="px-2.5 py-1.5 leading-none">
                      <div className="text-[11px] font-medium text-gray-800 group-hover:text-[#4d8230] transition-colors">{item.name}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{item.meta.split('·').slice(1).join('·').trim()}</div>
                    </div>
                  </a>
                </div>
              ))}
              <div className="shrink-0 w-4" />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
