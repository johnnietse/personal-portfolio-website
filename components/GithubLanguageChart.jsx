"use client";

import React from 'react';

/**
 * GithubLanguageChart Component
 * Renders a holographic bar chart showing language distribution by file size.
 * Matches the cybernetic aesthetic of the portfolio.
 */
export default function GithubLanguageChart({ languages }) {
    if (!languages || languages.length === 0) return null;

    // Filter out languages with less than 0.5% to keep it clean, but keep at least 5
    const displayLanguages = languages.length > 5 
        ? languages.filter(l => parseFloat(l.percentage) > 0.5).slice(0, 12)
        : languages;

    return (
        <div style={{ marginTop: '1rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                LANGUAGES_USED (BY_FILE_SIZE)
            </h4>
            
            {/* The multi-color bar */}
            <div style={{ 
                height: '14px', 
                width: '100%', 
                display: 'flex', 
                borderRadius: '10px', 
                overflow: 'hidden', 
                background: 'rgba(255,255,255,0.05)',
                marginBottom: '1.5rem',
                border: '1px solid var(--border-color)',
                boxShadow: '0 0 15px rgba(0,0,0,0.2)'
            }}>
                {displayLanguages.map((lang, i) => (
                    <div 
                        key={i} 
                        style={{ 
                            width: `${lang.percentage}%`, 
                            background: lang.color || '#888',
                            height: '100%',
                            transition: 'width 1s ease-in-out',
                            opacity: 0.85
                        }} 
                        title={`${lang.name}: ${lang.percentage}%`}
                    />
                ))}
            </div>

            {/* The legend */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
                gap: '0.8rem' 
            }}>
                {displayLanguages.map((lang, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{ 
                            width: '10px', 
                            height: '10px', 
                            borderRadius: '50%', 
                            background: lang.color || '#888',
                            boxShadow: `0 0 8px ${lang.color || 'transparent'}`
                        }} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            {lang.name}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                            {lang.percentage}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
