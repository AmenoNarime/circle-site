"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button
        size="lg"
        className="bg-purple-600 text-white hover:bg-purple-700 px-8 py-3 text-lg font-medium shadow-lg"
        onClick={() => {
          document.getElementById('about')?.scrollIntoView({ 
            behavior: 'smooth' 
          })
        }}
      >
        About us
      </Button>
      <Link href="/blog">
        <Button
          variant="outline"
          size="lg"
          className="border-purple-300 text-purple-100 hover:bg-purple-300 hover:text-purple-900 px-8 py-3 text-lg bg-transparent font-medium w-full"
        >
          Read the Blog
        </Button>
      </Link>
    </div>
  )
}
