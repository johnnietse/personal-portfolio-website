"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import SolarSystemBackground from '@/components/SolarSystemBackground';
import HolographicCard from '@/components/HolographicCard';
import SkillConstellation from '@/components/SkillConstellation';
import VisibilityWrapper from '@/components/VisibilityWrapper';
import GitHubStats from '@/components/GitHubStats';
import { EXPERIENCES, EDUCATION, CERTIFICATIONS } from '@/lib/config/experience';
import { skillCategories, getSkillIcon } from '@/lib/config/skillIcons';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function About() {
    const prefersReducedMotion = useReducedMotion();
    const [expandedCategories, setExpandedCategories] = useState(new Set(['languages']));

    const toggleCategory = (categoryId) => {
        setExpandedCategories(prev => {
            const next = new Set(prev);
            if (next.has(categoryId)) {
                next.delete(categoryId);
            } else {
                next.add(categoryId);
            }
            return next;
        });
    };

    const renderSkillTag = (skillName) => (
        <div className="skill-tag" key={skillName}>
            {getSkillIcon(skillName)}
            <span>{skillName}</span>
        </div>
    );

    const renderSkillCategory = (category, index) => {
        const isExpanded = expandedCategories.has(category.id);
        const skillsToShow = isExpanded ? category.skills : category.skills.slice(0, 12);

        return (
            <motion.div
                key={category.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <details className="skill-category">
                    <summary className="skill-category-header">
                        <span className="skill-category-icon" style={{ color: 'var(--accent-color)' }}>
                            {category.icon}
                        </span>
                        <span className="skill-category-title">{category.label}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 400 }}>
                            {category.skills.length} skills
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </span>
                    </summary>
                    <div className="skill-category-content">
                        <div className="skill-category-grid">
                            {skillsToShow.map(skill => renderSkillTag(skill))}
                        </div>

                        {category.skills.length > 12 && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isExpanded ? 1 : 0 }}
                                style={{
                                    textAlign: 'center',
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.85rem',
                                    marginTop: '1rem',
                                    paddingTop: '1rem',
                                    borderTop: '1px solid var(--border-color)',
                                }}
                            >
                                Showing {skillsToShow.length} of {category.skills.length} skills
                            </motion.p>
                        )}
                    </div>
                </details>
            </motion.div>
        );
    };

    return (
        <main className="section container" style={{ paddingTop: '8rem', position: 'relative' }}>
            <SolarSystemBackground />

            {/* HERO ABOUT SECTION */}
            <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <HolographicCard style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center', marginBottom: '4rem' }}>
                <div style={{ flex: '1', minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ position: 'relative', width: '320px', height: '320px', padding: '10px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(88, 166, 255, 0.4) 0%, rgba(30, 41, 59, 0) 100%)' }}>
                        <img src="/profilephoto.png" alt="Johnnie Tse" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', border: '4px solid var(--surface-color)' }} />
                    </div>
                </div>

                <div style={{ flex: '2', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <motion.h1
                            className="title"
                            style={{ marginBottom: '0' }}
                            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >About Me.</motion.h1>
                    <motion.p
                            style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.7' }}
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                        Hello! I'm Johnnie. I'm a Computer Engineering student at Queen's University with a strong passion for scalable backends, Kubernetes ecosystems, modern high-performance web applications, and autonomous embedded systems (HPC & ROS2). I focus heavily on contributing to monumental open-source architectures while pushing modern scalable limits.
                    </motion.p>
                    <motion.p
                            style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.7' }}
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                        In web execution, I'm focused on engineering distributed robust full-stack applications leveraging architectures within React, Next.js, and Node.js. My experiences span through creating enterprise RAG models deploying containerized infrastructure with Docker and multi-host Azure Kubernetes clusters.
                    </motion.p>
                    <motion.p
                            style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.7' }}
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                        Beyond the web, I architect C++ automotive applications for autonomous embedded systems via Controller Area Networks (CAN) and ROS2, while co-heading the Queen's HPC organization dictating high-performance compute architecture methodologies (MPI, Thread Networking, OpenMP, GPU scaling) for global Student Cluster Competitions.
                    </motion.p>
                </div>
            </HolographicCard>
            </motion.div>

            {/* EXPERIENCE SECTION */}
            <motion.h2
                className="title"
                style={{ marginTop: '2rem', textAlign: 'center' }}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >Experience</motion.h2>
            <motion.p
                className="subtitle"
                style={{ margin: '0 auto 3rem auto', textAlign: 'center' }}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                My professional journey engineering open-source architectures, robust scalable platforms, and advanced high-performance solutions.
            </motion.p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '6rem' }}>
                {EXPERIENCES.map((exp, idx) => (
                    <motion.div
                        key={exp.id}
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: (idx % 3) * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <HolographicCard style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            {exp.logo && (
                                <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'var(--surface-color)', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--border-color)', overflow: 'hidden', padding: '5px' }}>
                                    <img src={exp.logo} alt={`${exp.company} Logo`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>
                            )}
                            <div style={{ flexGrow: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                                    <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', margin: 0, fontWeight: 800 }}>{exp.role}</h3>
                                    <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 600, background: 'var(--form-bg)', padding: '0.4rem 1rem', borderRadius: '30px', border: '1px solid var(--border-color)' }}>{exp.date}</span>
                                </div>
                                <h4 style={{ fontSize: '1.2rem', color: 'var(--accent-color)', fontWeight: 600, margin: '0.5rem 0 0 0' }}>{exp.company} • {exp.location}</h4>
                            </div>
                        </div>

                        <ul style={{ marginLeft: '1.5rem', color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {exp.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}
                        </ul>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.5rem' }}>
                            {exp.skills.map((skill, i) => (
                                <span key={i} style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-primary)',
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    fontWeight: 600
                                }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </HolographicCard>
                    </motion.div>
                ))}
            </div>

            {/* EDUCATION SECTION */}
            <motion.h2
                className="title"
                style={{ marginTop: '2rem', textAlign: 'center' }}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >Education & Certifications</motion.h2>
            <motion.p
                className="subtitle"
                style={{ margin: '0 auto 3rem auto', textAlign: 'center' }}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                Academic background, continuous learning, and official certifications.
            </motion.p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '6rem' }}>
                {EDUCATION.map((edu, idx) => (
                    <motion.div
                        key={edu.id}
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: (idx % 3) * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >

                        <HolographicCard style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            {edu.logo && (
                                <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'var(--surface-color)', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--border-color)', overflow: 'hidden', padding: '5px' }}>
                                    <img src={edu.logo} alt={`${edu.institution} Logo`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>
                            )}
                            <div style={{ flexGrow: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                                    <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', margin: 0, fontWeight: 800 }}>{edu.degree}</h3>
                                    <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 600, background: 'var(--form-bg)', padding: '0.4rem 1rem', borderRadius: '30px', border: '1px solid var(--border-color)' }}>{edu.date}</span>
                                </div>
                                <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-color)', fontWeight: 600, margin: '0.5rem 0 0 0' }}>{edu.institution}</h4>
                            </div>
                        </div>

                        {edu.bullets && (
                            <ul style={{ marginLeft: '1.5rem', color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {edu.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}
                            </ul>
                        )}

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.5rem' }}>
                            {edu.skills.map((skill, i) => (
                                <span key={i} style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-primary)',
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    fontWeight: 600
                                }}>
                                    {skill}
                                </span>
                            ))}
                        </div>

                    </HolographicCard>
                    </motion.div>
                ))}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                    {CERTIFICATIONS.map((cert, idx) => (
                        <motion.div
                            key={cert.id}
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                        <HolographicCard style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flex: '1 1 300px' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '8px', background: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2px' }}>
                                <img src={cert.logo} alt={`${cert.issuer} Logo`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: '0 0 0.2rem 0', fontWeight: 600 }}>{cert.name}</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>{cert.issuer} • {cert.date}</p>
                            </div>
                        </HolographicCard>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* SKILLS SECTION */}
            <motion.h2
                className="title"
                style={{ textAlign: 'center' }}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >Technical Arsenal</motion.h2>
            <motion.p
                className="subtitle"
                style={{ margin: '0 auto 3rem auto', textAlign: 'center' }}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                A comprehensive overview of the tools, languages, and frameworks that power my workflows.
            </motion.p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', margin: '0 auto' }}>

                {/* 0. Skill Constellation Card */}
                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                <HolographicCard>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--accent-color)' }}>Skill Constellation</h3>
                    <div style={{ width: '100%', height: '400px' }}>
                        <VisibilityWrapper height="100%">
                            <SkillConstellation />
                        </VisibilityWrapper>
                    </div>
                </HolographicCard>
                </motion.div>

                {/* Collapsible Skill Categories */}
                {skillCategories.map((category, index) => renderSkillCategory(category, index))}

                {/* Live Engineering Intelligence */}
                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 className="title" style={{ textAlign: 'center', marginBottom: '3rem', marginTop: '4rem' }}>Live Engineering Intelligence</h2>
                    <GitHubStats />
                </motion.div>

            </div>
        </main>
    );
}