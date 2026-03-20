import React from "react";

interface LogoProps {
  size?: number;
  className?: string;
  darkBg?: boolean;
}

export function LogoIcon({ size = 28 }: { size?: number }) {
  const r = size / 2;
  const circleR = r - 3;
  const tickLen = 3;
  const tickGap = 1.5;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer circle */}
      <circle cx={r} cy={r} r={circleR} stroke="#16a34a" strokeWidth={1.5} />
      {/* Tick marks: top, bottom, left, right */}
      <line x1={r} y1={r - circleR - tickGap} x2={r} y2={r - circleR - tickGap - tickLen} stroke="#16a34a" strokeWidth={1.5} strokeLinecap="round" />
      <line x1={r} y1={r + circleR + tickGap} x2={r} y2={r + circleR + tickGap + tickLen} stroke="#16a34a" strokeWidth={1.5} strokeLinecap="round" />
      <line x1={r - circleR - tickGap} y1={r} x2={r - circleR - tickGap - tickLen} y2={r} stroke="#16a34a" strokeWidth={1.5} strokeLinecap="round" />
      <line x1={r + circleR + tickGap} y1={r} x2={r + circleR + tickGap + tickLen} y2={r} stroke="#16a34a" strokeWidth={1.5} strokeLinecap="round" />
      {/* Center dot */}
      <circle cx={r} cy={r} r={2} fill="#4ade80" />
    </svg>
  );
}

export function LogoWordmark({ darkBg = false }: { darkBg?: boolean }) {
  const gunColor = darkBg ? "#ffffff" : "#1a1a1f";
  return (
    <span className="flex items-baseline" style={{ letterSpacing: "-0.3px" }}>
      <span style={{ fontSize: 18, fontWeight: 700, color: gunColor, lineHeight: 1 }}>
        Gun
      </span>
      <span style={{ fontSize: 18, fontWeight: 700, color: "#4ade80", lineHeight: 1 }}>
        Market
      </span>
      <span style={{ fontSize: 13, fontWeight: 400, color: "#6b7280", lineHeight: 1, marginLeft: 1 }}>
        .ch
      </span>
    </span>
  );
}

export default function Logo({ size = 28, className = "", darkBg = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`} style={{ height: 32 }}>
      <LogoIcon size={size} />
      <LogoWordmark darkBg={darkBg} />
    </span>
  );
}
