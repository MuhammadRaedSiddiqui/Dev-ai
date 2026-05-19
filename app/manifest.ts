import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DevDocs AI',
    short_name: 'DevDocs',
    description:
      'AI-powered pre-build planning assistant for developers. Generate comprehensive documentation bundles.',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf9f5',
    theme_color: '#141413',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
