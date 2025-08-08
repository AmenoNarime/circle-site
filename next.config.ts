import createMDX from '@next/mdx'
import type { NextConfig } from 'next'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
 
const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
}
 
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [rehypeKatex, rehypeHighlight],
  },
})
 
// Merge MDX config with other Next.js config
export default withMDX(nextConfig)
