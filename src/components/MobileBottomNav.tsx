'use client';
import { Suspense, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, LayoutGrid, Plus, User } from 'lucide-react';

const KATEGORIEN = [
  { key: '', label: 'Alle Inserate', icon: '📋' },
  { key: 'kurzwaffen', label: 'Kurzwaffen', icon: '🔫' },
  { key: 'langwaffen', label: 'Langwaffen', icon: '🎯' },
  { key: 'ordonnanzwaffen', label: 'Ordonnanzwaffen', icon: '🏅' },
  { key: 'luftdruckwaffen', label: 'Luftdruckwaffen', icon: '💨' },
  { key: 'munition', label: 'Munition', icon: '🔴' },
  { key: 'optik', label: 'Optik', icon: '🔭' },
  { key: 'zubehoer', label: 'Zubehör & Mehr', icon: '🔧' },
];

export default function MobileBottomNav() {
  return (
    <Suspense fallback={null}>
      <MobileBottomNavInner />
    </Suspense>
  );
}

function MobileBottomNavInner() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showKatSheet, setShowKatSheet] = useState(false);

  const selectedKategorie = searchParams.get('kategorie') || '';

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
          <div className="fixed bottom-16 left-0 right-0 bg-white rounded-t-2xl z-50 shadow-2xl md:hidden max-h-[70vh] overflow-y-auto" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-gray-300" />
            </div>

            {/* Header */}
            <div className="px-4 pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">Kategorie wählen</h2>
            </div>

            {/* Categories */}
            <div className="p-4 grid grid-cols-2 gap-2">
              {KATEGORIEN.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    if (cat.key) {
                      params.set('kategorie', cat.key);
                    } else {
                      params.delete('kategorie');
                    }
                    router.push(`/?${params.toString()}`);
                    setShowKatSheet(false);
                  }}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-3 text-left transition-colors ${
                    selectedKategorie === cat.key
                      ? 'bg-[#4d8230] text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-[#eef5e8] active:bg-[#eef5e8]'
                  }`}
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span className={`text-sm font-medium leading-tight ${
                    selectedKategorie === cat.key ? 'text-white' : 'text-gray-800'
                  }`}>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Clear filter */}
            {selectedKategorie && (
              <div className="px-4 pb-4">
                <button
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete('kategorie');
                    router.push(`/?${params.toString()}`);
                    setShowKatSheet(false);
                  }}
                  className="w-full rounded-xl bg-red-50 text-red-600 py-2.5 text-sm font-medium"
                >
                  Filter löschen — alle Inserate zeigen
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
