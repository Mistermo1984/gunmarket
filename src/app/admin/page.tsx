"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  FileText,
  MessageSquare,
  Eye,
  TrendingUp,
  ArrowRight,
  Loader2,
  Shield,
} from "lucide-react";

interface AdminStats {
  users: { total: number; privat: number; haendler: number; admins: number };
  listings: { total: number; aktiv: number; pausiert: number; geloescht: number; totalAufrufe: number; avgPreis: number };
  messages: { total: number; unread: number };
  favorites: { total: number };
  kategorien: { hauptkategorie: string; count: number }[];
  kantone: { kanton: string; count: number }[];
  recentUsers: { id: string; email: string; vorname: string; nachname: string; anbieter_typ: string; is_admin: number; created_at: string }[];
  recentListings: { id: string; titel: string; preis: number; status: string; hauptkategorie: string; created_at: string; vorname: string; nachname: string }[];
}

const KAT_LABELS: Record<string, string> = {
  kurzwaffen: "Kurzwaffen",
  langwaffen: "Langwaffen",
  ordonnanzwaffen: "Ordonnanz",
  luftdruckwaffen: "Luftdruckwaffen",
  optik: "Optik",
  munition: "Munition",
  zubehoer: "Zubehör",
  // Legacy
  buechsen: "Langwaffen",
  flinten: "Langwaffen",
  jagdwaffen: "Langwaffen",
  "freie-waffen": "Luftdruckwaffen",
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin")
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <Loader2 size={32} className="animate-spin text-red-600" />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="p-4 md:p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Shield size={20} className="text-red-600" />
          <h1 className="font-display text-2xl font-black uppercase tracking-tight text-brand-dark md:text-3xl">
            Admin Dashboard
          </h1>
        </div>
        <p className="text-sm text-neutral-500">Gesamtübersicht über die Plattform</p>
      </div>

      {/* Top Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Nutzer gesamt" value={stats.users.total} icon={Users} color="text-blue-500" bg="bg-blue-50" />
        <StatCard label="Inserate gesamt" value={stats.listings.total} icon={FileText} color="text-brand-green" bg="bg-brand-green-light" />
        <StatCard label="Nachrichten" value={stats.messages.total} icon={MessageSquare} color="text-amber-500" bg="bg-amber-50" />
        <StatCard label="Gesamtaufrufe" value={stats.listings.totalAufrufe} icon={Eye} color="text-purple-500" bg="bg-purple-50" />
      </div>

      {/* Secondary Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <MiniStat label="Aktive Inserate" value={stats.listings.aktiv} />
        <MiniStat label="Pausiert" value={stats.listings.pausiert} />
        <MiniStat label="Gelöscht" value={stats.listings.geloescht} />
        <MiniStat label="Ø Preis" value={`CHF ${stats.listings.avgPreis}`} />
        <MiniStat label="Favoriten" value={stats.favorites.total} />
        <MiniStat label="Ungelesene Msg" value={stats.messages.unread} />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* User breakdown */}
        <div className="rounded-xl border border-brand-border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-brand-border px-5 py-4">
            <h2 className="font-display text-lg font-bold text-brand-dark">Nutzer</h2>
            <Link href="/admin/nutzer" className="flex items-center gap-1 text-xs font-medium text-red-600 hover:underline">
              Alle anzeigen <ArrowRight size={12} />
            </Link>
          </div>
          <div className="p-5">
            <div className="mb-4 flex gap-4">
              <div className="flex-1 rounded-lg bg-blue-50 p-3 text-center">
                <p className="text-2xl font-black text-blue-600">{stats.users.privat}</p>
                <p className="text-xs text-neutral-500">Privat</p>
              </div>
              <div className="flex-1 rounded-lg bg-amber-50 p-3 text-center">
                <p className="text-2xl font-black text-amber-600">{stats.users.haendler}</p>
                <p className="text-xs text-neutral-500">Händler</p>
              </div>
              <div className="flex-1 rounded-lg bg-red-50 p-3 text-center">
                <p className="text-2xl font-black text-red-600">{stats.users.admins}</p>
                <p className="text-xs text-neutral-500">Admins</p>
              </div>
            </div>
            <div className="divide-y divide-brand-border">
              {stats.recentUsers.map((u) => (
                <div key={u.id} className="flex items-center gap-3 py-2.5">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${u.is_admin ? "bg-red-600" : "bg-gray-400"}`}>
                    {u.vorname[0]}{u.nachname[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-brand-dark">{u.vorname} {u.nachname}</p>
                    <p className="truncate text-xs text-neutral-400">{u.email}</p>
                  </div>
                  <span className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold ${u.anbieter_typ === "Händler" ? "bg-amber-50 text-amber-600" : "bg-gray-100 text-gray-500"}`}>
                    {u.anbieter_typ}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kategorien breakdown */}
        <div className="rounded-xl border border-brand-border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-brand-border px-5 py-4">
            <h2 className="font-display text-lg font-bold text-brand-dark">Inserate nach Kategorie</h2>
            <Link href="/admin/inserate" className="flex items-center gap-1 text-xs font-medium text-red-600 hover:underline">
              Alle anzeigen <ArrowRight size={12} />
            </Link>
          </div>
          <div className="p-5 space-y-3">
            {stats.kategorien.map((kat) => {
              const pct = stats.listings.total > 0 ? (kat.count / stats.listings.total) * 100 : 0;
              return (
                <div key={kat.hauptkategorie}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-brand-dark">{KAT_LABELS[kat.hauptkategorie] || kat.hauptkategorie}</span>
                    <span className="text-xs text-neutral-400">{kat.count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div className="h-2 rounded-full bg-brand-green transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent listings */}
        <div className="rounded-xl border border-brand-border bg-white shadow-sm">
          <div className="border-b border-brand-border px-5 py-4">
            <h2 className="font-display text-lg font-bold text-brand-dark">Neueste Inserate</h2>
          </div>
          <div className="divide-y divide-brand-border">
            {stats.recentListings.map((l) => (
              <div key={l.id} className="flex items-center gap-3 px-5 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-brand-dark">{l.titel}</p>
                  <p className="text-xs text-neutral-400">{l.vorname} {l.nachname} &middot; CHF {l.preis}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                  l.status === "aktiv" ? "bg-green-50 text-green-600" :
                  l.status === "pausiert" ? "bg-amber-50 text-amber-600" :
                  "bg-red-50 text-red-600"
                }`}>
                  {l.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Kantone */}
        <div className="rounded-xl border border-brand-border bg-white shadow-sm">
          <div className="border-b border-brand-border px-5 py-4">
            <h2 className="font-display text-lg font-bold text-brand-dark">Top Kantone</h2>
          </div>
          <div className="p-5 space-y-3">
            {stats.kantone.map((k, i) => (
              <div key={k.kanton} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-500">
                  {i + 1}
                </span>
                <span className="flex-1 text-sm text-brand-dark">{k.kanton}</span>
                <span className="text-sm font-semibold text-brand-dark">{k.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function StatCard({ label, value, icon: Icon, color, bg }: { label: string; value: number; icon: React.ComponentType<any>; color: string; bg: string }) {
  return (
    <div className="rounded-xl border border-brand-border bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${bg}`}>
          <Icon size={20} className={color} />
        </div>
        <TrendingUp size={14} className="text-neutral-300" />
      </div>
      <p className="font-display text-3xl font-black text-brand-dark">{value.toLocaleString("de-CH")}</p>
      <p className="mt-1 text-xs text-neutral-500">{label}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg border border-brand-border bg-white p-3 text-center">
      <p className="text-lg font-bold text-brand-dark">{typeof value === "number" ? value.toLocaleString("de-CH") : value}</p>
      <p className="text-[10px] text-neutral-400">{label}</p>
    </div>
  );
}
