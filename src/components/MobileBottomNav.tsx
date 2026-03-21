'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, LayoutGrid, Plus, User } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();

  const tabs = [
    { href: '/inserate', icon: Search, label: 'Suchen' },
    { href: '/inserate?kategorie=alle', icon: LayoutGrid, label: 'Kategorien' },
    { href: '/inserat/neu', icon: Plus, label: 'Inserat', highlight: true },
    { href: '/profil', icon: User, label: 'Konto' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href || pathname.startsWith(tab.href.split('?')[0]);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-xs"
            >
              {tab.highlight ? (
                <div className="flex flex-col items-center gap-1">
                  <div className="bg-green-700 rounded-full p-2">
                    <Icon size={20} className="text-white" />
                  </div>
                  <span className="text-green-700 font-semibold text-xs">{tab.label}</span>
                </div>
              ) : (
                <>
                  <Icon
                    size={22}
                    className={isActive ? 'text-green-700' : 'text-gray-400'}
                  />
                  <span className={isActive ? 'text-green-700 font-medium' : 'text-gray-400'}>
                    {tab.label}
                  </span>
                </>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
