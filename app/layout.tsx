import type { Metadata } from "next"
import I18nProvider from "@/components/i18n-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "AmenoNarime",
  description: "",
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-background text-foreground">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  )
}
