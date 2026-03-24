"use client"

import type { ReactNode } from "react"
import { useEffect } from "react"
import { I18nextProvider } from "react-i18next"
import i18n from "@/lib/i18n"

const STORAGE_KEY = "site_language"

type SupportedLanguage = "ja" | "en"

const normalizeLanguage = (value: string | null | undefined): SupportedLanguage => {
  if (value && value.toLowerCase().startsWith("en")) {
    return "en"
  }
  return "ja"
}

export default function I18nProvider({
  children,
}: {
  children: ReactNode
}) {
  useEffect(() => {
    const saved = normalizeLanguage(window.localStorage.getItem(STORAGE_KEY))

    const handleChange = (language: string) => {
      const normalized = normalizeLanguage(language)
      window.localStorage.setItem(STORAGE_KEY, normalized)
      document.documentElement.lang = normalized
    }

    i18n.on("languageChanged", handleChange)
    handleChange(saved)

    if (i18n.language !== saved) {
      i18n.changeLanguage(saved)
    }

    return () => {
      i18n.off("languageChanged", handleChange)
    }
  }, [])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
