"use client";

import React, { useState } from 'react';
import { usePerformance } from './PerformanceManager';

const MobileSystemsTray = () => {
    const { isMobile, features, toggleFeature } = usePerformance();
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted || !isMobile) return null;

    const trayItems = [
        { id: 'hud', label: 'Iron Man HUD', icon: '🎯' },
        { id: 'particles', label: 'Dynamic Particles', icon: '✨' },
        { id: 'physics', label: 'Scroll Physics', icon: '📦' },
        { id: 'stars', label: 'Celestial Engine', icon: '🌌' },
        { id: 'cursor', label: 'Black Hole Effect', icon: '🌀' }
    ];

    return (
        <div
            style={{
                position: 'fixed',
                bottom: 'calc(var(--safe-area-bottom, 0px) + 1.5rem)',
                right: '1.5rem',
                zIndex: 10001,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '0.75rem'
            }}
        >
            {/* Expanded Menu */}
            {isOpen && (
                <div className="flex flex-col gap-2 mb-2 animate-in fade-in slide-in-from-bottom-5 duration-300">
                    {trayItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => toggleFeature(item.id)}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-full backdrop-blur-md border transition-all active:scale-95 ${features[item.id]
                                ? 'bg-blue-500/80 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                                : 'bg-slate-900/60 border-slate-700 text-slate-400'
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-xs font-bold tracking-wider uppercase">{item.label}</span>
                            <div className={`w-2 h-2 rounded-full ${features[item.id] ? 'bg-white animate-pulse' : 'bg-slate-600'}`} />
                        </button>
                    ))}
                </div>
            )}

            {/* Main Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-2xl transition-all active:scale-90 border-2 ${isOpen
                    ? 'bg-red-500/80 border-red-400 rotate-90'
                    : 'bg-blue-600/80 border-blue-400 animate-pulse'
                    } backdrop-blur-xl`}
            >
                {isOpen ? '✕' : '⚙️'}
            </button>

            <style jsx>{`
                .animate-in {
                    animation-fill-mode: forwards;
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slide-in-from-bottom-5 {
                    from { transform: translateY(20px); }
                    to { transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default MobileSystemsTray;
