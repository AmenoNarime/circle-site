import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "音雅研究所",
  description: "音と心を繋ぐ、新しい音響体験",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-background text-foreground">{children}</body>
    </html>
  )
}
