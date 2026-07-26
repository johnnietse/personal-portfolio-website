"use client";

import React, { useRef, useEffect, useState } from 'react';

export default function ScrollReveal({
  children,
  threshold = 0.1,
  rootMargin = '0px 0px -40px 0px',
  once = true,
  className = '',
  style = {},
  delay = 0,
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (once && hasRevealed) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      setHasRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) setHasRevealed(true);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, hasRevealed]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${isVisible ? 'scroll-reveal--visible' : ''} ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
