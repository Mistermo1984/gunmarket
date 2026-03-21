"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function ChatButton({ onClick, isOpen }: ChatButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showNeu, setShowNeu] = useState(true);

  // Hide NEU badge after 30 days (check localStorage)
  useEffect(() => {
    const firstSeen = localStorage.getItem("gunmarket_chat_first_seen");
    if (!firstSeen) {
      localStorage.setItem("gunmarket_chat_first_seen", Date.now().toString());
    } else {
      const daysSince = (Date.now() - parseInt(firstSeen)) / (1000 * 60 * 60 * 24);
      if (daysSince > 30) setShowNeu(false);
    }
  }, []);

  // Auto-open after 30 seconds (once per session)
  useEffect(() => {
    if (isOpen) return;
    const autoOpened = sessionStorage.getItem("gunmarket_chat_auto_opened");
    if (autoOpened) return;

    const timer = setTimeout(() => {
      sessionStorage.setItem("gunmarket_chat_auto_opened", "true");
      onClick();
    }, 30000);

    return () => clearTimeout(timer);
  }, [isOpen, onClick]);

  if (isOpen) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-40"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-lg bg-brand-dark px-3 py-1.5 text-xs text-white shadow-lg animate-fade-in">
          Fragen? Ich helfe dir!
          <div className="absolute -bottom-1 right-6 h-2 w-2 rotate-45 bg-brand-dark" />
        </div>
      )}

      <button
        onClick={onClick}
        className="relative flex items-center gap-2 rounded-full bg-brand-green px-5 py-3 text-white shadow-lg transition-transform hover:scale-105 hover:bg-brand-green-dark active:scale-95 animate-pulse-ring"
        aria-label="GunMarket Assistent öffnen"
      >
        <MessageCircle size={20} />
        <span className="text-sm font-medium">Assistent</span>

        {/* NEU Badge */}
        {showNeu && (
          <span className="absolute -right-1 -top-1 rounded-full bg-brand-amber px-1.5 py-0.5 text-[11px] font-bold text-white shadow-sm">
            NEU
          </span>
        )}
      </button>
    </div>
  );
}
