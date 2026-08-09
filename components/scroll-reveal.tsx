'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type RevealVariant = 'fade-up' | 'fade-down' | 'slide-left' | 'slide-right' | 'scale-up' | 'pixel-pop'

interface ScrollRevealProps {
  children: ReactNode
  variant?: RevealVariant
  delay?: number
  duration?: number
  className?: string
  /** When true, staggers children automatically */
  stagger?: boolean
  /** Delay between each staggered child in ms */
  staggerDelay?: number
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
  stagger = false,
  staggerDelay = 100,
  threshold = 0.15,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(true)
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

  const variantStyles: Record<RevealVariant, string> = {
    'fade-up': 'translate-y-8 opacity-0',
    'fade-down': '-translate-y-8 opacity-0',
    'slide-left': '-translate-x-12 opacity-0',
    'slide-right': 'translate-x-12 opacity-0',
    'scale-up': 'scale-90 opacity-0',
    'pixel-pop': 'scale-75 opacity-0',
  }

  return (
    <div
      ref={ref}
      className={cn(
        'transition-[transform,opacity] ease-out will-change-[transform,opacity]',
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

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(true)
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

  const variantStyles: Record<RevealVariant, string> = {
    'fade-up': 'translate-y-8 opacity-0',
    'fade-down': '-translate-y-8 opacity-0',
    'slide-left': '-translate-x-12 opacity-0',
    'slide-right': 'translate-x-12 opacity-0',
    'scale-up': 'scale-90 opacity-0',
    'pixel-pop': 'scale-75 opacity-0',
  }

  // Convert children to array for mapping
  const childArray = Array.isArray(children) ? children : [children]

  return (
    <div ref={ref} className={className}>
      {childArray.map((child, i) => (
        <div
          key={i}
          className={cn(
            'transition-[transform,opacity] ease-out will-change-[transform,opacity]',
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
