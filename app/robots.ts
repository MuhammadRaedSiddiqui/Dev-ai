import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard',
        '/project',
        '/settings',
        '/onboarding',
        '/api',
      ],
    },
    sitemap: 'https://devdocs.ai/sitemap.xml',
  }
}
