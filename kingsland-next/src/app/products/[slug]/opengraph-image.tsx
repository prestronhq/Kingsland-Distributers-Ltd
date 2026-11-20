// src/app/products/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og'
import { getProductBySlug } from '@/lib/products'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  const name = product?.name ?? 'Premium Spirits'
  const brand = product?.brand ?? 'Kingsland Distributors'
  const category = product?.category ?? ''
  const origin = product?.origin ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #1a0a00 50%, #000000 100%)',
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
        {/* Gold border frame */}
        <div
          style={{
            position: 'absolute',
            inset: '20px',
            border: '2px solid rgba(217, 119, 6, 0.4)',
            borderRadius: '16px',
          }}
        />
        {/* Brand label */}
        <div style={{ color: '#d97706', fontSize: '18px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px' }}>
          Kingsland Distributors Uganda
        </div>
        {/* Product name */}
        <div
          style={{
            color: '#ffffff',
            fontSize: name.length > 35 ? '42px' : '56px',
            fontWeight: 700,
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: '20px',
            maxWidth: '900px',
          }}
        >
          {name}
        </div>
        {/* Meta row */}
        <div style={{ display: 'flex', gap: '16px', color: 'rgba(255,255,255,0.6)', fontSize: '20px' }}>
          {brand && <span>{brand}</span>}
          {origin && <><span style={{ color: '#d97706' }}>·</span><span>{origin}</span></>}
          {category && <><span style={{ color: '#d97706' }}>·</span><span style={{ textTransform: 'capitalize' }}>{category}</span></>}
        </div>
        {/* Footer */}
        <div style={{ position: 'absolute', bottom: '40px', color: 'rgba(255,255,255,0.3)', fontSize: '16px', letterSpacing: '0.1em' }}>
          kingslanduganda.com
        </div>
      </div>
    ),
    { ...size }
  )
}
