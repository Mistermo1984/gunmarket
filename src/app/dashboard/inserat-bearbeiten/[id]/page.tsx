"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Loader2,
  Save,
  ArrowLeft,
  Upload,
  X,
  Crown,
  Camera,
  Trash2,
  AlertTriangle,
  Pencil,
} from "lucide-react";
import { KANTONE, ZUSTAND_OPTIONEN } from "@/lib/constants";
import CaliberSelect from "@/components/ui/CaliberSelect";
import ImageEditor from "@/components/ui/ImageEditor";

const MARKEN = [
  "SIG Sauer", "Glock", "Beretta", "CZ", "Walther", "Heckler & Koch",
  "Smith & Wesson", "Ruger", "FN Herstal", "Browning", "Blaser",
  "Sauer", "Tikka", "Mauser", "Schmidt-Rubin", "Benelli", "Franchi",
  "Winchester", "Remington", "Steyr", "Taurus", "Andere",
];

const MAX_PHOTOS = 8;
const MAX_SIZE_MB = 10;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface ListingData {
  id: string;
  user_id: string;
  titel: string;
  beschreibung: string;
  hauptkategorie: string;
  unterkategorie: string;
  rechtsstatus: string;
  marke: string;
  modell: string;
  kaliber: string;
  zustand: string;
  baujahr: string;
  lauflaenge: string;
  magazin: string;
  preis: number;
  verhandelbar: number;
  tausch: number;
  kanton: string;
  ortschaft: string;
  status: string;
  images: { id: string; url: string; position: number }[];
}

