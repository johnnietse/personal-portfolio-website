"use client";

import { useEffect } from 'react';
import AOS from 'aos';

export default function AOSSetup() {
    useEffect(() => {
        AOS.init();
    }, []);

    return null;
}
