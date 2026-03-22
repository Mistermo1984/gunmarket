"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Send,
  Bot,
  User,
  ArrowLeft,
  AlertTriangle,
  Target,
  Scale,
  DollarSign,
  Crosshair,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE = `Willkommen beim GunMarket Waffenberater! Ich helfe dir, die passende Waffe zu finden — mit konkreter Modellempfehlung, Kostenrechnung und allen Infos zum Schweizer Waffenrecht.

Wie kann ich dir helfen?`;

const QUICK_ACTIONS = [
  { label: "Bedarfsanalyse starten", icon: Target, message: "Ich möchte eine Waffe kaufen und brauche Beratung. Starte die Bedarfsanalyse." },
  { label: "Rechtliche Fragen", icon: Scale, message: "Ich habe Fragen zum Schweizer Waffenrecht. Was muss ich als Einsteiger wissen?" },
  { label: "Munitionskosten", icon: DollarSign, message: "Was kostet Munition in der Schweiz? Berechne mir die Jahreskosten für verschiedene Kaliber." },
  { label: "Schweizer Ordonnanz", icon: Crosshair, message: "Erzähl mir über Schweizer Ordonnanzwaffen — K31, Stgw 57, Stgw 90, SIG P210." },
];

const STORAGE_KEY = "gunmarket_berater_messages";

function loadMessages(): Message[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveMessages(msgs: Message[]) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(msgs.slice(-30)));
  } catch { /* ignore */ }
}

function formatMessage(text: string): React.ReactNode {
  // Convert markdown-style formatting to JSX
  const parts = text.split(/(\*\*[^*]+\*\*|\n|https?:\/\/[^\s)]+)/g);
  return parts.map((part, i) => {
    if (part === "\n") return <br key={i} />;
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-brand-dark">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("http")) {
      const display = part.replace("https://www.gunmarket.ch", "gunmarket.ch");
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer"
          className="font-medium text-[#4d8230] underline underline-offset-2 hover:text-[#3d6a24]">
          {display}
        </a>
      );
    }
    return part;
  });
}

export default function BeraterPage() {
  const [messages, setMessages] = useState<Message[]>(() => loadMessages());
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMessage: Message = { role: "user", content: text.trim() };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput("");
      setIsLoading(true);

      try {
        const res = await fetch("/api/berater", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!res.ok) {
          let errText = "Fehler beim Senden. Bitte versuche es erneut.";
          try {
            const errData = await res.json();
            if (errData.error) errText = errData.error;
          } catch { /* ignore */ }
          throw new Error(errText);
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error("Keine Antwort erhalten.");

        const decoder = new TextDecoder();
        let assistantContent = "";
        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          assistantContent += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: assistantContent,
            };
            return updated;
          });
        }
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "Ein Fehler ist aufgetreten.";
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: errorMsg },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const showWelcome = messages.length === 0;

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <Link
            href="/"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <ArrowLeft size={18} />
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4d8230] text-white">
              <Bot size={18} />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900">
                GunMarket Waffenberater
              </h1>
              <p className="text-[11px] text-gray-400">
                Bedarfsanalyse &middot; Empfehlung &middot; Kostenrechnung
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-6">
          {/* Welcome state */}
          {showWelcome && (
            <div className="mb-8 animate-fade-in">
              {/* Welcome message */}
              <div className="mb-6 flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4d8230] text-white">
                  <Bot size={16} />
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm leading-relaxed text-gray-700 shadow-sm">
                  {formatMessage(WELCOME_MESSAGE)}
                </div>
              </div>

              {/* Quick action cards */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => sendMessage(action.message)}
                    className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left transition-all hover:border-[#4d8230] hover:shadow-md active:scale-[0.98]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-[#4d8230]">
                      <action.icon size={20} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-4 flex gap-3 ${
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  msg.role === "user"
                    ? "bg-gray-200 text-gray-600"
                    : "bg-[#4d8230] text-white"
                }`}
              >
                {msg.role === "user" ? (
                  <User size={14} />
                ) : (
                  <Bot size={14} />
                )}
              </div>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "rounded-tr-sm bg-[#4d8230] text-white"
                    : "rounded-tl-sm bg-white text-gray-700 shadow-sm"
                }`}
              >
                {msg.content ? (
                  formatMessage(msg.content)
                ) : (
                  <span className="inline-flex items-center gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:0.3s]" />
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="mb-4 flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4d8230] text-white">
                <Bot size={14} />
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm">
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:0.3s]" />
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Disclaimer + Input */}
      <div className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 pb-4 pt-3">
          {/* Disclaimer */}
          <div className="mb-3 flex items-start gap-1.5 rounded-lg bg-amber-50 px-3 py-2">
            <AlertTriangle
              size={12}
              className="mt-0.5 shrink-0 text-amber-600"
            />
            <p className="text-[11px] leading-tight text-amber-700">
              Kein Ersatz für Rechtsberatung. Bei rechtlichen Fragen wende dich
              an dein kantonales Waffenbüro.
            </p>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Frage stellen..."
              disabled={isLoading}
              rows={1}
              className="flex-1 resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-[#4d8230] focus:outline-none focus:ring-1 focus:ring-[#4d8230]/20 disabled:opacity-50"
              style={{ maxHeight: 120 }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = Math.min(target.scrollHeight, 120) + "px";
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4d8230] text-white transition-colors hover:bg-[#3d6a24] disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
