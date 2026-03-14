"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Shield,
  ShieldOff,
  Trash2,
  Loader2,
  Search,
  FileText,
  Eye,
  Mail,
} from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  vorname: string;
  nachname: string;
  anbieter_typ: string;
  telefon: string | null;
  kanton: string | null;
  firmenname: string | null;
  is_admin: number;
  created_at: string;
  listing_count: number;
  total_aufrufe: number;
  messages_sent: number;
  messages_received: number;
}

export default function AdminNutzerPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"alle" | "privat" | "haendler" | "admin">("alle");

  useEffect(() => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((data) => {
        setUsers(data.users || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function toggleAdmin(userId: string, currentAdmin: number) {
    const newAdmin = currentAdmin === 1 ? 0 : 1;
    await fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, is_admin: newAdmin }),
    });
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, is_admin: newAdmin } : u))
    );
  }

  async function deleteUser(userId: string, name: string) {
    if (!confirm(`Nutzer "${name}" wirklich löschen? Alle Inserate und Nachrichten werden ebenfalls gelöscht.`)) return;
    await fetch(`/api/admin/users?user_id=${userId}`, { method: "DELETE" });
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  }

  const filtered = users.filter((u) => {
    const matchSearch =
      !search ||
      `${u.vorname} ${u.nachname}`.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "alle" ||
      (filter === "privat" && u.anbieter_typ === "Privat" && !u.is_admin) ||
      (filter === "haendler" && u.anbieter_typ === "Händler") ||
      (filter === "admin" && u.is_admin === 1);

    return matchSearch && matchFilter;
  });

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <Loader2 size={32} className="animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 animate-fade-in">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Users size={20} className="text-red-600" />
          <h1 className="font-display text-2xl font-black uppercase tracking-tight text-brand-dark">
            Nutzerverwaltung
          </h1>
        </div>
        <p className="text-sm text-neutral-500">{users.length} Nutzer registriert</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name oder E-Mail suchen..."
            className="w-full rounded-lg border border-brand-border bg-white py-2.5 pl-10 pr-4 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
          />
        </div>
        <div className="flex gap-2">
          {(["alle", "privat", "haendler", "admin"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                filter === f ? "bg-red-600 text-white" : "bg-white border border-brand-border text-neutral-600 hover:bg-gray-50"
              }`}
            >
              {f === "alle" ? "Alle" : f === "privat" ? "Privat" : f === "haendler" ? "Händler" : "Admins"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-brand-border bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-border bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-brand-dark">Nutzer</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-dark hidden md:table-cell">Typ</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-dark hidden lg:table-cell">Kanton</th>
                <th className="px-4 py-3 text-center font-semibold text-brand-dark">
                  <FileText size={14} className="inline" />
                </th>
                <th className="px-4 py-3 text-center font-semibold text-brand-dark hidden sm:table-cell">
                  <Eye size={14} className="inline" />
                </th>
                <th className="px-4 py-3 text-center font-semibold text-brand-dark hidden sm:table-cell">
                  <Mail size={14} className="inline" />
                </th>
                <th className="px-4 py-3 text-left font-semibold text-brand-dark hidden xl:table-cell">Registriert</th>
                <th className="px-4 py-3 text-right font-semibold text-brand-dark">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${user.is_admin ? "bg-red-600" : "bg-gray-400"}`}>
                        {user.vorname[0]}{user.nachname[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-brand-dark">
                          {user.vorname} {user.nachname}
                          {user.is_admin === 1 && (
                            <Shield size={12} className="inline ml-1 text-red-600" />
                          )}
                        </p>
                        <p className="truncate text-xs text-neutral-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                      user.anbieter_typ === "Händler" ? "bg-amber-50 text-amber-600" : "bg-gray-100 text-gray-500"
                    }`}>
                      {user.anbieter_typ}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-500 hidden lg:table-cell">{user.kanton || "–"}</td>
                  <td className="px-4 py-3 text-center">{user.listing_count}</td>
                  <td className="px-4 py-3 text-center hidden sm:table-cell">{user.total_aufrufe}</td>
                  <td className="px-4 py-3 text-center hidden sm:table-cell">{user.messages_sent + user.messages_received}</td>
                  <td className="px-4 py-3 text-neutral-400 hidden xl:table-cell">
                    {new Date(user.created_at).toLocaleDateString("de-CH")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => toggleAdmin(user.id, user.is_admin)}
                        title={user.is_admin ? "Admin entziehen" : "Zum Admin machen"}
                        className={`rounded-lg p-2 transition-colors ${
                          user.is_admin
                            ? "text-red-600 hover:bg-red-50"
                            : "text-neutral-400 hover:bg-gray-100 hover:text-brand-dark"
                        }`}
                      >
                        {user.is_admin ? <ShieldOff size={16} /> : <Shield size={16} />}
                      </button>
                      <button
                        onClick={() => deleteUser(user.id, `${user.vorname} ${user.nachname}`)}
                        title="Nutzer löschen"
                        className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-neutral-400">
            Keine Nutzer gefunden
          </div>
        )}
      </div>
    </div>
  );
}
