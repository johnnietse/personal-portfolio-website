"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    return (
        <header className="header container" data-aos="fade-down" data-aos-duration="1000">
            <nav>
                <ul className="header__menu">
                    <li>
                        <Link className="header__link_1" id="header__link_1" href="/" data-aos="fade-right" data-aos-delay="100">Home</Link>
                    </li>
                    <li>
                        <Link className="header__link_2" id="header__link_2" href="/about" data-aos="fade-right" data-aos-delay="200">About</Link>
                    </li>
                    <li>
                        <Link className="header__link_3" id="header__link_3" href="/project" data-aos="fade-right" data-aos-delay="300">Projects</Link>
                    </li>
                    <li>
                        <Link className="header__link_4" id="header__link_4" href="/#herocontact" data-aos="fade-right" data-aos-delay="400">Contact</Link>
                    </li>
                    <li>
                        <a className="header__downloadResume btn" href="/Resume%20-%20Queen's%20University%20(Johnnie%20Tse%20-%202025-2026).pdf" target="_blank" rel="noopener noreferrer" data-aos="zoom-in" data-aos-delay="500">Download Resume</a>
                    </li>
                </ul>

                {/* Note: The old site toggled a .mobile-nav-open class on the body. We should handle it here soon. */}
                <button aria-label="mobile nav button" className="header__bars" data-aos="zoom-in" data-aos-delay="600" onClick={() => document.body.classList.toggle('mobile-nav-open')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                    </svg>
                </button>
            </nav>
        </header>
    );
}
