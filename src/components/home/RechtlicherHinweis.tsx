import React from "react";
import { Info } from "lucide-react";
import { RECHTLICHER_DISCLAIMER } from "@/lib/constants";

export default function RechtlicherHinweis() {
  return (
    <section>
      <div className="mx-auto flex max-w-7xl items-center gap-3 border-t px-4 py-4" style={{ borderColor: "rgba(229,231,235,0.5)" }}>
        <Info size={14} className="shrink-0 text-[#9ca3af]" />
        <p className="text-xs leading-relaxed text-[#9ca3af]">
          {RECHTLICHER_DISCLAIMER}
        </p>
      </div>
    </section>
  );
}
