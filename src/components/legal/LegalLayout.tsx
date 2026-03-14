import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface TocItem {
  id: string;
  label: string;
}

interface LegalLayoutProps {
  title: string;
  updated: string;
  toc: TocItem[];
  children: React.ReactNode;
}

export default function LegalLayout({ title, updated, toc, children }: LegalLayoutProps) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-brand-border bg-brand-grey/50">
        <div className="mx-auto flex max-w-3xl items-center gap-1.5 px-4 py-3 text-xs text-neutral-500">
          <Link href="/" className="hover:text-brand-green">Startseite</Link>
          <ChevronRight size={12} />
          <span className="text-brand-dark">{title}</span>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-2 font-display text-3xl font-black uppercase tracking-tight text-brand-dark md:text-4xl">
          {title}
        </h1>
        <p className="mb-8 text-sm text-neutral-400">Letzte Aktualisierung: {updated}</p>

        {/* TOC */}
        {toc.length > 0 && (
          <nav className="mb-10 rounded-xl border border-brand-border bg-brand-grey/50 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Inhalt</p>
            <ol className="space-y-1.5">
              {toc.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-brand-green hover:underline"
                  >
                    {i + 1}. {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Content */}
        <div className="prose-legal space-y-8">{children}</div>
      </div>
    </>
  );
}

export function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-40">
      <h2 className="mb-4 font-display text-xl font-black uppercase tracking-tight text-brand-dark">
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed text-neutral-700">{children}</div>
    </section>
  );
}

export function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border-l-4 border-brand-green bg-brand-green-light p-4 text-sm leading-relaxed text-brand-green-dark">
      {children}
    </div>
  );
}

export function WarnBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4 text-sm leading-relaxed text-amber-800">
      {children}
    </div>
  );
}
