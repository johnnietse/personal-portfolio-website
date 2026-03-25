"use client";

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformance } from './PerformanceManager';

// Low-level pure GLSL OpenGL Shading Language mathematics simulating Gravitational Lensing & Particle Plasmas
const FluidShaderMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uAspect: { value: 1.0 }
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
        }
    `,
    // Intense Black Hole Accretion Disk Mathematics
    fragmentShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uAspect;
        varying vec2 vUv;

        // GLSL Procedural Noise functions for plasma turbulence
        float hash(float n) { return fract(sin(n) * 1e4); }
        float snoise(in vec2 x) {
            vec2 p = floor(x);
            vec2 f = fract(x);
            f = f*f*(3.0-2.0*f);
            float n = p.x + p.y*57.0;
            return mix(mix(hash(n+0.0), hash(n+1.0),f.x), mix(hash(n+57.0), hash(n+58.0),f.x),f.y);
        }

        void main() {
            vec2 p = vUv;
            vec2 m = uMouse;
            
            // Fix screen-space aspect ratio warping so the event horizon remains a perfect circle
            p.x *= uAspect;
            m.x *= uAspect;

            // Calculate exact pixel distance to the mouse cursor coordinate
            float dist = distance(p, m);
            
            // Schwarzschild radius (Event Horizon Size)
            float radius = 0.12; 
            
            vec2 dir = p - m;
            vec3 color = vec3(0.0);
            
            // Accretion disk (glowing turbulent plasma ring spinning around the cursor)
            if (dist > 0.02 && dist < radius * 2.0) {
                // Determine spherical rotation angles
                float angle = atan(dir.y, dir.x);
                float radiusScaled = dist * 25.0;
                
                // Spin the plasma turbulence opposite to the clock tracking
                float noise = snoise(vec2(angle * 6.0 - uTime * 3.0, radiusScaled - uTime * 6.0));
                
                // Holographic Cyan and Magenta spectrum mix mapped to angles
                vec3 glowColor = mix(vec3(0.0, 0.9, 1.0), vec3(0.9, 0.0, 1.0), sin(angle * 4.0 + uTime * 2.0) * 0.5 + 0.5);
                
                // Sharp cutoff near the event horizon, fading smoothly outward into transparency
                float mask = smoothstep(0.03, 0.07, dist) * smoothstep(radius * 1.8, radius * 0.5, dist);
                color = glowColor * noise * mask * 2.5;
            }
            
            // The literal black hole Singularity (Absolute Zero Point)
            if (dist <= 0.03) {
                color = vec3(0.0);
            }

            // Calculate explicit alpha transparencies so the shader doesn't block the actual DOM interface!
            float alpha = smoothstep(radius * 1.8, radius * 0.1, dist);
            
            // Holographic scanlines stretching infinitely wrapping the background layer
            float scanline = sin(vUv.y * 1000.0 - uTime * 15.0) * 0.05;
            color += scanline * vec3(0.0, 1.0, 0.8) * alpha * 0.5;

            // Output the final mathematical pixel computation to the viewport
            gl_FragColor = vec4(color, alpha * 0.8);
        }
    `
};

const ShaderCanvas = () => {
    const materialRef = useRef();
    const { size } = useThree();

    // Bind strict window Mouse coordinates constantly piping raw values down into the `uMouse` Uniform vector
    useEffect(() => {
        const handleMouseMove = (event) => {
            if (materialRef.current) {
                materialRef.current.uniforms.uMouse.value.x = event.clientX / window.innerWidth;
                // Reverse the Y axis because WebGL computes coordinates ascending from bottom, unlike standard DOM
                materialRef.current.uniforms.uMouse.value.y = 1.0 - (event.clientY / window.innerHeight);
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Frame synchronization pulsing runtime into the shader clock
    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            materialRef.current.uniforms.uAspect.value = size.width / size.height;
        }
    });

    return (
        <mesh>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                ref={materialRef}
                attach="material"
                args={[FluidShaderMaterial]}
                transparent={true}
                depthWrite={false}
            />
        </mesh>
    );
};

export default function BlackHoleCursor() {
    const { isLowSpec, isMobile } = usePerformance();
    const [enabled, setEnabled] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    // Prevent Next.js SSR hydration mismatch since `window` measurements and states are strictly browser-only
    useEffect(() => {
        setIsMounted(true);
        // Automatically disable on low-spec or mobile devices by default
        if (isLowSpec || isMobile) {
            setEnabled(false);
        }
    }, [isLowSpec, isMobile]);
    if (!isMounted) return null;

    return (
        <>
            {/* Absolute Spatial Toggle Component intercepting raw click events above the Z-index matrix */}
            <button
                onClick={() => setEnabled(!enabled)}
                style={{
                    position: 'fixed', bottom: '20px', left: '20px', zIndex: 10000,
                    background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(88, 166, 255, 0.2)', color: 'var(--text-secondary)',
                    padding: '8px 16px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 'bold',
                    cursor: 'pointer', transition: 'all 0.3s ease', letterSpacing: '0.5px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(15, 23, 42, 0.95)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(88, 166, 255, 0.6)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(15, 23, 42, 0.65)'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'rgba(88, 166, 255, 0.2)'; }}
            >
                {enabled ? 'Disable Black Hole FX' : 'Enable Black Hole FX'}
            </button>

            {/* Conditionally unmount the entire massive native WebGL Canvas and the GLSL pipeline explicitly freeing the GPU */}
            {enabled && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999, pointerEvents: 'none' }}>
                    <Canvas orthographic camera={{ position: [0, 0, 1], left: -1, right: 1, top: 1, bottom: -1 }} style={{ pointerEvents: 'none' }}>
                        <ShaderCanvas />
                    </Canvas>
                </div>
            )}
        </>
    );
}
