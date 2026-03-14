import React from "react";
import { Info } from "lucide-react";
import { RECHTLICHER_DISCLAIMER } from "@/lib/constants";

export default function RechtlicherHinweis() {
  return (
    <section style={{ backgroundColor: "#fef9ec" }}>
      <div className="mx-auto flex max-w-7xl items-start gap-3 px-4 py-4">
        <Info size={16} className="mt-0.5 shrink-0 text-amber-600" />
        <p className="text-xs leading-relaxed text-amber-800">
          {RECHTLICHER_DISCLAIMER}
        </p>
      </div>
    </section>
  );
}
