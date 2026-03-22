"use client";

import { useState, useRef, useEffect } from "react";
import { Share2, Copy, Check, X } from "lucide-react";

interface ShareButtonProps {
  url: string;
  title: string;
  text?: string;
  variant?: "full" | "icon";
}

const SHARE_TARGETS = [
  {
    name: "WhatsApp",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    getUrl: (url: string, text: string) =>
      `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
    color: "hover:text-green-600",
  },
  {
    name: "Telegram",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    getUrl: (url: string, text: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    color: "hover:text-blue-500",
  },
  {
    name: "E-Mail",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    getUrl: (url: string, text: string) =>
      `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(text + "\n\n" + url)}`,
    color: "hover:text-neutral-700",
  },
];

export default function ShareButton({ url, title, text, variant = "full" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const shareText = text || title;

  // Close menu on outside click
  useEffect(() => {
    if (!showMenu) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showMenu]);

  const handleClick = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url });
      } catch {
        // User cancelled
      }
    } else {
      setShowMenu((prev) => !prev);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowMenu(false);
      }, 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowMenu(false);
      }, 2000);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={handleClick}
        className={
          variant === "icon"
            ? "flex items-center justify-center rounded-lg border border-brand-border bg-white p-2 text-neutral-500 transition-colors hover:border-brand-green hover:text-brand-green"
            : "flex items-center justify-center gap-1.5 rounded-lg border border-brand-border bg-white px-3 py-2 text-sm text-neutral-600 transition-colors hover:border-brand-green hover:text-brand-green"
        }
        aria-label="Teilen"
      >
        <Share2 size={variant === "icon" ? 16 : 14} />
        {variant === "full" && <span>Teilen</span>}
      </button>

      {/* Desktop share dropdown */}
      {showMenu && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 animate-fade-in rounded-xl border border-brand-border bg-white p-2 shadow-lg">
          <div className="mb-1 flex items-center justify-between px-2 py-1">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Teilen</span>
            <button
              onClick={() => setShowMenu(false)}
              className="rounded p-0.5 text-neutral-400 hover:text-neutral-600"
            >
              <X size={14} />
            </button>
          </div>

          {SHARE_TARGETS.map((target) => (
            <a
              key={target.name}
              href={target.getUrl(url, shareText)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowMenu(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-brand-grey ${target.color}`}
            >
              {target.icon}
              {target.name}
            </a>
          ))}

          <hr className="my-1 border-brand-border" />

          <button
            onClick={handleCopy}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-brand-grey hover:text-brand-green"
          >
            {copied ? <Check size={16} className="text-brand-green" /> : <Copy size={16} />}
            {copied ? "Link kopiert!" : "Link kopieren"}
          </button>
        </div>
      )}
    </div>
  );
}
