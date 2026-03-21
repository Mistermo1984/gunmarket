"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Plus, User, BookOpen, Search, LogOut, Shield, BarChart3 } from "lucide-react";
import Logo from "@/components/ui/Logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useLocale } from "@/lib/locale-context";

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  const { t } = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const user = session?.user;
  const initials = user
    ? `${user.vorname?.[0] || ""}${user.nachname?.[0] || ""}`.toUpperCase()
    : null;

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleMobileSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?suche=${encodeURIComponent(searchQuery)}`);
      setMobileMenuOpen(false);
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled
          ? "shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
          : "shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-3">
          <button
            className="shrink-0 rounded-md p-1.5 text-brand-dark hover:bg-brand-grey lg:hidden touch-target"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t("nav_menu_open")}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link href="/" className="flex shrink-0 items-center">
            <Logo />
          </Link>
        </div>

        {/* Center: Navigation links (Desktop) */}
        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            href="/markt"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-brand-grey hover:text-brand-dark"
          >
            <BarChart3 size={15} />
            {t("nav_market")}
          </Link>
          <Link
            href="/wissen"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-brand-grey hover:text-brand-dark"
          >
            <BookOpen size={15} />
            {t("nav_wiki")}
          </Link>
          <Link
            href="/vereine"
            className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-brand-grey hover:text-brand-dark"
          >
            {t("nav_clubs")}
          </Link>
          <Link
            href="/waffenrecht"
            className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-brand-grey hover:text-brand-dark"
          >
            {t("nav_law")}
          </Link>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            className="rounded-md p-1.5 text-brand-dark hover:bg-brand-grey lg:hidden touch-target"
            aria-label={t("nav_search")}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Search size={20} />
          </button>
          {user ? (
            <>
              {user.isAdmin && (
                <Link
                  href="/admin"
                  className="hidden items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 sm:inline-flex"
                >
                  <Shield size={15} />
                  Admin
                </Link>
              )}
              <Link
                href="/dashboard"
                className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-brand-grey hover:text-brand-dark sm:inline-flex"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-white">
                  {initials}
                </span>
                {t("nav_dashboard")}
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-brand-grey hover:text-brand-dark sm:inline-flex"
            >
              <User size={16} />
              {t("nav_login")}
            </Link>
          )}
          <Link
            href="/inserat/neu"
            className="hidden items-center gap-1.5 rounded-lg bg-brand-green px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-green-dark sm:inline-flex"
          >
            <Plus size={14} />
            {t("nav_create")}
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-brand-border bg-white lg:hidden animate-fade-in">
          {/* Mobile search */}
          <form onSubmit={handleMobileSearch} className="px-4 py-3">
            <div className="flex items-center gap-2 rounded-lg border border-brand-border bg-brand-grey px-3 py-2.5">
              <Search size={16} className="shrink-0 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("nav_search_placeholder")}
                className="flex-1 bg-transparent text-sm text-brand-dark placeholder:text-neutral-400 focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="shrink-0 rounded-md bg-brand-green px-3 py-1.5 text-xs font-medium text-white"
              >
                {t("nav_search")}
              </button>
            </div>
          </form>

          {/* Mobile links */}
          <div className="flex flex-col gap-1 border-t border-brand-border px-4 py-3">
            <Link
              href="/wissen"
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 hover:bg-brand-grey touch-target"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BookOpen size={16} />
              {t("nav_wiki")}
            </Link>
            <Link
              href="/markt"
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 hover:bg-brand-grey touch-target"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BarChart3 size={16} />
              {t("nav_market")}
            </Link>
            {user ? (
              <>
                {user.isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 touch-target"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Shield size={16} />
                    Admin Panel
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 hover:bg-brand-grey touch-target"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User size={16} />
                  {t("nav_dashboard")}
                </Link>
                <button
                  onClick={() => { signOut({ callbackUrl: "/" }); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 touch-target"
                >
                  <LogOut size={16} />
                  {t("nav_logout")}
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 hover:bg-brand-grey touch-target"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User size={16} />
                {t("nav_login")}
              </Link>
            )}
            <Link
              href="/inserat/neu"
              className="flex items-center justify-center gap-2 rounded-lg bg-brand-green px-4 py-2.5 text-center text-sm font-medium text-white touch-target"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Plus size={16} />
              {t("nav_create_long")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
