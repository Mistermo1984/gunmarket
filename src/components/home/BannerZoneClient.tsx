'use client';

import { useState, useMemo } from 'react';
import type { BannerEvent, BannerItem } from './bannerData';
import { formatEventDate, DEALERS } from './bannerData';

type TabKey = 'ev' | 'sh' | 'pr';

export default function BannerZoneClient({
  initialEvents,
  dealers,
  promos,
}: {
  initialEvents: BannerEvent[];
  dealers: BannerItem[];
  promos: BannerItem[];
}) {
  const [active, setActive] = useState<TabKey>('ev');

  const items = useMemo(() => {
    if (active === 'ev') {
      return initialEvents.map(ev => ({
        name: ev.name,
        meta: `${formatEventDate(ev.date, ev.dateEnd)} · ${ev.ort}`,
        href: ev.href,
      }));
    }
    if (active === 'sh') return dealers;
    return promos;
  }, [active, initialEvents, dealers, promos]);

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'ev', label: 'Events' },
    { key: 'sh', label: 'Waffenhändler' },
    { key: 'pr', label: 'Aktionen' },
  ];

  return (
    <div className="w-full bg-gray-50 border-t border-b border-gray-200">
      <div className="flex items-center h-12 px-6">

        {/* Tabs links */}
        <div className="flex items-center shrink-0 pr-5 mr-5 border-r border-gray-200 h-12 gap-0">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`text-xs px-3 h-12 border-b-2 transition-all whitespace-nowrap font-medium ${
                active === key
                  ? 'text-[#4d8230] border-[#4d8230]'
                  : 'text-gray-400 border-transparent hover:text-gray-600'
              }`}
            >
              {label}
              {key === 'ev' && (
                <span className="ml-1.5 text-[10px] bg-[#4d8230] text-white rounded-full px-1.5 py-0.5">
                  {initialEvents.length}
                </span>
              )}
              {key === 'sh' && (
                <span className="ml-1.5 text-[10px] bg-gray-400 text-white rounded-full px-1.5 py-0.5">
                  {DEALERS.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Scroll-Wrapper: overflow NUR hier, nicht am Parent */}
        <div className="relative min-w-0 flex-1">
          {/* Fade rechts — zeigt dass mehr Inhalt vorhanden */}
          <div
            className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to left, #f9fafb 30%, transparent)' }}
          />
          {/* Scroll-Container mit explizitem padding-right damit letzter Chip nicht klebt */}
          <div
            className="flex items-center gap-2 overflow-x-auto pr-16"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' as React.CSSProperties['msOverflowStyle'] }}
          >
            {items.length === 0 && active === 'ev' && (
              <span className="text-xs text-gray-400 whitespace-nowrap">
                Keine Events in den nächsten 90 Tagen
              </span>
            )}
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-2 shrink-0">
                {i > 0 && <div className="w-px h-4 bg-gray-200 shrink-0" />}
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-0 bg-white border border-gray-200 rounded-lg hover:border-[#4d8230] transition-colors group overflow-hidden whitespace-nowrap shrink-0"
                >
                  <div className="bg-[#eef5e8] px-2.5 py-2 self-stretch flex items-center border-r border-gray-100">
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
          </div>
        </div>

      </div>
    </div>
  );
}
