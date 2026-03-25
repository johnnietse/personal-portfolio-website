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
    const [isMounted, setIsMounted] = React.useState(false);
    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div style={{
            width: '100vw',
            overflow: 'hidden',
            background: 'rgba(11, 15, 25, 0.4)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(88, 166, 255, 0.1)',
            borderBottom: '1px solid rgba(88, 166, 255, 0.1)',
            padding: '12px 0',
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            zIndex: 50,
            transition: 'all 0.4s ease',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
        }}
            className="skill-ticker-container"
        >
            <div style={{ display: 'flex', width: 'max-content', animation: 'scrollTicker 45s linear infinite' }}>
                {duplicatedTech.map((tech, i) => (
                    <span key={i} style={{
                        margin: '0 3rem',
                        color: 'rgba(136, 153, 166, 0.6)',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        letterSpacing: '0.2em',
                        whiteSpace: 'nowrap',
                        textTransform: 'uppercase',
                        fontFamily: '"Orbitron", "Inter", sans-serif'
                    }}>
                        {tech}
                    </span>
                ))}
            </div>

            <style jsx>{`
                @keyframes scrollTicker {
                    0% { transform: translate3d(0, 0, 0); }
                    100% { transform: translate3d(-33.33%, 0, 0); }
                }
                .skill-ticker-container:hover {
                    background: rgba(11, 15, 25, 0.7) !important;
                    backdrop-filter: blur(16px) !important;
                }
                .skill-ticker-container:hover span {
                    color: rgba(88, 166, 255, 0.8) !important;
                    backdrop-filter: blur(16px) !important;
                }
            `}</style>
        </div>
    );
}
