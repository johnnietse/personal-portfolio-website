"use client";

import React from 'react';

/**
 * GithubContributionGrid Component
 * Renders a responsive, holographic "Heatmap" grid showing GitHub contributions over the last year.
 * Matches the site's glass/glow aesthetic.
 */
export default function GithubContributionGrid({ calendar }) {
    if (!calendar || !calendar.weeks) return null;

    // Mapping GitHub Colors to Portfolio Accent Colors
    const getColorClass = (githubColor) => {
        // githubColor is usually a hex like #ebedf0, #9be9a8, etc.
        // We will transform it into a glowy scale.
        const colorMap = {
            '#ebedf0': 'rgba(255, 255, 255, 0.03)',
            '#9be9a8': 'rgba(126, 231, 135, 0.2)',
            '#40c463': 'rgba(126, 231, 135, 0.4)',
            '#30a14e': 'rgba(126, 231, 135, 0.6)',
            '#216e39': 'rgba(126, 231, 135, 0.8)',
        };
        return colorMap[githubColor] || 'rgba(126, 231, 135, 0.1)';
    };

    return (
        <div style={{ marginTop: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                    {calendar.totalContributions.toLocaleString()} CONTRIBUTIONS_LAST_YEAR
                </h4>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    LESS <div style={{ display: 'flex', gap: '3px' }}>
                        {['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'].map(c => (
                            <div key={c} style={{ width: '10px', height: '10px', background: getColorClass(c), borderRadius: '2px', border: '1px solid rgba(255,255,255,0.05)' }} />
                        ))}
                    </div> MORE
                </div>
            </div>

            <div style={{ 
                overflowX: 'auto', 
                overflowY: 'hidden',
                paddingBottom: '1rem',
                scrollbarWidth: 'thin',
                scrollbarColor: 'var(--border-color) transparent'
            }}>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: `repeat(${calendar.weeks.length}, 1fr)`, 
                    gap: '4px',
                    minWidth: '800px' // Ensure all weeks are visible
                }}>
                    {calendar.weeks.map((week, wIndex) => (
                        <div key={wIndex} style={{ display: 'grid', gridTemplateRows: 'repeat(7, 1fr)', gap: '4px' }}>
                            {week.contributionDays.map((day, dIndex) => (
                                <div 
                                    key={day.date} 
                                    title={`${day.contributionCount} contributions on ${day.date}`}
                                    style={{ 
                                        width: '12px', 
                                        height: '12px', 
                                        background: getColorClass(day.color),
                                        borderRadius: '2px',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        transition: 'transform 0.2s',
                                        boxShadow: day.contributionCount > 0 ? `0 0 5px ${getColorClass(day.color)}` : 'none',
                                        cursor: 'pointer'
                                    }} 
                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.2) zIndex(1)'}
                                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            
            <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                    <span key={m}>{m}</span>
                ))}
            </div>
        </div>
    );
}
