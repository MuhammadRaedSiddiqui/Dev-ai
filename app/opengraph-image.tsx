import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'DevDocs AI — AI-Powered Pre-Build Planning Assistant'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: '#faf9f5',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, sans-serif',
          padding: '80px',
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: '#141413',
            marginBottom: 20,
          }}
        >
          DevDocs AI
        </div>
        <div
          style={{
            fontSize: 40,
            color: '#73726c',
            textAlign: 'center',
            maxWidth: '80%',
          }}
        >
          AI-Powered Pre-Build Planning Assistant
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#9c9a92',
            marginTop: 40,
            textAlign: 'center',
          }}
        >
          Interview with AI before you code
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
