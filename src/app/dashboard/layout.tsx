"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  Heart,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Übersicht", icon: LayoutDashboard },
  { href: "/dashboard/inserate", label: "Meine Inserate", icon: FileText },
  { href: "/dashboard/merkliste", label: "Merkliste", icon: Heart },
  { href: "/dashboard/nachrichten", label: "Nachrichten", icon: MessageSquare },
  { href: "/dashboard/profil", label: "Profil", icon: User },
  { href: "/dashboard/einstellungen", label: "Einstellungen", icon: Settings },
];

const MOBILE_ITEMS = NAV_ITEMS.slice(0, 5);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const user = session?.user;
  const initials = user
    ? `${user.vorname?.[0] || ""}${user.nachname?.[0] || ""}`.toUpperCase()
    : "??";
  const displayName = user ? `${user.vorname} ${user.nachname}` : "Laden...";
  const anbieterTyp = user?.anbieterTyp || "Privat";

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar — desktop */}
      <aside className="hidden w-[260px] shrink-0 border-r border-brand-border bg-white lg:flex lg:flex-col">
        {/* User info */}
        <div className="border-b border-brand-border p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-white">
              {initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-dark">{displayName}</p>
              <span className="inline-block rounded-md bg-brand-green-light px-2 py-0.5 text-[10px] font-semibold text-brand-green">
                {anbieterTyp}
              </span>
            </div>
          </div>
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
                        ? "bg-brand-green-light text-brand-green"
                        : "text-neutral-600 hover:bg-brand-grey hover:text-brand-dark"
                    }`}
                  >
                    {/* Green left border - slide in on hover */}
                    <span className={`absolute left-0 top-1/2 h-0 w-1 -translate-y-1/2 rounded-r-full bg-brand-green transition-all duration-200 ${
                      active ? "h-6" : "group-hover:h-4"
                    }`} />
                    {/* Active green dot */}
                    {active && (
                      <span className="absolute left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand-green" />
                    )}
                    <item.icon size={18} className={active ? "ml-3" : ""} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Admin + Logout */}
        <div className="border-t border-brand-border p-3 space-y-1">
          {user?.isAdmin && (
            <Link
              href="/admin"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              <Shield size={18} />
              Admin Panel
            </Link>
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
          >
            <LogOut size={18} />
            Abmelden
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-brand-grey/50 pb-20 lg:pb-0">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-brand-border bg-white lg:hidden">
        <div className="flex items-center justify-around py-2">
          {MOBILE_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-medium transition-colors touch-target ${
                  active ? "text-brand-green" : "text-neutral-400"
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
