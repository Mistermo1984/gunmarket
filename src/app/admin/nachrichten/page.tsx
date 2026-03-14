"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Trash2,
  Loader2,
  Search,
  ArrowRight,
  CheckCircle,
  Clock,
} from "lucide-react";

interface AdminMessage {
  id: string;
  content: string;
  created_at: string;
  read_at: string | null;
  listing_id: string | null;
  sender_id: string;
  sender_vorname: string;
  sender_nachname: string;
  sender_email: string;
  receiver_id: string;
  receiver_vorname: string;
  receiver_nachname: string;
  receiver_email: string;
  listing_titel: string | null;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("de-CH", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function AdminNachrichtenPage() {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [readFilter, setReadFilter] = useState<"alle" | "ungelesen" | "gelesen">("alle");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/messages")
      .then((r) => r.json())
      .then((data) => {
        setMessages(data.messages || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function deleteMessage(id: string) {
    if (!confirm("Nachricht löschen?")) return;
    await fetch(`/api/admin/messages?message_id=${id}`, { method: "DELETE" });
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }

  const filtered = messages.filter((m) => {
    const matchSearch =
      !search ||
      m.content.toLowerCase().includes(search.toLowerCase()) ||
      `${m.sender_vorname} ${m.sender_nachname}`.toLowerCase().includes(search.toLowerCase()) ||
      `${m.receiver_vorname} ${m.receiver_nachname}`.toLowerCase().includes(search.toLowerCase()) ||
      (m.listing_titel && m.listing_titel.toLowerCase().includes(search.toLowerCase()));

    const matchRead =
      readFilter === "alle" ||
      (readFilter === "ungelesen" && !m.read_at) ||
      (readFilter === "gelesen" && m.read_at);

    return matchSearch && matchRead;
  });

  const unreadCount = messages.filter((m) => !m.read_at).length;

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
          <MessageSquare size={20} className="text-red-600" />
          <h1 className="font-display text-2xl font-black uppercase tracking-tight text-brand-dark">
            Alle Nachrichten
          </h1>
        </div>
        <p className="text-sm text-neutral-500">
          {messages.length} Nachrichten total &middot; {unreadCount} ungelesen
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Inhalt, Absender, Empfänger oder Inserat suchen..."
            className="w-full rounded-lg border border-brand-border bg-white py-2.5 pl-10 pr-4 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
          />
        </div>
        <div className="flex gap-2">
          {(["alle", "ungelesen", "gelesen"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setReadFilter(f)}
              className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                readFilter === f ? "bg-red-600 text-white" : "bg-white border border-brand-border text-neutral-600 hover:bg-gray-50"
              }`}
            >
              {f === "alle" ? "Alle" : f === "ungelesen" ? `Ungelesen (${unreadCount})` : "Gelesen"}
            </button>
          ))}
        </div>
      </div>

      {/* Messages list */}
      <div className="space-y-3">
        {filtered.map((msg) => (
          <div
            key={msg.id}
            className={`rounded-xl border bg-white shadow-sm transition-all ${
              !msg.read_at ? "border-amber-200" : "border-brand-border"
            }`}
          >
            <div
              className="flex items-start gap-4 px-5 py-4 cursor-pointer"
              onClick={() => setExpandedId(expandedId === msg.id ? null : msg.id)}
            >
              {/* Status indicator */}
              <div className="mt-1 shrink-0">
                {msg.read_at ? (
                  <CheckCircle size={16} className="text-green-400" />
                ) : (
                  <Clock size={16} className="text-amber-500" />
                )}
              </div>

              {/* From → To */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1 text-sm">
                  <span className="font-semibold text-brand-dark">{msg.sender_vorname} {msg.sender_nachname}</span>
                  <ArrowRight size={12} className="text-neutral-300" />
                  <span className="font-semibold text-brand-dark">{msg.receiver_vorname} {msg.receiver_nachname}</span>
                </div>
                {msg.listing_titel && (
                  <p className="text-xs text-neutral-400 mt-0.5">Betreff: {msg.listing_titel}</p>
                )}
                <p className="mt-1 text-sm text-neutral-600 line-clamp-2">{msg.content}</p>
              </div>

              {/* Time + Actions */}
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-[10px] text-neutral-400 whitespace-nowrap">{formatDate(msg.created_at)}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); deleteMessage(msg.id); }}
                  title="Nachricht löschen"
                  className="rounded-lg p-1.5 text-neutral-300 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Expanded details */}
            {expandedId === msg.id && (
              <div className="border-t border-brand-border bg-gray-50 px-5 py-4">
                <div className="grid gap-3 sm:grid-cols-2 text-xs">
                  <div>
                    <p className="font-semibold text-neutral-500 mb-1">Absender</p>
                    <p className="text-brand-dark">{msg.sender_vorname} {msg.sender_nachname}</p>
                    <p className="text-neutral-400">{msg.sender_email}</p>
                    <p className="text-neutral-400 font-mono text-[10px]">{msg.sender_id}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-500 mb-1">Empfänger</p>
                    <p className="text-brand-dark">{msg.receiver_vorname} {msg.receiver_nachname}</p>
                    <p className="text-neutral-400">{msg.receiver_email}</p>
                    <p className="text-neutral-400 font-mono text-[10px]">{msg.receiver_id}</p>
                  </div>
                </div>
                <div className="mt-3 rounded-lg bg-white border border-brand-border p-3">
                  <p className="text-sm text-brand-dark whitespace-pre-wrap">{msg.content}</p>
                </div>
                <div className="mt-2 flex gap-4 text-[10px] text-neutral-400">
                  <span>Gesendet: {formatDate(msg.created_at)}</span>
                  {msg.read_at && <span>Gelesen: {formatDate(msg.read_at)}</span>}
                  {msg.listing_id && <span>Inserat-ID: {msg.listing_id}</span>}
                </div>
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-neutral-400">
            Keine Nachrichten gefunden
          </div>
        )}
      </div>
    </div>
  );
}
