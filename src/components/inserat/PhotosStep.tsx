"use client";

import React, { useRef, useState } from "react";
import { Upload, X, Crown, Camera, Loader2 } from "lucide-react";

interface PhotosStepProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  onBack: () => void;
  onNext: () => void;
}

const MAX_PHOTOS = 8;
const MAX_SIZE_MB = 10;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

async function uploadFile(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: form });
  const data = await res.json();
  if (!res.ok || !data.url) {
    throw new Error(data.error || "Upload fehlgeschlagen");
  }
  return data.url;
}

export default function PhotosStep({ photos, onPhotosChange, onBack, onNext }: PhotosStepProps) {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function processFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError("");

    const remaining = MAX_PHOTOS - photos.length;
    if (remaining <= 0) {
      setError(`Maximal ${MAX_PHOTOS} Fotos erlaubt`);
      return;
    }

    const toProcess = Array.from(files).slice(0, remaining);

    for (const file of toProcess) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError("Nur JPG, PNG und WEBP erlaubt");
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`Maximale Dateigrösse: ${MAX_SIZE_MB}MB`);
        return;
      }
    }

    setUploading(true);
    try {
      const urls = await Promise.all(toProcess.map(uploadFile));
      onPhotosChange([...photos, ...urls]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload fehlgeschlagen");
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    processFiles(e.dataTransfer.files);
  }

  function removePhoto(index: number) {
    onPhotosChange(photos.filter((_, i) => i !== index));
  }

  function movePhoto(from: number, to: number) {
    if (to < 0 || to >= photos.length) return;
    const next = [...photos];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onPhotosChange(next);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-1 font-display text-xl font-bold text-brand-dark">Fotos</h2>
      <p className="mb-6 text-sm text-neutral-500">
        Mindestens 1 Foto, maximal {MAX_PHOTOS}. JPG, PNG oder WEBP, je max. {MAX_SIZE_MB}MB.
      </p>

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => !uploading && inputRef.current?.click()}
        className={`mb-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-colors ${
          uploading
            ? "border-brand-green bg-brand-green-light cursor-wait"
            : dragOver
            ? "border-brand-green bg-brand-green-light"
            : "border-brand-border bg-white hover:border-brand-green/50"
        }`}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={32} className="animate-spin text-brand-green" />
            <p className="text-sm font-medium text-brand-dark">Wird hochgeladen...</p>
          </div>
        ) : (
          <>
            <Upload size={32} className={`mb-3 ${dragOver ? "text-brand-green" : "text-neutral-300"}`} />
            <p className="mb-1 text-sm font-medium text-brand-dark">
              Fotos hierher ziehen oder klicken zum Auswählen
            </p>
            <p className="text-xs text-neutral-400">
              {photos.length}/{MAX_PHOTOS} Fotos · JPG, PNG, WEBP · max. {MAX_SIZE_MB}MB
            </p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={(e) => {
            processFiles(e.target.files);
            e.target.value = "";
          }}
          className="hidden"
        />
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-500">{error}</p>
      )}

      {/* Photo grid */}
      {photos.length > 0 && (
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {photos.map((photo, i) => (
            <div
              key={photo}
              className="group relative aspect-square overflow-hidden rounded-xl border border-brand-border bg-gray-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo}
                alt={`Foto ${i + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />

              {/* Main photo badge */}
              {i === 0 && (
                <div className="absolute left-2 top-2 flex items-center gap-1 rounded-md bg-brand-green px-2 py-0.5 text-[10px] font-bold text-white">
                  <Crown size={10} />
                  Hauptbild
                </div>
              )}

              {/* Actions overlay */}
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                {i > 0 && (
                  <button
                    onClick={() => movePhoto(i, i - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-xs font-bold text-brand-dark hover:bg-white"
                    title="Nach vorne"
                  >
                    ←
                  </button>
                )}
                {i < photos.length - 1 && (
                  <button
                    onClick={() => movePhoto(i, i + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-xs font-bold text-brand-dark hover:bg-white"
                    title="Nach hinten"
                  >
                    →
                  </button>
                )}
              </div>

              {/* Remove button */}
              <button
                onClick={() => removePhoto(i)}
                className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tips */}
      <div className="mb-8 flex items-start gap-3 rounded-lg bg-amber-50 p-4">
        <Camera size={16} className="mt-0.5 shrink-0 text-amber-600" />
        <div>
          <p className="text-xs font-semibold text-amber-800">
            Gute Fotos = mehr Anfragen
          </p>
          <p className="mt-1 text-xs leading-relaxed text-amber-700">
            Fotografieren Sie: Gesamtansicht, Details (Schloss, Lauf, Schaft),
            Seriennummer-Bereich (optional abdecken), mitgeliefertes Zubehör.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between border-t border-brand-border pt-6">
        <button
          onClick={onBack}
          className="rounded-lg border border-brand-border px-6 py-3 text-sm font-medium text-neutral-600 transition-colors hover:bg-gray-50"
        >
          Zurück
        </button>
        <button
          onClick={onNext}
          disabled={photos.length === 0 || uploading}
          className="rounded-lg bg-brand-green px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          Weiter
        </button>
      </div>
    </div>
  );
}
