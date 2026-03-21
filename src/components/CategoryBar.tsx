import Link from 'next/link';

const CATEGORIES = [
  { href: '/inserate?kategorie=kurzwaffen', emoji: '🔫', label: 'Kurzwaffen' },
  { href: '/inserate?kategorie=langwaffen', emoji: '🎯', label: 'Langwaffen' },
  { href: '/inserate?kategorie=ordonnanzwaffen', emoji: '🪖', label: 'Ordonnanz' },
  { href: '/inserate?kategorie=optik', emoji: '🔭', label: 'Optik' },
  { href: '/inserate?kategorie=munition', emoji: '🔶', label: 'Munition' },
  { href: '/inserate?kategorie=zubehoer', emoji: '🔧', label: 'Zubehör' },
  { href: '/inserate?kategorie=messer', emoji: '🗡️', label: 'Messer' },
  { href: '/inserate?kategorie=luftdruck', emoji: '💨', label: 'Luftdruck' },
  { href: '/inserate?kategorie=jagd', emoji: '🦌', label: 'Jagd' },
  { href: '/inserate?kategorie=wiederladen', emoji: '⚙️', label: 'Wiederladen' },
];

export default function CategoryBar() {
  return (
    <div className="hidden md:block bg-white border-b border-gray-100 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.href}
              href={cat.href}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-600 hover:text-green-700 whitespace-nowrap transition-colors flex-shrink-0"
            >
              <span className="text-lg">{cat.emoji}</span>
              <span className="font-medium">{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
