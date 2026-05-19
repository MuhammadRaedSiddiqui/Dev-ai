import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import './globals.css'
import { ToastProvider } from '@/components/stitch/organisms/ToastProvider'

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
  title: 'DevDocs AI — AI-Powered Pre-Build Planning Assistant',
  description:
    'Interview with AI before you code. Generate comprehensive 10-file documentation bundles covering architecture, database, API contracts, testing, and deployment.',
  metadataBase: new URL('https://devdocs.ai'),
  openGraph: {
    title: 'DevDocs AI — AI-Powered Pre-Build Planning Assistant',
    description:
      'Interview with AI before you code. Get structured documentation instantly.',
    type: 'website',
    url: 'https://devdocs.ai',
    siteName: 'DevDocs AI',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@devdocsai',
    creator: '@devdocsai',
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body
        className={`${inter.variable} ${lora.variable} stitch-scope font-stitch-body-md text-stitch-body-md text-stitch-ink-black antialiased`}
      >
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}
