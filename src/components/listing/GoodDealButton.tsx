'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useLocale } from '@/lib/locale-context'

interface GoodDealButtonProps {
  listingId: string
}

export default function GoodDealButton({ listingId }: GoodDealButtonProps) {
  const { t } = useLocale()
  const [count, setCount] = useState(0)
  const [hasVoted, setHasVoted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    fetch(`/api/listings/${listingId}/good-deal`)
      .then((res) => res.json())
      .then((data: { count: number; hasVoted: boolean }) => {
        if (!cancelled) {
          setCount(data.count)
          setHasVoted(data.hasVoted)
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [listingId])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        setShowTooltip(false)
      }
    }
    if (showTooltip) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showTooltip])

  const handleClick = useCallback(async () => {
    if (loading) return
    setLoading(true)
    try {
      const res = await fetch(`/api/listings/${listingId}/good-deal`, {
        method: 'POST',
      })
      const data: { hasVoted: boolean; count: number } = await res.json()
      setHasVoted(data.hasVoted)
      setCount(data.count)
    } catch {
      // silently ignore
    } finally {
      setLoading(false)
    }
  }, [listingId, loading])

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        {/* Thumbs-up vote button */}
        <button
          onClick={handleClick}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-60"
          style={{
            backgroundColor: hasVoted ? '#eef5e8' : '#ffffff',
            borderColor: hasVoted ? '#4d8230' : '#d1d5db',
            color: hasVoted ? '#4d8230' : '#6b7280',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={hasVoted ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
            <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
          <span>{hasVoted ? t('good_deal_voted') : t('good_deal')}</span>
          {count > 0 && (
            <span
              className="inline-flex items-center justify-center rounded-full text-xs font-semibold min-w-[20px] h-5 px-1.5"
              style={{
                backgroundColor: hasVoted ? '#4d8230' : '#e5e7eb',
                color: hasVoted ? '#ffffff' : '#374151',
              }}
            >
              {count}
            </span>
          )}
        </button>

        {/* Info button */}
        <div className="relative" ref={tooltipRef}>
          <button
            onClick={() => setShowTooltip(!showTooltip)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 transition-colors hover:border-gray-300 hover:text-gray-600"
            aria-label="Info"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </button>

          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute right-0 top-10 z-50 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
              <h4 className="text-sm font-semibold text-gray-900">{t('good_deal_tooltip_title')}</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-600">{t('good_deal_tooltip_body')}</p>
              <p className="mt-2 text-[11px] text-gray-400">{t('good_deal_tooltip_note')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Count line */}
      <p className="text-xs text-gray-500">
        {count > 0
          ? `${count} ${t('good_deal_voters')}`
          : t('good_deal_first')
        }
      </p>
    </div>
  )
}
