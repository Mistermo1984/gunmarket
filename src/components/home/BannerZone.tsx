'use client';
import { useState, useMemo, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

const ALL_EVENTS = [
  { name: '50. Int. Waffen-Sammlerbörse', date: '2026-03-27', dateEnd: '2026-03-29', ort: 'KKL Luzern', href: 'https://www.waffenboerse-luzern.ch' },
  { name: 'Wiedlisbacher Waffenlauf', date: '2026-04-12', dateEnd: '2026-04-12', ort: 'Wiedlisbach', href: 'https://www.fruehlingsslauf-wiedlisbach.ch' },
  { name: 'Fahrtschiessen Mollis', date: '2026-04-18', dateEnd: '2026-04-19', ort: 'Mollis', href: 'https://www.schuetzenveteranen-zh.ch' },
  { name: 'Gedenkschiessen Rothenthurm', date: '2026-04-25', dateEnd: '2026-04-26', ort: 'Rothenthurm', href: 'https://www.gedenkschiessen.ch' },
  { name: 'Fricktaler Waffenlauf', date: '2026-05-07', dateEnd: '2026-05-07', ort: 'Kaisten', href: 'https://www.vckaisten.ch' },
  { name: 'Tir de Bourbaki', date: '2026-05-08', dateEnd: '2026-05-09', ort: 'Les Verrières', href: 'https://www.laverrisanne.ch' },
  { name: 'Staudenschlacht', date: '2026-05-09', dateEnd: '2026-05-09', ort: 'Bremgarten', href: 'https://www.staudenschlacht.ch' },
  { name: 'Domleschger Waffenlauf', date: '2026-05-03', dateEnd: '2026-05-03', ort: 'Scharans', href: 'https://www.domleschger-lauf.org' },
  { name: 'Murtenschiessen', date: '2026-05-21', dateEnd: '2026-05-21', ort: 'Murten', href: 'https://www.murtenschiessen.ch' },
  { name: 'Calvenschiessen Davos', date: '2026-05-23', dateEnd: '2026-05-23', ort: 'Davos', href: 'https://www.calvenschiessen.ch' },
  { name: '5-Schlösserlauf', date: '2026-05-24', dateEnd: '2026-05-24', ort: 'Holderbank', href: 'https://www.5schloesserlauf.ch' },
  { name: 'Lenzburger Waffenlauf', date: '2026-05-30', dateEnd: '2026-05-30', ort: 'Lenzburg', href: 'https://www.lenzburgerrlauf.ch' },
  { name: 'Sempacher Schiessen', date: '2026-06-24', dateEnd: '2026-06-27', ort: 'Sempach', href: '#' },
  { name: 'Stoss-Schiessen', date: '2026-08-29', dateEnd: '2026-08-30', ort: 'Stoss AR', href: '#' },
  { name: 'Murianer Waffenlauf', date: '2026-09-05', dateEnd: '2026-09-05', ort: 'Muri AG', href: 'https://www.herbstlauf.ch' },
  { name: 'STAC 2026', date: '2026-09-18', dateEnd: '2026-09-18', ort: 'Thun BE', href: 'https://www.vtg.admin.ch' },
  { name: 'Schwaderloh-Schiessen', date: '2026-09-19', dateEnd: '2026-09-27', ort: 'Schwaderloh', href: '#' },
  { name: 'Bauernkriegs-Gedenkschiessen', date: '2026-10-03', dateEnd: '2026-10-03', ort: 'Entlebuch', href: 'https://www.asg-entlebuch.ch' },
  { name: 'Gotthardschiessen', date: '2026-10-09', dateEnd: '2026-10-10', ort: 'Airolo', href: 'https://www.tirostoricosangottardo.ch' },
  { name: 'Burgdorfer Waffenlauf', date: '2026-10-17', dateEnd: '2026-10-17', ort: 'Burgdorf', href: '#' },
  { name: 'Niederbipper Waffenlauf', date: '2026-11-01', dateEnd: '2026-11-01', ort: 'Niederbipp', href: '#' },
  { name: 'Rütlischiessen', date: '2026-11-04', dateEnd: '2026-11-04', ort: 'Rütli', href: 'https://www.ruetlischiessen.ch' },
  { name: 'Morgartenschiessen', date: '2026-11-14', dateEnd: '2026-11-14', ort: 'Morgarten', href: 'https://www.morgartenschiessen.ch' },
];

const DEALERS_BY_CANTON: Record<string, { name: string; ort: string; href: string }[]> = {
  ZH: [
    { name: 'Gun Factory', ort: 'Rümlang', href: 'https://www.gunfactory.ch' },
    { name: 'W. Glaser Waffen', ort: 'Zürich', href: 'https://www.wglaser.ch' },
    { name: 'Natur Aktiv / Waffenbörse', ort: 'Dietikon', href: 'https://www.waffenboerse.ch' },
    { name: 'Schild Waffen', ort: 'Wallisellen', href: 'https://www.schildwaffen.ch' },
    { name: 'Treehuggers Supply', ort: 'Bülach', href: 'https://www.treehuggers.ch' },
    { name: 'Forney Waffen', ort: 'Zürich', href: 'https://www.forney-waffen.ch' },
    { name: 'Bürchler Waffen', ort: 'Zürich', href: 'https://www.waffen-buerchler.ch' },
    { name: 'Hebeisen Hunting', ort: 'Zürich', href: 'https://www.hebeisen.ch' },
    { name: 'Waffen-Pfister', ort: 'Pfäffikon', href: 'https://www.waffen-pfister.ch' },
    { name: 'Waffen Widmer', ort: 'Horgen', href: 'https://www.waffen-widmer.ch' },
  ],
  BE: [
    { name: 'Aebi Waffen', ort: 'Hasle-Rüegsau', href: 'https://www.aebiwaffen.ch' },
    { name: 'Wyss Waffen', ort: 'Burgdorf', href: 'https://www.wysswaffen.ch' },
    { name: 'Poyet AG', ort: 'Bern', href: 'https://www.poyet.ch' },
    { name: 'Salvisberg Waffen', ort: 'Bern', href: 'https://www.salvisberg-waffen.ch' },
    { name: 'Waffen-Zentrum', ort: 'Gampelen', href: 'https://www.waffen-zentrum.ch' },
    { name: 'Waffenshop Gerber', ort: 'Trubschachen', href: 'https://www.waffenshop-gerber.ch' },
    { name: 'B&T Shop', ort: 'Thun', href: 'https://www.bt-ag.ch' },
    { name: 'Swiss P Defence', ort: 'Thun', href: 'https://www.swissp-defence.com' },
    { name: 'Militaria-Shop', ort: 'Bern (Online)', href: 'https://www.militaria-shop.ch' },
  ],
  LU: [
    { name: 'Felder Jagdhof', ort: 'Ebikon', href: 'https://www.felder-jagdhof.ch' },
    { name: 'Grünig & Elmiger', ort: 'Malters', href: 'https://www.gruenel.ch' },
    { name: 'Waffen Zimmermann', ort: 'Luzern', href: 'https://www.waffen-zimmermann.ch' },
    { name: 'Brownells Schweiz', ort: 'Online/Luzern', href: 'https://www.brownells.ch' },
  ],
  SO: [
    { name: 'Waffen Ingold', ort: 'Oensingen', href: 'https://www.waffen-ingold.ch' },
    { name: 'Geissbühler Schiesssport', ort: 'Zuchwil', href: 'https://www.geissbuehler.ch' },
  ],
  BL: [{ name: 'Munitionsdepot.ch', ort: 'Zwingen', href: 'https://www.munitionsdepot.ch' }],
  SG: [
    { name: 'Waffen Dobler', ort: 'Kaltbrunn', href: 'https://www.waffendobler.ch' },
    { name: 'Birkenast', ort: 'Zuzwil', href: 'https://www.birkenast.ch' },
    { name: 'Kessler Waffen', ort: 'Degersheim', href: 'https://www.kesslerwaffen.ch' },
  ],
  AG: [{ name: 'Richner Waffen', ort: 'Lenzburg', href: 'https://www.richner-waffen.ch' }],
  TG: [
    { name: 'Gundam.ch / René Hild', ort: 'Friltschen', href: 'https://www.gundam.ch' },
    { name: 'Antikschuss', ort: 'Aadorf', href: 'https://www.antikschuss.ch' },
    { name: 'Hausammann', ort: 'Uttwil', href: 'https://www.hausammann.ch' },
  ],
  SZ: [
    { name: 'Schwyzer Waffen', ort: 'Goldau', href: 'https://www.schwyzerwaffen.ch' },
    { name: 'Fischlin Waffen', ort: 'Goldau', href: 'https://www.fischlin-waffen.ch' },
    { name: 'Waffen Schuler', ort: 'Brunnen', href: 'https://www.waffenschuler.ch' },
  ],
  SH: [{ name: 'Tanner Waffen', ort: 'Thayngen', href: 'https://www.tanner-waffen.ch' }],
  ZG: [{ name: 'Waffen-Friedlin', ort: 'Zug', href: 'https://www.waffenfriedlin.ch' }],
  OW: [{ name: 'Brünig Indoor', ort: 'Brünig', href: 'https://www.bruenigindoor.ch' }],
  VD: [
    { name: 'Lagardère', ort: 'Morges', href: 'https://www.lagardere.ch' },
    { name: 'Outdoor Enterprise', ort: 'Le Mont-sur-Lausanne', href: 'https://www.outdoor-enterprise.ch' },
    { name: 'Armurerie du Château', ort: 'Puidoux', href: 'https://www.armurerie-du-chateau.ch' },
    { name: 'Ducret Armurerie', ort: 'Orbe', href: 'https://www.armurerie-ducret.ch' },
  ],
  GE: [{ name: 'Armurerie de la Bourse', ort: 'Genève', href: 'https://www.armurerie-bourse.ch' }],
  NE: [{ name: 'Petitpierre Armurerie', ort: 'Auvernier', href: 'https://www.armurerie-petitpierre.ch' }],
  FR: [{ name: 'Tissot Armurerie', ort: 'Fribourg', href: 'https://www.tissot-armurerie.ch' }],
  TI: [
    { name: 'Armeria Bioggio', ort: 'Bioggio', href: 'https://www.armeriabioggio.ch' },
    { name: 'Armeria del Ceresio', ort: 'Melano', href: 'https://www.armeriadelceresio.ch' },
  ],
  VS: [{ name: 'Armurerie Saint-Hubert', ort: 'Martigny', href: 'https://www.armureriesainthubert.ch' }],
};

const CANTONS = Object.entries(DEALERS_BY_CANTON)
  .filter(([, d]) => d.length > 0)
  .map(([kt]) => kt);

const TOTAL_DEALERS = Object.values(DEALERS_BY_CANTON).flat().length;

const PROMOS = [
  { name: 'Frühjahrsputz bei Ingold', meta: '10% auf Reinigungssets bis 31. März', href: '#' },
  { name: '7.5×55 Swiss ab CHF 0.65', meta: 'Munitions-Abverkauf · Solange Vorrat', href: '#' },
  { name: 'Inserat aufgeben — kostenlos', meta: 'gunmarket.ch · Jetzt starten', href: '/inserat/neu' },
];

const TAB_LABELS: Record<string, Record<string, string>> = {
  ev: { de: 'Events', fr: 'Événements', it: 'Eventi', en: 'Events', rm: 'Eveniments' },
  sh: { de: 'Waffenhändler', fr: 'Waffenhändler', it: 'Waffenhändler', en: 'Gun shops', rm: 'Comerziants' },
  pr: { de: 'Aktionen', fr: 'Promotions', it: 'Promozioni', en: 'Promotions', rm: 'Promoziuns' },
};

type TabKey = 'ev' | 'sh' | 'pr';

function getLocale(): string {
  if (typeof window === 'undefined') return 'de';
  const ls = localStorage.getItem('gunmarket_locale') || '';
  const lang = ls || navigator.language?.split('-')[0] || 'de';
  return ['de', 'fr', 'it', 'en', 'rm'].includes(lang) ? lang : 'de';
}

function formatDateRange(date: string, dateEnd: string): string {
  const d = new Date(date);
  const dEnd = new Date(dateEnd);
  const day = d.getDate();
  const dayEnd = dEnd.getDate();
  const month = d.toLocaleDateString('de-CH', { month: 'short' });
  const monthEnd = dEnd.toLocaleDateString('de-CH', { month: 'short' });
  if (date === dateEnd) return `${day}. ${month}`;
  if (month === monthEnd) return `${day}.–${dayEnd}. ${month}`;
  return `${day}. ${month}–${dayEnd}. ${monthEnd}`;
}

// ─── PORTAL DROPDOWN (reusable) ────────────────────────────────────────────
function PortalDropdown({ anchorRef, isOpen, onClose, children }: {
  anchorRef: React.RefObject<HTMLElement>;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (!isOpen || !anchorRef.current) return;
    const r = anchorRef.current.getBoundingClientRect();
    setPos({ top: r.bottom + window.scrollY + 4, left: r.left + window.scrollX, width: r.width });
  }, [isOpen, anchorRef]);

  useEffect(() => {
    if (!isOpen) return;
    const h = (e: MouseEvent) => {
      if (anchorRef.current && !anchorRef.current.contains(e.target as Node)) onClose();
    };
    setTimeout(() => document.addEventListener('click', h), 0);
    return () => document.removeEventListener('click', h);
  }, [isOpen, onClose, anchorRef]);

  if (!isOpen || typeof window === 'undefined') return null;

  return createPortal(
    <div
      className="fixed bg-white border border-gray-200 rounded-xl shadow-xl z-[9999] py-1 overflow-hidden"
      style={{ top: pos.top, left: pos.left, minWidth: 220, maxWidth: 280 }}
      onClick={e => e.stopPropagation()}
    >
      {children}
    </div>,
    document.body
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function BannerZone() {
  const [active, setActive] = useState<TabKey>('ev');
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [locale, setLocale] = useState('de');
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => { setLocale(getLocale()); }, []);

  // Events nach Monat
  const eventsByMonth = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const months: { key: string; label: string; events: typeof ALL_EVENTS }[] = [];
    for (let m = today.getMonth(); m <= 11; m++) {
      const evs = ALL_EVENTS.filter(ev => {
        const d = new Date(ev.date);
        return d.getFullYear() === 2026 && d.getMonth() === m && new Date(ev.dateEnd) >= today;
      }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      if (evs.length) months.push({
        key: `${m}`,
        label: new Date(2026, m, 1).toLocaleDateString('de-CH', { month: 'short' }),
        events: evs,
      });
    }
    return months;
  }, []);

  const totalEvents = eventsByMonth.reduce((s, m) => s + m.events.length, 0);

  const tabs = [
    { key: 'ev' as TabKey, label: TAB_LABELS.ev[locale] || 'Events', count: totalEvents },
    { key: 'sh' as TabKey, label: TAB_LABELS.sh[locale] || 'Händler', count: TOTAL_DEALERS },
    { key: 'pr' as TabKey, label: TAB_LABELS.pr[locale] || 'Aktionen' },
  ];

  return (
    <>
      {/* ── DESKTOP ── */}
      <div className="hidden md:block w-full bg-white border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex items-center" style={{ height: 48 }}>

            {/* Tab Navigation — grüner Underline-Stil */}
            <div className="flex items-center shrink-0 h-full border-r border-gray-200 pr-6 mr-6 gap-0">
              {tabs.map(({ key, label, count }) => (
                <button
                  key={key}
                  onClick={() => { setActive(key); setOpenItem(null); }}
                  className={`relative flex items-center gap-2 px-3 h-full text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
                    active === key
                      ? 'text-[#4d8230] border-[#4d8230]'
                      : 'text-gray-500 border-transparent hover:text-gray-800 hover:border-gray-300'
                  }`}
                >
                  {label}
                  {count !== undefined && (
                    <span className={`text-[10px] font-semibold rounded-full px-1.5 py-0.5 leading-none ${
                      active === key
                        ? 'bg-[#eef5e8] text-[#4d8230]'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Scrollbarer Content */}
            <div
              className="flex items-center gap-2 flex-1 min-w-0 overflow-x-auto"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
            >
              {/* EVENTS: Monats-Pills */}
              {active === 'ev' && eventsByMonth.map(({ key, label, events }) => {
                const id = `ev-${key}`;
                return (
                  <div key={key} className="shrink-0">
                    <button
                      ref={el => { itemRefs.current[id] = el; }}
                      onClick={e => { e.stopPropagation(); setOpenItem(openItem === id ? null : id); }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all whitespace-nowrap ${
                        openItem === id
                          ? 'bg-[#4d8230] text-white border-[#4d8230]'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-[#4d8230] hover:text-[#4d8230]'
                      }`}
                    >
                      {label}
                      <span className={`text-[10px] rounded-full px-1.5 py-0.5 leading-none ${
                        openItem === id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                      }`}>{events.length}</span>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                        style={{ transform: openItem === id ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    </button>
                    <PortalDropdown
                      anchorRef={{ current: itemRefs.current[id] } as React.RefObject<HTMLElement>}
                      isOpen={openItem === id}
                      onClose={() => setOpenItem(null)}
                    >
                      {events.map((ev, i) => (
                        <a key={i} href={ev.href !== '#' ? ev.href : undefined}
                          target={ev.href !== '#' ? '_blank' : undefined} rel="noopener noreferrer"
                          className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#f5faf2] transition-colors group border-b border-gray-50 last:border-0">
                          <div className="bg-[#eef5e8] rounded-lg px-2 py-1 text-center min-w-[44px] shrink-0">
                            <div className="text-[10px] font-bold text-[#4d8230] leading-none whitespace-nowrap">
                              {formatDateRange(ev.date, ev.dateEnd)}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[12px] font-medium text-gray-800 group-hover:text-[#4d8230] truncate">{ev.name}</div>
                            <div className="text-[10px] text-gray-400">{ev.ort}</div>
                          </div>
                          {ev.href !== '#' && (
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                              className="text-gray-300 group-hover:text-[#4d8230] shrink-0">
                              <path d="m9 18 6-6-6-6"/>
                            </svg>
                          )}
                        </a>
                      ))}
                    </PortalDropdown>
                  </div>
                );
              })}

              {/* WAFFENHÄNDLER: Kanton-Pills */}
              {active === 'sh' && CANTONS.map(kt => {
                const id = `sh-${kt}`;
                const dealers = DEALERS_BY_CANTON[kt];
                if (!dealers?.length) return null;
                return (
                  <div key={kt} className="shrink-0">
                    <button
                      ref={el => { itemRefs.current[id] = el; }}
                      onClick={e => { e.stopPropagation(); setOpenItem(openItem === id ? null : id); }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all whitespace-nowrap ${
                        openItem === id
                          ? 'bg-[#4d8230] text-white border-[#4d8230]'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-[#4d8230] hover:text-[#4d8230]'
                      }`}
                    >
                      {kt}
                      <span className={`text-[10px] rounded-full px-1.5 py-0.5 leading-none ${
                        openItem === id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                      }`}>{dealers.length}</span>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                        style={{ transform: openItem === id ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    </button>
                    <PortalDropdown
                      anchorRef={{ current: itemRefs.current[id] } as React.RefObject<HTMLElement>}
                      isOpen={openItem === id}
                      onClose={() => setOpenItem(null)}
                    >
                      <div className="px-3 py-1.5 text-[9px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                        Kanton {kt} — {dealers.length} Händler
                      </div>
                      {dealers.map((d, i) => (
                        <a key={i} href={d.href} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-between px-3 py-2 hover:bg-[#f5faf2] transition-colors group">
                          <div>
                            <div className="text-[12px] font-medium text-gray-800 group-hover:text-[#4d8230]">{d.name}</div>
                            <div className="text-[10px] text-gray-400">{d.ort}</div>
                          </div>
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            className="text-gray-300 group-hover:text-[#4d8230] ml-3 shrink-0">
                            <path d="m9 18 6-6-6-6"/>
                          </svg>
                        </a>
                      ))}
                    </PortalDropdown>
                  </div>
                );
              })}

              {/* AKTIONEN */}
              {active === 'pr' && PROMOS.map((item, i) => (
                <div key={i} className="flex items-center gap-2 shrink-0">
                  {i > 0 && <div className="w-px h-4 bg-gray-200 shrink-0" />}
                  <a href={item.href}
                    className="flex items-center gap-0 bg-white border border-gray-200 rounded-lg hover:border-[#4d8230] transition-colors group overflow-hidden whitespace-nowrap">
                    <div className="bg-[#eef5e8] px-2.5 self-stretch flex items-center border-r border-gray-100">
                      <span className="text-[9px] font-semibold text-[#4d8230]">Aktion</span>
                    </div>
                    <div className="px-2.5 py-1.5">
                      <div className="text-[11px] font-medium text-gray-800 group-hover:text-[#4d8230]">{item.name}</div>
                      <div className="text-[10px] text-gray-400">{item.meta}</div>
                    </div>
                  </a>
                </div>
              ))}

              <div className="shrink-0 w-4" />
            </div>

            {/* Fade rechts */}
            <div className="shrink-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none h-full" />
          </div>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="md:hidden w-full bg-white border-b border-gray-200">
        {/* Mobile Tab Bar */}
        <div className="flex items-center gap-0 border-b border-gray-100 px-4">
          {tabs.map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
                active === key
                  ? 'text-[#4d8230] border-[#4d8230]'
                  : 'text-gray-500 border-transparent'
              }`}
            >
              {label}
              {count !== undefined && (
                <span className={`text-[10px] rounded-full px-1.5 py-0.5 leading-none ${
                  active === key ? 'bg-[#eef5e8] text-[#4d8230]' : 'bg-gray-100 text-gray-400'
                }`}>{count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Mobile Content: horizontal scroll */}
        <div className="overflow-x-auto px-4 py-2" style={{ scrollbarWidth: 'none' }}>
          <div className="flex items-center gap-2" style={{ width: 'max-content' }}>
            {active === 'ev' && eventsByMonth.map(({ key, label, events }) => {
              const id = `mob-ev-${key}`;
              return (
                <div key={key} className="shrink-0">
                  <button
                    ref={el => { itemRefs.current[id] = el; }}
                    onClick={e => { e.stopPropagation(); setOpenItem(openItem === id ? null : id); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium whitespace-nowrap ${
                      openItem === id ? 'bg-[#4d8230] text-white border-[#4d8230]' : 'bg-white text-gray-600 border-gray-200'
                    }`}
                  >
                    {label}
                    <span className={`text-[10px] rounded-full px-1.5 py-0.5 leading-none ${openItem === id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {events.length}
                    </span>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      style={{ transform: openItem === id ? 'rotate(180deg)' : 'none' }}>
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </button>
                  <PortalDropdown
                    anchorRef={{ current: itemRefs.current[id] } as React.RefObject<HTMLElement>}
                    isOpen={openItem === id}
                    onClose={() => setOpenItem(null)}
                  >
                    {events.map((ev, i) => (
                      <a key={i} href={ev.href !== '#' ? ev.href : undefined}
                        target={ev.href !== '#' ? '_blank' : undefined} rel="noopener noreferrer"
                        className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#f5faf2] border-b border-gray-50 last:border-0">
                        <div className="bg-[#eef5e8] rounded-lg px-2 py-1 shrink-0">
                          <div className="text-[10px] font-bold text-[#4d8230] whitespace-nowrap">{formatDateRange(ev.date, ev.dateEnd)}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] font-medium text-gray-800 truncate">{ev.name}</div>
                          <div className="text-[10px] text-gray-400">{ev.ort}</div>
                        </div>
                      </a>
                    ))}
                  </PortalDropdown>
                </div>
              );
            })}

            {active === 'sh' && CANTONS.map(kt => {
              const id = `mob-sh-${kt}`;
              const dealers = DEALERS_BY_CANTON[kt];
              if (!dealers?.length) return null;
              return (
                <div key={kt} className="shrink-0">
                  <button
                    ref={el => { itemRefs.current[id] = el; }}
                    onClick={e => { e.stopPropagation(); setOpenItem(openItem === id ? null : id); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium whitespace-nowrap ${
                      openItem === id ? 'bg-[#4d8230] text-white border-[#4d8230]' : 'bg-white text-gray-600 border-gray-200'
                    }`}
                  >
                    {kt}
                    <span className={`text-[10px] rounded-full px-1.5 py-0.5 leading-none ${openItem === id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {dealers.length}
                    </span>
                  </button>
                  <PortalDropdown
                    anchorRef={{ current: itemRefs.current[id] } as React.RefObject<HTMLElement>}
                    isOpen={openItem === id}
                    onClose={() => setOpenItem(null)}
                  >
                    <div className="px-3 py-1.5 text-[9px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                      Kanton {kt}
                    </div>
                    {dealers.map((d, i) => (
                      <a key={i} href={d.href} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-between px-3 py-2 hover:bg-[#f5faf2]">
                        <div>
                          <div className="text-[12px] font-medium text-gray-800">{d.name}</div>
                          <div className="text-[10px] text-gray-400">{d.ort}</div>
                        </div>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                          className="text-gray-300 ml-3 shrink-0">
                          <path d="m9 18 6-6-6-6"/>
                        </svg>
                      </a>
                    ))}
                  </PortalDropdown>
                </div>
              );
            })}

            {active === 'pr' && PROMOS.map((item, i) => (
              <a key={i} href={item.href}
                className="flex items-center gap-0 bg-white border border-gray-200 rounded-lg overflow-hidden whitespace-nowrap shrink-0">
                <div className="bg-[#eef5e8] px-2 self-stretch flex items-center border-r border-gray-100">
                  <span className="text-[9px] font-semibold text-[#4d8230]">Aktion</span>
                </div>
                <div className="px-2.5 py-1.5">
                  <div className="text-[11px] font-medium text-gray-800">{item.name}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
