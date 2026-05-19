import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up — DevDocs AI',
  description: 'Create your DevDocs AI account',
  robots: 'noindex, nofollow',
}

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
