import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "AmenoNarime",
  description: "",
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
