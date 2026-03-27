"use client";

import React, { useState, useEffect } from 'react';
import HolographicCard from './HolographicCard';
import { Github, Star, GitCommit, FileCode, ExternalLink, GitFork, Activity, Terminal, ShieldCheck, Zap, Lock, Sparkles } from 'lucide-react';
import GithubLanguageChart from './GithubLanguageChart';
import GithubContributionGrid from './GithubContributionGrid';
import GithubActivityOverview from './GithubActivityOverview';
import GithubProfileHeader from './GithubProfileHeader';
import GithubLiveLog from './GithubLiveLog';
import GithubTopRepos from './GithubTopRepos';
import GithubK8sSpotlight from './GithubK8sSpotlight';
import GithubVelocityChart from './GithubVelocityChart';
import GithubAchievements from './GithubAchievements';
import GithubOrgNodes from './GithubOrgNodes';
import GithubInterestStreams from './GithubInterestStreams';

/**
 * GitHubStats Component
 * The "Mainframe Privileged Access" Command Center.
 * The absolute maximum data-driven representation with administrative-level telemetry.
 * 
 * Features IP Protection: Anonymizes private repository names.
 */
export default function GitHubStats() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/github/stats');
                if (!response.ok) throw new Error('Failed to synchronize with GitHub Intelligence');
                const data = await response.json();
                setStats(data);
            } catch (err) {
                console.error('GitHub Stats Privileged Error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <HolographicCard className="p-12 text-center" style={{ minHeight: '800px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                    <div className="terminal-loader" style={{ fontSize: '1.6rem', color: '#7ee787', fontFamily: 'monospace', fontWeight: 900 }}>
                        SYSTEM_PRIVILEGED_BOOTING...
                        <br/>
                        <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>UNSEALING_CORE_TELEMETRY_NODES</span>
                    </div>
                    <div className="pulse-animation" style={{ width: '250px', height: '3px', background: 'linear-gradient(90deg, transparent, #7ee787, transparent)' }} />
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', letterSpacing: '0.3em' }}>PROTECTING_INTELLECTUAL_PROPERTY</div>
                </div>
            </HolographicCard>
        );
    }

    if (error || !stats) {
        return (
            <HolographicCard className="p-12 text-center" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: '#ff7b72', fontWeight: 900, fontSize: '1.4rem' }}>CRITICAL_SYSTEM_FAILURE: PRIVILEGED_ACCESS_DENIED</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '1rem' }}>RE-AUTHENTICATE GITHUB_TOKEN_ADMIN</p>
            </HolographicCard>
        );
    }

    return (
        <HolographicCard className="p-8 md:p-24" style={{ minHeight: '2200px' }}>
            
            {/* Command Center Title & Admin Status */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '5rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '3rem' }}>
                <div>
                    <h2 style={{ fontSize: '3.8rem', fontWeight: 950, margin: 0, display: 'flex', alignItems: 'center', gap: '1.5rem', letterSpacing: '-0.06em', color: 'var(--text-primary)' }}>
                        <Github size={64} color="var(--accent-color)" /> Command Center
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '1rem', letterSpacing: '0.05em', maxWidth: '800px' }}>
                        Privileged Access Mode: UNSEALED. Synchronizing Full-Spectrum Private/Public telemetry with active IP Protection protocols.
                    </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1.2rem' }}>
                    <div style={{ background: 'rgba(126, 231, 135, 0.1)', border: '2px solid var(--accent-color)', padding: '0.8rem 1.8rem', borderRadius: '40px', display: 'flex', alignItems: 'center', gap: '0.8rem', boxShadow: '0 0 15px rgba(126, 231, 135, 0.2)' }}>
                        <ShieldCheck size={22} color="#7ee787" />
                        <span style={{ color: '#7ee787', fontSize: '1rem', fontWeight: 900, letterSpacing: '0.1em' }}>ADMIN_MAINFRAME_ACCESS</span>
                    </div>
                    <div style={{ color: 'var(--accent-color)', fontSize: '0.85rem', fontWeight: 800, fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Lock size={14} /> IP_PROTECTION: ACTIVE
                    </div>
                </div>
            </div>

            {/* Profile & Credentials Layer */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', marginBottom: '5rem' }}>
                <GithubProfileHeader profile={stats.profile} />
                <GithubAchievements achievements={stats.achievements} />
            </div>

            {/* Global Telemetry Grid (Standard Metrics) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '3rem', marginBottom: '6rem' }}>
                <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', padding: '2.5rem', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 5px 30px rgba(0,0,0,0.1)' }}>
                    <div style={{ color: 'var(--text-secondary)', marginBottom: '1.2rem' }}><FileCode size={36} /></div>
                    <div style={{ fontSize: '3.5rem', fontWeight: 950, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{stats.totalRepos}</div>
                    <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 800, letterSpacing: '0.15em' }}>TOTAL_REPOSITORIES</div>
                </div>
                <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', padding: '2.5rem', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 5px 30px rgba(0,0,0,0.1)' }}>
                    <div style={{ color: 'var(--text-secondary)', marginBottom: '1.2rem' }}><Star size={36} /></div>
                    <div style={{ fontSize: '3.5rem', fontWeight: 950, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{stats.totalStars}</div>
                    <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 800, letterSpacing: '0.15em' }}>TOTAL_STARS</div>
                </div>
                <div style={{ textAlign: 'center', background: 'rgba(255,123,114,0.03)', padding: '2.5rem', borderRadius: '25px', border: '1.5px solid #ff7b72', boxShadow: '0 0 20px rgba(255,123,114,0.1)' }}>
                    <div style={{ color: '#ff7b72', marginBottom: '1.2rem' }}><Lock size={36} /></div>
                    <div style={{ fontSize: '3.5rem', fontWeight: 950, color: '#ff7b72', letterSpacing: '-0.02em' }}>{stats.restrictedContributions}</div>
                    <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 800, letterSpacing: '0.15em' }}>SECURE_CONTRIBUTIONS</div>
                </div>
                <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', padding: '2.5rem', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 5px 30px rgba(0,0,0,0.1)' }}>
                    <div style={{ color: 'var(--text-secondary)', marginBottom: '1.2rem' }}><Activity size={36} /></div>
                    <div style={{ fontSize: '3.5rem', fontWeight: 950, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{stats.totalContributions}</div>
                    <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 800, letterSpacing: '0.15em' }}>TOTAL_ACTIVITY</div>
                </div>
            </div>

            {/* Engineering Velocity Trend-Line */}
            <div style={{ background: 'rgba(255,255,255,0.01)', padding: '3rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.04)', marginBottom: '6rem' }}>
                <GithubVelocityChart data={stats.velocityData} />
            </div>

            {/* Kubernetes Upstream Spotlight Layer */}
            <div style={{ marginBottom: '5rem' }}>
                <GithubK8sSpotlight k8sData={stats.k8sIntelligence} />
            </div>

            {/* Hall of Fame Spotlight (Success Metrics) */}
            <div style={{ marginBottom: '6rem' }}>
                <GithubTopRepos repos={stats.topRepos} />
            </div>

            {/* Intelligence Matrix: Languages & Activity Crosshair */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '5rem', marginBottom: '6rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.015)', padding: '2.5rem', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <GithubLanguageChart languages={stats.languages} />
                </div>
                <div style={{ background: 'rgba(255,255,255,0.015)', padding: '2.5rem', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <GithubActivityOverview stats={stats} />
                </div>
            </div>

            {/* Technical Interest Streams (Starred Research) */}
            <div style={{ marginBottom: '6rem' }}>
                <GithubInterestStreams streams={stats.starredStreams} />
            </div>

            {/* Distributed Organization Nodes */}
            <div style={{ marginBottom: '6rem' }}>
                <GithubOrgNodes organizations={stats.profile.organizations} />
            </div>

            {/* Core Synchronization Map (The Heatmap) */}
            <div style={{ borderTop: '2px solid var(--border-color)', paddingTop: '5rem', marginBottom: '6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
                    <Zap size={22} color="var(--accent-color)" />
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>
                        100%_SYNCHRONIZED_ACTIVITY_HEATMAP (PRIVATE_STREAMS_INCLUDED)
                    </h4>
                </div>
                <GithubContributionGrid calendar={stats.contributionCalendar} />
            </div>

            {/* Active engineering Streams (Terminal Feed) */}
            <div style={{ background: 'rgba(126, 231, 135, 0.03)', padding: '3rem', borderRadius: '35px', border: '1px solid rgba(126, 231, 135, 0.15)' }}>
                <GithubLiveLog logs={stats.activityLogs} />
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.85rem', letterSpacing: '0.2em', fontWeight: 700 }}>
                        <Lock size={16} color="#ff7b72" /> IP_PROTECTION_HANDSHAKE_COMPLETE
                    </div>
                </div>
            </div>

        </HolographicCard>
    );
}
