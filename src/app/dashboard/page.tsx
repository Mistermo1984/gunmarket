"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  FileText,
  Eye,
  Heart,
  MessageSquare,
  Plus,
  ArrowRight,
  BookOpen,
  UserCheck,
} from "lucide-react";
import ToastContainer from "@/components/ui/Toast";
import { useToast } from "@/hooks/useToast";

interface StatData {
  label: string;
  value: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  color: string;
}

function useCountUp(end: number, duration = 800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let current = 0;
    const steps = 30;
    const increment = end / steps;
    const interval = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [end, duration]);
  return count;
}

function StatCard({ stat }: { stat: StatData }) {
  const animatedValue = useCountUp(stat.value);
  return (
    <div className="rounded-xl border border-brand-border bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <stat.icon size={20} className={stat.color} />
      </div>
      <p className="font-display text-3xl font-black text-brand-dark">{animatedValue}</p>
      <p className="mt-1 text-xs text-neutral-500">{stat.label}</p>
    </div>
  );
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const toast = useToast();

  const [stats, setStats] = useState<StatData[]>([
    { label: "Aktive Inserate", value: 0, icon: FileText, color: "text-brand-green" },
    { label: "Gesamtaufrufe", value: 0, icon: Eye, color: "text-blue-500" },
    { label: "Auf Merkliste", value: 0, icon: Heart, color: "text-red-500" },
    { label: "Neue Nachrichten", value: 0, icon: MessageSquare, color: "text-amber-500" },
  ]);

  const [recentListings, setRecentListings] = useState<
    { id: string; titel: string; status: string; aufrufe: number; datum: string }[]
  >([]);
  const [listingStatuses, setListingStatuses] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!session?.user?.id) return;
    const userId = session.user.id;

    // Fetch user's listings
    fetch(`/api/listings?user_id=${userId}&limit=5`)
      .then((r) => r.json())
      .then((data) => {
        const listings = data.listings || [];
        const aktive = listings.filter((l: Record<string, unknown>) => l.status === "aktiv").length;
        const totalAufrufe = listings.reduce(
          (sum: number, l: Record<string, unknown>) => sum + ((l.aufrufe as number) || 0),
          0
        );

        const recent = listings.slice(0, 3).map((l: Record<string, unknown>) => ({
          id: l.id as string,
          titel: l.titel as string,
          status: l.status as string,
          aufrufe: (l.aufrufe as number) || 0,
          datum: new Date(l.created_at as string).toLocaleDateString("de-CH"),
        }));
        setRecentListings(recent);

        const statuses: Record<string, string> = {};
        for (const l of recent) statuses[l.id] = l.status;
        setListingStatuses(statuses);

        // Fetch favorites count
        fetch(`/api/favorites?user_id=${userId}`)
          .then((r) => r.json())
          .then((favData) => {
            const favCount = (favData.favorites || []).length;

            // Fetch messages count
            fetch(`/api/messages?user_id=${userId}`)
              .then((r) => r.json())
              .then((msgData) => {
                const unreadCount = (msgData.messages || []).filter(
                  (m: Record<string, unknown>) =>
                    m.receiver_id === userId && !m.read_at
                ).length;

                setStats([
                  { label: "Aktive Inserate", value: aktive, icon: FileText, color: "text-brand-green" },
                  { label: "Gesamtaufrufe", value: totalAufrufe, icon: Eye, color: "text-blue-500" },
                  { label: "Auf Merkliste", value: favCount, icon: Heart, color: "text-red-500" },
                  { label: "Neue Nachrichten", value: unreadCount, icon: MessageSquare, color: "text-amber-500" },
                ]);
              });
          });
      });
  }, [session]);

  function toggleStatus(id: string) {
    const current = listingStatuses[id];
    const next = current === "aktiv" ? "pausiert" : "aktiv";

    fetch(`/api/listings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });

    setListingStatuses((prev) => ({ ...prev, [id]: next }));
    if (next === "aktiv") toast.success("Inserat aktiviert");
    else toast.info("Inserat pausiert");
  }

  const userName = session?.user?.vorname || "Nutzer";

  return (
    <div className="p-4 md:p-8 animate-fade-in">
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-black uppercase tracking-tight text-brand-dark md:text-3xl">
            Übersicht
          </h1>
          <p className="mt-1 text-sm text-neutral-500">Willkommen zurück, {userName}</p>
        </div>
        <Link
          href="/dashboard/inserat-erstellen"
          className="hidden items-center gap-2 rounded-lg bg-brand-green px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark sm:inline-flex"
        >
          <Plus size={16} />
          Neues Inserat
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent listings */}
        <div className="rounded-xl border border-brand-border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-brand-border px-5 py-4">
            <h2 className="font-display text-lg font-bold text-brand-dark">Meine Inserate</h2>
            <Link
              href="/dashboard/inserate"
              className="flex items-center gap-1 text-xs font-medium text-brand-green hover:underline"
            >
              Alle anzeigen <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-brand-border">
            {recentListings.length === 0 && (
              <div className="px-5 py-8 text-center text-sm text-neutral-400">
                Noch keine Inserate vorhanden
              </div>
            )}
            {recentListings.map((listing) => {
              const status = listingStatuses[listing.id] || listing.status;
              return (
                <div
                  key={listing.id}
                  className="flex items-center gap-4 px-5 py-3.5 transition-colors duration-150 hover:bg-brand-grey/50"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                    <FileText size={16} className="text-gray-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-brand-dark">{listing.titel}</p>
                    <p className="text-xs text-neutral-400">{listing.datum}</p>
                  </div>
                  <button
                    onClick={() => toggleStatus(listing.id)}
                    className={`relative shrink-0 h-7 w-14 rounded-full transition-colors duration-300 ${
                      status === "aktiv" ? "bg-brand-green" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
                        status === "aktiv" ? "left-[30px]" : "left-0.5"
                      }`}
                    />
                  </button>
                  <span className="hidden shrink-0 text-xs text-neutral-400 sm:block">
                    {listing.aufrufe} Aufrufe
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick actions instead of mock activity */}
        <div className="rounded-xl border border-brand-border bg-white shadow-sm">
          <div className="border-b border-brand-border px-5 py-4">
            <h2 className="font-display text-lg font-bold text-brand-dark">Schnellzugriff</h2>
          </div>
          <div className="p-5 space-y-3">
            <Link
              href="/dashboard/inserat-erstellen"
              className="flex items-center gap-3 rounded-xl border border-brand-border p-4 transition-all duration-200 hover:border-brand-green/30 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green-light">
                <Plus size={20} className="text-brand-green" />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-dark">Neues Inserat</p>
                <p className="text-xs text-neutral-500">Jetzt inserieren</p>
              </div>
            </Link>
            <Link
              href="/dashboard/profil"
              className="flex items-center gap-3 rounded-xl border border-brand-border p-4 transition-all duration-200 hover:border-amber-300/50 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                <UserCheck size={20} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-dark">Profil bearbeiten</p>
                <p className="text-xs text-neutral-500">Angaben aktualisieren</p>
              </div>
            </Link>
            <Link
              href="/waffenrecht"
              className="flex items-center gap-3 rounded-xl border border-brand-border p-4 transition-all duration-200 hover:border-neutral-300 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <BookOpen size={20} className="text-neutral-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-dark">Waffenrecht CH</p>
                <p className="text-xs text-neutral-500">Infos & Übersicht</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
