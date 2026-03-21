'use client';

import { useState } from 'react';

const bzData = {
  ev: {
    label: 'Events & Börsen',
    items: [
      { name: 'Waffenbörse Bernexpo', meta: '15.–16. März · Bern', href: '#' },
      { name: 'Ordonnanz-Schiessen BEJV', meta: '22. März · Thun BE', href: '#' },
      { name: 'Pistolenschiessen Zürich', meta: '5. April · Zürich', href: '#' },
    ],
  },
  sh: {
    label: 'Partnerhändler',
    items: [
      { name: 'Ingold Waffen', meta: 'Schaffhausen', href: '#' },
      { name: 'Aebi Waffen', meta: 'Luzern', href: '#' },
      { name: 'Swiss Guns', meta: 'Bern', href: '#' },
    ],
  },
  pr: {
    label: 'Aktionen',
    items: [
      { name: 'Frühjahrsputz bei Ingold', meta: '10% Rabatt bis 31. März', href: '#' },
      { name: '7.5×55 Swiss ab CHF 0.65', meta: 'Solange Vorrat', href: '#' },
      { name: 'Kostenlos inserieren', meta: 'In 2 Min. online', href: '/inserat/neu' },
    ],
  },
} as const;

type TabKey = keyof typeof bzData;

export default function BannerZone() {
  const [active, setActive] = useState<TabKey>('ev');
  const current = bzData[active];

  return (
    <div className="hidden md:block w-full bg-gray-50 border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 flex items-center h-12 gap-0">

        {/* Tab Switcher — links */}
        <div className="flex items-center gap-0 shrink-0 pr-5 mr-5 border-r border-gray-200 h-12">
          {(Object.keys(bzData) as TabKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`text-xs px-3 h-12 border-b-2 transition-all whitespace-nowrap font-medium ${
                active === key
                  ? 'text-[#4d8230] border-[#4d8230]'
                  : 'text-gray-400 border-transparent hover:text-gray-600'
              }`}
            >
              {bzData[key].label}
            </button>
          ))}
        </div>

        {/* Items — rechts, scrollbar */}
        <div className="flex items-center gap-2 flex-1 overflow-hidden">
          {current.items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0">
              {i > 0 && (
                <div className="w-px h-4 bg-gray-200 shrink-0" />
              )}
              <a
                href={item.href}
                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:border-[#4d8230] transition-colors group"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#4d8230] shrink-0" />
                <div className="leading-none">
                  <div className="text-[12px] font-medium text-gray-800 group-hover:text-[#4d8230] transition-colors">
                    {item.name}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {item.meta}
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
