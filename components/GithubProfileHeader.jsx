"use client";

import React from 'react';
import { Users, UserPlus, Star, MapPin, Building, Globe, Share2 } from 'lucide-react';

/**
 * GithubProfileHeader Component
 * Shows user bio, location, company, and social counters.
 */
export default function GithubProfileHeader({ profile }) {
    if (!profile) return null;

    return (
        <div style={{ marginBottom: '3rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
            {/* Kubernetes Badge Overlay */}
            {profile.isK8sContributor && (
                <div style={{ 
                    position: 'absolute', 
                    top: '1rem', 
                    right: '1rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    background: 'rgba(50, 108, 229, 0.1)',
                    border: '1px solid rgba(50, 108, 229, 0.4)',
                    padding: '0.4rem 1rem',
                    borderRadius: '30px',
                    color: '#326ce5',
                    fontSize: '0.75rem',
                    fontWeight: 900,
                    boxShadow: '0 0 15px rgba(50, 108, 229, 0.2)'
                }}>
                    <Share2 size={16} /> UPSTREAM_K8S_CONTRIBUTOR
                </div>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'space-between' }}>
                
                {/* Bio & Details */}
                <div style={{ flex: '1', minWidth: '280px' }}>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-primary)', margin: 0, fontWeight: 500 }}>
                        {profile.bio || "Full-stack engineering mainframe. Specializing in high-performance autonomous systems and scalable AI architectures."}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', marginTop: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        {profile.location && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <MapPin size={14} color="var(--accent-color)" /> {profile.location}
                            </span>
                        )}
                        {profile.company && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Building size={14} color="var(--accent-color)" /> {profile.company}
                            </span>
                        )}
                        <a href={profile.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-color)', textDecoration: 'none' }}>
                            <Globe size={14} /> Profile Node
                        </a>
                    </div>
                </div>

                {/* Social Counters */}
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ color: 'var(--accent-color)', marginBottom: '0.3rem' }}><Users size={18} /></div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{profile.followers}</div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>FOLLOWERS</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ color: 'var(--accent-color)', marginBottom: '0.3rem' }}><UserPlus size={18} /></div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{profile.following}</div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>FOLLOWING</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ color: 'var(--accent-color)', marginBottom: '0.3rem' }}><Star size={18} /></div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{profile.starred}</div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>STARRED</div>
                    </div>
                </div>

            </div>
        </div>
    );
}
