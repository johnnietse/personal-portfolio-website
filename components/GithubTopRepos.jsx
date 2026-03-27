"use client";

import React from 'react';
import { Star, GitFork, Crown, ExternalLink } from 'lucide-react';

/**
 * GithubTopRepos Component
 * Renders a "Hall of Fame" section for the most successful projects.
 * Matches the site's high-fidelity holographic aesthetic.
 */
export default function GithubTopRepos({ repos }) {
    if (!repos || repos.length === 0) return null;

    return (
        <div style={{ marginTop: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                <Crown size={22} color="var(--accent-color)" />
                <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                    RECOGNIZED_CORE_SOLUTIONS
                </h4>
            </div>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '1.2rem' 
            }}>
                {repos.map((repo, i) => (
                    <div 
                        key={i} 
                        style={{ 
                            background: 'rgba(255,255,255,0.02)', 
                            border: '1px solid var(--border-color)', 
                            borderRadius: '12px', 
                            padding: '1.2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.borderColor = 'var(--accent-color)';
                            e.currentTarget.style.boxShadow = '0 5px 20px rgba(126, 231, 135, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'none';
                            e.currentTarget.style.borderColor = 'var(--border-color)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {/* Glow effect in background */}
                        <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '60px', height: '60px', background: 'var(--accent-color)', opacity: 0.05, filter: 'blur(30px)', borderRadius: '50%' }} />

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                                <h5 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{repo.name}</h5>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#7ee787' }}>{repo.primaryLanguage?.name || "Code"}</div>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 1.2rem', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {repo.description || "System engineering repository. High-performance computing node."}
                            </p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Star size={14} color="var(--accent-color)" /> {repo.stargazerCount}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><GitFork size={14} color="var(--accent-color)" /> {repo.forkCount}</span>
                            </div>
                            <a href={repo.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', opacity: 0.4 }}>
                                <ExternalLink size={18} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
