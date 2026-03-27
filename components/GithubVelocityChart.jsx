"use client";

import React from 'react';

/**
 * GithubVelocityChart Component
 * Renders a glowing SVG line graph showing the "Engineering Velocity" (monthly contributions) over 12 months.
 * Matches the site's high-fidelity holographic aesthetic.
 */
export default function GithubVelocityChart({ data }) {
    if (!data || data.length === 0) return null;

    const width = 600;
    const height = 150;
    const padding = 20;
    
    const maxValue = Math.max(...data.map(d => d.value)) || 10;
    const scrollWidth = data.length * 60;

    // Generate path
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * (scrollWidth - padding * 2) + padding;
        const y = height - ((d.value / maxValue) * (height - padding * 2) + padding);
        return { x, y };
    });

    const d = points.reduce((acc, p, i) => {
        if (i === 0) return `M ${p.x} ${p.y}`;
        // Quadratic bezier for smoothness
        const cp = { x: (points[i-1].x + p.x) / 2, y: (points[i-1].y + p.y) / 2 };
        return `${acc} Q ${points[i-1].x} ${points[i-1].y} ${cp.x} ${cp.y} T ${p.x} ${p.y}`;
    }, "");

    return (
        <div style={{ marginTop: '1rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                ENGINEERING_VELOCITY_STREAMS (12_MONTH_CYCLE)
            </h4>
            
            <div style={{ 
                overflowX: 'auto', 
                paddingBottom: '1rem',
                scrollbarWidth: 'thin',
                scrollbarColor: 'var(--border-color) transparent'
            }}>
                <svg width={scrollWidth} height={height} style={{ overflow: 'visible' }}>
                    {/* Background Grid Lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map(p => (
                        <line 
                            key={p} 
                            x1="0" y1={height * p} x2={scrollWidth} y2={height * p} 
                            stroke="rgba(255,255,255,0.03)" strokeWidth="1" 
                        />
                    ))}

                    {/* The Glow Path */}
                    <path 
                        d={d} 
                        fill="none" 
                        stroke="var(--accent-color)" 
                        strokeWidth="3" 
                        filter="blur(8px)" 
                        opacity="0.4"
                    />
                    
                    {/* The Primary Path */}
                    <path 
                        d={d} 
                        fill="none" 
                        stroke="var(--accent-color)" 
                        strokeWidth="2" 
                        strokeLinecap="round"
                    />

                    {/* Data Points & Tooltips */}
                    {points.map((p, i) => (
                        <g key={i}>
                            <circle cx={p.x} cy={p.y} r="3" fill="var(--accent-color)" boxShadow="0 0 10px var(--accent-color)" />
                            <text x={p.x} y={height - 2} fill="var(--text-secondary)" fontSize="8" textAnchor="middle" fontFamily="monospace">
                                {data[i].label.split('-')[1]}
                            </text>
                        </g>
                    ))}
                </svg>
            </div>
        </div>
    );
}
