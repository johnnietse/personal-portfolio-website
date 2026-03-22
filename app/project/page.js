"use client";

import Link from 'next/link';
import {
    Cpu, AppWindow, Bot, Bitcoin, CheckSquare,
    CalendarDays, MessageSquare, Shirt, Linkedin, ScanEye
} from 'lucide-react';

export default function Project() {
    const projects = [
        {
            title: "G.O.S. Phytotron Node",
            date: "Jan 2026 - Present",
            icon: <Cpu size={28} color="#4ade80" />,
            desc: "End-to-end development of an ultra-low-power IoT environment monitoring system for precision agriculture. Engineered custom 4-layer PCB (KiCad) with nRF52840 SoC and Zephyr RTOS.",
            skills: ["Embedded C++", "Zephyr RTOS", "KiCad", "IoT", "PCB Design"],
            link: "https://github.com/johnnietse/strawberry-farm"
        },
        {
            title: "HPC Energy DVFS Control",
            date: "Sep 2025 - Present",
            icon: <Cpu size={28} color="#f87171" />,
            desc: "Dynamic frequency scaling system for miniMD proxy application reducing energy consumption during non-compute phases by <5% degradation. Integrated C++ PID loop with Intel RAPL.",
            skills: ["C++", "Python", "MPI", "HPC", "Intel RAPL"],
            link: "https://github.com/johnnietse/elec-498-group-30-2025-2026-proxy-app"
        },
        {
            title: "ApplicaAI Job Assistant",
            date: "Aug 2025 - Present",
            icon: <Bot size={28} color="#60a5fa" />,
            desc: "Production-grade AI SaaS resume builder leveraging Next.js, Vercel AI SDK, and Supabase. Orchestrates 13 LLM models across 3 providers to automate tailored resume creation.",
            skills: ["Next.js", "React", "Python", "Supabase", "Stripe"],
            link: "https://github.com/johnnietse/AI-Powered_Professional_Job_Application_Assistant"
        },
        {
            title: "PortraitArt Gallery",
            date: "Jun 2025 - Present",
            icon: <ScanEye size={28} color="#c084fc" />,
            desc: "Full-stack web app leveraging deep learning (U²-Net) to transform user-uploaded images into artistic transparent portraits. Built with PyTorch and Flask backend.",
            skills: ["Python", "PyTorch", "Flask", "React", "OpenCV"],
            link: null
        },
        {
            title: "Algorithmic Crypto Trading",
            date: "May 2025 - Present",
            icon: <Bitcoin size={28} color="#fbbf24" />,
            desc: "Institutional-grade backtesting system capable of processing 28+ assets. Engineered a high-frequency data pipeline using CoinGecko API with Sharpe Ratio risk analytics.",
            skills: ["Python", "Pandas", "Scikit-Learn", "API Achitecture"],
            link: "https://github.com/johnnietse/cryptocurrency-trading-system"
        },
        {
            title: "TaskMaster UI",
            date: "Apr 2025 - Present",
            icon: <CheckSquare size={28} color="#34d399" />,
            desc: "Full-featured task management web app with comprehensive CRUD, smart filtering, data visualization dashboards, and GSAP authenticated using Supabase.",
            skills: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
            link: "https://github.com/johnnietse/manage-mode-ui"
        },
        {
            title: "FYIC 2025 Conference Site",
            date: "Mar 2025 - Dec 2025",
            icon: <CalendarDays size={28} color="#38bdf8" />,
            desc: "High-traffic server-side rendered application built using Next.js 15 for 18+ universities. Implemented GitHub Actions CI/CD for zero-downtime deployments.",
            skills: ["Next.js", "TypeScript", "Tailwind CSS", "CI/CD"],
            link: "https://github.com/johnnietse/2025-fyic"
        },
        {
            title: "PDF Chatbot (RAG System)",
            date: "Mar 2025 - Aug 2025",
            icon: <MessageSquare size={28} color="#fb7185" />,
            desc: "Intelligent document assistant using Flask, LangChain, ChromaDB, and OpenAI embeddings to process local PDF documents contextually via Retrieval-Augmented Generation.",
            skills: ["Python", "Flask", "LangChain", "Docker", "RAG"],
            link: "https://github.com/johnnietse/pdf-chatbot"
        },
        {
            title: "Virtual Try-On Model",
            date: "Jun 2025 - Jul 2025",
            icon: <Shirt size={28} color="#a78bfa" />,
            desc: "Web app utilizing cvzone's PoseModule and OpenCV for real-time key body landmark detection to dynamically conform and overlay clothing on user-uploaded videos.",
            skills: ["Python", "Flask", "OpenCV", "Computer Vision"],
            link: "https://github.com/johnnietse/cloth-try-on"
        },
        {
            title: "LinkedIn UI Automation",
            date: "Jun 2025 - Jul 2025",
            icon: <Linkedin size={28} color="#0077b5" />,
            desc: "Automation tool integrating Selenium, OpenCV, and PyAutoGUI, implementing hybrid detection logic combining text scraping with computer vision template matching.",
            skills: ["Python", "Selenium", "OpenCV", "PyAutoGUI"],
            link: "https://github.com/johnnietse/linkedin-connection-automation-tool"
        },
        {
            title: "YOLO Dataset Visualizer",
            date: "Jun 2025 - Jul 2025",
            icon: <ScanEye size={28} color="#facc15" />,
            desc: "Web-based visualization tool for YOLO object detection datasets allowing rapid batch validation of bounding boxes with dynamic class management.",
            skills: ["Python", "Flask", "OpenCV", "Tailwind CSS"],
            link: "https://github.com/johnnietse/boundingBoxVisualizer"
        }
    ];

    return (
        <main className="section container" style={{ paddingTop: '8rem' }}>

            <div className="text-center" style={{ marginBottom: '4rem' }}>
                <h1 className="title" data-aos="zoom-in">Featured Frameworks.</h1>
                <p className="subtitle" data-aos="fade-up" data-aos-delay="200" style={{ margin: '0 auto', maxWidth: '800px' }}>
                    Explore my latest technical builds, ranging from Machine Learning RAG pipelines and custom AgTech IoT hardware to high-performance C++ control systems and scalable full-stack web platforms.
                </p>
            </div>

            <div className="projects-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                {projects.map((proj, index) => (
                    <div className="glass-card" key={index} data-aos="fade-up" data-aos-delay={(index % 3) * 100} style={{ display: 'flex', flexDirection: 'column', padding: '2rem', transition: 'all 0.3s ease' }}>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                <h3 className="project-title" style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.4rem' }}>{proj.title}</h3>
                                <span style={{ color: 'var(--accent-color)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                                    {proj.date}
                                </span>
                            </div>
                            <div style={{ background: 'var(--form-bg)', padding: '0.6rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                                {proj.icon}
                            </div>
                        </div>

                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1, lineHeight: '1.6' }}>
                            {proj.desc}
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            {proj.skills.map((skill, i) => (
                                <span key={i} style={{
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-primary)',
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '20px',
                                    fontSize: '0.75rem',
                                    fontWeight: 600
                                }}>
                                    {skill}
                                </span>
                            ))}
                        </div>

                        {proj.link && (
                            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-block', alignSelf: 'flex-start', fontSize: '0.85rem', padding: '0.5rem 1rem', marginTop: 'auto' }}>
                                View Source &rarr;
                            </a>
                        )}

                    </div>
                ))}
            </div>

            {/* CALL TO ACTION */}
            <div className="glass-card text-center" data-aos="zoom-in" style={{ marginTop: '6rem', padding: '4rem 2rem', background: 'linear-gradient(180deg, var(--surface-color) 0%, rgba(13, 17, 23, 0.9) 100%)' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Interested in Collaboration?</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                    My inbox is always open for new opportunities to build highly scalable and critical systems. Whether you have a question or just want to engineer something cool, I'll try my best to get back to you!
                </p>
                <Link href="/" className="btn-primary" style={{ fontSize: '1.1rem', padding: '0.8rem 2rem' }}>
                    Say Hello &rarr;
                </Link>
            </div>

        </main>
    );
}
