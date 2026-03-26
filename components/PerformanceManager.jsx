"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const PerformanceContext = createContext();

export const PerformanceProvider = ({ children }) => {
    const [isLowSpec, setIsLowSpec] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Granular Feature Toggles (Mainly for Mobile Opt-in)
    // Default to FALSE for SSR/Initial Hydration to prevent mobile resource spikes
    const [features, setFeatures] = useState({
        hud: false,
        physics: false,
        stars: false,
        particles: false,
        cursor: false
    });

    useEffect(() => {
        // 1. Initial Device Detection
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const mobileCheck = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())
            || (window.innerWidth <= 768)
            || (navigator.maxTouchPoints > 0 && /Macintosh/.test(userAgent)); // Catch modern iPads

        setIsMobile(mobileCheck);

        // 2. Session-Based Performance Defaults (Always start optimized)
        setIsLowSpec(true);

        // 3. Load Feature Toggles (Absolute Gating Logic)
        if (typeof window !== 'undefined') {
            const savedFeatures = localStorage.getItem('performanceFeatures');
            let currentFeatures = savedFeatures ? JSON.parse(savedFeatures) : null;

            if (mobileCheck) {
                // MOBILE: Force all features OFF by default on start
                const initialMobileFeatures = {
                    hud: false,
                    physics: false,
                    stars: false,
                    particles: false,
                    cursor: false
                };
                setFeatures(initialMobileFeatures);
                // We DON'T sync this to localStorage here to avoid overwriting user's opt-ins permanently
                // But we ensure the CURRENT state is disabled.
            } else if (!currentFeatures) {
                // NEW DESKTOP USER: Enable all except shader-heavy cursor
                const initialDesktopFeatures = {
                    hud: true,
                    physics: true,
                    stars: true,
                    particles: true,
                    cursor: false // Manual opt-in only
                };
                setFeatures(initialDesktopFeatures);
            } else {
                // RETURNING DESKTOP USER: Force cursor OFF for session start
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
        <PerformanceContext.Provider value={{ isLowSpec, isMobile, features, toggleLowSpec, toggleFeature }}>
            {children}
        </PerformanceContext.Provider>
    );
};

export const usePerformance = () => useContext(PerformanceContext);
