import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Music Personality App",
  description: "Spotify Wrapped Style Analyzer",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.className} antialiased flex flex-col min-h-screen`}
      >
        <div className="flex-1 flex flex-col">
          {children}
        </div>

        <Toaster position="top-center" />
      </body>
    </html>
  )
}