import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import I18nText from '@/components/i18n-text'

export default function ResearchPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-slate-800 mb-8">
                <I18nText i18nKey="pages.research.title" />
              </h1>
              <p className="text-2xl text-gray-600">
                <I18nText i18nKey="pages.research.comingSoon" />
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
