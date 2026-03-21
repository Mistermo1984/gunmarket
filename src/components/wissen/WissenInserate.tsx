"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface Listing {
  id: string;
  titel: string;
  preis: number;
  kanton: string;
  images?: { url: string }[];
  image_url?: string;
}

interface WissenInserateProps {
  suchbegriff: string;
  waffenTitel: string;
}

export default function WissenInserate({ suchbegriff, waffenTitel }: WissenInserateProps) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/listings?suche=${encodeURIComponent(suchbegriff)}&limit=6&sort=neueste`)
      .then((r) => r.json())
      .then((d) => {
        const items = (d.listings || [])
          .filter((l: Record<string, unknown>) => l.preis && (l.preis as number) > 0)
          .slice(0, 4)
          .map((l: Record<string, unknown>) => ({
            id: l.id as string,
            titel: l.titel as string,
            preis: l.preis as number,
            kanton: (l.kanton as string) || "",
            images: l.images as { url: string }[] | undefined,
            image_url: l.image_url as string | undefined,
          }));
        setListings(items);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [suchbegriff]);

  if (loading) {
    return (
      <div className="my-8 rounded-xl border border-brand-border bg-brand-grey p-6">
        <div className="flex h-20 items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-green border-t-transparent" />
        </div>
      </div>
    );
  }

  if (listings.length === 0) return null;

  return (
    <div className="my-8 rounded-xl border border-brand-green/30 bg-brand-green-light p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-base font-bold uppercase tracking-tight text-brand-dark">
          Aktuelle Inserate — {waffenTitel}
        </h3>
        <Link
          href={`/?suche=${encodeURIComponent(suchbegriff)}`}
          className="flex items-center gap-1 text-xs font-medium text-brand-green hover:underline"
        >
          Alle ansehen
          <ExternalLink size={12} />
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {listings.map((l) => {
          const imgUrl = l.images?.[0]?.url || l.image_url;
          return (
            <Link
              key={l.id}
              href={`/inserat/${l.id}`}
              className="group flex items-center gap-3 rounded-lg bg-white p-3 transition-all hover:shadow-md"
            >
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                {imgUrl && (
                  <img
                    src={imgUrl}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-brand-dark group-hover:text-brand-green">
                  {l.titel}
                </p>
                <p className="text-xs text-neutral-500">{l.kanton}</p>
              </div>
              <p className="shrink-0 text-sm font-bold text-green-700">
                CHF {l.preis.toLocaleString("de-CH")}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
