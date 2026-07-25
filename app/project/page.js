"use client";

import Link from 'next/link';
import SolarSystemBackground from '@/components/SolarSystemBackground';
import HolographicCard from '@/components/HolographicCard';
import LiveGithubProjects from '@/components/LiveGithubProjects';
import { PROJECT_LIST } from '@/lib/config/projects';

export default function Project() {

    return (
        <main className="section container" style={{ paddingTop: '8rem', position: 'relative' }}>
            {/* Guarantee seamless WebGL persistence across routes seamlessly */}
            <SolarSystemBackground />

            <div className="text-center" style={{ marginBottom: '4rem' }}>
                <h1 className="title" data-aos="zoom-in">Featured Projects.</h1>
                <p className="subtitle" data-aos="fade-up" data-aos-delay="200" style={{ margin: '0 auto' }}>
                    Explore my latest technical builds, ranging from Machine Learning RAG pipelines and custom AgTech IoT hardware to high-performance C++ control systems and scalable full-stack web platforms.
                </p>
            </div>

            <div className="projects-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))' }}>
                {PROJECT_LIST.map((proj, index) => (
                    <HolographicCard key={index} data-aos="fade-up" data-aos-delay={(index % 3) * 100} style={{ display: 'flex', flexDirection: 'column', padding: '2rem' }}>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <h3 className="project-title" style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.4rem' }}>{proj.title}</h3>
                        </div>

                        <p style={{ color: 'var(--accent-color)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', letterSpacing: '0.05em' }}>
                            {proj.date}
                        </p>

                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1, lineHeight: '1.6' }}>
                            {proj.description}
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2rem' }}>
                            {proj.skills.map((skill, i) => (
                                <span key={i} style={{
                                    background: 'var(--form-bg)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-primary)',
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    fontWeight: 600
                                }}>
                                    {skill}
                                </span>
                            ))}
                        </div>

                        {proj.githubUrl && (
                            <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ alignSelf: 'flex-start', fontSize: '0.9rem', padding: '0.6rem 1.2rem', marginTop: 'auto' }}>
                                View Repository &rarr;
                            </a>
                        )}

                    </HolographicCard>
                ))}
            </div>

            {/* Live GitHub Feed Section */}
            <div data-aos="fade-up" data-aos-delay="200" style={{ marginTop: '8rem' }}>
                <div className="text-center" style={{ marginBottom: '4rem' }}>
                    <h2 className="title">Live GitHub Feed.</h2>
                    <p className="subtitle" style={{ margin: '1rem auto' }}>
                        Real-time synchronization with my public repositories. This section is powered by the GitHub GraphQL API, showcasing my latest technical iterations and open-source contributions.
                    </p>
                </div>
                <LiveGithubProjects />
            </div>

        </main>
    );
}
