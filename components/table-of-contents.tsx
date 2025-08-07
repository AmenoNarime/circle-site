'use client'

import { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  className?: string
}

export function TableOfContents({ className = '' }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  useEffect(() => {
    // ページ内の見出し要素を取得
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const items: TocItem[] = []

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1))
      const text = heading.textContent || ''
      let id = heading.id

      // IDが設定されていない場合は生成
      if (!id) {
        id = `heading-${index}`
        heading.id = id
      }

      items.push({ id, text, level })
    })

    setTocItems(items)
  }, [])

  useEffect(() => {
    // Intersection Observer で現在表示中の見出しを追跡
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0
      }
    )

    tocItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [tocItems])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  if (tocItems.length === 0) {
    return null
  }

  return (
    <div className={`fixed right-6 top-32 bottom-32 z-10 hidden lg:block ${className}`}>
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 overflow-hidden max-w-xs">
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-purple-50/50">
          <h3 className="text-sm font-semibold text-gray-900">
            目次
          </h3>
          <button
            onClick={toggleCollapse}
            className="p-1 rounded-md hover:bg-purple-100 transition-colors"
            aria-label={isCollapsed ? '目次を展開' : '目次を折りたたむ'}
          >
            {isCollapsed ? (
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            )}
          </button>
        </div>

        {/* 目次コンテンツ */}
        <div 
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isCollapsed ? 'max-h-0' : 'max-h-96'
          }`}
        >
          <nav className="p-4 space-y-1 max-h-96 overflow-y-auto">
            {tocItems.map(({ id, text, level }) => (
              <button
                key={id}
                onClick={() => scrollToHeading(id)}
                className={`
                  block w-full text-left text-sm transition-all duration-200 relative
                  ${level === 1 ? 'font-semibold text-base mb-2' : ''}
                  ${level === 2 ? 'font-medium pl-4 border-l-2 border-purple-200' : ''}
                  ${level === 3 ? 'font-normal pl-6 border-l border-dashed border-gray-300' : ''}
                  ${level >= 4 ? 'font-light pl-8 text-gray-500 border-l border-dotted border-gray-200' : ''}
                  ${
                    activeId === id
                      ? level === 1 
                        ? 'text-purple-800 bg-purple-50 rounded-md'
                        : level === 2
                        ? 'text-purple-700 bg-purple-50 border-l-purple-500 rounded-r-md'
                        : 'text-purple-600 bg-purple-50/50 rounded-r-md'
                      : level === 1
                      ? 'text-gray-800 hover:text-purple-700 hover:bg-purple-50 rounded-md'
                      : level === 2
                      ? 'text-gray-700 hover:text-purple-600 hover:bg-purple-50/50 hover:border-l-purple-400 rounded-r-md'
                      : 'text-gray-600 hover:text-purple-500 hover:bg-purple-50/50 rounded-r-md'
                  }
                `}
              >
                <span className={`block py-2 px-3 transition-colors ${
                  level === 1 ? 'py-2' : level === 2 ? 'py-1.5' : 'py-1'
                }`}>
                  {text}
                </span>
                
                {/* アクティブインジケーター */}
                {activeId === id && (
                  <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-1 rounded-l-full bg-purple-500 ${
                    level === 1 ? 'h-8' : level === 2 ? 'h-6' : 'h-4'
                  }`} />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
