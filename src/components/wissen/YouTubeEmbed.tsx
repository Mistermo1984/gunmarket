interface YouTubeEmbedProps {
  videoId: string;
  titel: string;
  quelle?: string;
}

export default function YouTubeEmbed({ videoId, titel, quelle }: YouTubeEmbedProps) {
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
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
          title={`${titel} — Video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
      {quelle && (
        <div className="border-t border-brand-border px-5 py-2.5">
          <p className="text-xs text-neutral-500">
            Quelle: {quelle}
          </p>
        </div>
      )}
    </div>
  );
}
