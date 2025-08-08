import Link from 'next/link'
import { getAllPosts, formatDate } from '@/lib/blog'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* ヘッダー */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-slate-800 mb-4">
              Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              AmenoNarimeの活動報告や技術知見など自由に発信する場です。
            </p>
          </div>

          {/* 記事一覧 */}
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 mx-auto">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">まだ記事がありません。</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6">
              {posts.map((post) => (
                <article key={post.slug} className="group">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <time className="text-xs text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded-full">
                          {formatDate(post.date)}
                        </time>
                        <div className="flex items-center space-x-1">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                          <span className="text-xs text-gray-500 font-medium">BLOG</span>
                        </div>
                      </div>
                      
                      <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-700 transition-colors">
                        <Link href={`/blog/${post.slug}`} className="block">
                          {post.title}
                        </Link>
                      </h2>
                      
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
                          続きを読む
                          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                    
                    <div className="h-0.5 bg-gradient-to-r from-purple-500 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
      <Footer />
    </div>
  )
}
