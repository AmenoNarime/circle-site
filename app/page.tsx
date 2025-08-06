import Link from "next/link"
import WaveformBackground from "@/components/waveform-background"
import HeroButtons from "@/components/hero-buttons"
import { getAllPosts, formatDate } from "@/lib/blog"

export default function HomePage() {
  const posts = getAllPosts()
  const recentPosts = posts.slice(0, 3) // 最新の3記事を取得

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
            <span className="text-purple-100 text-xl font-medium tracking-wide">AmenoNarime</span>
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

            <HeroButtons />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-100 py-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-700 mb-8 tracking-wide">About us</h2>
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed font-normal">
            
          </p>
        </div>
      </section>

      {/* News Section */}
      <section className="bg-gray-100 py-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-700 mb-12 tracking-wide">Recent Activities</h2>

          <div className="space-y-12">
            {recentPosts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">まだブログ記事がありません。</p>
              </div>
            ) : (
              recentPosts.map((post) => (
                <article key={post.slug}>
                  <div className="mb-2">
                    <time className="text-sm text-gray-500 font-medium">
                      {formatDate(post.date)}
                    </time>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-semibold text-gray-600 hover:text-purple-700 transition-colors mb-3">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-base text-gray-500 leading-relaxed mb-2 font-normal">
                    {post.excerpt}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link href={`/blog/${post.slug}`} className="text-gray-700 hover:underline font-medium text-sm">
                    ブログを読む
                  </Link>
                </article>
              ))
            )}
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
