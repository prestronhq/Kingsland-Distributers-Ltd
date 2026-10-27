import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // React Compiler — stable in Next.js 16, opt-in
  // Automatically memoizes all components; no React.memo / useMemo / useCallback needed.
  reactCompiler: true,

  // Turbopack top-level config (moved OUT of experimental in Next.js 16)
  turbopack: {
    // Add custom rules here only if needed
  },

  images: {
    // remotePatterns — images.domains is deprecated in Next.js 16
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/photo-**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    // minimumCacheTTL: 14400 is the new default in v16 (4 hours). Keep it.
    // qualities: [75] is the new default in v16. Keep it — fine for product images.
  },

  reactStrictMode: true,
}

export default nextConfig
