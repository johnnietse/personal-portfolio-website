"use client";

import React from 'react';
import { Target, Zap, Waves, Award, ShieldAlert } from 'lucide-react';

/**
 * GithubAchievements Component
 * Visualizes the "Service Medals" (Achievements) earned on GitHub.
 * Uses a holographic medal design.
 */
export default function GithubAchievements({ achievements }) {
    if (!achievements || achievements.length === 0) return null;

    const renderMedal = (name, desc, i) => {
        let Icon = Award;
        if (name === 'Pull Shark') Icon = Waves;
        if (name === 'Quickdraw') Icon = Zap;
        if (name === 'YOLO') Icon = ShieldAlert;

        return (
            <div 
                key={i} 
                style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1.2rem', 
                    padding: '1.2rem', 
                    background: 'rgba(126, 231, 135, 0.05)', 
                    border: '1px solid rgba(126, 231, 135, 0.2)', 
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    cursor: 'default'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(126, 231, 135, 0.1)';
                    e.currentTarget.style.borderColor = 'var(--accent-color)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(126, 231, 135, 0.15)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(126, 231, 135, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(126, 231, 135, 0.2)';
                    e.currentTarget.style.boxShadow = 'none';
                }}
            >
                <div style={{ 
                    width: '45px', 
                    height: '45px', 
                    borderRadius: '50%', 
                    background: 'rgba(126, 231, 135, 0.15)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: '1.5px solid var(--accent-color)',
                    boxShadow: '0 0 10px var(--accent-color)'
                }}>
                    <Icon size={24} color="#7ee787" />
                </div>
                <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{name}</div>
                    <div style={{ fontSize: '0.7rem', color: '#7ee787', fontWeight: 800, fontFamily: 'monospace', letterSpacing: '0.05em' }}>{desc}</div>
                </div>
            </div>
        );
    };

    return (
        <div style={{ marginTop: '3.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                <Target size={22} color="var(--accent-color)" />
                <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                    RECOGNIZED_SERVICE_MEDALS
                </h4>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.2rem' }}>
                {achievements.map((a, i) => renderMedal(a.name, a.description, i))}
            </div>
        </div>
    );
}
