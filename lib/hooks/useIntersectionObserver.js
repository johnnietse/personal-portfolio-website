"use client";

import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Hook that tracks element visibility using IntersectionObserver.
 * Returns a ref to attach to the element and a boolean indicating visibility.
 * 
 * @param options - IntersectionObserver options
 * @returns [ref, isVisible, entry]
 */
export function useIntersectionObserver(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '100px', // Start rendering 100px before entering viewport
    triggerOnce = false,
    disabled = false,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [entry, setEntry] = useState(null);
  const elementRef = useRef(null);
  const observerRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  const setRef = useCallback((node) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    elementRef.current = node;
    
    if (node && !disabled) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          const isIntersecting = entry.isIntersecting;
          setIsVisible(isIntersecting);
          setEntry(entry);
          
          if (triggerOnce && isIntersecting) {
            hasTriggeredRef.current = true;
            observerRef.current?.disconnect();
          }
        },
        { threshold, rootMargin }
      );
      
      observerRef.current.observe(node);
    }
  }, [threshold, rootMargin, triggerOnce, disabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return [setRef, isVisible, entry];
}

/**
 * Hook for render-on-scroll - only renders children when visible.
 * Uses IntersectionObserver with configurable margins.
 * 
 * @param options - IntersectionObserver options + render options
 * @returns { isVisible: boolean, ref: React.RefObject }
 */
export function useRenderOnScroll(options = {}) {
  const {
    threshold = 0.05,
    rootMargin = '200px', // Start rendering 200px before visible
    triggerOnce = true, // Keep rendered once seen
    disabled = false,
    fallback = null, // What to show when not visible
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const observerRef = useRef(null);
  const hasRenderedRef = useRef(false);

  useEffect(() => {
    if (disabled) {
      setIsVisible(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    // If already triggered and triggerOnce, stay visible
    if (triggerOnce && hasRenderedRef.current) {
      setIsVisible(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          hasRenderedRef.current = true;
          
          if (triggerOnce) {
            observerRef.current?.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observerRef.current.observe(element);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, disabled]);

  return { isVisible, ref: elementRef, fallback };
}