export default function InseratBearbeitenPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: session, status: sessionStatus } = useSession();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // Form fields
  const [titel, setTitel] = useState("");
  const [beschreibung, setBeschreibung] = useState("");
  const [marke, setMarke] = useState("");
  const [modell, setModell] = useState("");
  const [kaliber, setKaliber] = useState("");
  const [zustand, setZustand] = useState("");
  const [baujahr, setBaujahr] = useState("");
  const [lauflaenge, setLauflaenge] = useState("");
  const [magazin, setMagazin] = useState("");
  const [preis, setPreis] = useState("");
  const [verhandelbar, setVerhandelbar] = useState(false);
  const [tausch, setTausch] = useState(false);
  const [kanton, setKanton] = useState("");
  const [ortschaft, setOrtschaft] = useState("");

  // Photos — existing URLs + new base64 previews
  const [existingPhotos, setExistingPhotos] = useState<{ id: string; url: string }[]>([]);
  const [newPhotos, setNewPhotos] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState("");
  const [editingPhoto, setEditingPhoto] = useState<{ type: "existing" | "new"; index: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadListing = useCallback(async () => {
    try {
      const res = await fetch(`/api/listings/${id}`);
      if (!res.ok) {
        setError("Inserat nicht gefunden");
        setLoading(false);
        return;
      }
      const data: ListingData = await res.json();

      // Verify ownership
      if (data.user_id !== session?.user?.id) {
        setError("Sie haben keine Berechtigung, dieses Inserat zu bearbeiten.");
        setLoading(false);
        return;
      }

      setTitel(data.titel || "");
      setBeschreibung(data.beschreibung || "");
      setMarke(data.marke || "");
      setModell(data.modell || "");
      setKaliber(data.kaliber || "");
      setZustand(data.zustand || "");
      setBaujahr(data.baujahr || "");
      setLauflaenge(data.lauflaenge || "");
      setMagazin(data.magazin || "");
      setPreis(data.preis ? String(data.preis) : "");
      setVerhandelbar(!!data.verhandelbar);
      setTausch(!!data.tausch);
      setKanton(data.kanton || "");
      setOrtschaft(data.ortschaft || "");
      setExistingPhotos(
        (data.images || []).map((img) => ({ id: img.id, url: img.url }))
      );
      setLoading(false);
    } catch {
      setError("Fehler beim Laden des Inserats");
      setLoading(false);
    }
  }, [id, session?.user?.id]);

  useEffect(() => {
    if (sessionStatus === "loading") return;
    if (!session?.user?.id) {
      router.push("/api/auth/signin");
      return;
    }
    loadListing();
  }, [session, sessionStatus, loadListing, router]);

  function processFiles(files: FileList | null) {
    if (!files) return;
    setUploadError("");
    const totalPhotos = existingPhotos.length + newPhotos.length;
    const remaining = MAX_PHOTOS - totalPhotos;
    if (remaining <= 0) {
      setUploadError(`Maximal ${MAX_PHOTOS} Fotos erlaubt`);
      return;
    }
    const toProcess = Array.from(files).slice(0, remaining);
    for (const file of toProcess) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setUploadError("Nur JPG, PNG und WEBP erlaubt");
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setUploadError(`Maximale Dateigrösse: ${MAX_SIZE_MB}MB`);
        return;
      }
    }
    const readers = toProcess.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        })
    );
    Promise.all(readers).then((results) => {
      setNewPhotos((prev) => [...prev, ...results]);
    });
  }

  function removeExisting(imgId: string) {
    setExistingPhotos((prev) => prev.filter((p) => p.id !== imgId));
  }

  function removeNew(index: number) {
    setNewPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
    if (!titel.trim() || !preis) {
      setError("Titel und Preis sind erforderlich");
      return;
    }

    setSaving(true);
    setError("");

    try {
      // Update listing fields
      const res = await fetch(`/api/listings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titel,
          beschreibung,
          marke,
          modell,
          kaliber,
          zustand,
          baujahr,
          lauflaenge,
          magazin,
          preis: parseFloat(preis),
          verhandelbar: verhandelbar ? 1 : 0,
          tausch: tausch ? 1 : 0,
          kanton,
          ortschaft,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Fehler beim Speichern");
        setSaving(false);
        return;
      }

      // Save new photo URLs as listing_images (already uploaded to Vercel Blob)
      if (newPhotos.length > 0) {
        await fetch(`/api/listings/${id}/images`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ urls: newPhotos }),
        });
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/inserate");
      }, 1500);
    } catch {
      setError("Netzwerkfehler. Bitte versuchen Sie es erneut.");
      setSaving(false);
    }
  }

  async function handleDelete() {
    try {
      await fetch(`/api/listings/${id}`, { method: "DELETE" });
      router.push("/dashboard/inserate");
    } catch {
      setError("Fehler beim Löschen");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 size={32} className="animate-spin text-brand-green" />
      </div>
    );
  }

  if (error && !titel) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <AlertTriangle size={48} className="mb-4 text-red-400" />
        <p className="text-lg font-semibold text-brand-dark">{error}</p>
        <button
          onClick={() => router.push("/dashboard/inserate")}
          className="mt-4 rounded-lg bg-brand-green px-5 py-2 text-sm font-semibold text-white"
        >
          Zurück zu meinen Inseraten
        </button>
      </div>
    );
  }

  const totalPhotos = existingPhotos.length + newPhotos.length;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-brand-grey/50 pb-12">
      {/* Header */}
      <div className="border-b border-brand-border bg-white py-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/dashboard/inserate")}
              className="rounded-lg p-2 text-neutral-400 hover:bg-gray-100 hover:text-brand-dark"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-display text-xl font-black uppercase tracking-tight text-brand-dark md:text-2xl">
              Inserat bearbeiten
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDelete(true)}
              className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              <Trash2 size={14} />
              <span className="hidden sm:inline">Löschen</span>
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 rounded-lg bg-brand-green px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-50"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Speichern
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mx-4 mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 md:mx-auto md:max-w-4xl">
          {error}
        </div>
      )}

      {success && (
        <div className="mx-4 mt-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700 md:mx-auto md:max-w-4xl">
          Inserat erfolgreich gespeichert! Weiterleitung...
        </div>
      )}

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Details */}
        <div className="mb-6 rounded-xl border border-brand-border bg-white p-6">
          <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-brand-dark">
            Details
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-medium text-neutral-500">Titel *</label>
              <input
                value={titel}
                onChange={(e) => setTitel(e.target.value)}
                className="w-full rounded-lg border border-brand-border px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-500">Marke</label>
              <select
                value={marke}
                onChange={(e) => setMarke(e.target.value)}
                className="w-full rounded-lg border border-brand-border px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none"
              >
                <option value="">Marke wählen</option>
                {MARKEN.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-500">Modell</label>
              <input
                value={modell}
                onChange={(e) => setModell(e.target.value)}
                className="w-full rounded-lg border border-brand-border px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-500">Kaliber</label>
              <CaliberSelect value={kaliber} onChange={setKaliber} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-500">Zustand</label>
              <select
                value={zustand}
                onChange={(e) => setZustand(e.target.value)}
                className="w-full rounded-lg border border-brand-border px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none"
              >
                <option value="">Zustand wählen</option>
                {ZUSTAND_OPTIONEN.map((z) => (
                  <option key={z.id} value={z.id}>{z.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-500">Baujahr</label>
              <input
                value={baujahr}
                onChange={(e) => setBaujahr(e.target.value)}
                className="w-full rounded-lg border border-brand-border px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20"
                placeholder="z.B. 1955"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-500">Lauflänge</label>
              <input
                value={lauflaenge}
                onChange={(e) => setLauflaenge(e.target.value)}
                className="w-full rounded-lg border border-brand-border px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20"
                placeholder="z.B. 600mm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-500">Magazinkapazität</label>
              <input
                value={magazin}
                onChange={(e) => setMagazin(e.target.value)}
                className="w-full rounded-lg border border-brand-border px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20"
                placeholder="z.B. 6 Schuss"
              />
            </div>
          </div>
        </div>

        {/* Price + Location */}
        <div className="mb-6 rounded-xl border border-brand-border bg-white p-6">
          <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-brand-dark">
            Preis & Standort
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-500">Preis (CHF) *</label>
              <input
                type="number"
                value={preis}
                onChange={(e) => setPreis(e.target.value)}
                className="w-full rounded-lg border border-brand-border px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20"
              />
            </div>
            <div className="flex items-end gap-4">
              <label className="flex items-center gap-2 text-sm text-neutral-600">
                <input type="checkbox" checked={verhandelbar} onChange={(e) => setVerhandelbar(e.target.checked)} />
                Verhandelbar
              </label>
              <label className="flex items-center gap-2 text-sm text-neutral-600">
                <input type="checkbox" checked={tausch} onChange={(e) => setTausch(e.target.checked)} />
                Tausch möglich
              </label>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-500">Kanton *</label>
              <select
                value={kanton}
                onChange={(e) => setKanton(e.target.value)}
                className="w-full rounded-lg border border-brand-border px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none"
              >
                <option value="">Kanton wählen</option>
                {KANTONE.map((k) => (
                  <option key={k.id} value={k.label}>{k.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-500">Ortschaft</label>
              <input
                value={ortschaft}
                onChange={(e) => setOrtschaft(e.target.value)}
                className="w-full rounded-lg border border-brand-border px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6 rounded-xl border border-brand-border bg-white p-6">
          <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-brand-dark">
            Beschreibung
          </h2>
          <textarea
            value={beschreibung}
            onChange={(e) => setBeschreibung(e.target.value)}
            rows={6}
            className="w-full rounded-lg border border-brand-border px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/20"
            placeholder="Beschreiben Sie Ihre Waffe..."
          />
        </div>

        {/* Photos */}
        <div className="mb-6 rounded-xl border border-brand-border bg-white p-6">
          <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-brand-dark">
            Fotos ({totalPhotos}/{MAX_PHOTOS})
          </h2>

          {/* Drop zone */}
          {totalPhotos < MAX_PHOTOS && (
            <div
              onClick={() => inputRef.current?.click()}
              className="mb-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-brand-border bg-white p-8 transition-colors hover:border-brand-green/50"
            >
              <Upload size={24} className="mb-2 text-neutral-300" />
              <p className="text-sm font-medium text-brand-dark">Fotos hinzufügen</p>
              <p className="text-xs text-neutral-400">JPG, PNG, WEBP · max. {MAX_SIZE_MB}MB</p>
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
          )}

          {uploadError && <p className="mb-3 text-sm text-red-500">{uploadError}</p>}

          {/* Photo grid */}
          {totalPhotos > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {existingPhotos.map((photo, i) => (
                <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-xl border border-brand-border bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.url} alt={`Foto ${i + 1}`} className="h-full w-full object-cover" />
                  {i === 0 && (
                    <div className="absolute left-2 top-2 flex items-center gap-1 rounded-md bg-brand-green px-2 py-0.5 text-[10px] font-bold text-white">
                      <Crown size={10} /> Hauptbild
                    </div>
                  )}
                  <button
                    onClick={() => setEditingPhoto({ type: "existing", index: i })}
                    className="absolute right-10 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-black/80 group-hover:opacity-100"
                    title="Bearbeiten"
                  >
                    <Pencil size={11} />
                  </button>
                  <button
                    onClick={() => removeExisting(photo.id)}
                    className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              {newPhotos.map((photo, i) => (
                <div key={`new-${i}`} className="group relative aspect-square overflow-hidden rounded-xl border-2 border-dashed border-brand-green/30 bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo} alt={`Neues Foto ${i + 1}`} className="h-full w-full object-cover" />
                  <div className="absolute left-2 top-2 rounded-md bg-blue-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    Neu
                  </div>
                  <button
                    onClick={() => setEditingPhoto({ type: "new", index: i })}
                    className="absolute right-10 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-black/80 group-hover:opacity-100"
                    title="Bearbeiten"
                  >
                    <Pencil size={11} />
                  </button>
                  <button
                    onClick={() => removeNew(i)}
                    className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-3 flex items-start gap-2 text-xs text-neutral-400">
            <Camera size={14} className="mt-0.5 shrink-0" />
            <span>Gute Fotos erhöhen die Verkaufschance. Zeigen Sie Gesamtansicht und Details.</span>
          </div>
        </div>

        {/* Bottom save bar */}
        <div className="flex justify-between">
          <button
            onClick={() => router.push("/dashboard/inserate")}
            className="rounded-lg border border-brand-border px-6 py-3 text-sm font-medium text-neutral-600 hover:bg-gray-50"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-brand-green px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-50"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Änderungen speichern
          </button>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle size={20} className="text-red-500" />
              </div>
              <h3 className="font-display text-lg font-bold text-brand-dark">
                Inserat wirklich löschen?
              </h3>
            </div>
            <p className="mb-6 text-sm text-neutral-500">
              Diese Aktion kann nicht rückgängig gemacht werden.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDelete(false)}
                className="flex-1 rounded-lg border border-brand-border px-4 py-2.5 text-sm font-medium text-neutral-600 hover:bg-gray-50"
              >
                Abbrechen
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                Löschen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image editor modal */}
      {editingPhoto && (
        <ImageEditor
          imageUrl={
            editingPhoto.type === "existing"
              ? existingPhotos[editingPhoto.index].url
              : newPhotos[editingPhoto.index]
          }
          onSave={async (editedUrl) => {
            if (editingPhoto.type === "existing") {
              const photo = existingPhotos[editingPhoto.index];
              setExistingPhotos((prev) =>
                prev.map((p, i) =>
                  i === editingPhoto.index ? { ...p, url: editedUrl } : p
                )
              );
              // Persist edited image URL to DB immediately
              try {
                await fetch(`/api/listings/${id}/images`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ imageId: photo.id, newUrl: editedUrl }),
                });
              } catch (e) {
                console.error("Failed to persist edited image:", e);
              }
            } else {
              setNewPhotos((prev) =>
                prev.map((url, i) =>
                  i === editingPhoto.index ? editedUrl : url
                )
              );
            }
            setEditingPhoto(null);
          }}
          onCancel={() => setEditingPhoto(null)}
        />
      )}
    </div>
  );
}
