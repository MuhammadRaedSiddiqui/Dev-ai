import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import './stitch.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-stitch-inter',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-stitch-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DevDocs AI — Stitch Design Preview',
  description: 'Pixel-faithful Stitch design previews (not production routes)',
}

export default function StitchDesignLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`stitch-scope ${inter.variable} ${lora.variable} font-stitch-body-md text-stitch-body-md text-stitch-ink-black antialiased`}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      {children}
    </div>
  )
}
