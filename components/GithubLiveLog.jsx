"use client";

import React from 'react';
import { Terminal, GitCommit } from 'lucide-react';

/**
 * GithubLiveLog Component
 * Renders a terminal-style scrolling feed for recent commit activity.
 * Matches the site's hacker/cybernetic aesthetic.
 */
export default function GithubLiveLog({ logs }) {
    if (!logs || logs.length === 0) return null;

    return (
        <div style={{ marginTop: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                <Terminal size={20} color="var(--accent-color)" />
                <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                    ENGINEERING_ACTIVITY_STREAMS
                </h4>
            </div>

            <div style={{ 
                background: 'rgba(0,0,0,0.3)', 
                border: '1px solid var(--border-color)', 
                borderRadius: '8px',
                padding: '1.5rem',
                maxHeight: '300px',
                overflowY: 'auto',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                lineHeight: '1.6',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
                scrollbarWidth: 'thin',
                scrollbarColor: 'var(--border-color) transparent'
            }}>
                {logs.map((log, i) => (
                    <div key={i} style={{ marginBottom: '0.8rem', opacity: 1 - (i * 0.05) }}>
                        <span style={{ color: 'var(--accent-color)', fontWeight: 800 }}>[{new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}]</span>
                        <span style={{ color: 'var(--text-secondary)', margin: '0 0.8rem' }}>@node/{log.repo}:</span>
                        <span style={{ color: 'var(--text-primary)' }}>{log.message}</span>
                        <span style={{ color: 'rgba(255,255,255,0.2)', marginLeft: '0.8rem', fontSize: '0.7rem' }}>#{log.oid}</span>
                    </div>
                ))}
                <div className="terminal-cursor" style={{ display: 'inline-block', width: '8px', height: '14px', background: 'var(--accent-color)', verticalAlign: 'middle', animation: 'blink 1s step-end infinite' }} />
                <style jsx>{`
                    @keyframes blink {
                        from, to { opacity: 1; }
                        50% { opacity: 0; }
                    }
                `}</style>
            </div>
        </div>
    );
}
