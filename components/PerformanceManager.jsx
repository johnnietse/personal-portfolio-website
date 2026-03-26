"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const PerformanceContext = createContext();

export const PerformanceProvider = ({ children }) => {
    const [isLowSpec, setIsLowSpec] = useState(false);
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
            || (window.innerWidth <= 768);

        setIsMobile(mobileCheck);

        // 2. Load manual override from localStorage
        const savedSpec = localStorage.getItem('isLowSpec');
        if (savedSpec !== null) {
            setIsLowSpec(savedSpec === 'true');
        } else if (mobileCheck) {
            // Default to Low Spec on mobile
            setIsLowSpec(true);
        }

        // 3. Load Feature Toggles (Absolute Gating Logic)
        if (typeof window !== 'undefined') {
            const savedFeatures = localStorage.getItem('performanceFeatures');
            if (savedFeatures) {
                setFeatures(JSON.parse(savedFeatures));
            } else if (mobileCheck) {
                // Automatically DISABLE ALL heavy features on mobile by default
                const initialMobileFeatures = {
                    hud: false,
                    physics: false,
                    stars: false,
                    particles: false,
                    cursor: false
                };
                setFeatures(initialMobileFeatures);
                localStorage.setItem('performanceFeatures', JSON.stringify(initialMobileFeatures));
            } else {
                // DESKTOP: Enable all heavy features by default if no override exists
                const initialDesktopFeatures = {
                    hud: true,
                    physics: true,
                    stars: true,
                    particles: true,
                    cursor: true
                };
                setFeatures(initialDesktopFeatures);
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
