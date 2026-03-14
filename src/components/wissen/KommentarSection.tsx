'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, Send, User, Clock } from 'lucide-react'

interface Kommentar {
  id: string
  name: string
  text: string
  datum: string
}

function getStorageKey(type: 'waffen' | 'munition', slug: string) {
  return `gunmarket-kommentare-${type}-${slug}`
}

function loadKommentare(type: 'waffen' | 'munition', slug: string): Kommentar[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(getStorageKey(type, slug))
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveKommentare(type: 'waffen' | 'munition', slug: string, kommentare: Kommentar[]) {
  localStorage.setItem(getStorageKey(type, slug), JSON.stringify(kommentare))
}

function formatDatum(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
    ', ' + d.toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' })
}

interface KommentarSectionProps {
  type: 'waffen' | 'munition'
  slug: string
  titel: string
}

export default function KommentarSection({ type, slug, titel }: KommentarSectionProps) {
  const [kommentare, setKommentare] = useState<Kommentar[]>([])
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setKommentare(loadKommentare(type, slug))
    // Load saved name
    const savedName = localStorage.getItem('gunmarket-kommentar-name')
    if (savedName) setName(savedName)
  }, [type, slug])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmedText = text.trim()
    if (!trimmedText) return

    const displayName = name.trim() || 'Anonym'
    const newKommentar: Kommentar = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: displayName,
      text: trimmedText,
      datum: new Date().toISOString(),
    }

    const updated = [newKommentar, ...kommentare]
    setKommentare(updated)
    saveKommentare(type, slug, updated)

    // Remember name for next time
    if (name.trim()) {
      localStorage.setItem('gunmarket-kommentar-name', name.trim())
    }

    setText('')
  }

  if (!mounted) {
    return (
      <div className="mt-12 border-t border-brand-border pt-10">
        <h2 className="mb-6 font-display text-xl font-bold uppercase tracking-tight text-brand-dark">
          Kommentare & Erfahrungen
        </h2>
        <div className="rounded-xl border border-brand-border bg-brand-grey p-8 text-center text-sm text-neutral-400">
          Kommentare werden geladen...
        </div>
      </div>
    )
  }

  return (
    <div className="mt-12 border-t border-brand-border pt-10">
      <div className="mb-6 flex items-center gap-3">
        <MessageSquare size={22} className="text-brand-green" />
        <h2 className="font-display text-xl font-bold uppercase tracking-tight text-brand-dark">
          Kommentare & Erfahrungen
        </h2>
        {kommentare.length > 0 && (
          <span className="rounded-full bg-brand-green px-2.5 py-0.5 text-xs font-bold text-white">
            {kommentare.length}
          </span>
        )}
      </div>

      <p className="mb-6 text-sm text-neutral-500">
        Teile dein Wissen über {titel} — Erfahrungen, Tipps oder Korrekturen sind willkommen.
      </p>

      {/* Comment form */}
      <form onSubmit={handleSubmit} className="mb-8 rounded-xl border border-brand-border bg-brand-grey p-5">
        <div className="mb-3 flex gap-3">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-brand-border bg-white px-3 py-2">
            <User size={14} className="shrink-0 text-neutral-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name (optional — sonst Anonym)"
              className="min-w-0 flex-1 bg-transparent text-sm text-brand-dark placeholder:text-neutral-400 focus:outline-none"
              maxLength={50}
            />
          </div>
        </div>
        <div className="mb-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Was weisst du über diese Waffe? Erfahrungen, technische Details, Kauftipps..."
            className="w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand-dark placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-green/30"
            rows={3}
            maxLength={2000}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-400">
            {text.length}/2000 Zeichen
          </span>
          <button
            type="submit"
            disabled={!text.trim()}
            className="flex items-center gap-2 rounded-lg bg-brand-green px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={14} />
            Kommentar absenden
          </button>
        </div>
      </form>

      {/* Comments list */}
      {kommentare.length === 0 ? (
        <div className="rounded-xl border border-dashed border-brand-border p-8 text-center">
          <MessageSquare size={28} className="mx-auto mb-3 text-neutral-300" />
          <p className="text-sm font-medium text-neutral-500">
            Noch keine Kommentare
          </p>
          <p className="mt-1 text-xs text-neutral-400">
            Sei der Erste, der sein Wissen über {titel} teilt!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {kommentare.map((k) => (
            <div
              key={k.id}
              className="rounded-xl border border-brand-border bg-white p-5"
            >
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green-light text-sm font-bold text-brand-green">
                  {k.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span className="text-sm font-semibold text-brand-dark">{k.name}</span>
                  <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                    <Clock size={10} />
                    {formatDatum(k.datum)}
                  </div>
                </div>
              </div>
              <p className="whitespace-pre-line text-sm leading-relaxed text-neutral-600">
                {k.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
