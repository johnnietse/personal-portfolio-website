"use client";

import React, { useState, useEffect, useRef } from 'react';
import { usePerformance } from './PerformanceManager';

const IronManHUD = () => {
    const { isMobile, features } = usePerformance();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [lerpPos, setLerpPos] = useState({ x: 0, y: 0 });
    const [scanData, setScanData] = useState({ target: "NONE", status: "SEARCHING..." });
    const [isVisible, setIsVisible] = useState(true);

    const [isMounted, setIsMounted] = useState(false);

    // Mouse Tracking with Lerp for high-tech "lag" effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        const handleScanEvent = (e) => {
            if (e.detail) {
                setScanData(e.detail);
            } else {
                setScanData({ target: "NONE", status: "SEARCHING..." });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('hud-scan', handleScanEvent);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('hud-scan', handleScanEvent);
        };
    }, []);

    useEffect(() => {
        const lerp = () => {
            setLerpPos(prev => ({
                x: prev.x + (mousePos.x - prev.x) * 0.15,
                y: prev.y + (mousePos.y - prev.y) * 0.15
            }));
            requestAnimationFrame(lerp);
        };
        setIsMounted(true);
        const animationId = requestAnimationFrame(lerp);
        return () => cancelAnimationFrame(animationId);
    }, [mousePos]);

    if (!isMounted || !features.hud || !isVisible) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden select-none" style={{ fontFamily: '"Orbitron", "Inter", sans-serif' }}>
            {/* 1. Targeting Reticle (Follows Mouse) */}
            <div
                style={{
                    position: 'absolute',
                    left: lerpPos.x,
                    top: lerpPos.y,
                    transform: 'translate(-50%, -50%)',
                    width: '120px',
                    height: '120px',
                    pointerEvents: 'none'
                }}
            >
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                    {/* Outer Rotating Ring */}
                    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1" strokeDasharray="10 5">
                        <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="10s" repeatCount="indefinite" />
                    </circle>
                    {/* Inner Crosshair */}
                    <path d="M50 35 L50 45 M50 55 L50 65 M35 50 L45 50 M55 50 L65 50" stroke="#38bdf8" strokeWidth="2" opacity="0.8" />
                    {/* Corner Brackets */}
                    <path d="M30 30 L40 30 M30 30 L30 40" fill="none" stroke="#38bdf8" strokeWidth="2" />
                    <path d="M70 30 L60 30 M70 30 L70 40" fill="none" stroke="#38bdf8" strokeWidth="2" />
                    <path d="M30 70 L40 70 M30 70 L30 60" fill="none" stroke="#38bdf8" strokeWidth="2" />
                    <path d="M70 70 L60 70 M70 70 L70 60" fill="none" stroke="#38bdf8" strokeWidth="2" />

                    {/* Scanning Text next to reticle */}
                    <text x="75" y="45" fill="#38bdf8" fontSize="4" opacity="0.6">TRK_{Math.floor(lerpPos.x)}_{Math.floor(lerpPos.y)}</text>
                    <text x="75" y="55" fill="#38bdf8" fontSize="4" opacity="0.6">ALT_FLT_{isMounted ? Math.floor(Math.sin(Date.now() / 1000) * 100) : 0}</text>
                </svg>
            </div>

            {/* 2. Top-Left Scanning Panel */}
            <div className="absolute top-8 left-12 w-64 p-4 border-l-2 border-t-2 border-[#38bdf8] bg-black/20 backdrop-blur-sm">
                <div className="text-[10px] text-[#38bdf8]/60 mb-1 uppercase tracking-widest">Mark VII Interface</div>
                <div className="text-xl font-bold text-[#38bdf8] mb-2 truncate">TARGET: {scanData.target}</div>
                <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px]">
                        <span className="text-slate-400">STATUS:</span>
                        <span className="text-[#38bdf8] font-bold">{scanData.status}</span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#38bdf8] animate-[scan_2s_infinite]"></div>
                    </div>
                </div>
                {/* Random Binary Stream */}
                <div className="mt-4 opacity-30 text-[8px] text-[#38bdf8] leading-none overflow-hidden h-12 font-mono">
                    {isMounted && Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="whitespace-nowrap">
                            {Math.random().toString(2).substring(2, 30)}
                            {Math.random().toString(2).substring(2, 30)}
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Bottom-Left Arc Reactor HUD */}
            <div className="absolute bottom-12 left-12 flex items-end gap-6">
                <div className="relative w-32 h-32">
                    {/* Glowing Core */}
                    <div className="absolute inset-4 rounded-full bg-[#38bdf8]/10 border-2 border-[#38bdf8]/40 shadow-[0_0_20px_rgba(56,189,248,0.3)] flex items-center justify-center">
                        <div className="w-full h-full rounded-full border border-dashed border-[#38bdf8] animate-[spin_20s_linear_infinite]" />
                        <div className="absolute inset-8 rounded-full bg-[#38bdf8]/30 shadow-[0_0_40px_rgba(56,189,248,0.5)] animate-pulse" />
                    </div>
                    {/* Ring Segments */}
                    <svg className="w-full h-full -rotate-90">
                        <circle cx="64" cy="64" r="58" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="30 10" opacity="0.3" />
                        <circle cx="64" cy="64" r="50" fill="none" stroke="#38bdf8" strokeWidth="4" strokeDasharray="100 214" className="animate-[pulse_4s_ease-in-out_infinite]" />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold text-[#38bdf8]">CORE</div>
                </div>
                <div className="pb-4 space-y-2">
                    <div className="text-[10px] text-[#38bdf8]/60 uppercase">Power Stability</div>
                    <div className="flex gap-1">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className={`w-2 h-4 border border-[#38bdf8]/40 ${i < 9 ? 'bg-[#38bdf8]/60' : 'bg-[#38bdf8]/10 underline-offset-4 animate-pulse'}`} />
                        ))}
                    </div>
                    <div className="text-xl font-bold text-[#38bdf8]">98.4%</div>
                </div>
            </div>

            {/* 4. Right Side Tactical Readout */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-end gap-4 opacity-60">
                <div className="w-32 h-[1px] bg-gradient-to-l from-[#38bdf8] to-transparent" />
                <div className="text-[10px] text-[#38bdf8]/80 text-right space-y-2">
                    <div>PITCH: 0.04°</div>
                    <div>YAW: 112.5°</div>
                    <div>ROLL: -1.2°</div>
                </div>
                {/* Geometric Scanning Lines */}
                <div className="relative w-24 h-64 border-r border-[#38bdf8]/20">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#38bdf8]/0 via-[#38bdf8]/10 to-[#38bdf8]/0 h-1/4 animate-[scan-vertical_4s_linear_infinite]" />
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="absolute right-0 h-[1px] bg-[#38bdf8]/30" style={{ top: `${i * 10}%`, width: i % 2 === 0 ? '10px' : '5px' }} />
                    ))}
                </div>
            </div>

            {/* Global Screen Overlay (Faint Grid) */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <style jsx global>{`
                @keyframes scan {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes scan-vertical {
                    0% { top: -25%; }
                    100% { top: 100%; }
                }
            `}</style>
        </div>
    );
};

export default IronManHUD;
