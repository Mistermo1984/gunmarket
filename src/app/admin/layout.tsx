"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  FileText,
  MessageSquare,
  RefreshCw,
  ArrowLeft,
  Shield,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Übersicht", icon: LayoutDashboard },
  { href: "/admin/nutzer", label: "Nutzer", icon: Users },
  { href: "/admin/inserate", label: "Inserate", icon: FileText },
  { href: "/admin/nachrichten", label: "Nachrichten", icon: MessageSquare },
  { href: "/admin/crawling", label: "Crawling", icon: RefreshCw },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className="hidden w-[260px] shrink-0 border-r border-brand-border bg-white lg:flex lg:flex-col">
        {/* Admin badge */}
        <div className="border-b border-brand-border p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
              <Shield size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-dark">Admin Panel</p>
              <span className="inline-block rounded-md bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-600">
                Superuser
              </span>
            </div>
          </div>
          {session?.user && (
            <p className="mt-2 text-xs text-neutral-400">
              Eingeloggt als {session.user.vorname} {session.user.nachname}
            </p>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                      active
                        ? "bg-red-50 text-red-600"
                        : "text-neutral-600 hover:bg-brand-grey hover:text-brand-dark"
                    }`}
                  >
                    <span
                      className={`absolute left-0 top-1/2 h-0 w-1 -translate-y-1/2 rounded-r-full bg-red-600 transition-all duration-200 ${
                        active ? "h-6" : "group-hover:h-4"
                      }`}
                    />
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Back to Dashboard */}
        <div className="border-t border-brand-border p-3">
          <Link
            href="/dashboard"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-500 transition-colors hover:bg-brand-grey hover:text-brand-dark"
          >
            <ArrowLeft size={18} />
            Zurück zum Dashboard
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-brand-grey/50 pb-20 lg:pb-0">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-brand-border bg-white lg:hidden">
        <div className="flex items-center justify-around py-2">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-medium transition-colors ${
                  active ? "text-red-600" : "text-neutral-400"
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
