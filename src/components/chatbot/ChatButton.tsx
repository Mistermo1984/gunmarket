"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function ChatButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showNeu, setShowNeu] = useState(true);
  const pathname = usePathname();

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

  // Hide on /berater page
  if (pathname === "/berater") return null;

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

      <Link
        href="/berater"
        className="relative flex items-center gap-2 rounded-full bg-brand-green px-5 py-3 text-white shadow-lg transition-transform hover:scale-105 hover:bg-brand-green-dark active:scale-95 animate-pulse-ring"
        aria-label="GunMarket Waffenberater öffnen"
      >
        <MessageCircle size={20} />
        <span className="text-sm font-medium">Waffenberater</span>

        {/* NEU Badge */}
        {showNeu && (
          <span className="absolute -right-1 -top-1 rounded-full bg-brand-amber px-1.5 py-0.5 text-[11px] font-bold text-white shadow-sm">
            NEU
          </span>
        )}
      </Link>
    </div>
  );
}
