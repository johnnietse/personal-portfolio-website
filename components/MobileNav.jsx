"use client";

import Link from 'next/link';

export default function MobileNav() {
    return (
        <div className="mobile-nav" data-aos="fade-up">
            <nav>
                <ul className="mobile-nav_menu">
                    <li data-aos="fade-down" data-aos-delay="100">
                        <Link className="mobile-nav__link_1" id="mobile-nav__link_1" href="/">Home</Link>
                    </li>
                    <br />
                    <li data-aos="fade-down" data-aos-delay="200">
                        <Link className="mobile-nav__link_2" id="mobile-nav__link_2" href="/about">About</Link>
                    </li>
                    <br />
                    <li data-aos="fade-down" data-aos-delay="300">
                        <Link className="mobile-nav__link_3" id="mobile-nav__link_3" href="/project">Projects</Link>
                    </li>
                    <br />
                    <li data-aos="fade-down" data-aos-delay="400">
                        <Link className="mobile-nav__link_4" id="mobile-nav__link_4" href="/#herocontact">Contact</Link>
                    </li>
                    <br />
                    <li>
                        <a className="mobile-nav__btn btn" href="/Resume%20-%20Queen's%20University%20(Johnnie%20Tse%20-%202025-2026).pdf" target="_blank" rel="noopener noreferrer">Download Resume</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
