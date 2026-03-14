"use client";

import React, { useState } from "react";
import { X, Send, MessageSquare, Info } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Button from "@/components/ui/Button";

interface KontaktModalProps {
  inseratTitel: string;
  verkaeuferName: string;
  onClose: () => void;
  listingId?: string;
  sellerId?: string;
}

const VORLAGEN = [
  "Ist der Artikel noch verfügbar?",
  "Können Sie den Preis etwas reduzieren?",
  "Kann ich den Artikel vor dem Kauf besichtigen?",
];

export default function KontaktModal({
  inseratTitel,
  verkaeuferName,
  onClose,
  listingId,
  sellerId,
}: KontaktModalProps) {
  const { data: session } = useSession();
  const [nachricht, setNachricht] = useState("");
  const [gesendet, setGesendet] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!nachricht.trim()) return;

    if (!session?.user?.id) {
      window.location.href = "/login";
      return;
    }

    if (sellerId && listingId) {
      setSending(true);
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender_id: session.user.id,
          receiver_id: sellerId,
          listing_id: listingId,
          content: nachricht,
        }),
      });
      setSending(false);
    }

    setGesendet(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-brand-border p-4">
          <div className="flex items-center gap-2">
            <MessageSquare size={20} className="text-brand-green" />
            <h3 className="font-semibold text-brand-dark">
              Nachricht senden
            </h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4">
          {gesendet ? (
            <div className="py-8 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-green-light">
                <Send size={20} className="text-brand-green" />
              </div>
              <h4 className="mb-1 font-semibold text-brand-dark">
                Nachricht gesendet!
              </h4>
              <p className="text-sm text-neutral-500">
                {verkaeuferName} wird Ihre Nachricht zu &quot;{inseratTitel}&quot; erhalten.
              </p>
              <Button onClick={onClose} className="mt-4">
                Schliessen
              </Button>
            </div>
          ) : (
            <>
              <p className="mb-3 text-sm text-neutral-500">
                An <strong>{verkaeuferName}</strong> bezüglich &quot;{inseratTitel}&quot;
              </p>

              <div className="mb-3 flex flex-wrap gap-2">
                {VORLAGEN.map((vorlage, i) => (
                  <button
                    key={i}
                    onClick={() => setNachricht(vorlage)}
                    className="rounded-full border border-brand-border px-3 py-1.5 text-xs text-neutral-600 transition-colors hover:border-brand-green hover:text-brand-green"
                  >
                    {vorlage}
                  </button>
                ))}
              </div>

              <textarea
                value={nachricht}
                onChange={(e) => setNachricht(e.target.value)}
                placeholder="Ihre Nachricht..."
                rows={4}
                className="w-full rounded-lg border border-brand-border p-3 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
              />

              <div className="mt-3 rounded-lg bg-amber-50 p-3 text-xs text-amber-700">
                Geben Sie niemals Vorauszahlungen. Treffen Sie sich an einem
                öffentlichen Ort für die Übergabe.
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <Button variant="ghost" onClick={onClose}>
                  Abbrechen
                </Button>
                <Button
                  onClick={handleSend}
                  disabled={!nachricht.trim() || sending}
                  icon={<Send size={16} />}
                >
                  {sending ? "Wird gesendet..." : "Senden"}
                </Button>
              </div>

              <div className="mt-3 flex items-start gap-2 rounded-lg bg-gray-50 border border-gray-200 p-3">
                <Info size={14} className="mt-0.5 shrink-0 text-gray-400" />
                <p className="text-xs leading-relaxed text-gray-500">
                  Der Verkäufer ist gesetzlich verpflichtet, Ihre Identität vor der Waffenübergabe
                  zu prüfen (Art. 10a WG). Halten Sie einen amtlichen Ausweis bereit.{" "}
                  <Link href="/waffenrecht" className="text-brand-green hover:underline">
                    Mehr zum Ablauf eines legalen Waffenkaufs &rarr;
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
