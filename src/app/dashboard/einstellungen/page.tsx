"use client";

import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  Bell,
  Shield,
  Download,
  Trash2,
  ChevronDown,
  AlertTriangle,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
} from "lucide-react";

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
        checked ? "bg-brand-green" : "bg-gray-200"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export default function EinstellungenPage() {
  const { data: session } = useSession();
  const [emailNachricht, setEmailNachricht] = useState(true);
  const [emailMerkliste, setEmailMerkliste] = useState(true);
  const [emailNewsletter, setEmailNewsletter] = useState(false);

  const [showPwSection, setShowPwSection] = useState(false);
  const [showOldPw, setShowOldPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwSaving, setPwSaving] = useState(false);
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  async function handlePasswordChange() {
    if (!session?.user?.id) return;
    if (newPw !== confirmPw) { setPwError("Passwörter stimmen nicht überein"); return; }
    if (newPw.length < 8) { setPwError("Mindestens 8 Zeichen"); return; }

    setPwError("");
    setPwSaving(true);

    const res = await fetch("/api/auth/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: session.user.id, oldPassword: oldPw, newPassword: newPw }),
    });

    const data = await res.json();
    setPwSaving(false);

    if (!res.ok) {
      setPwError(data.error || "Fehler beim Ändern");
    } else {
      setPwSuccess(true);
      setOldPw("");
      setNewPw("");
      setConfirmPw("");
    }
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="mb-8 font-display text-2xl font-black uppercase tracking-tight text-brand-dark md:text-3xl">
        Einstellungen
      </h1>

      <div className="mx-auto max-w-2xl space-y-6">
        {/* Benachrichtigungen */}
        <div className="rounded-xl border border-brand-border bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-brand-border px-5 py-4">
            <Bell size={18} className="text-brand-green" />
            <h2 className="font-display text-lg font-bold text-brand-dark">
              Benachrichtigungen
            </h2>
          </div>
          <div className="divide-y divide-brand-border px-5">
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="text-sm font-medium text-brand-dark">Neue Nachrichten</p>
                <p className="text-xs text-neutral-500">E-Mail bei eingehenden Nachrichten</p>
              </div>
              <Toggle checked={emailNachricht} onChange={() => setEmailNachricht(!emailNachricht)} />
            </div>
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="text-sm font-medium text-brand-dark">Merkliste</p>
                <p className="text-xs text-neutral-500">E-Mail wenn Inserat auf Merkliste gesetzt wird</p>
              </div>
              <Toggle checked={emailMerkliste} onChange={() => setEmailMerkliste(!emailMerkliste)} />
            </div>
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="text-sm font-medium text-brand-dark">Newsletter</p>
                <p className="text-xs text-neutral-500">Plattform-News und Updates</p>
              </div>
              <Toggle checked={emailNewsletter} onChange={() => setEmailNewsletter(!emailNewsletter)} />
            </div>
          </div>
        </div>

        {/* Sicherheit */}
        <div className="rounded-xl border border-brand-border bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-brand-border px-5 py-4">
            <Shield size={18} className="text-brand-green" />
            <h2 className="font-display text-lg font-bold text-brand-dark">Sicherheit</h2>
          </div>
          <div className="px-5 py-4">
            <button
              onClick={() => setShowPwSection(!showPwSection)}
              className="flex w-full items-center justify-between text-left"
            >
              <div>
                <p className="text-sm font-medium text-brand-dark">Passwort ändern</p>
                <p className="text-xs text-neutral-500">Aktualisieren Sie Ihr Passwort regelmässig</p>
              </div>
              <ChevronDown
                size={18}
                className={`text-neutral-400 transition-transform ${showPwSection ? "rotate-180" : ""}`}
              />
            </button>

            {showPwSection && (
              <div className="mt-4 space-y-4 border-t border-brand-border pt-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-brand-dark">
                    Altes Passwort
                  </label>
                  <div className="relative">
                    <input
                      type={showOldPw ? "text" : "password"}
                      value={oldPw}
                      onChange={(e) => setOldPw(e.target.value)}
                      placeholder="Aktuelles Passwort"
                      className="w-full rounded-lg border border-brand-border bg-white px-4 py-2.5 pr-11 text-sm text-brand-dark placeholder:text-neutral-400 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPw(!showOldPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    >
                      {showOldPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-brand-dark">
                    Neues Passwort
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPw ? "text" : "password"}
                      value={newPw}
                      onChange={(e) => setNewPw(e.target.value)}
                      placeholder="Neues Passwort"
                      className="w-full rounded-lg border border-brand-border bg-white px-4 py-2.5 pr-11 text-sm text-brand-dark placeholder:text-neutral-400 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPw(!showNewPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    >
                      {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-brand-dark">
                    Passwort bestätigen
                  </label>
                  <input
                    type="password"
                    value={confirmPw}
                    onChange={(e) => setConfirmPw(e.target.value)}
                    placeholder="Neues Passwort wiederholen"
                    className="w-full rounded-lg border border-brand-border bg-white px-4 py-2.5 text-sm text-brand-dark placeholder:text-neutral-400 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                  />
                </div>
                {pwError && <p className="text-sm text-red-600">{pwError}</p>}
                {pwSuccess && (
                  <p className="flex items-center gap-1 text-sm text-brand-green">
                    <CheckCircle size={14} /> Passwort geändert
                  </p>
                )}
                <button
                  onClick={handlePasswordChange}
                  disabled={pwSaving || !oldPw || !newPw}
                  className="flex items-center gap-2 rounded-lg bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-60"
                >
                  {pwSaving && <Loader2 size={14} className="animate-spin" />}
                  Passwort ändern
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Datenschutz */}
        <div className="rounded-xl border border-brand-border bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-brand-border px-5 py-4">
            <Download size={18} className="text-brand-green" />
            <h2 className="font-display text-lg font-bold text-brand-dark">Datenschutz</h2>
          </div>
          <div className="px-5 py-4">
            <p className="mb-3 text-sm text-neutral-600">
              Gemäss Art. 25 nDSG haben Sie das Recht, eine Kopie Ihrer gespeicherten Daten
              anzufordern. Der Export beinhaltet:
            </p>
            <ul className="mb-4 list-disc space-y-1 pl-5 text-xs text-neutral-500">
              <li>Ihre Profildaten und Kontoeinstellungen</li>
              <li>Alle veröffentlichten Inserate</li>
              <li>Nachrichtenverläufe</li>
              <li>Merkliste und Aktivitätsprotokoll</li>
            </ul>
            <button className="inline-flex items-center gap-2 rounded-lg border border-brand-border px-4 py-2.5 text-sm font-medium text-brand-dark transition-colors hover:bg-gray-50">
              <Download size={16} />
              Meine Daten exportieren
            </button>
          </div>
        </div>

        {/* Konto löschen */}
        <div className="rounded-xl border border-red-200 bg-red-50/50 shadow-sm">
          <div className="flex items-center gap-3 border-b border-red-200 px-5 py-4">
            <Trash2 size={18} className="text-red-500" />
            <h2 className="font-display text-lg font-bold text-red-700">Konto löschen</h2>
          </div>
          <div className="px-5 py-4">
            <p className="mb-2 text-sm text-red-700">
              Alle Inserate und Daten werden unwiderruflich gelöscht.
            </p>
            <p className="mb-4 text-xs text-red-500">
              Gesetzliche Aufbewahrungsfristen bleiben vorbehalten (24 Monate, Art. 10a WG).
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              Konto und alle Daten löschen
            </button>
          </div>
        </div>
      </div>

      {/* Delete modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle size={20} className="text-red-500" />
              </div>
              <h3 className="font-display text-lg font-bold text-brand-dark">
                Konto endgültig löschen?
              </h3>
            </div>
            <p className="mb-4 text-sm text-neutral-500">
              Diese Aktion kann nicht rückgängig gemacht werden. Alle Ihre Inserate, Nachrichten
              und Daten werden unwiderruflich gelöscht.
            </p>
            <div className="mb-6">
              <label className="mb-1.5 block text-sm font-medium text-brand-dark">
                Passwort zur Bestätigung
              </label>
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="Passwort eingeben"
                className="w-full rounded-lg border border-brand-border bg-white px-4 py-2.5 text-sm text-brand-dark placeholder:text-neutral-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletePassword("");
                }}
                className="flex-1 rounded-lg border border-brand-border px-4 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-gray-50"
              >
                Abbrechen
              </button>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                Endgültig löschen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
