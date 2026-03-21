"use client";

import { useState, useEffect } from "react";

interface YouTubeEmbedProps {
  videoId: string;
  titel: string;
  quelle?: string;
}

export default function YouTubeEmbed({ videoId, titel, quelle }: YouTubeEmbedProps) {
  const [accepted, setAccepted] = useState(false);
  const [embedError, setEmbedError] = useState(false);

  // Detect YouTube embed errors via postMessage
  useEffect(() => {
    if (!accepted) return;
    const handler = (e: MessageEvent) => {
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (data?.event === "onError") setEmbedError(true);
      } catch {
        /* ignore non-JSON messages */
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [accepted]);

  // Privacy gate — user must accept before loading iframe
  if (!accepted) {
    return (
      <div className="my-8 rounded-xl border border-brand-border bg-brand-grey overflow-hidden">
        <div className="flex items-center gap-2 border-b border-brand-border px-5 py-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 text-red-600">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" fill="currentColor"/>
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/>
          </svg>
          <span className="text-sm font-semibold text-brand-dark">In Aktion — {titel}</span>
        </div>
        <button
          onClick={() => setAccepted(true)}
          className="relative block w-full bg-gray-900 group"
          style={{ paddingBottom: "56.25%" }}
        >
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={titel}
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="bg-red-600 rounded-full p-4 shadow-xl group-hover:scale-110 transition-transform">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <p className="text-white text-xs bg-black/50 px-3 py-1.5 rounded-full">
              Klicke zum Abspielen (youtube-nocookie.com)
            </p>
          </div>
        </button>
        {quelle && (
          <div className="border-t border-brand-border px-5 py-2.5">
            <p className="text-xs text-neutral-500">Quelle: {quelle}</p>
          </div>
        )}
      </div>
    );
  }

  // Embed blocked — show thumbnail with link to YouTube
  if (embedError) {
    return (
      <div className="my-8 rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <div className="w-1 h-5 rounded-full bg-[#4d8230]" />
          <div>
            <p className="text-sm font-semibold text-gray-800">{titel}</p>
            <p className="text-xs text-gray-500">{quelle ? `${quelle} · ` : ""}YouTube</p>
          </div>
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative bg-gray-900 group"
          style={{ paddingBottom: "56.25%" }}
        >
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={titel}
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="bg-red-600 rounded-full p-4 shadow-xl group-hover:scale-110 transition-transform">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <p className="text-white text-sm font-semibold bg-black/50 px-3 py-1 rounded-full">
              Auf YouTube ansehen →
            </p>
          </div>
        </a>
        <div className="bg-gray-50 border-t border-gray-100 px-4 py-2">
          <p className="text-[10px] text-gray-400">
            Einbettung für dieses Video deaktiviert. Klicke zum Ansehen auf YouTube.
          </p>
        </div>
      </div>
    );
  }

  // Normal embed
  return (
    <div className="my-8 rounded-xl border border-brand-border bg-brand-grey overflow-hidden">
      <div className="flex items-center gap-2 border-b border-brand-border px-5 py-3">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 text-red-600">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" fill="currentColor"/>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/>
        </svg>
        <span className="text-sm font-semibold text-brand-dark">In Aktion — {titel}</span>
      </div>
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1`}
          title={`${titel} — Video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          onError={() => setEmbedError(true)}
        />
      </div>
      {quelle && (
        <div className="border-t border-brand-border px-5 py-2.5">
          <p className="text-xs text-neutral-500">Quelle: {quelle}</p>
        </div>
      )}
    </div>
  );
}
