import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllPostSlugs, formatDate } from '@/lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { mdxComponents } from '@/components/mdx-components'
import { TableOfContents } from '@/components/table-of-contents'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | AmenoNarime`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto lg:mr-80">
          {/* ナビゲーション */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              <svg
                className="mr-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              ブログ一覧に戻る
            </Link>
          </div>

          {/* 記事ヘッダー */}
          <header className="mb-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="mb-6">
                <time className="text-sm text-gray-500 font-medium">
                  {formatDate(post.date)}
                </time>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              
              {post.excerpt && (
                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              )}
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          {/* 記事本文 */}
          <article className="bg-white rounded-xl shadow-lg p-8">
            <div className="prose prose-lg max-w-none">
              <MDXRemote 
                source={post.content}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkMath, remarkGfm],
                    rehypePlugins: [rehypeKatex, rehypeHighlight, rehypeSlug],
                  },
                }}
                components={mdxComponents}
              />
            </div>
          </article>

          {/* フッター */}
          <footer className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              <svg
                className="mr-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              他の記事を読む
            </Link>
          </footer>
        </div>
      </div>
      </div>
      <Footer />
      
      {/* 目次 */}
      <TableOfContents />
    </div>
  )
}
