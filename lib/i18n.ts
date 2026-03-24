import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import ja from "@/locales/ja/site.json"
import en from "@/locales/en/site.json"

const resources = {
  ja: { translation: ja },
  en: { translation: en },
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "ja",
    fallbackLng: "ja",
    interpolation: {
      escapeValue: false,
    },
  })
}

export default i18n
