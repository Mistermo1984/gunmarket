"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
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
  RotateCcw,
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

function formatMessage(text: string, isUser: boolean): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\n|https?:\/\/[^\s)]+)/g);
  return parts.map((part, i) => {
    if (part === "\n") return <br key={i} />;
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className={`font-semibold ${isUser ? "" : "text-gray-900"}`}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("http")) {
      const display = part.replace("https://www.gunmarket.ch", "gunmarket.ch");
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className={`underline underline-offset-2 transition-colors ${
            isUser
              ? "text-white/90 hover:text-white"
              : "font-medium text-[#4d8230] hover:text-[#3d6a24]"
          }`}
        >
          {display}
        </a>
      );
    }
    return part;
  });
}

const LoadingDots = () => (
  <span className="inline-flex items-center gap-1 py-1">
    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:0.15s]" />
    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:0.3s]" />
  </span>
);

export default function BeraterPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMessage: Message = { role: "user", content: text.trim() };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput("");
      setIsLoading(true);

      // Reset textarea height
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
      }

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
        // Refocus input after response
        setTimeout(() => inputRef.current?.focus(), 100);
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

  const handleBack = () => {
    if (messages.length > 0) {
      setMessages([]);
      setInput("");
    } else {
      router.back();
    }
  };

  const showWelcome = messages.length === 0;

  return (
    <div className="fixed inset-0 z-30 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="shrink-0 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-2.5">
          <button
            onClick={handleBack}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 active:scale-95"
            aria-label={messages.length > 0 ? "Neue Beratung" : "Zurück"}
          >
            {messages.length > 0 ? <RotateCcw size={18} /> : <ArrowLeft size={18} />}
          </button>
          <div className="flex items-center gap-2.5">
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

      {/* Chat area — scrollable */}
      <div
        ref={scrollAreaRef}
        className="flex-1 overflow-y-auto overscroll-contain"
      >
        <div className="mx-auto max-w-3xl px-4 py-6">
          {/* Welcome state */}
          {showWelcome && (
            <div className="animate-fade-in">
              <div className="mb-6 flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4d8230] text-white">
                  <Bot size={16} />
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm leading-relaxed text-gray-700 shadow-sm">
                  {formatMessage(WELCOME_MESSAGE, false)}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => sendMessage(action.message)}
                    className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3.5 text-left transition-all hover:border-[#4d8230]/40 hover:shadow-md active:scale-[0.98]"
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
              className={`mb-4 flex gap-2.5 ${
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                  msg.role === "user"
                    ? "bg-gray-200 text-gray-600"
                    : "bg-[#4d8230] text-white"
                }`}
              >
                {msg.role === "user" ? (
                  <User size={13} />
                ) : (
                  <Bot size={13} />
                )}
              </div>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed ${
                  msg.role === "user"
                    ? "rounded-tr-sm bg-[#4d8230] text-white"
                    : "rounded-tl-sm bg-white text-gray-700 shadow-sm"
                }`}
              >
                {msg.content ? (
                  formatMessage(msg.content, msg.role === "user")
                ) : (
                  <LoadingDots />
                )}
              </div>
            </div>
          ))}

          {/* Loading indicator — only when last message is user and no assistant message started yet */}
          {isLoading &&
            messages.length > 0 &&
            messages[messages.length - 1]?.role === "user" && (
            <div className="mb-4 flex gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#4d8230] text-white">
                <Bot size={13} />
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-2.5 shadow-sm">
                <LoadingDots />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area — always at bottom */}
      <div className="shrink-0 border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto max-w-3xl px-4 pb-3 pt-2.5">
          {/* Disclaimer */}
          <div className="mb-2.5 flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5">
            <AlertTriangle
              size={11}
              className="shrink-0 text-amber-500"
            />
            <p className="text-[10.5px] leading-tight text-amber-600">
              Kein Ersatz für Rechtsberatung. Bei rechtlichen Fragen wende dich
              an dein kantonales Waffenbüro.
            </p>
          </div>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Frage stellen..."
              disabled={isLoading}
              rows={1}
              className="flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm leading-normal placeholder:text-gray-400 focus:border-[#4d8230] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#4d8230]/20 disabled:opacity-50"
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
              className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-[#4d8230] text-white transition-all hover:bg-[#3d6a24] active:scale-95 disabled:opacity-40"
            >
              <Send size={17} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
