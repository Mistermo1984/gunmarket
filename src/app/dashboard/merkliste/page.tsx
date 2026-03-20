"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { X, MapPin, Search, Loader2 } from "lucide-react";
import { PistolenIcon, RepetierIcon, BockflinteIcon, OptikIcon } from "@/components/ui/WeaponIcons";

const waffenIconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  kurzwaffen: PistolenIcon,
  buechsen: RepetierIcon,
  flinten: BockflinteIcon,
  ordonnanzwaffen: RepetierIcon,
  "freie-waffen": RepetierIcon,
  optik: OptikIcon,
  zubehoer: OptikIcon,
  munition: OptikIcon,
};

const RECHTS_MAP: Record<string, { label: string; farbe: string; textfarbe: string }> = {
  frei: { label: "Frei", farbe: "bg-gray-100", textfarbe: "text-gray-700" },
  wes: { label: "WES", farbe: "bg-amber-100", textfarbe: "text-amber-800" },
  "abk-klein": { label: "ABK Klein", farbe: "bg-orange-100", textfarbe: "text-orange-800" },
};

interface FavItem {
  favoriteId: string;
  id: string;
  titel: string;
  kaliber: string;
  preis: number;
  zustand: string;
  kanton: string;
  hauptkategorie: string;
  rechtsstatus: string;
  datum: string;
}

export default function MerklistePage() {
  const { data: session } = useSession();
  const [items, setItems] = useState<FavItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.id) return;
    fetch(`/api/favorites?user_id=${session.user.id}`)
      .then((r) => r.json())
      .then((data) => {
        const mapped = (data.favorites || []).map((f: Record<string, unknown>) => ({
          favoriteId: f.id as string,
          id: f.id as string,
          titel: f.titel as string,
          kaliber: (f.kaliber as string) || "",
          preis: f.preis as number,
          zustand: f.zustand as string,
          kanton: f.kanton as string,
          hauptkategorie: f.hauptkategorie as string,
          rechtsstatus: f.rechtsstatus as string,
          datum: new Date(f.created_at as string).toLocaleDateString("de-CH"),
        }));
        setItems(mapped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session]);

  function removeItem(itemId: string) {
    if (!session?.user?.id) return;
    fetch(`/api/favorites/${itemId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: session.user.id }),
    });
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 size={32} className="animate-spin text-brand-green" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="mb-4 text-gray-200">
          <svg width="80" height="80" viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 28.5l-1.5-1.3C7 20.5 2 16 2 10.5 2 6.4 5.4 3 9.5 3c2.5 0 4.9 1.2 6.5 3 1.6-1.8 4-3 6.5-3C26.6 3 30 6.4 30 10.5c0 5.5-5 10-12.5 16.7L16 28.5z" />
          </svg>
        </div>
        <h2 className="mb-2 font-display text-xl font-bold text-brand-dark">
          Noch nichts auf der Merkliste
        </h2>
        <p className="mb-6 max-w-sm text-sm text-neutral-500">
          Speichern Sie interessante Inserate, um sie später einfach wiederzufinden.
        </p>
        <Link
          href="/suche"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
        >
          <Search size={16} />
          Jetzt stöbern
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-black uppercase tracking-tight text-brand-dark md:text-3xl">
          Merkliste
        </h1>
        <p className="mt-1 text-sm text-neutral-500">{items.length} gespeicherte Inserate</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => {
          const Icon = waffenIconMap[item.hauptkategorie] || OptikIcon;
          const rechts = RECHTS_MAP[item.rechtsstatus] || RECHTS_MAP.frei;
          return (
            <div
              key={item.id}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-brand-border bg-white transition-all hover:border-brand-green/30 hover:shadow-md"
            >
              <button
                onClick={() => removeItem(item.id)}
                className="absolute right-2.5 top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-neutral-400 backdrop-blur-sm transition-colors hover:bg-red-50 hover:text-red-500"
                title="Von Merkliste entfernen"
              >
                <X size={14} />
              </button>

              <Link href={`/inserat/${item.id}`}>
                <div className="flex h-44 items-center justify-center bg-gray-100">
                  <Icon size={48} className="text-gray-300" />
                  <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5">
                    <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${rechts.farbe} ${rechts.textfarbe}`}>
                      {rechts.label}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-3.5">
                  <h3 className="mb-1 truncate text-sm font-semibold text-brand-dark group-hover:text-brand-green">
                    {item.titel}
                  </h3>
                  <div className="mb-2 flex items-center gap-2 font-mono text-xs text-neutral-500">
                    {item.kaliber && <span>{item.kaliber}</span>}
                    {item.kaliber && item.zustand && <span>·</span>}
                    <span>{item.zustand}</span>
                  </div>
                  <p className="mb-2.5 font-display text-lg font-black text-brand-green">
                    CHF {item.preis.toLocaleString("de-CH")}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-brand-border pt-2.5">
                    <span className="flex items-center gap-1 text-xs text-neutral-500">
                      <MapPin size={12} />
                      {item.kanton}
                    </span>
                    <span className="text-[10px] text-neutral-400">{item.datum}</span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
