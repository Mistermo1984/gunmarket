"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Props {
  minPrice: number;
  maxPrice: number;
  onChange: (min: number, max: number) => void;
  filterParams?: Record<string, string>;
}

interface HistogramData {
  min: number;
  max: number;
  buckets: number[];
  bucketSize: number;
  total: number;
}

export default function PriceHistogramSlider({ minPrice, maxPrice, onChange, filterParams }: Props) {
  const [histogram, setHistogram] = useState<HistogramData | null>(null);
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);
  const [dragging, setDragging] = useState<"min" | "max" | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const filterKey = JSON.stringify(filterParams || {});

  // Load histogram data
  useEffect(() => {
    const params = new URLSearchParams(filterParams || {});
    fetch(`/api/listings/price-histogram?${params}`)
      .then((r) => r.json())
      .then((data: HistogramData) => {
        setHistogram(data);
        if (localMax === 0 || localMax > data.max) setLocalMax(data.max);
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKey]);

  // Sync from external props
  useEffect(() => { setLocalMin(minPrice); }, [minPrice]);
  useEffect(() => {
    setLocalMax(maxPrice || histogram?.max || 5000);
  }, [maxPrice, histogram?.max]);

  const absMax = histogram?.max || 5000;
  const maxBucketCount = histogram ? Math.max(...histogram.buckets, 1) : 1;

  const toPercent = useCallback((val: number) => (val / absMax) * 100, [absMax]);

  const valFromEvent = useCallback((e: MouseEvent | React.MouseEvent) => {
    if (!trackRef.current) return 0;
    const rect = trackRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    return Math.round((pct * absMax) / 50) * 50;
  }, [absMax]);

  const handleTrackClick = useCallback((e: React.MouseEvent) => {
    if (dragging) return;
    const val = valFromEvent(e);
    if (Math.abs(val - localMin) < Math.abs(val - localMax)) {
      const next = Math.min(val, localMax - 50);
      setLocalMin(next);
      onChange(next, localMax);
    } else {
      const next = Math.max(val, localMin + 50);
      setLocalMax(next);
      onChange(localMin, next);
    }
  }, [dragging, localMin, localMax, valFromEvent, onChange]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging) return;
    const val = valFromEvent(e);
    if (dragging === "min") {
      setLocalMin(Math.max(0, Math.min(val, localMax - 50)));
    } else {
      setLocalMax(Math.min(absMax, Math.max(val, localMin + 50)));
    }
  }, [dragging, localMin, localMax, absMax, valFromEvent]);

  const handleMouseUp = useCallback(() => {
    if (dragging) {
      setDragging(null);
      onChange(localMin, localMax >= absMax ? 0 : localMin === 0 && localMax >= absMax ? 0 : localMin);
      // Proper callback: emit actual values
      onChange(localMin, localMax >= absMax ? 0 : localMax);
    }
  }, [dragging, localMin, localMax, absMax, onChange]);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [dragging, handleMouseMove, handleMouseUp]);

  // Touch support
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!dragging || !trackRef.current) return;
    const touch = e.touches[0];
    const rect = trackRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
    const val = Math.round((pct * absMax) / 50) * 50;
    if (dragging === "min") {
      setLocalMin(Math.max(0, Math.min(val, localMax - 50)));
    } else {
      setLocalMax(Math.min(absMax, Math.max(val, localMin + 50)));
    }
  }, [dragging, localMin, localMax, absMax]);

  const handleTouchEnd = useCallback(() => {
    if (dragging) {
      setDragging(null);
      onChange(localMin, localMax >= absMax ? 0 : localMax);
    }
  }, [dragging, localMin, localMax, absMax, onChange]);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
      return () => {
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [dragging, handleTouchMove, handleTouchEnd]);

  const formatPrice = (p: number) =>
    p >= 1000 ? `${(p / 1000).toFixed(p % 1000 === 0 ? 0 : 1)}k` : `${p}`;

  if (!histogram) {
    return <div className="h-[120px] animate-pulse rounded-lg bg-neutral-50" />;
  }

  return (
    <div className="w-full select-none">
      {/* Histogram bars + slider combined */}
      <div
        ref={trackRef}
        className="relative flex items-end gap-px cursor-pointer mb-0"
        style={{ height: 56 }}
        onClick={handleTrackClick}
      >
        {histogram.buckets.map((count, i) => {
          const bucketMin = i * histogram.bucketSize;
          const bucketMax = (i + 1) * histogram.bucketSize;
          const isInRange = bucketMax > localMin && bucketMin < localMax;
          const heightPct = count === 0 ? 4 : Math.max(8, (count / maxBucketCount) * 100);
          return (
            <div
              key={i}
              className="flex-1 rounded-t-sm transition-colors duration-150"
              style={{
                height: `${heightPct}%`,
                backgroundColor: isInRange ? "#4d8230" : "#d1d5db",
                opacity: count === 0 ? 0.3 : 1,
              }}
              title={`CHF ${bucketMin.toLocaleString("de-CH")}–${bucketMax.toLocaleString("de-CH")}: ${count} Inserate`}
            />
          );
        })}
      </div>

      {/* Slider Track */}
      <div className="relative h-5 mt-0.5">
        {/* Track background */}
        <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-gray-200 rounded-full" />
        {/* Active range */}
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 bg-[#4d8230] rounded-full"
          style={{
            left: `${toPercent(localMin)}%`,
            right: `${100 - toPercent(localMax)}%`,
          }}
        />
        {/* Min handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-[#4d8230] rounded-full cursor-grab shadow-sm hover:scale-110 transition-transform active:cursor-grabbing touch-target"
          style={{ left: `${toPercent(localMin)}%`, zIndex: dragging === "min" ? 3 : 2 }}
          onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); setDragging("min"); }}
          onTouchStart={(e) => { e.stopPropagation(); setDragging("min"); }}
        />
        {/* Max handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-[#4d8230] rounded-full cursor-grab shadow-sm hover:scale-110 transition-transform active:cursor-grabbing touch-target"
          style={{ left: `${toPercent(localMax)}%`, zIndex: dragging === "max" ? 3 : 2 }}
          onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); setDragging("max"); }}
          onTouchStart={(e) => { e.stopPropagation(); setDragging("max"); }}
        />
      </div>

      {/* Price labels under slider */}
      <div className="flex items-center justify-between mt-0.5 text-[10px] text-neutral-400">
        <span>CHF {formatPrice(0)}</span>
        <span>CHF {formatPrice(absMax)}</span>
      </div>

      {/* Input fields */}
      <div className="flex items-center gap-2 mt-2">
        <div className="flex-1 relative">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] text-gray-400 font-medium">CHF</span>
          <input
            type="number"
            value={localMin || ""}
            onChange={(e) => setLocalMin(Math.max(0, parseInt(e.target.value) || 0))}
            onBlur={() => onChange(localMin, localMax >= absMax ? 0 : localMax)}
            onKeyDown={(e) => { if (e.key === "Enter") onChange(localMin, localMax >= absMax ? 0 : localMax); }}
            placeholder="0"
            className="w-full pl-9 pr-2 py-1.5 text-[12px] border border-gray-200 rounded-lg outline-none focus:border-[#4d8230] text-gray-700"
          />
        </div>
        <span className="text-gray-300 text-sm shrink-0">—</span>
        <div className="flex-1 relative">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] text-gray-400 font-medium">CHF</span>
          <input
            type="number"
            value={localMax >= absMax ? "" : localMax || ""}
            onChange={(e) => setLocalMax(Math.min(absMax, parseInt(e.target.value) || absMax))}
            onBlur={() => onChange(localMin, localMax >= absMax ? 0 : localMax)}
            onKeyDown={(e) => { if (e.key === "Enter") onChange(localMin, localMax >= absMax ? 0 : localMax); }}
            placeholder={`${absMax.toLocaleString("de-CH")}+`}
            className="w-full pl-9 pr-2 py-1.5 text-[12px] border border-gray-200 rounded-lg outline-none focus:border-[#4d8230] text-gray-700"
          />
        </div>
      </div>

      {/* Reset link */}
      {(localMin > 0 || (localMax > 0 && localMax < absMax)) && (
        <button
          onClick={() => { setLocalMin(0); setLocalMax(absMax); onChange(0, 0); }}
          className="text-[10px] text-gray-400 hover:text-[#4d8230] mt-1.5 transition-colors"
        >
          Zurücksetzen
        </button>
      )}
    </div>
  );
}
