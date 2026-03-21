"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  const { t } = useLocale();
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const containerRef = useRef<HTMLDivElement>(null);

  // The ghost-text completion: first suggestion that starts with current query
  const ghostText =
    suggestions.length > 0 && query.length >= 2
      ? suggestions.find((s) => s.toLowerCase().startsWith(query.toLowerCase()))
      : undefined;

  // Sync external value changes
  useEffect(() => { setQuery(value); }, [value]);

  // Debounced fetch
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search/suggestions?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.suggestions || []);
          setShowSuggestions(true);
          setActiveIdx(-1);
        }
      } catch {
        // ignore
      }
    }, 200);
    return () => clearTimeout(timerRef.current);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(s: string) {
    setQuery(s);
    onChange(s);
    setShowSuggestions(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    // Tab or → at end of input: accept ghost text
    if ((e.key === "Tab" || e.key === "ArrowRight") && ghostText && !showSuggestions) {
      const input = e.currentTarget as HTMLInputElement;
      if (e.key === "ArrowRight" && input.selectionStart !== query.length) return;
      e.preventDefault();
      handleSelect(ghostText);
      return;
    }
    // Tab to accept ghost when dropdown is open too
    if (e.key === "Tab" && ghostText) {
      e.preventDefault();
      handleSelect(ghostText);
      return;
    }

    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === "Enter") {
        onChange(query);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIdx >= 0) {
        handleSelect(suggestions[activeIdx]);
      } else {
        onChange(query);
        setShowSuggestions(false);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 z-10" />
        {/* Ghost text layer — behind the real input */}
        {ghostText && query.length >= 2 && (
          <div
            aria-hidden
            className="absolute inset-0 flex items-center pl-9 pr-3 pointer-events-none"
          >
            <span className="text-sm text-transparent">{query}</span>
            <span className="text-sm text-neutral-300">{ghostText.slice(query.length)}</span>
          </div>
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          onBlur={() => {
            setTimeout(() => onChange(query), 200);
          }}
          onKeyDown={handleKeyDown}
          placeholder={t("filter_search")}
          className="relative w-full rounded-lg border border-neutral-200 bg-transparent py-2 pl-9 pr-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
          autoComplete="off"
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
          {suggestions.map((s, i) => {
            // Highlight the matching part
            const matchIdx = s.toLowerCase().indexOf(query.toLowerCase());
            const before = matchIdx >= 0 ? s.slice(0, matchIdx) : s;
            const match = matchIdx >= 0 ? s.slice(matchIdx, matchIdx + query.length) : "";
            const after = matchIdx >= 0 ? s.slice(matchIdx + query.length) : "";

            return (
              <li key={s}>
                <button
                  type="button"
                  onMouseDown={() => handleSelect(s)}
                  className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                    i === activeIdx
                      ? "bg-brand-green-light text-brand-green"
                      : "text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  {before}
                  <span className="font-semibold">{match}</span>
                  {after}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
