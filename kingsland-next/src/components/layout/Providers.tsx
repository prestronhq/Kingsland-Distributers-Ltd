'use client'
// src/components/layout/Providers.tsx
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a0a00',
            color: '#fff',
            border: '1px solid rgba(217,119,6,0.3)',
          },
          success: {
            iconTheme: { primary: '#d97706', secondary: '#000' },
          },
        }}
      />
    </>
  )
}
