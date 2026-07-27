"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { usePerformance } from './PerformanceManager';
import { Menu, X, Sun, Moon } from 'lucide-react';

export default function Navigation() {
    const pathname = usePathname();
    const { isMobile } = usePerformance();
    const [theme, setTheme] = useState('dark');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // On mount, read from localstorage or check system preference
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
            document.documentElement.setAttribute('data-theme', storedTheme);
        } else {
            const systemPreference = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
            setTheme(systemPreference);
            document.documentElement.setAttribute('data-theme', systemPreference);
        }
    }, []);

    // Lock scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Projects', path: '/project' },
        { label: 'Contact', path: '/#herocontact' }
    ];

    return (
        <header className="navbar">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: 0 }}>
                {/* Logo */}
                <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }} onClick={() => setIsMenuOpen(false)}>
                    JT<span style={{ color: 'var(--accent-color)' }}>.</span>
                </Link>

                {/* Hamburger Toggle */}
                <button
                    className="hamburger"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Desktop Nav */}
                <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                    <ul className="nav-links" style={{ gap: '2rem' }}>
                        {navItems.map(item => (
                            <li key={item.path}>
                                <Link href={item.path} className={`nav-item ${pathname === item.path ? 'active' : ''}`}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <button onClick={toggleTheme} className="theme-switch" aria-label="Toggle Theme">
                            {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
                        </button>
                        <a href="/Resume%20-%20Queen's%20University%20(Johnnie%20Tse%20-%202025-2026).pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">Resume</a>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="mobile-menu-overlay">
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`mobile-nav-item ${pathname === item.path ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', alignItems: 'center' }}>
                        <button onClick={toggleTheme} className="btn-icon" aria-label="Toggle Theme">
                            {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
                        </button>
                        <a
                            href="/Resume%20-%20Queen's%20University%20(Johnnie%20Tse%20-%202025-2026).pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                        >
                            Resume
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
