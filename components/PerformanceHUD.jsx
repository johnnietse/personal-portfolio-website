"use client";
import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei';

// This component mounts the ultra-lightweight WebGL Performance Monitor directly to the DOM natively.
export default function PerformanceHUD() {
    return (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '1px', height: '1px', zIndex: 99999, pointerEvents: 'none' }}>
            <Canvas>
                <Stats />
            </Canvas>
        </div>
    );
}
