'use client';

import { useState, useMemo, useRef, useEffect } from 'react';

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

const DEALERS = [
  { name: 'Gun Factory',               meta: 'Rümlang ZH',              href: 'https://www.gunfactory.ch' },
  { name: 'Munitionsdepot.ch',         meta: 'Zwingen BL',              href: 'https://www.munitionsdepot.ch' },
  { name: 'W. Glaser Waffen',          meta: 'Zürich ZH',               href: 'https://www.wglaser.ch' },
  { name: 'Natur Aktiv / Waffenbörse', meta: 'Dietikon ZH',             href: 'https://www.waffenboerse.ch' },
  { name: 'Felder Jagdhof',            meta: 'Ebikon LU',               href: 'https://www.felder-jagdhof.ch' },
  { name: 'B&T Shop',                  meta: 'Thun / Wallisellen',       href: 'https://www.bt-ag.ch' },
  { name: 'Waffen Ingold',             meta: 'Oensingen SO',            href: 'https://www.waffen-ingold.ch' },
  { name: 'Aebi Waffen',               meta: 'Hasle-Rüegsau BE',        href: 'https://www.aebiwaffen.ch' },
  { name: 'Lagardère',                 meta: 'Morges VD',               href: 'https://www.lagardere.ch' },
  { name: 'Wyss Waffen',               meta: 'Burgdorf BE',             href: 'https://www.wysswaffen.ch' },
  { name: 'Schild Waffen',             meta: 'Wallisellen ZH',          href: 'https://www.schildwaffen.ch' },
  { name: 'Gundam.ch / René Hild',     meta: 'Friltschen TG',           href: 'https://www.gundam.ch' },
  { name: 'Geissbühler Schiesssport',  meta: 'Zuchwil SO',              href: 'https://www.geissbuehler.ch' },
  { name: 'Grünig & Elmiger',          meta: 'Malters LU',              href: 'https://www.gruenel.ch' },
  { name: 'Treehuggers Supply',        meta: 'Bülach ZH',               href: 'https://www.treehuggers.ch' },
  { name: 'Waffen Dobler',             meta: 'Kaltbrunn SG',            href: 'https://www.waffendobler.ch' },
  { name: 'Gunlex',                    meta: 'Lyss BE',                 href: 'https://www.gunlex.ch' },
  { name: 'Brownells Schweiz',         meta: 'Online / Luzern',         href: 'https://www.brownells.ch' },
  { name: 'Poyet AG',                  meta: 'Bern BE',                 href: 'https://www.poyet.ch' },
  { name: 'Outdoor Enterprise',        meta: 'Le Mont-sur-Lausanne VD', href: 'https://www.outdoor-enterprise.ch' },
  { name: 'Hebeisen Hunting',          meta: 'Zürich ZH',               href: 'https://www.hebeisen.ch' },
  { name: 'Waffenshop Gerber',         meta: 'Trubschachen BE',         href: 'https://www.waffenshop-gerber.ch' },
  { name: 'Birkenast',                 meta: 'Zuzwil SG',               href: 'https://www.birkenast.ch' },
  { name: 'Forney Waffen',             meta: 'Zürich ZH',               href: 'https://www.forney-waffen.ch' },
  { name: 'Schwyzer Waffen',           meta: 'Goldau SZ',               href: 'https://www.schwyzerwaffen.ch' },
  { name: 'Tanner Waffen',             meta: 'Thayngen SH',             href: 'https://www.tanner-waffen.ch' },
  { name: 'Fischlin Waffen',           meta: 'Goldau SZ',               href: 'https://www.fischlin-waffen.ch' },
  { name: 'Bürchler Waffen',           meta: 'Zürich ZH',               href: 'https://www.waffen-buerchler.ch' },
  { name: 'Hausammann',                meta: 'Uttwil TG',               href: 'https://www.hausammann.ch' },
  { name: 'Waffen-Zentrum',            meta: 'Gampelen BE',             href: 'https://www.waffen-zentrum.ch' },
  { name: 'Armurerie du Château',      meta: 'Puidoux VD',              href: 'https://www.armurerie-du-chateau.ch' },
  { name: 'Armurerie de la Bourse',    meta: 'Genève GE',               href: 'https://www.armurerie-bourse.ch' },
  { name: 'Petitpierre Armurerie',     meta: 'Auvernier NE',            href: 'https://www.armurerie-petitpierre.ch' },
  { name: 'Ducret Armurerie',          meta: 'Orbe VD',                 href: 'https://www.armurerie-ducret.ch' },
  { name: 'Tissot Armurerie',          meta: 'Fribourg FR',             href: 'https://www.tissot-armurerie.ch' },
  { name: 'Armeria Bioggio',           meta: 'Bioggio TI',              href: 'https://www.armeriabioggio.ch' },
  { name: 'Armeria del Ceresio',       meta: 'Melano TI',               href: 'https://www.armeriadelceresio.ch' },
  { name: 'Waffen Schuler',            meta: 'Brunnen SZ',              href: 'https://www.waffenschuler.ch' },
  { name: 'Kessler Waffen',            meta: 'Degersheim SG',           href: 'https://www.kesslerwaffen.ch' },
  { name: 'Waffen-Pfister',            meta: 'Pfäffikon ZH',            href: 'https://www.waffen-pfister.ch' },
  { name: 'Antikschuss',               meta: 'Aadorf TG',               href: 'https://www.antikschuss.ch' },
  { name: 'Militaria-Shop',            meta: 'Online / Bern',           href: 'https://www.militaria-shop.ch' },
  { name: 'Salvisberg Waffen',         meta: 'Bern BE',                 href: 'https://www.salvisberg-waffen.ch' },
  { name: 'Richner Waffen',            meta: 'Lenzburg AG',             href: 'https://www.richner-waffen.ch' },
  { name: 'Waffen-Friedlin',           meta: 'Zug ZG',                  href: 'https://www.waffenfriedlin.ch' },
  { name: 'Brünig Indoor',             meta: 'Brünig OW',               href: 'https://www.bruenigindoor.ch' },
  { name: 'Waffen Widmer',             meta: 'Horgen ZH',               href: 'https://www.waffen-widmer.ch' },
  { name: 'Swiss P Defence / RUAG',    meta: 'Thun BE',                 href: 'https://www.swissp-defence.com' },
  { name: 'Waffen Zimmermann',         meta: 'Luzern LU',               href: 'https://www.waffen-zimmermann.ch' },
  { name: 'Armurerie Saint-Hubert',    meta: 'Martigny VS',             href: 'https://www.armureriesainthubert.ch' },
];

