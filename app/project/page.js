"use client";

import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { PROJECT_LIST } from '@/lib/config/projects';

export default function Project() {
    return (
        <main className="projects-page">
            {/* Hero */}
            <ScrollReveal>
                <section className="projects-hero">
                    <h1 className="hero-title">Featured Projects.</h1>
                    <p className="hero-subtitle">
                        Explore my latest technical builds, ranging from Machine Learning RAG pipelines and custom AgTech IoT hardware to high-performance C++ control systems and scalable full-stack web platforms.
                    </p>
                </section>
            </ScrollReveal>

            {/* Split Studio: Alternating text/proof rows */}
            {PROJECT_LIST.map((proj, index) => (
                <ScrollReveal key={proj.title} className={index % 2 === 0 ? '' : 'split-reverse'}>
                    <section className="split-row">
                        <div className="split-text">
                            <span className="split-date">{proj.date}</span>
                            <h2 className="split-title">{proj.title}</h2>
                            <p className="split-desc">{proj.description}</p>
                            <div className="split-tags">
                                {proj.skills.map((skill, i) => (
                                    <span key={i} className="split-tag">{skill}</span>
                                ))}
                            </div>
                            {proj.githubUrl && (
                                <Link href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="split-link">
                                    View Repository &rarr;
                                </Link>
                            )}
                        </div>
                        <div className="split-proof">
                            <div className="split-proof-card">
                                <div className="split-proof-placeholder">
                                    <span className="split-proof-icon">&#9670;</span>
                                    <span className="split-proof-label">{proj.title}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>
            ))}

            <style jsx>{`
                .projects-page {
                    max-width: 65ch;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }

                .projects-hero {
                    padding: 4rem 0 6rem;
                }

                .hero-title {
                    font-family: 'Fraunces', serif;
                    font-size: clamp(2.5rem, 5vw + 1rem, 4.5rem);
                    font-weight: 700;
                    line-height: 1.05;
                    letter-spacing: -0.03em;
                    background: var(--title-gradient);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin: 0 0 1.5rem 0;
                }

                .hero-subtitle {
                    font-size: 1.05rem;
                    line-height: 1.75;
                    color: var(--text-secondary);
                    margin: 0;
                    max-width: 50ch;
                }

                .split-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 3rem;
                    align-items: start;
                    padding: 5rem 0;
                    border-top: 1px solid var(--border-color);
                }

                .split-reverse {
                    direction: rtl;
                }

                .split-reverse > * {
                    direction: ltr;
                }

                .split-text {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .split-date {
                    font-size: 0.85rem;
                    color: var(--text-muted);
                    font-weight: 500;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                }

                .split-title {
                    font-family: 'Fraunces', serif;
                    font-size: clamp(1.5rem, 3vw + 0.5rem, 2rem);
                    font-weight: 600;
                    line-height: 1.15;
                    margin: 0;
                    color: var(--text-primary);
                    letter-spacing: -0.02em;
                }

                .split-desc {
                    font-size: 0.95rem;
                    line-height: 1.7;
                    color: var(--text-secondary);
                    margin: 0;
                }

                .split-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-top: 0.5rem;
                }

                .split-tag {
                    background: var(--form-bg);
                    border: 1px solid var(--border-color);
                    color: var(--text-primary);
                    padding: 0.3rem 0.75rem;
                    border-radius: 100px;
                    font-size: 0.78rem;
                    font-weight: 500;
                }

                .split-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--accent-color);
                    font-weight: 600;
                    font-size: 0.9rem;
                    text-decoration: none;
                    transition: opacity 0.3s ease;
                    margin-top: 0.5rem;
                }

                .split-link:hover {
                    opacity: 0.7;
                }

                .split-proof {
                    position: sticky;
                    top: 8rem;
                }

                .split-proof-card {
                    background: var(--surface-color);
                    border: 1px solid var(--border-color);
                    border-radius: 16px;
                    padding: 2rem;
                    min-height: 200px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .split-proof-placeholder {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                    color: var(--text-muted);
                }

                .split-proof-icon {
                    font-size: 2rem;
                    opacity: 0.3;
                }

                .split-proof-label {
                    font-size: 0.85rem;
                    font-weight: 500;
                    text-align: center;
                }

                @media (max-width: 768px) {
                    .split-row {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                        padding: 3rem 0;
                    }

                    .split-proof {
                        position: static;
                    }

                    .split-proof-card {
                        min-height: 150px;
                    }
                }
            `}</style>
        </main>
    );
}