"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Send, AlertTriangle, ChevronLeft, Loader2 } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  listing_id: string;
  listing_titel: string;
  sender_vorname: string;
  sender_nachname: string;
  receiver_vorname: string;
  receiver_nachname: string;
  created_at: string;
  read_at: string | null;
}

interface Conversation {
  partnerId: string;
  partnerName: string;
  partnerInitials: string;
  listingTitel: string;
  listingId: string;
  lastMessage: string;
  lastTime: string;
  unread: boolean;
  messages: {
    id: string;
    text: string;
    sender: "ich" | "andere";
    time: string;
  }[];
}

function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffDays === 0) return d.toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit" });
  if (diffDays === 1) return "gestern";
  return d.toLocaleDateString("de-CH", { day: "2-digit", month: "2-digit" });
}

export default function NachrichtenPage() {
  const { data: session } = useSession();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.id) return;
    const userId = session.user.id;

    fetch(`/api/messages?user_id=${userId}`)
      .then((r) => r.json())
      .then((data) => {
        const messages: Message[] = data.messages || [];

        // Group by conversation (partner + listing)
        const convMap = new Map<string, Message[]>();
        for (const msg of messages) {
          const partnerId = msg.sender_id === userId ? msg.receiver_id : msg.sender_id;
          const key = `${partnerId}__${msg.listing_id || "direct"}`;
          if (!convMap.has(key)) convMap.set(key, []);
          convMap.get(key)!.push(msg);
        }

        const convs: Conversation[] = [];
        convMap.forEach((msgs) => {
          const sorted = msgs.sort(
            (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
          const last = sorted[sorted.length - 1];
          const partnerId = last.sender_id === userId ? last.receiver_id : last.sender_id;
          const partnerVorname = last.sender_id === userId ? last.receiver_vorname : last.sender_vorname;
          const partnerNachname = last.sender_id === userId ? last.receiver_nachname : last.sender_nachname;

          convs.push({
            partnerId,
            partnerName: `${partnerVorname} ${partnerNachname}`,
            partnerInitials: `${partnerVorname[0]}${partnerNachname[0]}`.toUpperCase(),
            listingTitel: last.listing_titel || "Direktnachricht",
            listingId: last.listing_id,
            lastMessage: last.content,
            lastTime: formatTime(last.created_at),
            unread: sorted.some((m) => m.receiver_id === userId && !m.read_at),
            messages: sorted.map((m) => ({
              id: m.id,
              text: m.content,
              sender: m.sender_id === userId ? ("ich" as const) : ("andere" as const),
              time: formatTime(m.created_at),
            })),
          });
        });

        // Sort by most recent (already sorted by conversation order)

        setConversations(convs);
        if (convs.length > 0) setActiveId(convs[0].partnerId);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session]);

  const active = conversations.find((c) => c.partnerId === activeId);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!messageText.trim() || !active || !session?.user?.id) return;

    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender_id: session.user.id,
        receiver_id: active.partnerId,
        listing_id: active.listingId || null,
        content: messageText,
      }),
    });

    // Add to local state
    setConversations((prev) =>
      prev.map((c) =>
        c.partnerId === activeId
          ? {
              ...c,
              messages: [
                ...c.messages,
                {
                  id: Date.now().toString(),
                  text: messageText,
                  sender: "ich" as const,
                  time: "Jetzt",
                },
              ],
              lastMessage: messageText,
              lastTime: "Jetzt",
            }
          : c
      )
    );
    setMessageText("");
  }

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <Loader2 size={32} className="animate-spin text-brand-green" />
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <p className="text-sm text-neutral-400">Noch keine Nachrichten</p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)]">
      {/* Conversation list */}
      <div
        className={`w-full shrink-0 border-r border-brand-border bg-white lg:w-[320px] ${
          activeId ? "hidden lg:block" : "block"
        }`}
      >
        <div className="border-b border-brand-border px-5 py-4">
          <h1 className="font-display text-xl font-black uppercase tracking-tight text-brand-dark">
            Nachrichten
          </h1>
        </div>
        <div className="divide-y divide-brand-border">
          {conversations.map((conv) => (
            <button
              key={conv.partnerId}
              onClick={() => setActiveId(conv.partnerId)}
              className={`flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors ${
                activeId === conv.partnerId ? "bg-brand-green-light" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-600">
                {conv.partnerInitials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p
                    className={`truncate text-sm ${conv.unread ? "font-bold text-brand-dark" : "font-medium text-neutral-700"}`}
                  >
                    {conv.partnerName}
                  </p>
                  <span className="shrink-0 text-[10px] text-neutral-400">{conv.lastTime}</span>
                </div>
                <p className="truncate text-xs text-neutral-500">{conv.listingTitel}</p>
                <p
                  className={`mt-0.5 truncate text-xs ${conv.unread ? "font-medium text-brand-dark" : "text-neutral-400"}`}
                >
                  {conv.lastMessage}
                </p>
              </div>
              {conv.unread && (
                <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-green" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Active conversation */}
      {active ? (
        <div className={`flex flex-1 flex-col bg-brand-grey/30 ${!activeId ? "hidden lg:flex" : "flex"}`}>
          <div className="flex items-center gap-3 border-b border-brand-border bg-white px-4 py-3">
            <button
              onClick={() => setActiveId(null)}
              className="rounded-lg p-1 text-neutral-400 hover:text-brand-dark lg:hidden"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-brand-dark">{active.listingTitel}</p>
              <p className="text-xs text-neutral-500">{active.partnerName}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="mx-auto max-w-2xl space-y-4">
              {active.messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "ich" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.sender === "ich"
                        ? "rounded-br-md bg-brand-green text-white"
                        : "rounded-bl-md bg-white text-brand-dark shadow-sm"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className={`mt-1 text-[10px] ${msg.sender === "ich" ? "text-white/60" : "text-neutral-400"}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-4 mb-3 flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2 md:mx-6">
            <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-600" />
            <p className="text-[11px] leading-relaxed text-amber-800">
              Geben Sie niemals Vorauszahlungen. Wickeln Sie die Transaktion persönlich ab.
            </p>
          </div>

          <form onSubmit={handleSend} className="border-t border-brand-border bg-white p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Nachricht schreiben..."
                className="flex-1 rounded-lg border border-brand-border bg-white px-4 py-2.5 text-sm text-brand-dark placeholder:text-neutral-400 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              />
              <button
                type="submit"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-green text-white transition-colors hover:bg-brand-green-dark"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="hidden flex-1 items-center justify-center bg-brand-grey/30 lg:flex">
          <p className="text-sm text-neutral-400">Wählen Sie eine Konversation</p>
        </div>
      )}
    </div>
  );
}
