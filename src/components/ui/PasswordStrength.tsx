"use client";

import React from "react";

interface PasswordStrengthProps {
  password: string;
}

function getStrength(password: string): { score: number; label: string } {
  if (!password) return { score: 0, label: "" };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 1, label: "Schwach" };
  if (score <= 2) return { score: 2, label: "Mittel" };
  if (score <= 3) return { score: 3, label: "Stark" };
  return { score: 4, label: "Sehr stark" };
}

const barColors = [
  "bg-red-400",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-brand-green",
];

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const { score, label } = getStrength(password);
  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= score ? barColors[score - 1] : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <p
        className={`mt-1 text-[11px] font-medium ${
          score <= 1
            ? "text-red-500"
            : score <= 2
              ? "text-orange-500"
              : score <= 3
                ? "text-yellow-600"
                : "text-brand-green"
        }`}
      >
        {label}
      </p>
    </div>
  );
}
