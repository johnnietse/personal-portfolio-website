"use client";

import React from 'react';
import { Share2, CheckCircle, Clock, ExternalLink } from 'lucide-react';

/**
 * GithubK8sSpotlight Component
 * Renders a specialized card for Upstream Kubernetes contributions.
 * Features Kubernetes-themed branding and high-fidelity project nodes.
 */
export default function GithubK8sSpotlight({ k8sData }) {
    if (!k8sData || k8sData.length === 0) return null;

    return (
        <div style={{ marginTop: '3.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
                <div style={{ background: '#326ce5', padding: '0.4rem', borderRadius: '5px' }}>
                    <Share2 size={20} color="white" />
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                    UPSTREAM_KUBERNETES_CONTRIBUTIONS
                </h4>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {k8sData.map((pr, i) => (
                    <div 
                        key={i} 
                        style={{ 
                            background: 'rgba(50, 108, 229, 0.03)', 
                            border: '1px solid rgba(50, 108, 229, 0.2)', 
                            borderRadius: '15px', 
                            padding: '1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            position: 'relative',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#326ce5';
                            e.currentTarget.style.background = 'rgba(50, 108, 229, 0.08)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(50, 108, 229, 0.2)';
                            e.currentTarget.style.background = 'rgba(50, 108, 229, 0.03)';
                        }}
                    >
                        {/* K8s Logo Watermark */}
                        <div style={{ position: 'absolute', top: '10px', right: '10px', opacity: 0.1 }}>
                            <Share2 size={40} color="#326ce5" />
                        </div>

                        <div>
                            <div style={{ fontSize: '0.7rem', color: '#326ce5', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                                PROJ_NODE: {pr.project.toUpperCase()}
                            </div>
                            <div style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', lineHeight: '1.4' }}>
                                {pr.impact}
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '0.5rem', 
                                background: pr.status === 'MERGED' ? 'rgba(46, 160, 67, 0.1)' : 'rgba(151, 101, 235, 0.1)',
                                padding: '0.3rem 0.8rem',
                                borderRadius: '20px',
                                border: `1px solid ${pr.status === 'MERGED' ? 'rgba(46, 160, 67, 0.4)' : 'rgba(151, 101, 235, 0.4)'}`,
                                color: pr.status === 'MERGED' ? '#3fb950' : '#d299ff',
                                fontSize: '0.75rem',
                                fontWeight: 800
                            }}>
                                {pr.status === 'MERGED' ? <CheckCircle size={12} /> : <Clock size={12} />}
                                {pr.status}
                            </div>
                            <a href={pr.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', opacity: 0.5, transition: 'opacity 0.2s' }}>
                                <ExternalLink size={20} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            
            <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#326ce5' }}>●</span> Synchronized with upstream kubernetes-sigs engineering streams.
            </p>
        </div>
    );
}
