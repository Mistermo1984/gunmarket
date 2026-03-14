"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, AlertTriangle, Bot, User, ThumbsUp, ThumbsDown } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  feedback?: "up" | "down";
  followUpChips?: string[];
}

// Context-aware starter chips based on page
const STARTER_CHIPS: Record<string, string[]> = {
  home: [
    "Wie funktioniert GunMarket.ch?",
    "Wie gebe ich ein Inserat auf?",
    "Welchen Rechtsstatus hat meine Waffe?",
    "Wo finde ich Schützenvereine?",
  ],
  suche: [
    "Wie benutze ich die Filter?",
    "Was bedeutet WES-pflichtig?",
    "Kann ich nach Kanton suchen?",
    "Wie funktioniert die Kartensuche?",
  ],
  inserat: [
    "Wie kontaktiere ich den Verkäufer?",
    "Was muss ich beim Kauf beachten?",
    "Was ist der richtige Rechtsstatus?",
    "Sicherheitstipps für die Übergabe",
  ],
  dashboard: [
    "Wie optimiere ich mein Inserat?",
    "Wie lange ist mein Inserat aktiv?",
    "Wie antworte ich auf Nachrichten?",
  ],
};

// Follow-up suggestions based on last answer context
function getFollowUpChips(answer: string): string[] {
  const lower = answer.toLowerCase();
  if (lower.includes("wes") || lower.includes("waffenerwerbsschein")) {
    return ["Wie beantrage ich einen WES?", "Was kostet ein WES?", "Wie lange ist ein WES gültig?"];
  }
  if (lower.includes("vertrag")) {
    return ["Was muss im Vertrag stehen?", "Muss ich den Vertrag melden?"];
  }
  if (lower.includes("inserat") || lower.includes("inserieren")) {
    return ["Was kostet ein Inserat?", "Wie lade ich Fotos hoch?", "Wie bearbeite ich ein Inserat?"];
  }
  if (lower.includes("kategorie") || lower.includes("filter")) {
    return ["Welche Kategorien gibt es?", "Was ist der Preis-Slider?"];
  }
  if (lower.includes("sicherheit") || lower.includes("übergabe")) {
    return ["Wo treffe ich mich zur Übergabe?", "Wie erkenne ich Betrug?"];
  }
  return ["Was sind die wichtigsten Regeln?", "Wo finde ich mehr Infos?"];
}

// Escalation detection
const ESCALATION_KEYWORDS = [
  "illegal", "verboten umgehen", "ohne bewilligung", "schwarzmarkt",
  "waffe besorgen ohne", "gesetz umgehen", "illegal kaufen",
];

function isEscalation(text: string): boolean {
  const lower = text.toLowerCase();
  return ESCALATION_KEYWORDS.some((kw) => lower.includes(kw));
}

// Session storage keys
const STORAGE_KEY = "gunmarket_chat_messages";
const MAX_STORED = 20;

function loadMessages(): Message[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored).slice(-MAX_STORED) : [];
  } catch {
    return [];
  }
}

function saveMessages(msgs: Message[]) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(msgs.slice(-MAX_STORED)));
  } catch {}
}

interface ChatPanelProps {
  onClose: () => void;
  currentPage?: string;
}

