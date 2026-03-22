"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, RotateCcw, RotateCw, ZoomIn, ZoomOut, Loader2 } from "lucide-react";

interface ImageEditorProps {
  imageUrl: string;
  onSave: (url: string) => void;
  onCancel: () => void;
}

const CANVAS_SIZE = 600;

export default function ImageEditor({ imageUrl, onSave, onCancel }: ImageEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d")!;
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.save();
    ctx.translate(CANVAS_SIZE / 2 + offsetX, CANVAS_SIZE / 2 + offsetY);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);

    const isRotated90 = rotation % 180 !== 0;
    const w = isRotated90 ? img.naturalHeight : img.naturalWidth;
    const h = isRotated90 ? img.naturalWidth : img.naturalHeight;
    const fit = Math.min(CANVAS_SIZE / w, CANVAS_SIZE / h);
    const dw = img.naturalWidth * fit;
    const dh = img.naturalHeight * fit;

    ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);
    ctx.restore();
  }, [rotation, zoom, offsetX, offsetY]);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgRef.current = img;
      setLoaded(true);
      draw();
    };
    img.src = imageUrl;
  }, [imageUrl]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (loaded) draw();
  }, [draw, loaded]);

  const rotate = (deg: number) => setRotation((r) => (r + deg + 360) % 360);

  const handleSave = async () => {
    if (!imgRef.current) {
      alert("Bild wird noch geladen, bitte warten...");
      return;
    }

    setSaving(true);

    try {
      // Create a fresh canvas for export at original image resolution
      const exportCanvas = document.createElement("canvas");
      const isRotated = rotation % 180 !== 0;

      const imgW = imgRef.current.naturalWidth;
      const imgH = imgRef.current.naturalHeight;

      // Set canvas size based on rotation
      exportCanvas.width = isRotated ? imgH : imgW;
      exportCanvas.height = isRotated ? imgW : imgH;

      const ctx = exportCanvas.getContext("2d")!;

      // White background (avoid transparency issues with JPEG)
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

      // Compute the same fit scale used in draw() so offset mapping is correct
      const fitW = isRotated ? imgH : imgW;
      const fitH = isRotated ? imgW : imgH;
      const fit = Math.min(CANVAS_SIZE / fitW, CANVAS_SIZE / fitH);

      ctx.save();
      ctx.translate(exportCanvas.width / 2, exportCanvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(zoom, zoom);

      // Map pixel offset from preview canvas to original resolution
      const scaleRatio = 1 / fit;
      ctx.drawImage(
        imgRef.current,
        -imgW / 2 + offsetX * scaleRatio,
        -imgH / 2 + offsetY * scaleRatio
      );
      ctx.restore();

      // Export as blob
      const blob = await new Promise<Blob | null>((resolve) => {
        exportCanvas.toBlob(resolve, "image/jpeg", 0.92);
      });

      if (!blob) {
        throw new Error("Canvas export fehlgeschlagen");
      }

      // Upload to Vercel Blob
      const form = new FormData();
      form.append("file", blob, `edited-${Date.now()}.jpg`);

      const res = await fetch("/api/upload", { method: "POST", body: form });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Upload fehlgeschlagen (${res.status})`);
      }

      const data = await res.json();

      if (!data.url) {
        throw new Error("Keine URL in der Antwort");
      }

      onSave(data.url);
    } catch (e: unknown) {
      console.error("ImageEditor save error:", e);
      alert(`Fehler beim Speichern: ${e instanceof Error ? e.message : "Unbekannter Fehler"}`);
    } finally {
      setSaving(false);
    }
  };

  // Mouse drag
  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setDragStart({ x: e.clientX - offsetX, y: e.clientY - offsetY });
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setOffsetX(e.clientX - dragStart.x);
    setOffsetY(e.clientY - dragStart.y);
  };
  const onMouseUp = () => setDragging(false);

  // Touch drag
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    setDragging(true);
    setDragStart({ x: t.clientX - offsetX, y: t.clientY - offsetY });
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging) return;
    const t = e.touches[0];
    setOffsetX(t.clientX - dragStart.x);
    setOffsetY(t.clientY - dragStart.y);
  };

  const hasChanges = rotation !== 0 || zoom !== 1 || offsetX !== 0 || offsetY !== 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">Bild bearbeiten</h3>
            <p className="mt-0.5 text-xs text-gray-400">
              Ziehen zum Verschieben · Scrollen zum Zoomen
            </p>
          </div>
          <button
            onClick={onCancel}
            className="rounded-lg p-1.5 transition-colors hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Canvas */}
        <div
          className="flex items-center justify-center bg-gray-900 overflow-hidden"
          style={{ height: "320px" }}
        >
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            style={{
              width: "320px",
              height: "320px",
              cursor: dragging ? "grabbing" : "grab",
              touchAction: "none",
            }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onMouseUp}
            onWheel={(e) => {
              e.preventDefault();
              setZoom((z) => Math.min(3, Math.max(0.5, z - e.deltaY * 0.001)));
            }}
          />
        </div>

        {/* Controls */}
        <div className="space-y-4 px-5 py-4">
          {/* Rotate */}
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Drehen
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => rotate(-90)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-200 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 active:bg-gray-100"
              >
                <RotateCcw size={15} />
                90° links
              </button>
              <button
                onClick={() => rotate(90)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-200 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 active:bg-gray-100"
              >
                <RotateCw size={15} />
                90° rechts
              </button>
              <button
                onClick={() => rotate(180)}
                className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                180°
              </button>
            </div>
          </div>

          {/* Zoom */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                Zoom
              </p>
              <span className="tabular-nums text-xs text-gray-400">
                {Math.round(zoom * 100)}%
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50"
              >
                <ZoomOut size={15} />
              </button>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="flex-1 accent-[#4d8230]"
              />
              <button
                onClick={() => setZoom((z) => Math.min(3, z + 0.1))}
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50"
              >
                <ZoomIn size={15} />
              </button>
            </div>
          </div>

          {/* Reset */}
          {hasChanges && (
            <button
              onClick={() => {
                setRotation(0);
                setZoom(1);
                setOffsetX(0);
                setOffsetY(0);
              }}
              className="text-xs text-gray-400 transition-colors hover:text-gray-600"
            >
              Alles zurücksetzen
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-5 pb-5 pt-1">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !hasChanges || !loaded}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${
              saving
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#4d8230] text-white hover:bg-[#5a9a38] active:scale-95 disabled:opacity-60"
            }`}
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Wird gespeichert...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Übernehmen
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
