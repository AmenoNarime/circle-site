"use client"

import { useTranslation } from "react-i18next"
import i18n from "@/lib/i18n"

const buttonBase =
  "px-3 py-1 text-xs font-semibold rounded-full transition-colors"
const activeClass = "bg-white text-purple-800 shadow-sm"
const inactiveClass = "text-purple-100 hover:text-white"

export default function LanguageSwitch() {
  const { t } = useTranslation()
  const current = i18n.resolvedLanguage ?? i18n.language
  const active = current && current.toLowerCase().startsWith("en") ? "en" : "ja"

  const changeTo = (language: "ja" | "en") => {
    if (active !== language) {
      i18n.changeLanguage(language)
    }
  }

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 p-1"
      aria-label={t("language.label")}
      role="group"
    >
      <button
        type="button"
        onClick={() => changeTo("ja")}
        aria-pressed={active === "ja"}
        className={`${buttonBase} ${active === "ja" ? activeClass : inactiveClass}`}
      >
        {t("language.ja")}
      </button>
      <button
        type="button"
        onClick={() => changeTo("en")}
        aria-pressed={active === "en"}
        className={`${buttonBase} ${active === "en" ? activeClass : inactiveClass}`}
      >
        {t("language.en")}
      </button>
    </div>
  )
}
