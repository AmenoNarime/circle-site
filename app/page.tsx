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
      <section id="about" className="bg-gray-100 py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-12 tracking-wide">About us</h2>
          
          <div className="space-y-8">
            <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium">
              サウンドに関する調査・探究を行う集団です。<br></br>
              サウンドに纏わる様々な遊びを通して、音空間の理解と生成を目指します。
            </p>
            
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-8 rounded-2xl border-l-4 border-purple-500">
              <p className="text-lg lg:text-xl text-gray-800 leading-relaxed">
                「AmenoNarime」とは私たちの組織名であり、神様の名前です。天界において鳴り響く、種々雑多、色取り取りの"音"を司る女神という意味を込めて神生み(造語)しました。
              </p>
            </div>
            
            {/* <div className="pt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-8">活動予定内容</h3>
              <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg mb-3 mx-auto">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">サウンドに関する研究開発</h4>
                  <p className="text-gray-600 text-xs">基礎研究から応用技術まで幅広く探究</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg mb-3 mx-auto">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">信号処理やML技術を活用したデモ作成</h4>
                  <p className="text-gray-600 text-xs">インタラクティブなデモンストレーション</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg mb-3 mx-auto">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">サウンドデータの蒐集・蓄積・公開</h4>
                  <p className="text-gray-600 text-xs">知識共有とデータベース構築</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg mb-3 mx-auto">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">クリエイターやプレイヤー向けのプロダクト開発</h4>
                  <p className="text-gray-600 text-xs">創作活動をサポートするツール</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="bg-gradient-to-br from-gray-100 to-gray-200 py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 tracking-wide">Recent Activities</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-purple-700 mx-auto rounded-full"></div>
          </div>

          <div className="grid gap-8 lg:gap-12">
            {recentPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
                  <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 mx-auto">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg">まだブログ記事がありません。</p>
                </div>
              </div>
            ) : (
              recentPosts.map((post, index) => (
                <article key={post.slug} className="group">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <time className="text-xs text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded-full">
                          {formatDate(post.date)}
                        </time>
                        <div className="flex items-center space-x-1">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                          <span className="text-xs text-gray-500 font-medium">NEW</span>
                        </div>
                      </div>
                      
                      <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-700 transition-colors">
                        <Link href={`/blog/${post.slug}`} className="block">
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                        {post.excerpt}
                      </p>
                      
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 text-xs rounded-full font-medium border border-purple-200"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-start">
                        <Link 
                          href={`/blog/${post.slug}`} 
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium rounded-md hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-sm hover:shadow-md text-sm"
                        >
                          ブログを読む
                          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                    
                    <div className="h-0.5 bg-gradient-to-r from-purple-500 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </div>
                </article>
              ))
            )}
          </div>

          <div className="mt-16 text-center">
            <Link 
              href="/blog" 
              className="inline-flex items-center px-8 py-4 bg-white text-purple-700 font-semibold rounded-xl border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              すべての記事を見る
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
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
