'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, LayoutGrid, Plus, User } from 'lucide-react';

const KATEGORIEN = [
  { key: 'kurzwaffen', label: 'Kurzwaffen', icon: '🔫' },
  { key: 'langwaffen', label: 'Langwaffen', icon: '🎯' },
  { key: 'ordonnanzwaffen', label: 'Ordonnanzwaffen', icon: '🏅' },
  { key: 'luftdruckwaffen', label: 'Luftdruckwaffen', icon: '💨' },
  { key: 'munition', label: 'Munition', icon: '🔴' },
  { key: 'optik', label: 'Optik', icon: '🔭' },
  { key: 'zubehoer', label: 'Zubehör & Mehr', icon: '🔧' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [showKatSheet, setShowKatSheet] = useState(false);

  const tabs = [
    { href: '/', icon: Search, label: 'Suchen' },
    { id: 'kategorien', icon: LayoutGrid, label: 'Kategorien' },
    { href: '/inserat/neu', icon: Plus, label: 'Inserat', highlight: true },
    { href: '/dashboard', icon: User, label: 'Konto' },
  ] as const;

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around h-16">
          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            const isKat = 'id' in tab && tab.id === 'kategorien';
            const href = 'href' in tab ? tab.href : undefined;
            const isActive = href ? (pathname === href || (href !== '/' && pathname.startsWith(href))) : showKatSheet;

            if (isKat) {
              return (
                <button
                  key="kategorien"
                  onClick={() => setShowKatSheet(!showKatSheet)}
                  className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-xs"
                >
                  <Icon size={22} className={showKatSheet ? 'text-green-700' : 'text-gray-400'} />
                  <span className={showKatSheet ? 'text-green-700 font-medium' : 'text-gray-400'}>
                    {tab.label}
                  </span>
                </button>
              );
            }

            if ('highlight' in tab && tab.highlight) {
              return (
                <Link key={i} href={href!} className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-xs">
                  <div className="flex flex-col items-center gap-1">
                    <div className="bg-green-700 rounded-full p-2">
                      <Icon size={20} className="text-white" />
                    </div>
                    <span className="text-green-700 font-semibold text-xs">{tab.label}</span>
                  </div>
                </Link>
              );
            }

            return (
              <Link key={i} href={href!} className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-xs">
                <Icon size={22} className={isActive ? 'text-green-700' : 'text-gray-400'} />
                <span className={isActive ? 'text-green-700 font-medium' : 'text-gray-400'}>
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Category bottom sheet */}
      {showKatSheet && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setShowKatSheet(false)} />
          <div className="fixed bottom-16 left-0 right-0 bg-white rounded-t-2xl z-50 p-4 pb-6 shadow-2xl md:hidden pb-[env(safe-area-inset-bottom)]">
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">Kategorien</h3>
            <div className="grid grid-cols-2 gap-2">
              {KATEGORIEN.map(cat => (
                <Link
                  key={cat.key}
                  href={`/?suche=&kategorie=${cat.key}`}
                  onClick={() => setShowKatSheet(false)}
                  className="flex items-center gap-2.5 px-3 py-3 rounded-xl bg-gray-50 hover:bg-[#eef5e8] active:bg-[#eef5e8] transition-colors"
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span className="text-sm font-medium text-gray-800 leading-tight">{cat.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
