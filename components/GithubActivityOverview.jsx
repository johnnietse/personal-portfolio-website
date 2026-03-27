"use client";

import React from 'react';
import { GitCommit, GitPullRequest, Search, FileEdit } from 'lucide-react';

/**
 * GithubActivityOverview Component
 * Renders the "Crosshair" plot (Commits vs Issues vs PRs vs Reviews).
 * Matches the site's glass/glow aesthetic.
 */
export default function GithubActivityOverview({ stats }) {
    if (!stats) return null;

    const total = stats.totalCommits + stats.totalIssues + stats.totalPRs + stats.totalReviews || 1;
    
    // Percentages for the radar-like lines
    const pCommits = (stats.totalCommits / total) * 100;
    const pIssues = (stats.totalIssues / total) * 100;
    const pPRs = (stats.totalPRs / total) * 100;
    const pReviews = (stats.totalReviews / total) * 100;

    const renderMetric = (icon, name, count, percentage, position) => {
        let styles = {};
        if (position === 'top') styles = { top: '-20px', left: '50%', transform: 'translateX(-50%)' };
        if (position === 'bottom') styles = { bottom: '-20px', left: '50%', transform: 'translateX(-50%)' };
        if (position === 'left') styles = { left: '-20px', top: '50%', transform: 'translateY(-50%)' };
        if (position === 'right') styles = { right: '-20px', top: '50%', transform: 'translateY(-50%)' };

        return (
            <div style={{ position: 'absolute', ...styles, textAlign: 'center', transition: 'all 0.3s ease' }}>
                <div style={{ color: 'var(--accent-color)', marginBottom: '0.2rem' }}>{icon}</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>{count}</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>{name}</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--accent-color)', fontWeight: 800 }}>{percentage.toFixed(0)}%</div>
            </div>
        );
    };

    return (
        <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '2.5rem', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                COGNITIVE_ACTIVITY_BREAKDOWN
            </h4>

            {/* The Radar/Crosshair Visual */}
            <div style={{ 
                width: '180px', 
                height: '180px', 
                position: 'relative', 
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.01)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {/* Horizontal Axis */}
                <div style={{ position: 'absolute', width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                {/* Vertical Axis */}
                <div style={{ position: 'absolute', height: '100%', width: '1px', background: 'rgba(255,255,255,0.1)' }} />
                
                {/* The "Activity" Polygon / Crosshair Glow */}
                <svg width="180" height="180" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
                    <line x1="90" y1="90" x2={90} y2={90 - (pPRs * 0.8)} stroke="var(--accent-color)" strokeWidth="3" strokeLinecap="round" />
                    <line x1="90" y1="90" x2={90} y2={90 + (pReviews * 0.8)} stroke="var(--accent-color)" strokeWidth="3" strokeLinecap="round" />
                    <line x1="90" y1="90" x2={90 - (pCommits * 0.8)} y2="90" stroke="var(--accent-color)" strokeWidth="3" strokeLinecap="round" />
                    <line x1="90" y1="90" x2={90 + (pIssues * 0.8)} y2="90" stroke="var(--accent-color)" strokeWidth="3" strokeLinecap="round" />
                    
                    {/* Points */}
                    <circle cx="90" cy={90 - (pPRs * 0.8)} r="4" fill="var(--accent-color)" />
                    <circle cx="90" cy={90 + (pReviews * 0.8)} r="4" fill="var(--accent-color)" />
                    <circle cx={90 - (pCommits * 0.8)} cy="90" r="4" fill="var(--accent-color)" />
                    <circle cx={90 + (pIssues * 0.8)} cy="90" r="4" fill="var(--accent-color)" />
                </svg>

                {/* Legend / Metrics around the circle */}
                {renderMetric(<GitCommit size={14} />, "COMMITS", stats.totalCommits, pCommits, 'left')}
                {renderMetric(<Search size={14} />, "ISSUES", stats.totalIssues, pIssues, 'right')}
                {renderMetric(<GitPullRequest size={14} />, "PULL_REQUESTS", stats.totalPRs, pPRs, 'top')}
                {renderMetric(<FileEdit size={14} />, "REVIEWS", stats.totalReviews, pReviews, 'bottom')}
            </div>
            
            <p style={{ marginTop: '2.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                * Metrics synchronized across all production nodes.
            </p>
        </div>
    );
}
