"use client";

import React from 'react';
import { Network, ExternalLink } from 'lucide-react';

/**
 * GithubOrgNodes Component
 * Shows organization affiliations (e.g. Queen's AutoDrive).
 * Uses a "Network Node" design with circular avatars.
 */
export default function GithubOrgNodes({ organizations }) {
    if (!organizations || organizations.length === 0) return null;

    return (
        <div style={{ marginTop: '3.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                <Network size={22} color="var(--accent-color)" />
                <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                    DISTRIBUTED_VERIFIED_ORGANIZATIONS
                </h4>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                {organizations.map((org, i) => (
                    <a 
                        key={i} 
                        href={org.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '1rem', 
                            background: 'rgba(255,255,255,0.02)', 
                            border: '1px solid var(--border-color)', 
                            padding: '0.8rem 1.2rem', 
                            borderRadius: '50px',
                            textDecoration: 'none',
                            color: 'var(--text-primary)',
                            transition: 'all 0.3s ease',
                            group: 'true'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--accent-color)';
                            e.currentTarget.style.background = 'rgba(126, 231, 135, 0.03)';
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(126, 231, 135, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-color)';
                            e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <img 
                            src={org.avatarUrl} 
                            alt={org.name} 
                            style={{ 
                                width: '32px', 
                                height: '32px', 
                                borderRadius: '50%', 
                                border: '1.5px solid var(--accent-color)',
                                padding: '1px'
                            }} 
                        />
                        <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>{org.name}</span>
                        <ExternalLink size={14} style={{ opacity: 0.4 }} />
                    </a>
                ))}
            </div>
        </div>
    );
}