export default function ChatPanel({ onClose, currentPage = "home" }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>(() => loadMessages());
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackMessageIdx, setFeedbackMessageIdx] = useState<number | null>(null);
  const [thumbsDownCount, setThumbsDownCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Persist messages
  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  // Get context-aware chips
  const pageKey = currentPage.includes("suche")
    ? "suche"
    : currentPage.includes("inserat")
    ? "inserat"
    : currentPage.includes("dashboard")
    ? "dashboard"
    : "home";
  const starterChips = STARTER_CHIPS[pageKey] || STARTER_CHIPS.home;

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    // Escalation check
    if (isEscalation(text)) {
      const userMessage: Message = { role: "user", content: text.trim() };
      const escalationResponse: Message = {
        role: "assistant",
        content: "Für diese Frage empfehle ich, direkt die kantonale Polizei oder fedpol zu kontaktieren: fedpol.admin.ch/waffen — Ich kann hierzu keine Auskunft geben.",
        followUpChips: ["Was sind legale Waffenerwerbswege?", "Welche Gesetze gelten?"],
      };
      setMessages((prev) => [...prev, userMessage, escalationResponse]);
      setInput("");
      return;
    }

    const userMessage: Message = { role: "user", content: text.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
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

      // Add follow-up chips
      const chips = getFollowUpChips(assistantContent);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          followUpChips: chips,
        };
        return updated;
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Ein Fehler ist aufgetreten.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: errorMsg },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  function handleFeedback(idx: number, type: "up" | "down") {
    setMessages((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], feedback: type };
      return updated;
    });
    if (type === "down") {
      setThumbsDownCount((c) => c + 1);
      setFeedbackMessageIdx(idx);
    }
  }

  function submitFeedbackText() {
    // In production, send to analytics
    console.log("Feedback:", feedbackText, "for message:", feedbackMessageIdx);
    setFeedbackText("");
    setFeedbackMessageIdx(null);
  }

  // If user gives 3+ thumbs down, show escalation
  const showEscalation = thumbsDownCount >= 3;

  return (
    <div className="fixed bottom-0 right-0 top-0 z-50 flex w-[380px] flex-col border-l border-brand-border bg-white shadow-2xl sm:bottom-4 sm:right-4 sm:top-auto sm:h-[600px] sm:rounded-xl sm:border animate-slide-in">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-brand-border bg-brand-green p-4 sm:rounded-t-xl">
        <div className="flex items-center gap-2">
          <Bot size={20} className="text-white" />
          <div>
            <h3 className="text-sm font-semibold text-white">
              GunMarket Assistent
            </h3>
            <p className="text-[10px] text-white/70">
              Plattform-Hilfe & Waffenrecht
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="animate-fade-in">
            <p className="mb-4 text-center text-sm text-neutral-500">
              Hallo! Ich helfe Ihnen bei Fragen zur Plattform und zum Schweizer Waffenrecht.
            </p>
            <div className="flex flex-wrap gap-2">
              {starterChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => sendMessage(chip)}
                  className="rounded-full border border-brand-border px-3 py-1.5 text-xs text-neutral-600 transition-all hover:border-brand-green hover:bg-brand-green-light hover:text-brand-green"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i}>
            <div
              className={`mb-1 flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex max-w-[85%] gap-2 ${
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    msg.role === "user"
                      ? "bg-brand-green text-white"
                      : "bg-gray-200 text-neutral-600"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User size={12} />
                  ) : (
                    <Bot size={12} />
                  )}
                </div>
                <div
                  className={`rounded-xl px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-brand-green text-white"
                      : "bg-gray-100 text-neutral-700"
                  }`}
                >
                  {msg.content || (
                    <span className="inline-flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:0.3s]" />
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Feedback buttons for assistant messages */}
            {msg.role === "assistant" && msg.content && (
              <div className="mb-2 ml-8 flex items-center gap-1">
                {!msg.feedback ? (
                  <>
                    <button
                      onClick={() => handleFeedback(i, "up")}
                      className="rounded p-1 text-neutral-300 transition-colors hover:text-green-500"
                      title="Hilfreich"
                    >
                      <ThumbsUp size={12} />
                    </button>
                    <button
                      onClick={() => handleFeedback(i, "down")}
                      className="rounded p-1 text-neutral-300 transition-colors hover:text-red-500"
                      title="Nicht hilfreich"
                    >
                      <ThumbsDown size={12} />
                    </button>
                  </>
                ) : (
                  <span className="text-[10px] text-neutral-400">
                    {msg.feedback === "up" ? "Danke!" : "Feedback erhalten"}
                  </span>
                )}
              </div>
            )}

            {/* Feedback text field when thumbs down */}
            {feedbackMessageIdx === i && (
              <div className="mb-3 ml-8 flex gap-1.5 animate-fade-in">
                <input
                  type="text"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Was war nicht hilfreich?"
                  className="flex-1 rounded-lg border border-brand-border px-2 py-1 text-xs placeholder:text-neutral-400 focus:border-brand-green focus:outline-none"
                  onKeyDown={(e) => e.key === "Enter" && submitFeedbackText()}
                />
                <button
                  onClick={submitFeedbackText}
                  className="rounded-lg bg-brand-green px-2 py-1 text-xs text-white"
                >
                  OK
                </button>
              </div>
            )}

            {/* Follow-up chips */}
            {msg.role === "assistant" && msg.followUpChips && i === messages.length - 1 && !isLoading && (
              <div className="mb-3 ml-8 flex flex-wrap gap-1.5 animate-chip-in">
                {msg.followUpChips.slice(0, 3).map((chip) => (
                  <button
                    key={chip}
                    onClick={() => sendMessage(chip)}
                    className="rounded-full border border-brand-border px-2.5 py-1 text-[11px] text-neutral-600 transition-colors hover:border-brand-green hover:text-brand-green"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="mb-3 flex justify-start">
            <div className="flex gap-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-200 text-neutral-600">
                <Bot size={12} />
              </div>
              <div className="rounded-xl bg-gray-100 px-3 py-2">
                <span className="inline-flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:0.3s]" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Escalation notice */}
        {showEscalation && (
          <div className="mb-3 rounded-lg bg-amber-50 p-3 text-xs text-amber-700 animate-fade-in">
            Für weiterführende Fragen empfehlen wir, die kantonale Polizei oder{" "}
            <a href="https://www.fedpol.admin.ch/waffen" target="_blank" rel="noopener noreferrer" className="font-medium underline">
              fedpol.admin.ch/waffen
            </a>{" "}
            zu kontaktieren.
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Disclaimer */}
      <div className="mx-4 mb-2 rounded-lg bg-amber-50 p-2">
        <div className="flex items-start gap-1.5">
          <AlertTriangle size={12} className="mt-0.5 shrink-0 text-amber-600" />
          <p className="text-[10px] leading-tight text-amber-700">
            KI-generierte Antworten sind keine Rechtsberatung. Massgebend ist das WG SR 514.54.
          </p>
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-brand-border p-3">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Frage stellen..."
            disabled={isLoading}
            className="flex-1 rounded-lg border border-brand-border px-3 py-2 text-sm placeholder:text-neutral-400 focus:border-brand-green focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-green text-white transition-colors hover:bg-brand-green-dark disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
