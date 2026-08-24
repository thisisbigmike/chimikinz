'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type RevealVariant = 'fade-up' | 'fade-down' | 'slide-left' | 'slide-right' | 'scale-up' | 'pixel-pop'

const variantStyles: Record<RevealVariant, string> = {
  'fade-up': 'translate-y-8 opacity-0',
  'fade-down': '-translate-y-8 opacity-0',
  'slide-left': '-translate-x-12 opacity-0',
  'slide-right': 'translate-x-12 opacity-0',
  'scale-up': 'scale-90 opacity-0',
  'pixel-pop': 'scale-75 opacity-0',
}

interface ScrollRevealProps {
  children: ReactNode
  variant?: RevealVariant
  delay?: number
  duration?: number
  className?: string
  /** Threshold for Intersection Observer (0–1) */
  threshold?: number
  /** Only animate once */
  once?: boolean
}

export function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 500,
  className,
  threshold = 0.15,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  /**
   * `will-change` is a promise to the browser that costs a compositor layer
   * to keep. A single page mounts dozens of these wrappers, so holding the
   * hint forever meant dozens of permanent layers and noticeably heavier
   * scrolling. We hold it only until this element has finished revealing,
   * then hand the layer back.
   */
  const [settled, setSettled] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      setSettled(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  useEffect(() => {
    if (!isVisible || settled) return
    const done = window.setTimeout(() => setSettled(true), delay + duration + 50)
    return () => window.clearTimeout(done)
  }, [isVisible, settled, delay, duration])

  return (
    <div
      ref={ref}
      className={cn(
        'transition-[transform,opacity] ease-out',
        !settled && 'will-change-[transform,opacity]',
        !isVisible && variantStyles[variant],
        isVisible && 'translate-x-0 translate-y-0 scale-100 opacity-100',
        className,
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: variant === 'pixel-pop' ? 'steps(4)' : undefined,
      }}
    >
      {children}
    </div>
  )
}

/**
 * Wraps each direct child in a ScrollReveal with staggered delay.
 * Usage: <ScrollRevealGroup variant="fade-up"><Card /><Card /><Card /></ScrollRevealGroup>
 */
interface ScrollRevealGroupProps {
  children: ReactNode
  variant?: RevealVariant
  staggerDelay?: number
  className?: string
  childClassName?: string
  threshold?: number
}

export function ScrollRevealGroup({
  children,
  variant = 'fade-up',
  staggerDelay = 120,
  className,
  childClassName,
  threshold = 0.1,
}: ScrollRevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const [settled, setSettled] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      setSettled(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  // Convert children to array for mapping
  const childArray = Array.isArray(children) ? children : [children]

  // Same deal as ScrollReveal: hold the hint only until the last child in
  // the stagger has finished, then release every layer at once.
  useEffect(() => {
    if (!isVisible || settled) return
    const last = (childArray.length - 1) * staggerDelay + 500 + 50
    const done = window.setTimeout(() => setSettled(true), last)
    return () => window.clearTimeout(done)
  }, [isVisible, settled, childArray.length, staggerDelay])

  return (
    <div ref={ref} className={className}>
      {childArray.map((child, i) => (
        <div
          key={i}
          className={cn(
            'transition-[transform,opacity] ease-out',
            !settled && 'will-change-[transform,opacity]',
            !isVisible && variantStyles[variant],
            isVisible && 'translate-x-0 translate-y-0 scale-100 opacity-100',
            childClassName,
          )}
          style={{
            transitionDuration: '500ms',
            transitionDelay: isVisible ? `${i * staggerDelay}ms` : '0ms',
            transitionTimingFunction: variant === 'pixel-pop' ? 'steps(4)' : undefined,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