const PROMOS = [
  { name: 'Frühjahrsputz bei Ingold',     meta: 'Aktion · 10% auf Reinigungssets bis 31. März', href: '#' },
  { name: '7.5×55 Swiss ab CHF 0.65',    meta: 'Aktion · Munitions-Abverkauf · Solange Vorrat', href: '#' },
  { name: 'Inserat aufgeben — kostenlos', meta: 'Info · gunmarket.ch · Jetzt starten',           href: '/inserat/neu' },
];

type TabKey = 'ev' | 'sh' | 'pr';
type Item = { name: string; meta: string; href: string };

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

export default function BannerZone() {
  const [active, setActive] = useState<TabKey>('ev');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const upcomingEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const cutoff = new Date(today);
    cutoff.setDate(cutoff.getDate() + 90);
    return ALL_EVENTS
      .filter(ev => new Date(ev.dateEnd) >= today && new Date(ev.date) <= cutoff)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, []);

  const items: Item[] = useMemo(() => {
    if (active === 'ev') {
      return upcomingEvents.map(ev => ({
        name: ev.name,
        meta: `${formatDateRange(ev.date, ev.dateEnd)} · ${ev.ort}`,
        href: ev.href,
      }));
    }
    if (active === 'sh') return DEALERS;
    return PROMOS;
  }, [active, upcomingEvents]);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
  }, [items]);

  // Mouse-drag-to-scroll
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
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = startScrollLeft.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  const scrollBy = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' });
  };

  const tabs: { key: TabKey; label: string; count?: number }[] = [
    { key: 'ev', label: 'Events', count: upcomingEvents.length },
    { key: 'sh', label: 'Waffenhändler', count: DEALERS.length },
    { key: 'pr', label: 'Aktionen' },
  ];

  return (
    <div className="w-full bg-gray-50 border-t border-b border-gray-200">
      <div className="flex items-center h-11" style={{ minHeight: '44px', maxHeight: '44px' }}>

        {/* Tabs — feste Breite, kein Shrink */}
        <div className="flex items-center shrink-0 px-4 border-r border-gray-200 h-11 gap-0">
          {tabs.map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => { setActive(key as TabKey); setTimeout(updateScrollState, 50); }}
              className={`text-xs px-2.5 h-11 whitespace-nowrap font-medium transition-colors border-b-0 outline-none ${
                active === key ? 'text-[#4d8230]' : 'text-gray-400 hover:text-gray-600'
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

        {/* Pfeil links */}
        {canScrollLeft && (
          <button
            onClick={() => scrollBy('left')}
            className="shrink-0 h-11 px-1.5 text-gray-400 hover:text-[#4d8230] transition-colors border-r border-gray-100"
            style={{ lineHeight: 1 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
          </button>
        )}

        {/* Scroll-container — cursor grab, touch-action pan-x */}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          className="flex items-center gap-2 flex-1 min-w-0 overflow-x-auto select-none px-3 scrollbar-none"
          style={{
            WebkitOverflowScrolling: 'touch',
            cursor: 'grab',
            touchAction: 'pan-x',
          }}
        >
          {items.map((item, i) => (
            <div key={`${active}-${i}`} className="flex items-center gap-2 shrink-0">
              {i > 0 && <div className="w-px h-4 bg-gray-200 shrink-0" />}
              <a
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                onMouseDown={e => e.stopPropagation()}
                className="flex items-center gap-0 bg-white border border-gray-200 rounded-lg hover:border-[#4d8230] transition-colors group overflow-hidden whitespace-nowrap shrink-0"
              >
                <div className="bg-[#eef5e8] px-2.5 self-stretch flex items-center border-r border-gray-100">
                  <span className="text-[10px] font-semibold text-[#4d8230] leading-none">
                    {item.meta.split('·')[0].trim()}
                  </span>
                </div>
                <div className="px-2.5 py-1.5 leading-none">
                  <div className="text-[11px] font-medium text-gray-800 group-hover:text-[#4d8230] transition-colors">
                    {item.name}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {item.meta.split('·').slice(1).join('·').trim()}
                  </div>
                </div>
              </a>
            </div>
          ))}
          {/* Spacer damit letzter Chip nicht am Rand klebt */}
          <div className="shrink-0 w-4" />
        </div>

        {/* Pfeil rechts */}
        {canScrollRight && (
          <button
            onClick={() => scrollBy('right')}
            className="shrink-0 h-11 px-1.5 text-gray-400 hover:text-[#4d8230] transition-colors border-l border-gray-100"
            style={{ lineHeight: 1 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        )}

      </div>
    </div>
  );
}
