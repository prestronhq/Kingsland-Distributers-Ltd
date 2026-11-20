// src/components/ui/SkipToContent.tsx
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[9999] bg-amber-500 text-black px-4 py-2 rounded font-semibold focus:outline-none focus:ring-2 focus:ring-amber-300"
    >
      Skip to main content
    </a>
  )
}
