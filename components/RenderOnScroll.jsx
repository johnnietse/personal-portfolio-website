'use client';

import React, { useRef, useState, useEffect } from 'react';

/**
 * RenderOnScroll - Only renders children when scrolled into viewport
 * Uses IntersectionObserver for efficient viewport detection
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to render when visible
 * @param {number} props.threshold - Intersection threshold (0-1)
 * @param {string} props.rootMargin - Margin around root for early/late triggering
 * @param {boolean} props.once - Only trigger once, then stay rendered
 * @param {React.CSSProperties} props.containerStyle - Style for container div
 * @param {string} props.className - CSS class for container
 * @param {React.ReactNode} props.fallback - Custom fallback while not visible
 */
function RenderOnScroll({
  children,
  threshold = 0.1,
  rootMargin = '100px',
  once = true,
  containerStyle,
  className,
  fallback,
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || (once && hasTriggered)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) setHasTriggered(true);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, hasTriggered]);

  const mergedStyle = {
    width: '100%',
    height: '100%',
    ...containerStyle,
  };

  if (!isVisible) {
    return (
      <div ref={ref} style={{ width: '100%', height: '100%', ...containerStyle }} className={className}>
        {fallback || (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#8b949e',
            fontSize: '14px',
            fontFamily: 'monospace',
            background: 'rgba(15, 23, 42, 0.3)',
            border: '1px dashed #30363d',
            borderRadius: '8px',
          }}>
            Scroll to render 3D...
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} style={{ width: '100%', height: '100%', ...containerStyle }} className={className}>
      {children}
    </div>
  );
}

export default RenderOnScroll;