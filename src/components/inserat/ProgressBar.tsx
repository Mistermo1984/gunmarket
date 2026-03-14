"use client";

import React from "react";
import { Check } from "lucide-react";

const STEPS = ["Kategorie", "Details", "Fotos", "Vorschau"];

interface ProgressBarProps {
  currentStep: number;
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div className="mx-auto flex max-w-2xl items-center justify-between px-4">
      {STEPS.map((label, i) => {
        const stepNum = i + 1;
        const isCompleted = stepNum < currentStep;
        const isActive = stepNum === currentStep;

        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  isCompleted
                    ? "bg-brand-green text-white"
                    : isActive
                    ? "bg-brand-green text-white"
                    : "bg-gray-200 text-neutral-400"
                }`}
              >
                {isCompleted ? <Check size={18} /> : stepNum}
              </div>
              <span
                className={`text-xs font-medium ${
                  isActive ? "text-brand-green" : isCompleted ? "text-brand-green" : "text-neutral-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`mx-2 h-0.5 flex-1 rounded-full transition-colors ${
                  stepNum < currentStep ? "bg-brand-green" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
