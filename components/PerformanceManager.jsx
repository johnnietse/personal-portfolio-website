"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const PerformanceContext = createContext();

export const PerformanceProvider = ({ children }) => {
    const [isLowSpec, setIsLowSpec] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

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

        // 3. Dynamic Resize Check
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

    return (
        <PerformanceContext.Provider value={{ isLowSpec, isMobile, toggleLowSpec }}>
            {children}
        </PerformanceContext.Provider>
    );
};

export const usePerformance = () => useContext(PerformanceContext);
