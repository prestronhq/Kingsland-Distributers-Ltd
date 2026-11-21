// src/app/opengraph-image.tsx
// Generates the homepage Open Graph image (1200×630) used when anyone shares
// the site root link on WhatsApp, Twitter/X, Facebook, iMessage, LinkedIn, etc.
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Kingsland Distributors — Premium Spirits in Uganda'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #1a0900 55%, #000000 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        {/* Outer gold frame */}
        <div
          style={{
            position: 'absolute',
            inset: '20px',
            border: '2px solid rgba(217, 119, 6, 0.45)',
            borderRadius: '18px',
          }}
        />
        {/* Inner corner accents */}
        <div
          style={{
            position: 'absolute',
            top: '32px',
            left: '32px',
            width: '32px',
            height: '32px',
            borderTop: '2px solid #d97706',
            borderLeft: '2px solid #d97706',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '32px',
            right: '32px',
            width: '32px',
            height: '32px',
            borderTop: '2px solid #d97706',
            borderRight: '2px solid #d97706',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '32px',
            width: '32px',
            height: '32px',
            borderBottom: '2px solid #d97706',
            borderLeft: '2px solid #d97706',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            right: '32px',
            width: '32px',
            height: '32px',
            borderBottom: '2px solid #d97706',
            borderRight: '2px solid #d97706',
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            color: '#d97706',
            fontSize: '15px',
            fontWeight: 600,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          Uganda&apos;s Premier Spirit Distributor
        </div>

        {/* Logo wordmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            marginBottom: '10px',
          }}
        >
          {/* Crown icon — SVG inline */}
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#d97706"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 20h20M5 20l2-10 5 6 5-6 2 10" />
            <circle cx="12" cy="6" r="2" fill="#d97706" stroke="none" />
            <circle cx="4" cy="11" r="1.5" fill="#d97706" stroke="none" />
            <circle cx="20" cy="11" r="1.5" fill="#d97706" stroke="none" />
          </svg>
          <div
            style={{
              color: '#ffffff',
              fontSize: '56px',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              lineHeight: 1,
            }}
          >
            Kingsland
          </div>
        </div>

        {/* Sub-title */}
        <div
          style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: '22px',
            fontWeight: 400,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          Distributors
        </div>

        {/* Divider */}
        <div
          style={{
            width: '100px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #d97706, transparent)',
            marginBottom: '22px',
          }}
        />

        {/* Category pills */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '900px',
            marginBottom: '26px',
          }}
        >
          {['Whisky', 'Cognac', 'Champagne', 'Vodka', 'Gin', 'Wine', 'Tequila'].map((cat) => (
            <div
              key={cat}
              style={{
                padding: '6px 16px',
                border: '1px solid rgba(217, 119, 6, 0.3)',
                borderRadius: '100px',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '15px',
                letterSpacing: '0.05em',
              }}
            >
              {cat}
            </div>
          ))}
        </div>

        {/* Conversion CTA Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#d97706',
            color: '#000000',
            padding: '12px 32px',
            borderRadius: '9999px',
            fontSize: '18px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            boxShadow: '0 8px 24px rgba(217, 119, 6, 0.35)',
          }}
        >
          <span>Order Now via WhatsApp</span>
          <span style={{ fontSize: '20px' }}>→</span>
        </div>

        {/* Footer URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '26px',
            color: 'rgba(255,255,255,0.28)',
            fontSize: '14px',
            letterSpacing: '0.12em',
            textTransform: 'lowercase',
          }}
        >
          kingslanduganda.com
        </div>
      </div>
    ),
    { ...size }
  )
}
