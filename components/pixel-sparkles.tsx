'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface PixelSparklesProps {
  /** Number of particles */
  count?: number
  /** Brand colors for particles */
  colors?: string[]
  /** Speed multiplier */
  speed?: number
  className?: string
}

interface Particle {
  x: number
  y: number
  size: number
  color: string
  vx: number
  vy: number
  opacity: number
  opacityDir: number
  rotation: number
  rotationSpeed: number
}

export function PixelSparkles({
  count = 24,
  colors = ['#ffdb6b', '#7ec88b', '#8ecdf5', '#ffc5d6'],
  speed = 1,
  className,
}: PixelSparklesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }

    resize()
    window.addEventListener('resize', resize)

    // Initialize particles
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.floor(Math.random() * 3 + 1) * 2, // 2, 4, or 6px — pixel-perfect
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 0.4 * speed,
      vy: (Math.random() - 0.5) * 0.3 * speed - 0.15 * speed, // drift upward
      opacity: Math.random() * 0.6 + 0.15,
      opacityDir: Math.random() > 0.5 ? 1 : -1,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
    }))

    let isVisible = true

    const animate = () => {
      if (!isVisible) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particlesRef.current) {
        // Update position
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotationSpeed

        // Fade in/out
        p.opacity += p.opacityDir * 0.004
        if (p.opacity >= 0.7) p.opacityDir = -1
        if (p.opacity <= 0.1) p.opacityDir = 1

        // Wrap around
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10
        if (p.y < -10) p.y = canvas.height + 10
        if (p.y > canvas.height + 10) p.y = -10

        // Draw pixel square (not circle — pixel-art style!)
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        ctx.restore()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible
        isVisible = entry.isIntersecting
        if (isVisible && !wasVisible) {
          animationRef.current = requestAnimationFrame(animate)
        }
      },
      { threshold: 0.05 }
    )

    observer.observe(canvas)

    if (isVisible) {
      animationRef.current = requestAnimationFrame(animate)
    }

    return () => {
      window.removeEventListener('resize', resize)
      observer.disconnect()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [count, colors, speed])

  return (
    <canvas
      ref={canvasRef}
      className={cn('pointer-events-none absolute inset-0 z-0', className)}
      aria-hidden="true"
    />
  )
}
