import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-slate-800 mb-8">
                Contact
              </h1>
              <p className="text-2xl text-gray-600">
                Coming Soon
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
