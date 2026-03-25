"use client";

import React, { useRef, useState } from 'react';
import { usePerformance } from './PerformanceManager';

/**
 * HolographicCard completely wraps standard DOM logic in a dynamic perspective matrix.
 * As the user hovers, it calculates mouse displacement across the XY plane and executes 
 * a smooth rotate3d interpolation, creating a physical "hologram panel" feeling that perfectly 
 * synergizes with the 3D Solar System WebGL render directly behind it.
 */
export default function HolographicCard({ children, className = "", style = {}, ...props }) {
    const { isLowSpec, isMobile } = usePerformance();
    const lowSpec = isLowSpec || isMobile;

    const cardRef = useRef(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!cardRef.current || lowSpec) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Accurate Sub-pixel Mouse Coordinate Tracking
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate maximum physical tilt angle bounds (-4 to +4 degrees)
        const rotateY = ((mouseX / width) - 0.5) * 8;
        const rotateX = ((mouseY / height) - 0.5) * -8;

        setRotation({ x: rotateX, y: rotateY });

        // Map realistic lighting glare simulating glass reflection
        setGlare({ x: (mouseX / width) * 100, y: (mouseY / height) * 100, opacity: 0.12 });
    };

    const handleMouseEnter = () => setIsHovered(true);

    const handleMouseLeave = () => {
        setIsHovered(false);
        // Smooth snap back to parallel coordinate frame
        setRotation({ x: 0, y: 0 });
        setGlare({ opacity: 0 });
    };

    return (
        <div
            ref={cardRef}
            className={`glass-card ${className}`}
            style={{
                ...style,
                // Execute native CSS hardware acceleration tracking the physical rotations
                transform: lowSpec ? 'none' : `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovered ? 1.01 : 1}, ${isHovered ? 1.01 : 1}, 1)`,
                transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
                position: 'relative',
                overflow: 'hidden',
                // Keep pointer events isolated to this DOM node
                pointerEvents: 'auto'
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {/* Dynamic Glare Overlay rendering independent linear/radial gradient calculations */}
            {!lowSpec && (
                <div
                    style={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none',
                        background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, rgba(255,255,255,0) 60%)`,
                        transition: 'opacity 0.5s ease-out',
                        opacity: glare.opacity ? 1 : 0,
                        zIndex: 10
                    }}
                />
            )}
            {children}
        </div>
    );
}
