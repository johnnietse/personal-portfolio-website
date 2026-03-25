"use client";

import React, { useState, useEffect, useRef } from 'react';
import { usePerformance } from './PerformanceManager';

const VisibilityWrapper = ({ children, height = "400px", margin = "500px" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isActivated, setIsActivated] = useState(false);
    const containerRef = useRef();
    const { isMobile } = usePerformance();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Completely unmount if not within 'margin' distance of viewport
                setIsVisible(entry.isIntersecting);
            },
            { rootMargin: margin }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [margin]);

    const showContent = isVisible || isActivated;

    // Elastic Culling Height Logic
    const currentHeight = isMobile && !isActivated ? "100px" : height;

    return (
        <div
            ref={containerRef}
            style={{
                minHeight: currentHeight,
                height: currentHeight,
                width: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                overflow: 'hidden'
            }}
        >
            {showContent ? (
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    {children}

                    {/* Mobile Deactivate Toggle */}
                    {isMobile && isActivated && (
                        <button
                            onClick={() => setIsActivated(false)}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                background: 'rgba(255, 123, 114, 0.1)',
                                border: '1px solid rgba(255, 123, 114, 0.3)',
                                color: '#ff7b72',
                                padding: '5px 12px',
                                borderRadius: '20px',
                                fontSize: '0.65rem',
                                fontWeight: 'bold',
                                zIndex: 100,
                                cursor: 'pointer',
                                backdropFilter: 'blur(10px)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}
                        >
                            Power Down
                        </button>
                    )}
                </div>
            ) : (
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: isMobile ? 'row' : 'column',
                    alignItems: 'center',
                    justifyContent: isMobile ? 'space-between' : 'center',
                    background: 'rgba(15, 23, 42, 0.4)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '16px',
                    border: '1px dashed rgba(56, 189, 248, 0.2)',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: isMobile ? '0.7rem' : '0.8rem',
                    fontFamily: '"Orbitron", "Inter", sans-serif',
                    gap: isMobile ? '1rem' : '1.5rem',
                    padding: isMobile ? '0 1.5rem' : '2rem',
                    textAlign: 'center'
                }}>
                    {!isMobile && <div style={{ letterSpacing: '0.1em', opacity: 0.5 }}>[ RESOURCE CULLED FOR PERFORMANCE ]</div>}

                    <button
                        onClick={() => setIsActivated(true)}
                        style={{
                            background: 'rgba(56, 189, 248, 0.1)',
                            border: '1px solid rgba(56, 189, 248, 0.4)',
                            color: '#38bdf8',
                            padding: isMobile ? '8px 16px' : '12px 24px',
                            borderRadius: '30px',
                            fontSize: isMobile ? '0.7rem' : '0.8rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            pointerEvents: 'auto',
                            whiteSpace: 'nowrap'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(56, 189, 248, 0.2)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(56, 189, 248, 0.4)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(56, 189, 248, 0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                        {isMobile ? 'Boot 3D System' : 'Initiate Holographic Link'}
                    </button>

                    {isMobile ? (
                        <div style={{ opacity: 0.4, fontSize: '0.6rem', textAlign: 'right' }}>
                            Tap to expand <br /> interactive showroom
                        </div>
                    ) : (
                        <p style={{ margin: 0, fontSize: '0.7rem', opacity: 0.4, fontWeight: 'normal' }}>
                            Manual override to load 3D spatial infrastructure
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default VisibilityWrapper;
