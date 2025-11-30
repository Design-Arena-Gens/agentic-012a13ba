import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ChatPTAtlas - Interactive World Map',
  description: 'Explore the world with ChatPTAtlas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
