'use client'
// src/components/home/StatsCounter.tsx
// Counts up each stat value every time the section scrolls into view
import { useEffect, useRef, useState } from 'react'

interface Stat {
  label: string
  value: string  // e.g. '31+', '15+', '500+'
}

interface StatsCounterProps {
  stats: Stat[]
}

// Parse the numeric part and suffix ('+', '', etc.) from a value string like '500+'
function parse(value: string): { target: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)$/)
  if (!match) return { target: 0, suffix: value }
  return { target: parseInt(match[1], 10), suffix: match[2] }
}

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) {
      setCount(0)
      return
    }
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target)
      return
    }

    let startTime: number | null = null
    let raf: number

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        raf = requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])

  return count
}

function StatItem({ stat }: { stat: Stat; active: boolean }) {
  // This needs active from parent, so we do it differently below
  return null
}

function AnimatedStat({ label, value, active }: Stat & { active: boolean }) {
  const { target, suffix } = parse(value)
  const count = useCountUp(target, active)
  return (
    <div>
      <dt className="text-white/60 text-sm">{label}</dt>
      <dd
        className="text-amber-400 text-3xl font-bold mt-1 tabular-nums"
        aria-label={`${value} ${label}`}
      >
        {count}{suffix}
      </dd>
    </div>
  )
}

export function StatsCounter({ stats }: StatsCounterProps) {
  const ref = useRef<HTMLDListElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reset then trigger so it counts again on every entry
          setActive(false)
          // Small delay to let reset propagate before restarting
          requestAnimationFrame(() => setActive(true))
        } else {
          setActive(false)
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <dl
      ref={ref}
      className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center"
    >
      {stats.map((stat) => (
        <AnimatedStat key={stat.label} {...stat} active={active} />
      ))}
    </dl>
  )
}
