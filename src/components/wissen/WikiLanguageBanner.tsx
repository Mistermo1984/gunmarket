'use client'

import { AlertTriangle } from 'lucide-react'
import { useLocale } from '@/lib/locale-context'
import type { TranslationKey } from '@/lib/i18n'

export default function WikiLanguageBanner() {
  const { locale, t } = useLocale()
  if (locale === 'de') return null

  return (
    <div className="mx-auto max-w-7xl px-4 -mt-4 mb-4">
      <div className="flex items-center gap-2 rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
        <AlertTriangle size={16} className="shrink-0 text-yellow-600" />
        {t(`wiki_german_only_${locale}` as TranslationKey)}
      </div>
    </div>
  )
}
