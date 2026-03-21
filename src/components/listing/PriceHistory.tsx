'use client'

import { useState, useEffect } from 'react'

interface PricePoint {
  preis: number
  recorded_at: string
}

interface PriceHistoryProps {
  listingId: string
  currentPrice: number
}

function formatCHF(value: number): string {
  return `CHF ${value.toLocaleString('de-CH', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export default function PriceHistory({ listingId, currentPrice }: PriceHistoryProps) {
  const [history, setHistory] = useState<PricePoint[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch(`/api/listings/${listingId}/price-history`)
      .then((res) => res.json())
      .then((data: { history: PricePoint[] }) => {
        if (!cancelled) {
          setHistory(data.history ?? [])
          setLoaded(true)
        }
      })
      .catch(() => {
        if (!cancelled) setLoaded(true)
      })
    return () => {
      cancelled = true
    }
  }, [listingId])

  if (!loaded || history.length < 2) return null

  const prices = history.map((h) => h.preis)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const firstPrice = prices[0]
  const lastPrice = prices[prices.length - 1]
  const pctChange = firstPrice !== 0 ? ((lastPrice - firstPrice) / firstPrice) * 100 : 0
  const pctRounded = Math.round(pctChange * 10) / 10
  const isDecrease = pctChange < 0
  const isIncrease = pctChange > 0

  // SVG chart dimensions
  const chartWidth = 400
  const chartHeight = 120
  const paddingX = 20
  const paddingY = 15
  const innerW = chartWidth - paddingX * 2
  const innerH = chartHeight - paddingY * 2

  const priceRange = maxPrice - minPrice || 1

  const points = history.map((h, i) => {
    const x = paddingX + (i / (history.length - 1)) * innerW
    const y = paddingY + innerH - ((h.preis - minPrice) / priceRange) * innerH
    return { x, y, preis: h.preis, date: h.recorded_at }
  })

  const polyline = points.map((p) => `${p.x},${p.y}`).join(' ')

  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Preisverlauf</h3>
        {pctChange !== 0 && (
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: isDecrease ? '#dcfce7' : '#fee2e2',
              color: isDecrease ? '#166534' : '#991b1b',
            }}
          >
            {isIncrease ? '+' : ''}{pctRounded}%
          </span>
        )}
      </div>

      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid lines */}
        <line
          x1={paddingX}
          y1={paddingY}
          x2={paddingX + innerW}
          y2={paddingY}
          stroke="#e5e7eb"
          strokeWidth="1"
        />
        <line
          x1={paddingX}
          y1={paddingY + innerH / 2}
          x2={paddingX + innerW}
          y2={paddingY + innerH / 2}
          stroke="#e5e7eb"
          strokeWidth="1"
        />
        <line
          x1={paddingX}
          y1={paddingY + innerH}
          x2={paddingX + innerW}
          y2={paddingY + innerH}
          stroke="#e5e7eb"
          strokeWidth="1"
        />

        {/* Line */}
        <polyline
          points={polyline}
          fill="none"
          stroke={isDecrease ? '#16a34a' : '#dc2626'}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Dots */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill={isDecrease ? '#16a34a' : '#dc2626'}
            stroke="#ffffff"
            strokeWidth="2"
          />
        ))}
      </svg>

      <div className="mt-3 space-y-1">
        {history.map((h, i) => (
          <div key={i} className="flex items-center justify-between text-xs text-gray-600">
            <span>{formatDate(h.recorded_at)}</span>
            <span className="font-medium text-gray-800">{formatCHF(h.preis)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
