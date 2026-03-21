import { initializeSchema, dbAll } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface ListingRow {
  id: string;
  titel: string;
  hauptkategorie: string;
  unterkategorie: string;
  kategorie_confidence: string;
  source_url: string;
  source_id: string;
  preis: number;
  kanton: string;
}

interface StatRow {
  hauptkategorie: string;
  count: number;
  url_count: number;
  title_count: number;
  fallback_count: number;
  manual_count: number;
}

const KATEGORIEN = [
  "kurzwaffen",
  "langwaffen",
  "ordonnanzwaffen",
  "luftdruckwaffen",
  "munition",
  "optik",
  "zubehoer",
];

export default async function VerifikationPage() {
  await initializeSchema();

  // Listings with uncertain categorization
  const uncertain = await dbAll<ListingRow>(`
    SELECT id, titel, hauptkategorie, unterkategorie, kategorie_confidence, source_url, source_id, preis, kanton
    FROM listings
    WHERE kategorie_confidence IN ('title', 'fallback') AND status = 'aktiv'
    ORDER BY
      CASE kategorie_confidence WHEN 'fallback' THEN 0 WHEN 'title' THEN 1 ELSE 2 END,
      created_at DESC
    LIMIT 100
  `);

  // Category statistics
  const stats = await dbAll<StatRow>(`
    SELECT
      hauptkategorie,
      COUNT(*) as count,
      SUM(CASE WHEN kategorie_confidence = 'url' THEN 1 ELSE 0 END) as url_count,
      SUM(CASE WHEN kategorie_confidence = 'title' THEN 1 ELSE 0 END) as title_count,
      SUM(CASE WHEN kategorie_confidence = 'fallback' THEN 1 ELSE 0 END) as fallback_count,
      SUM(CASE WHEN kategorie_confidence = 'manual' THEN 1 ELSE 0 END) as manual_count
    FROM listings
    WHERE status = 'aktiv'
    GROUP BY hauptkategorie
    ORDER BY count DESC
  `);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <Link
            href="/admin/crawling"
            className="text-sm text-gray-500 hover:text-[#4d8230] transition-colors"
          >
            Crawling
          </Link>
          <span className="text-gray-300">/</span>
          <h1 className="text-2xl font-bold text-gray-900">Kategorie-Verifikation</h1>
        </div>
        <p className="text-gray-500 text-sm">
          Listings mit unsicherer automatischer Kategorisierung zur manuellen Pruefung.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
        {stats.map((s) => (
          <div
            key={s.hauptkategorie}
            className="bg-white border border-gray-200 rounded-xl p-4"
          >
            <div className="text-sm font-semibold text-gray-700 mb-2 capitalize">
              {s.hauptkategorie}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{s.count}</div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-1 text-xs">
                <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                <span className="text-gray-500">URL sicher: {s.url_count}</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span className="text-gray-500">Titel-Match: {s.title_count}</span>
              </div>
              {Number(s.fallback_count) > 0 && (
                <div className="flex items-center gap-1 text-xs">
                  <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                  <span className="text-gray-500">Unsicher: {s.fallback_count}</span>
                </div>
              )}
              {Number(s.manual_count) > 0 && (
                <div className="flex items-center gap-1 text-xs">
                  <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                  <span className="text-gray-500">Manuell: {s.manual_count}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Uncertain Listings */}
      <h2 className="text-lg font-semibold mb-3">
        Zu pruefen ({uncertain.length})
        <span className="ml-2 text-sm font-normal text-gray-500">
          Kategorie unsicher, bitte manuell korrigieren
        </span>
      </h2>

      <div className="space-y-2">
        {uncertain.map((l) => (
          <div
            key={l.id}
            className="bg-white border border-gray-200 rounded-xl p-4 flex flex-wrap items-center gap-3"
          >
            {/* Confidence Badge */}
            <span
              className={`shrink-0 text-[10px] font-semibold px-2 py-1 rounded-full ${
                l.kategorie_confidence === "title"
                  ? "bg-amber-100 text-amber-700 border border-amber-200"
                  : "bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              {l.kategorie_confidence === "title" ? "Titel-Match" : "Unsicher"}
            </span>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-800 truncate">
                {l.titel}
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-xs text-gray-500">CHF {l.preis}</span>
                {l.kanton && (
                  <span className="text-xs text-gray-400">{l.kanton}</span>
                )}
                {l.source_url && (
                  <a
                    href={l.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#4d8230] hover:underline"
                  >
                    Original ansehen
                  </a>
                )}
              </div>
            </div>

            {/* Current Category */}
            <div className="shrink-0 text-sm text-gray-500">
              Aktuell:{" "}
              <span className="font-medium text-gray-800">{l.hauptkategorie}</span>
            </div>

            {/* Re-classify form */}
            <form
              action="/api/admin/listings/reklassifizieren"
              method="POST"
              className="flex items-center gap-2 shrink-0"
            >
              <input type="hidden" name="id" value={l.id} />
              <select
                name="hauptkategorie"
                defaultValue={l.hauptkategorie}
                className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-[#4d8230]"
              >
                {KATEGORIEN.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="text-xs bg-[#4d8230] text-white px-3 py-1.5 rounded-lg hover:bg-[#3d6226] transition-colors"
              >
                Speichern
              </button>
              <Link
                href={`/inserat/${l.id}`}
                target="_blank"
                className="text-xs border border-gray-200 text-gray-500 px-3 py-1.5 rounded-lg hover:border-[#4d8230] hover:text-[#4d8230] transition-colors"
              >
                PDP
              </Link>
            </form>
          </div>
        ))}

        {uncertain.length === 0 && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <div className="text-green-700 font-medium">
              Alle Listings sind korrekt kategorisiert
            </div>
            <div className="text-green-600 text-sm mt-1">
              Keine manuellen Korrekturen noetig
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
