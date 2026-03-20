"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CheckCircle, AlertTriangle, X } from "lucide-react";
import ProgressBar from "@/components/inserat/ProgressBar";
import CategoryStep from "@/components/inserat/CategoryStep";
import DetailsStep, { type InseratDetails } from "@/components/inserat/DetailsStep";
import PhotosStep from "@/components/inserat/PhotosStep";
import PreviewStep from "@/components/inserat/PreviewStep";
import { classifyRechtsstatus } from "@/lib/rechtsstatus-classifier";
import { RECHTSSTATUS_FILTER } from "@/lib/constants";
import { isCaliberRequired } from "@/lib/calibers";

const INITIAL_DETAILS: InseratDetails = {
  titel: "",
  marke: "",
  modell: "",
  kaliber: "",
  zustand: "",
  baujahr: "",
  lauflaenge: "",
  magazinkapazitaet: "",
  preis: "",
  verhandelbar: false,
  tausch: false,
  kanton: "",
  ortschaft: "",
  beschreibung: "",
  anbieterTyp: "Privat",
};

export default function InseratErstellenPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [step, setStep] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  // Step 1
  const [hauptkategorie, setHauptkategorie] = useState("");
  const [unterkategorie, setUnterkategorie] = useState("");
  const [rechtsstatus, setRechtsstatus] = useState("");

  // Step 2
  const [details, setDetails] = useState<InseratDetails>(INITIAL_DETAILS);
  const [errors, setErrors] = useState<Partial<Record<keyof InseratDetails, string>>>({});

  // Step 3
  const [photos, setPhotos] = useState<string[]>([]);

  // Step 4
  const [checkboxes, setCheckboxes] = useState([false, false, false, false]);

  // Rechtsstatus mismatch warning
  const [rechtsstatusWarning, setRechtsstatusWarning] = useState<string | null>(null);

  function handleDetailsChange(field: keyof InseratDetails, value: string | boolean) {
    setDetails((prev) => ({ ...prev, [field]: value }));
    // Reset warning when user changes relevant fields
    if (["titel", "marke", "modell", "beschreibung"].includes(field)) {
      setRechtsstatusWarning(null);
    }
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function validateDetails(): boolean {
    const newErrors: Partial<Record<keyof InseratDetails, string>> = {};

    if (!details.titel.trim()) newErrors.titel = "Titel ist erforderlich";
    if (!details.marke) newErrors.marke = "Marke ist erforderlich";
    if (!details.modell.trim()) newErrors.modell = "Modell ist erforderlich";
    if (isCaliberRequired(hauptkategorie) && !details.kaliber) {
      newErrors.kaliber = "Kaliber ist erforderlich für diese Kategorie";
    }
    if (!details.zustand) newErrors.zustand = "Zustand ist erforderlich";
    if (!details.preis || Number(details.preis) <= 0) newErrors.preis = "Gültiger Preis erforderlich";
    if (!details.kanton) newErrors.kanton = "Kanton ist erforderlich";
    if (!details.ortschaft.trim()) newErrors.ortschaft = "Ortschaft ist erforderlich";
    if (!details.beschreibung.trim()) {
      newErrors.beschreibung = "Beschreibung ist erforderlich";
    } else if (details.beschreibung.trim().length < 20) {
      newErrors.beschreibung = "Mindestens 20 Zeichen";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNextFromDetails() {
    if (!validateDetails()) return;

    // Run Rechtsstatus classifier and compare with user selection
    const suggested = classifyRechtsstatus({
      titel: `${details.titel} ${details.marke} ${details.modell}`,
      beschreibung: details.beschreibung,
      hauptkategorie,
      unterkategorie,
    });

    if (suggested !== rechtsstatus && !rechtsstatusWarning) {
      const suggestedLabel = RECHTSSTATUS_FILTER.find(r => r.id === suggested)?.label || suggested;
      const selectedLabel = RECHTSSTATUS_FILTER.find(r => r.id === rechtsstatus)?.label || rechtsstatus;
      setRechtsstatusWarning(
        `Basierend auf Ihren Angaben (${details.marke} ${details.modell}) vermuten wir den Rechtsstatus «${suggestedLabel}» — Sie haben «${selectedLabel}» gewählt. Bitte prüfen Sie Ihre Angabe. Falls korrekt, können Sie fortfahren.`
      );
      return;
    }

    setRechtsstatusWarning(null);
    setStep(3);
  }

  function handleCheckbox(index: number) {
    setCheckboxes((prev) => prev.map((v, i) => (i === index ? !v : v)));
  }

  async function handleSubmit() {
    if (!session?.user?.id) return;

    setSubmitError("");

    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: session.user.id,
          titel: details.titel,
          beschreibung: details.beschreibung,
          hauptkategorie,
          unterkategorie,
          rechtsstatus,
          marke: details.marke,
          modell: details.modell,
          kaliber: details.kaliber,
          zustand: details.zustand,
          baujahr: details.baujahr,
          lauflaenge: details.lauflaenge,
          magazin: details.magazinkapazitaet,
          preis: parseFloat(details.preis),
          verhandelbar: details.verhandelbar,
          tausch: details.tausch,
          kanton: details.kanton,
          ortschaft: details.ortschaft,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setSubmitError(data.error || "Fehler beim Erstellen");
        return;
      }

      const { id } = await res.json();

      // Upload photos if any
      if (photos.length > 0) {
        for (let i = 0; i < photos.length; i++) {
          const formData = new FormData();
          const blob = await fetch(photos[i]).then((r) => r.blob());
          formData.append("file", blob, `photo-${i}.jpg`);
          formData.append("listing_id", id);
          formData.append("position", String(i));
          await fetch("/api/upload", { method: "POST", body: formData });
        }
      }

      setShowToast(true);
      setTimeout(() => {
        router.push("/dashboard/inserate");
      }, 2000);
    } catch {
      setSubmitError("Netzwerkfehler. Bitte versuchen Sie es erneut.");
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-brand-grey/50 pb-12">
      {/* Progress */}
      <div className="border-b border-brand-border bg-white py-6">
        <ProgressBar currentStep={step} />
      </div>

      {/* Error */}
      {submitError && (
        <div className="mx-4 mt-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700 md:mx-8">
          {submitError}
        </div>
      )}

      {/* Content */}
      <div className="px-4 py-8 md:px-8">
        {step === 1 && (
          <CategoryStep
            hauptkategorie={hauptkategorie}
            unterkategorie={unterkategorie}
            rechtsstatus={rechtsstatus}
            onHauptkategorie={setHauptkategorie}
            onUnterkategorie={setUnterkategorie}
            onRechtsstatus={setRechtsstatus}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <>
            {rechtsstatusWarning && (
              <div className="mx-auto mb-6 max-w-4xl">
                <div className="flex items-start gap-3 rounded-lg border border-red-300 bg-red-50 p-4">
                  <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-600" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-red-800">Rechtsstatus-Hinweis</p>
                    <p className="mt-1 text-xs leading-relaxed text-red-700">{rechtsstatusWarning}</p>
                    <p className="mt-2 text-xs text-red-600">
                      Klicken Sie erneut auf «Weiter» um fortzufahren, oder gehen Sie zurück um den Rechtsstatus anzupassen.
                    </p>
                  </div>
                  <button
                    onClick={() => setRechtsstatusWarning(null)}
                    className="shrink-0 rounded p-1 text-red-400 hover:bg-red-100 hover:text-red-600"
                    aria-label="Hinweis schliessen"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}
            <DetailsStep
              details={details}
              errors={errors}
              onChange={handleDetailsChange}
              onBack={() => setStep(1)}
              onNext={handleNextFromDetails}
              hauptkategorie={hauptkategorie}
            />
          </>
        )}

        {step === 3 && (
          <PhotosStep
            photos={photos}
            onPhotosChange={setPhotos}
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
          />
        )}

        {step === 4 && (
          <PreviewStep
            hauptkategorie={hauptkategorie}
            unterkategorie={unterkategorie}
            rechtsstatus={rechtsstatus}
            details={details}
            photos={photos}
            checkboxes={checkboxes}
            onCheckbox={handleCheckbox}
            onBack={() => setStep(3)}
            onSubmit={handleSubmit}
          />
        )}
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-bounce">
          <div className="flex items-center gap-2 rounded-xl bg-brand-green px-6 py-3.5 text-sm font-semibold text-white shadow-lg">
            <CheckCircle size={18} />
            Ihr Inserat wurde erfolgreich veröffentlicht!
          </div>
        </div>
      )}
    </div>
  );
}
