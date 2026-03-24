import Link from "next/link"
import I18nText from "@/components/i18n-text"
import LanguageSwitch from "@/components/language-switch"

export default function Header() {
  return (
    <nav 
      className="relative z-10 flex items-center justify-between p-6 lg:px-12"
      style={{ background: "linear-gradient(135deg, #4c1d95 0%, #6b21a8 50%, #7c2d12 100%)" }}
    >
      <div className="flex items-center space-x-3">
        <div className="relative w-14 h-14">
          {/* 円の枠 */}
          <div className="absolute inset-0 border-2 border-purple-300 rounded-full bg-transparent backdrop-blur-sm"></div>

          {/* シンプルな波形 */}
          <div className="absolute inset-3 flex items-center justify-center">
            <div className="flex space-x-0.5 items-end">
              <div className="w-0.5 h-2 bg-purple-200 rounded-full"></div>
              <div className="w-0.5 h-4 bg-purple-200 rounded-full"></div>
              <div className="w-0.5 h-1 bg-purple-200 rounded-full"></div>
              <div className="w-0.5 h-3 bg-purple-200 rounded-full"></div>
              <div className="w-0.5 h-2 bg-purple-200 rounded-full"></div>
              <div className="w-0.5 h-4 bg-purple-200 rounded-full"></div>
              <div className="w-0.5 h-1 bg-purple-200 rounded-full"></div>
              <div className="w-0.5 h-3 bg-purple-200 rounded-full"></div>
              <div className="w-0.5 h-2 bg-purple-200 rounded-full"></div>
            </div>
          </div>
        </div>
        <Link href="/" className="text-purple-100 text-xl font-medium tracking-wide hover:text-purple-50 transition-colors">
          AmenoNarime
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/blog" className="text-purple-200 hover:text-purple-100 transition-colors font-medium">
            <I18nText i18nKey="nav.blog" />
          </Link>
          <Link href="/demos" className="text-purple-200 hover:text-purple-100 transition-colors font-medium">
            <I18nText i18nKey="nav.demo" />
          </Link>
          <Link href="/product" className="text-purple-200 hover:text-purple-100 transition-colors font-medium">
            <I18nText i18nKey="nav.product" />
          </Link>
          <Link href="/research" className="text-purple-200 hover:text-purple-100 transition-colors font-medium">
            <I18nText i18nKey="nav.research" />
          </Link>
          <Link href="/contact" className="text-purple-200 hover:text-purple-100 transition-colors font-medium">
            <I18nText i18nKey="nav.contact" />
          </Link>
        </div>
        <LanguageSwitch />
      </div>
    </nav>
  )
}
