import React from "react";
import Link from "next/link";

export default function AuthPanel() {
  return (
    <div
      className="relative hidden flex-col justify-between overflow-hidden p-10 lg:flex"
      style={{
        backgroundColor: "#1e4d38",
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-1.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/20 text-lg font-black text-white">
          ✚
        </span>
        <span className="font-display text-xl font-black tracking-tight text-white">
          GunMarket<span className="text-white/60">.ch</span>
        </span>
      </Link>

      {/* Quote */}
      <div>
        <h2 className="mb-4 font-display text-4xl font-black uppercase leading-tight text-white xl:text-5xl">
          Der Schweizer Waffenmarktplatz
        </h2>
        <p className="max-w-sm text-base leading-relaxed text-white/70">
          Kaufen und verkaufen — einfach, kostenlos, sicher.
        </p>
      </div>

      {/* Stats */}
      <div className="flex gap-8 text-sm text-white/50">
        <span>4&apos;200+ Inserate</span>
        <span>100% Kostenlos</span>
        <span>Seit 2025</span>
      </div>
    </div>
  );
}
