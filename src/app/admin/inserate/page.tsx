"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Trash2,
  Loader2,
  Search,
  Eye,
  Heart,
  MessageSquare,
  ExternalLink,
  Play,
  Pause,
  XCircle,
} from "lucide-react";

interface AdminListing {
  id: string;
  titel: string;
  beschreibung: string;
  hauptkategorie: string;
  unterkategorie: string;
  rechtsstatus: string;
  marke: string;
  modell: string;
  preis: number;
  zustand: string;
  kanton: string;
  ortschaft: string;
  status: string;
  aufrufe: number;
  created_at: string;
  user_id: string;
  vorname: string;
  nachname: string;
  user_email: string;
  anbieter_typ: string;
  favorite_count: number;
  message_count: number;
}

const KAT_LABELS: Record<string, string> = {
  kurzwaffen: "Kurzwaffen",
  buechsen: "Büchsen",
  flinten: "Flinten",
  jagdwaffen: "Jagdwaffen",
  ordonnanzwaffen: "Ordonnanz",
  "freie-waffen": "Freie Waffen",
  optik: "Optik",
  munition: "Munition",
  zubehoer: "Zubehör",
};

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  aktiv: { label: "Aktiv", color: "bg-green-50 text-green-600" },
  pausiert: { label: "Pausiert", color: "bg-amber-50 text-amber-600" },
  geloescht: { label: "Gelöscht", color: "bg-red-50 text-red-600" },
};

export default function AdminInseratePage() {
  const [listings, setListings] = useState<AdminListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("alle");
  const [katFilter, setKatFilter] = useState<string>("alle");

  useEffect(() => {
    fetch("/api/admin/listings")
      .then((r) => r.json())
      .then((data) => {
        setListings(data.listings || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function changeStatus(id: string, status: string) {
    await fetch("/api/admin/listings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listing_id: id, status }),
    });
    setListings((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  }

  async function deleteListing(id: string, titel: string) {
    if (!confirm(`Inserat "${titel}" endgültig löschen?`)) return;
    await fetch(`/api/admin/listings?listing_id=${id}`, { method: "DELETE" });
    setListings((prev) => prev.filter((l) => l.id !== id));
  }

  const filtered = listings.filter((l) => {
    const matchSearch =
      !search ||
      l.titel.toLowerCase().includes(search.toLowerCase()) ||
      l.marke?.toLowerCase().includes(search.toLowerCase()) ||
      `${l.vorname} ${l.nachname}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "alle" || l.status === statusFilter;
    const matchKat = katFilter === "alle" || l.hauptkategorie === katFilter;
    return matchSearch && matchStatus && matchKat;
  });

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <Loader2 size={32} className="animate-spin text-red-600" />
      </div>
    );
  }

  const uniqueKats = Array.from(new Set(listings.map((l) => l.hauptkategorie)));

  return (
    <div className="p-4 md:p-8 animate-fade-in">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <FileText size={20} className="text-red-600" />
          <h1 className="font-display text-2xl font-black uppercase tracking-tight text-brand-dark">
            Inserateverwaltung
          </h1>
        </div>
        <p className="text-sm text-neutral-500">{listings.length} Inserate total</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Titel, Marke oder Verkäufer suchen..."
            className="w-full rounded-lg border border-brand-border bg-white py-2.5 pl-10 pr-4 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-brand-border bg-white px-3 py-2.5 text-sm"
        >
          <option value="alle">Alle Status</option>
          <option value="aktiv">Aktiv</option>
          <option value="pausiert">Pausiert</option>
          <option value="geloescht">Gelöscht</option>
        </select>
        <select
          value={katFilter}
          onChange={(e) => setKatFilter(e.target.value)}
          className="rounded-lg border border-brand-border bg-white px-3 py-2.5 text-sm"
        >
          <option value="alle">Alle Kategorien</option>
          {uniqueKats.map((k) => (
            <option key={k} value={k}>{KAT_LABELS[k] || k}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-brand-border bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-border bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-brand-dark">Inserat</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-dark hidden md:table-cell">Verkäufer</th>
                <th className="px-4 py-3 text-right font-semibold text-brand-dark">Preis</th>
                <th className="px-4 py-3 text-center font-semibold text-brand-dark hidden sm:table-cell">Status</th>
                <th className="px-4 py-3 text-center font-semibold text-brand-dark hidden lg:table-cell">
                  <Eye size={14} className="inline" />
                </th>
                <th className="px-4 py-3 text-center font-semibold text-brand-dark hidden lg:table-cell">
                  <Heart size={14} className="inline" />
                </th>
                <th className="px-4 py-3 text-center font-semibold text-brand-dark hidden lg:table-cell">
                  <MessageSquare size={14} className="inline" />
                </th>
                <th className="px-4 py-3 text-right font-semibold text-brand-dark">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {filtered.map((listing) => {
                const statusInfo = STATUS_LABELS[listing.status] || { label: listing.status, color: "bg-gray-100 text-gray-500" };
                return (
                  <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="truncate font-medium text-brand-dark max-w-[200px] lg:max-w-[300px]">{listing.titel}</p>
                          <Link href={`/inserat/${listing.id}`} className="shrink-0 text-neutral-300 hover:text-brand-green">
                            <ExternalLink size={12} />
                          </Link>
                        </div>
                        <p className="text-xs text-neutral-400">
                          {KAT_LABELS[listing.hauptkategorie] || listing.hauptkategorie} &middot; {listing.kanton}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-sm text-brand-dark">{listing.vorname} {listing.nachname}</p>
                      <p className="text-xs text-neutral-400">{listing.anbieter_typ}</p>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-brand-dark whitespace-nowrap">
                      CHF {listing.preis.toLocaleString("de-CH")}
                    </td>
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-neutral-500 hidden lg:table-cell">{listing.aufrufe}</td>
                    <td className="px-4 py-3 text-center text-neutral-500 hidden lg:table-cell">{listing.favorite_count}</td>
                    <td className="px-4 py-3 text-center text-neutral-500 hidden lg:table-cell">{listing.message_count}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {listing.status !== "aktiv" && (
                          <button
                            onClick={() => changeStatus(listing.id, "aktiv")}
                            title="Aktivieren"
                            className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-green-50 hover:text-green-600"
                          >
                            <Play size={14} />
                          </button>
                        )}
                        {listing.status === "aktiv" && (
                          <button
                            onClick={() => changeStatus(listing.id, "pausiert")}
                            title="Pausieren"
                            className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-amber-50 hover:text-amber-600"
                          >
                            <Pause size={14} />
                          </button>
                        )}
                        {listing.status !== "geloescht" && (
                          <button
                            onClick={() => changeStatus(listing.id, "geloescht")}
                            title="Soft-Delete"
                            className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500"
                          >
                            <XCircle size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteListing(listing.id, listing.titel)}
                          title="Endgültig löschen"
                          className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-neutral-400">
            Keine Inserate gefunden
          </div>
        )}
      </div>
    </div>
  );
}
