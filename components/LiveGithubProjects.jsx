"use client";

import React, { useState, useEffect } from 'react';
import HolographicCard from './HolographicCard';
import { Star, GitFork, ExternalLink, Library } from 'lucide-react';

/**
 * LiveGithubProjects Component
 * Fetches and displays a dynamic list of GitHub repositories with real-time stats.
 * Integrates seamlessly with the holographic design system.
 */
export default function LiveGithubProjects() {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch('/api/github/stats');
                if (!response.ok) throw new Error('Failed to synchronize with GitHub Intelligence');
                const data = await response.json();
                setRepos(data.repoList || []);
            } catch (err) {
                console.error('GitHub Repos Fetch Error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    if (loading) {
        return (
            <div className="projects-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))' }}>
                {[1, 2, 3].map((i) => (
                    <HolographicCard key={i} className="p-8" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="terminal-loader" style={{ fontSize: '0.9rem', color: 'var(--accent-color)', fontFamily: 'monospace' }}>
                            FETCHING_REMOTE_NODE_{i}...
                        </div>
                    </HolographicCard>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8" style={{ color: '#ff7b72', border: '1px solid #ff7b72', borderRadius: '12px', background: 'rgba(255,123,114,0.05)' }}>
                <p>CRITICAL_ERROR: {error.toUpperCase()}</p>
            </div>
        );
    }

    return (
        <div className="projects-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))' }}>
            {repos.map((repo, index) => (
                <HolographicCard 
                    key={repo.name} 
                    data-aos="fade-up" 
                    data-aos-delay={(index % 3) * 100} 
                    style={{ display: 'flex', flexDirection: 'column', padding: '2rem' }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <h3 className="project-title" style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.4rem' }}>{repo.name}</h3>
                        <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <Star size={14} /> {repo.stargazerCount}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <GitFork size={14} /> {repo.forkCount}
                            </span>
                        </div>
                    </div>

                    <p style={{ color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem', letterSpacing: '0.1em' }}>
                        UPDATED: {new Date(repo.updatedAt).toLocaleDateString()}
                    </p>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1, lineHeight: '1.6' }}>
                        {repo.description || "Experimental engineering repository. No public description provided via metadata."}
                    </p>

                    {/* Tech Stack / Topics */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2rem' }}>
                        {repo.primaryLanguage && (
                            <span style={{
                                background: 'rgba(126, 231, 135, 0.1)',
                                border: '1px solid rgba(126, 231, 135, 0.4)',
                                color: '#7ee787',
                                padding: '0.3rem 0.8rem',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                fontWeight: 600
                            }}>
                                {repo.primaryLanguage.name}
                            </span>
                        )}
                        {repo.repositoryTopics.nodes.map((topic, i) => (
                            <span key={i} style={{
                                background: 'var(--form-bg)',
                                border: '1px solid var(--border-color)',
                                color: 'var(--text-primary)',
                                padding: '0.3rem 0.8rem',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                fontWeight: 600
                            }}>
                                {topic.topic.name}
                            </span>
                        ))}
                    </div>

                    <a href={repo.url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ alignSelf: 'flex-start', fontSize: '0.9rem', padding: '0.6rem 1.2rem', marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Access Repository <ExternalLink size={14} />
                    </a>

                </HolographicCard>
            ))}
        </div>
    );
}
