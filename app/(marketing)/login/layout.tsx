import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In — DevDocs AI',
  description: 'Sign in to your DevDocs AI account',
  robots: 'noindex, nofollow',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
