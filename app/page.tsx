import { Button } from "@/components/ui/button"
import Link from "next/link"
import WaveformBackground from "@/components/waveform-background"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-800 min-h-screen flex flex-col">
        <WaveformBackground />

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between p-6 lg:px-12">
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
            <span className="text-purple-100 text-xl font-medium tracking-wide">Ameno Narime</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/blog" className="text-purple-200 hover:text-purple-100 transition-colors font-medium">
              Blog
            </Link>
            <Link href="/demos" className="text-purple-200 hover:text-purple-100 transition-colors font-medium">
              Demo
            </Link>
            <Link href="/product" className="text-purple-200 hover:text-purple-100 transition-colors font-medium">
              Product
            </Link>
            <Link href="/research" className="text-purple-200 hover:text-purple-100 transition-colors font-medium">
              Research
            </Link>
            <Link href="/contact" className="text-purple-200 hover:text-purple-100 transition-colors font-medium">
              Contact
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex items-center justify-start px-6 lg:px-12 pb-32">
          <div className="max-w-4xl">
            <h1 className="text-5xl lg:text-7xl font-medium text-purple-50 mb-12 leading-tight tracking-wide">
              Play with Sound,
              <br />
              Create Sound Space
            </h1>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-purple-600 text-white hover:bg-purple-700 px-8 py-3 text-lg font-medium shadow-lg"
              >
                About us
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-purple-300 text-purple-100 hover:bg-purple-300 hover:text-purple-900 px-8 py-3 text-lg bg-transparent font-medium"
              >
                Read the Blog
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-100 py-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-700 mb-8 tracking-wide">About us</h2>
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed font-normal">
            
          </p>
        </div>
      </section>

      {/* News Section */}
      <section className="bg-gray-100 py-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-700 mb-12 tracking-wide">Recent Activities</h2>

          <div className="space-y-12">
            <article>
              <h3 className="text-xl lg:text-2xl font-semibold text-gray-600 mb-3">
                Blog1
              </h3>
              <p className="text-base text-gray-500 leading-relaxed mb-2 font-normal">
                Blog1要約
              </p>
              <Link href="/blog" className="text-gray-700 hover:underline font-medium text-sm">
                ブログを読む
              </Link>
            </article>

            <article>
              <h3 className="text-xl lg:text-2xl font-semibold text-gray-600 mb-3">音響空間の可視化技術</h3>
              <p className="text-base text-gray-500 leading-relaxed mb-2 font-normal">
                音の響きを3D空間で可視化し、建築音響設計に活用する新しい技術を研究開発しています。
              </p>
              <Link href="/research" className="text-gray-700 hover:underline font-medium text-sm">
                研究詳細を見る
              </Link>
            </article>

            <article>
              <h3 className="text-xl lg:text-2xl font-semibold text-gray-600 mb-3">自然音響ライブラリの構築</h3>
              <p className="text-base text-gray-500 leading-relaxed mb-2 font-normal">
                日本各地の自然音を収録・分析し、音響合成に活用できるライブラリを構築しています。
              </p>
              <Link href="/blog" className="text-gray-700 hover:underline font-medium text-sm">
                プロジェクト詳細
              </Link>
            </article>
          </div>

          <div className="mt-12">
            <Link href="/blog" className="text-gray-700 hover:underline text-base font-medium">
              さらに詳しく見る
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 px-6 lg:px-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-8">
            <Link href="/github" className="text-gray-600 hover:text-gray-800">
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
