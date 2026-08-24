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

  /**
   * `colors` arrives as a fresh array literal on every render — from the
   * callers and from this component's own default. Depending on it directly
   * meant the effect below tore down and rebuilt the entire particle system
   * each time the parent re-rendered. Joining collapses it to a value the
   * dependency check can actually compare.
   */
  const palette = colors.join(',')

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
      if (rect && rect.width > 0 && rect.height > 0) {
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }

    /**
     * A drag-resize fires continuously, and every `canvas.width` write
     * reallocates the backing store and clears it. One per frame is plenty.
     */
    let resizeFrame = 0
    const onResize = () => {
      if (resizeFrame) return
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = 0
        resize()
      })
    }

    resize()
    window.addEventListener('resize', onResize, { passive: true })

    const swatches = palette.split(',')

    // Initialize particles
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.floor(Math.random() * 3 + 1) * 2, // 2, 4, or 6px — pixel-perfect
      color: swatches[Math.floor(Math.random() * swatches.length)],
      vx: (Math.random() - 0.5) * 0.4 * speed,
      vy: (Math.random() - 0.5) * 0.3 * speed - 0.15 * speed, // drift upward
      opacity: Math.random() * 0.6 + 0.15,
      opacityDir: Math.random() > 0.5 ? 1 : -1,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
    }))

    let isVisible = true

    const animate = () => {
      if (!isVisible) {
        animationRef.current = 0
        return
      }

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
        isVisible = entry.isIntersecting
        // Restart only if the loop has actually wound down, so a flicker
        // across the threshold cannot leave two loops running.
        if (isVisible && !animationRef.current) {
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
      window.removeEventListener('resize', onResize)
      observer.disconnect()
      if (resizeFrame) cancelAnimationFrame(resizeFrame)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = 0
      }
    }
  }, [count, palette, speed])

  return (
    <canvas
      ref={canvasRef}
      className={cn('pointer-events-none absolute inset-0 z-0', className)}
      aria-hidden="true"
    />
  )
}
