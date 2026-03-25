"use client";
import React from 'react';

const technologies = [
    "C++", "ROS2", "React", "Next.js", "Go", "Docker", "Kubernetes", "PyTorch",
    "Zephyr RTOS", "CUDA", "MPI", "SystemVerilog", "PostgreSQL", "Redis",
    "OpenCV", "LangChain"
];

// Instantiating a 3-buffer tracking array ensuring identical wrapping offsets mathematically!
const duplicatedTech = [...technologies, ...technologies, ...technologies];

export default function SkillTicker() {
    return (
        <div style={{
            width: '100vw',
            overflow: 'hidden',
            background: 'rgba(11, 15, 25, 0.95)',
            borderTop: '1px solid rgba(88, 166, 255, 0.2)',
            borderBottom: '1px solid rgba(88, 166, 255, 0.2)',
            padding: '18px 0',
            position: 'relative',
            // Position globally flush across the DOM margin barriers
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            zIndex: 50
        }}>
            <div style={{ display: 'flex', width: 'max-content', animation: 'scrollTicker 35s linear infinite' }}>
                {duplicatedTech.map((tech, i) => (
                    <span key={i} style={{
                        margin: '0 2.5rem',
                        color: 'var(--text-secondary)',
                        fontWeight: 800,
                        fontSize: '1.2rem',
                        letterSpacing: '0.15em',
                        whiteSpace: 'nowrap',
                        textTransform: 'uppercase'
                    }}>
                        {tech}
                    </span>
                ))}
            </div>

            {/* CSS Hardware-accelerated transformation wrapping tracking strictly -33.33% maintaining buffer 1 */}
            <style jsx>{`
                @keyframes scrollTicker {
                    0% { transform: translate3d(0, 0, 0); }
                    100% { transform: translate3d(-33.33%, 0, 0); }
                }
            `}</style>
        </div>
    );
}
