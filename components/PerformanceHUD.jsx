"use client";

import { useState, useEffect, useRef } from 'react';
import { Stats } from '@react-three/drei';
import { usePerformance } from './PerformanceManager';

export default function PerformanceHUD() {
    const { isLowSpec, toggleLowSpec, isMobile } = usePerformance();
    const [fps, setFps] = useState(60);
    const [showWarning, setShowWarning] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const framesRef = useRef(0);
    const lastTimeRef = useRef(performance.now());

    useEffect(() => {
        let animationFrameId;

        const updateFps = () => {
            framesRef.current++;
            const currentTime = performance.now();
            const elapsed = currentTime - lastTimeRef.current;

            if (elapsed >= 1000) {
                const currentFps = Math.round((framesRef.current * 1000) / elapsed);
                setFps(currentFps);

                // Auto-detection: If FPS is very low on non-low-spec mode, show warning
                if (currentFps < 25 && !isLowSpec) {
                    setShowWarning(true);
                }

                framesRef.current = 0;
                lastTimeRef.current = currentTime;
            }

            animationFrameId = requestAnimationFrame(updateFps);
        };

        setIsMounted(true);
        animationFrameId = requestAnimationFrame(updateFps);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isLowSpec]);

    if (!isMounted) return null;

    return (
        <>
            {/* FPS Counter & Toggle UI */}
            <div style={{
                position: 'fixed',
                top: '80px',
                right: '20px',
                zIndex: 10000,
                background: 'rgba(15, 23, 42, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                padding: '10px 15px',
                borderRadius: '12px',
                color: '#fff',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                transition: 'all 0.3s ease'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '120px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>PERF:</span>
                    <span style={{ color: fps < 30 ? '#ef4444' : '#22c55e', fontWeight: 'bold' }}>{fps} FPS</span>
                </div>

                <button
                    onClick={toggleLowSpec}
                    style={{
                        background: isLowSpec ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${isLowSpec ? '#22c55e' : 'rgba(255,255,255,0.2)'}`,
                        color: isLowSpec ? '#22c55e' : '#fff',
                        padding: '5px 10px',
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'all 0.2s ease',
                        width: '100%'
                    }}
                >
                    {isLowSpec ? 'LOW SPEC: ON' : 'LOW SPEC: OFF'}
                </button>

                <button
                    onClick={() => toggleFeature('cursor')}
                    style={{
                        background: features.cursor ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${features.cursor ? '#38bdf8' : 'rgba(255,255,255,0.2)'}`,
                        color: features.cursor ? '#38bdf8' : '#fff',
                        padding: '5px 10px',
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'all 0.2s ease',
                        width: '100%'
                    }}
                >
                    {features.cursor ? 'CURSOR: ON' : 'CURSOR: OFF'}
                </button>

                {showWarning && !isLowSpec && (
                    <div style={{
                        marginTop: '5px',
                        color: '#fbbf24',
                        fontSize: '0.65rem',
                        textAlign: 'center',
                        animation: 'pulse 2s infinite'
                    }}>
                        Low performance detected. <br />
                        <span
                            onClick={() => { toggleLowSpec(); setShowWarning(false); }}
                            style={{ textDecoration: 'underline', cursor: 'pointer', color: '#fff' }}
                        >
                            Optimize now?
                        </span>
                    </div>
                )}
            </div>

            {/* Native Three.js Stats overlay (invisible but active for deep debugging if needed) */}
            <div style={{ position: 'fixed', top: 0, right: 0, width: '1px', height: '1px', zIndex: -1, pointerEvents: 'none', opacity: 0 }}>
                <Stats />
            </div>

            <style jsx>{`
                @keyframes pulse {
                    0% { opacity: 0.6; }
                    50% { opacity: 1; }
                    100% { opacity: 0.6; }
                }
            `}</style>
        </>
    );
}
