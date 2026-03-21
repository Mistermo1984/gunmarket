'use client'

import { useState, useEffect, useCallback } from 'react'

interface GoodDealButtonProps {
  listingId: string
}

export default function GoodDealButton({ listingId }: GoodDealButtonProps) {
  const [count, setCount] = useState(0)
  const [hasVoted, setHasVoted] = useState(false)
  const [loading, setLoading] = useState(false)

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

  const handleClick = useCallback(async () => {
    if (loading) return
    setLoading(true)
    try {
      const res = await fetch(`/api/listings/${listingId}/good-deal`, {
        method: 'POST',
      })
      const data: { voted: boolean; count: number } = await res.json()
      setHasVoted(data.voted)
      setCount(data.count)
    } catch {
      // silently ignore
    } finally {
      setLoading(false)
    }
  }, [listingId, loading])

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors disabled:opacity-60"
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
      <span>{hasVoted ? 'Gutes Angebot \u2713' : 'Gutes Angebot'}</span>
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
  )
}
