"use client";

import React from 'react';
import { Sparkles, Star, ExternalLink } from 'lucide-react';

/**
 * GithubInterestStreams Component
 * Shows the most recent repositories the user has starred.
 * Demonstrates technical curiosity and ongoing research.
 */
export default function GithubInterestStreams({ streams }) {
    if (!streams || streams.length === 0) return null;

    return (
        <div style={{ marginTop: '3.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                <Sparkles size={22} color="var(--accent-color)" />
                <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                    TECHNICAL_INTEREST_STREAMS (EXTERNAL_RESEARCH)
                </h4>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
                {streams.map((repo, i) => (
                    <a 
                        key={i} 
                        href={repo.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ 
                            background: 'rgba(255,255,255,0.01)', 
                            border: '1px solid var(--border-color)', 
                            padding: '1.2rem', 
                            borderRadius: '12px', 
                            textDecoration: 'none',
                            color: 'var(--text-primary)',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--accent-color)';
                            e.currentTarget.style.background = 'rgba(126, 231, 135, 0.02)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-color)';
                            e.currentTarget.style.background = 'rgba(255,255,255,0.01)';
                        }}
                    >
                        <div>
                            <div style={{ fontSize: '0.65rem', color: 'var(--accent-color)', fontWeight: 800, marginBottom: '0.4rem', letterSpacing: '0.1em' }}>
                                @{repo.owner.toUpperCase()}
                            </div>
                            <div style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.5rem' }}>{repo.name}</div>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0 0 1rem', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.4' }}>
                                {repo.description || "Experimental research node."}
                            </p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <Star size={12} color="var(--accent-color)" /> {repo.stars}
                            </span>
                            <ExternalLink size={14} style={{ opacity: 0.4 }} />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
