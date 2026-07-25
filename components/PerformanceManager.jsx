"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { detectWebGLTier } from '@/lib/utils/webgl-detect';

const PerformanceContext = createContext();

// Quality presets per tier - actual 3D on all tiers, progressively optimized
const QUALITY_PRESETS = {
  ultra: {
    // Desktop high-end
    pixelRatio: 2,
    targetFPS: 60,
    particleMultiplier: 1.0,
    geometryDetail: 1.0,
    enableShadows: true,
    enablePostProcessing: true,
    enableFloat: true,
    floatIntensity: 1.0,
    enableAutoRotate: true,
    renderEveryNthFrame: 1,
    maxLights: 4,
    materialQuality: 'physical',
  },
  high: {
    // Desktop mid-range
    pixelRatio: 1.5,
    targetFPS: 60,
    particleMultiplier: 0.75,
    geometryDetail: 0.75,
    enableShadows: true,
    enablePostProcessing: false,
    enableFloat: true,
    floatIntensity: 0.8,
    enableAutoRotate: true,
    renderEveryNthFrame: 1,
    maxLights: 3,
    materialQuality: 'standard',
  },
  low: {
    // Mobile / tablets / software WebGL
    pixelRatio: 1,
    targetFPS: 30,
    particleMultiplier: 0.25,
    geometryDetail: 0.5,
    enableShadows: false,
    enablePostProcessing: false,
    enableFloat: true,
    floatIntensity: 0.3,
    enableAutoRotate: true,
    renderEveryNthFrame: 2, // Render every 2nd frame = 30fps target
    maxLights: 2,
    materialQuality: 'basic',
  },
  economy: {
    // Low-end mobile / battery saver
    pixelRatio: 1,
    targetFPS: 20,
    particleMultiplier: 0.1,
    geometryDetail: 0.25,
    enableShadows: false,
    enablePostProcessing: false,
    enableFloat: false,
    floatIntensity: 0,
    enableAutoRotate: false,
    renderEveryNthFrame: 3, // Render every 3rd frame = 20fps target
    maxLights: 1,
    materialQuality: 'basic',
  },
};

export const PerformanceProvider = ({ children }) => {
    const [isLowSpec, setIsLowSpec] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Granular Feature Toggles
    const [features, setFeatures] = useState({
        hud: false,
        physics: false,
        stars: false,
        particles: false,
        cursor: false
    });

    // Render tier derived from device capability + WebGL detection
    const renderTier = useMemo(() => {
        if (isMobile && isLowSpec) return 'economy';
        if (isMobile) return 'low';

        const webglTier = detectWebGLTier();
        if (webglTier === 'none' || webglTier === 'software') return 'low';
        if (isLowSpec) return 'high';

        return 'ultra';
    }, [isLowSpec, isMobile]);

    // Quality settings for current tier
    const quality = useMemo(() => QUALITY_PRESETS[renderTier], [renderTier]);

    useEffect(() => {
        // 1. Initial Device Detection
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const mobileCheck = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())
            || (window.innerWidth <= 768)
            || (navigator.maxTouchPoints > 0 && /Macintosh/.test(userAgent));

        setIsMobile(mobileCheck);

        // 2. Session-Based Performance Defaults (Always start optimized)
        setIsLowSpec(true);

        // 3. Load Feature Toggles
        if (typeof window !== 'undefined') {
            const savedFeatures = localStorage.getItem('performanceFeatures');
            let currentFeatures = savedFeatures ? JSON.parse(savedFeatures) : null;

            if (mobileCheck) {
                const initialMobileFeatures = {
                    hud: false,
                    physics: false,
                    stars: false,
                    particles: false,
                    cursor: false
                };
                setFeatures(initialMobileFeatures);
            } else if (!currentFeatures) {
                const initialDesktopFeatures = {
                    hud: true,
                    physics: true,
                    stars: true,
                    particles: true,
                    cursor: false
                };
                setFeatures(initialDesktopFeatures);
            } else {
                setFeatures({ ...currentFeatures, cursor: false });
            }
        }

        // 4. Dynamic Resize Check
        const handleResize = () => {
            const currentMobile = window.innerWidth <= 768;
            setIsMobile(currentMobile);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleLowSpec = () => {
        setIsLowSpec(prev => {
            const newState = !prev;
            localStorage.setItem('isLowSpec', newState);
            return newState;
        });
    };

    const toggleFeature = (featureKey) => {
        setFeatures(prev => {
            const newFeatures = { ...prev, [featureKey]: !prev[featureKey] };
            localStorage.setItem('performanceFeatures', JSON.stringify(newFeatures));
            return newFeatures;
        });
    };

    return (
        <PerformanceContext.Provider value={{ 
            isLowSpec, 
            isMobile, 
            features, 
            renderTier, 
            quality,
            toggleLowSpec, 
            toggleFeature 
        }}>
            {children}
        </PerformanceContext.Provider>
    );
};

export const usePerformance = () => useContext(PerformanceContext);
