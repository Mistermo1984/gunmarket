import React from "react";
import Link from "next/link";
import { Heart, MessageSquare, FileText, Search, type LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function EmptyState({ icon: Icon, title, description, ctaLabel, ctaHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-grey">
        <Icon size={28} className="text-neutral-400" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-brand-dark">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-neutral-500">{description}</p>
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="inline-flex items-center rounded-lg bg-brand-green px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-green-dark"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}

// Pre-configured empty states
export function MerklisteEmpty() {
  return (
    <EmptyState
      icon={Heart}
      title="Noch nichts gespeichert"
      description="Speichern Sie interessante Inserate, um sie später wiederzufinden."
      ctaLabel="Jetzt stöbern"
      ctaHref="/"
    />
  );
}

export function NachrichtenEmpty() {
  return (
    <EmptyState
      icon={MessageSquare}
      title="Keine Nachrichten"
      description="Hier erscheinen Ihre Nachrichten mit anderen Nutzern."
      ctaLabel="Inserate anschauen"
      ctaHref="/"
    />
  );
}

export function InserateEmpty() {
  return (
    <EmptyState
      icon={FileText}
      title="Noch keine Inserate"
      description="Erstellen Sie Ihr erstes Inserat und erreichen Sie tausende potenzielle Käufer."
      ctaLabel="Erstes Inserat aufgeben"
      ctaHref="/dashboard/inserat-erstellen"
    />
  );
}

export function SucheEmpty() {
  return (
    <EmptyState
      icon={Search}
      title="Nichts gefunden"
      description="Versuchen Sie es mit anderen Suchbegriffen oder passen Sie Ihre Filter an."
      ctaLabel="Filter zurücksetzen"
      ctaHref="/"
    />
  );
}
