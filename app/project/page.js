"use client";

import Link from 'next/link';

export default function Project() {
    const projects = [
        {
            title: "G.O.S. Phytotron Sensor Node & AI Engine",
            date: "Jan 2026 - Present",
            desc: "End-to-end development of an ultra-low-power IoT environmental monitoring system for precision agriculture, capable of real-time plant phenotyping and stress detection. Engineered custom 4-layer PCB (KiCad) with nRF52840 SoC and integrated Zephyr RTOS Thread mesh networking.",
            skills: ["Embedded C/C++", "Python", "Zephyr RTOS", "KiCad", "IoT", "PCB Design"],
            link: "https://github.com/johnnietse/strawberry-farm"
        },
        {
            title: "HPC Energy Optimization & DVFS Control System",
            date: "Sep 2025 - Present",
            desc: "Dynamic frequency scaling system for miniMD (molecular dynamics proxy application) reducing energy consumption during non-compute phases by keeping performance degradation under 5%. Developed a hybrid Python/C++ control loop integrated with Intel RAPL.",
            skills: ["C++", "Python", "MPI", "HPC", "Linux", "Intel RAPL"],
            link: "https://github.com/johnnietse/elec-498-group-30-2025-2026-proxy-app"
        },
        {
            title: "ApplicaAI - AI-Powered Job Assistant",
            date: "Aug 2025 - Present",
            desc: "Production-grade AI SaaS resume builder leveraging Next.js, Vercel AI SDK, LangGraph, and Supabase. Orchestrates 13 LLM models across 3 providers to automate tailored resume creation and simulate ATS scoring.",
            skills: ["Next.js", "React", "Python", "Supabase", "Stripe", "Docker"],
            link: "https://github.com/johnnietse/AI-Powered_Professional_Job_Application_Assistant"
        },
        {
            title: "PortraitArt Gallery",
            date: "Jun 2025 - Present",
            desc: "Full-stack web app leveraging deep learning (U²-Net) to transform user-uploaded images into artistic transparent portraits. Built with PyTorch and Flask backend handling real-time salient object detection.",
            skills: ["Python", "PyTorch", "Flask", "React", "OpenCV", "Deep Learning"],
            link: null
        },
        {
            title: "Algorithmic Cryptocurrency Trading System",
            date: "May 2025 - Present",
            desc: "Modular, institutional-grade backtesting system capable of processing 28+ assets. Engineered a high-frequency data pipeline using the CoinGecko API with robust error recovery and Sharpe Ratio risk analytics.",
            skills: ["Python", "Pandas", "Scikit-Learn", "API Architecture", "Quantitative Analysis"],
            link: "https://github.com/johnnietse/cryptocurrency-trading-system"
        },
        {
            title: "TaskMaster - Task Manager",
            date: "Apr 2025 - Present",
            desc: "Full-featured task management web app with comprehensive CRUD, smart filtering, data visualization dashboards, and GSAP authenticated using Supabase.",
            skills: ["React", "TypeScript", "Tailwind CSS", "Supabase", "GSAP"],
            link: "https://github.com/johnnietse/manage-mode-ui"
        },
        {
            title: "FYIC 2025 Conference Website",
            date: "Mar 2025 - Dec 2025",
            desc: "High-traffic server-side rendered application built using Next.js 15 for 18+ universities. Implemented GitHub Actions CI/CD for zero-downtime deployments and integrated advanced WCAG 2.1 AA accessibility.",
            skills: ["Next.js", "TypeScript", "Tailwind CSS", "CI/CD", "Node.js"],
            link: "https://github.com/johnnietse/2025-fyic"
        },
        {
            title: "PDF Chatbot (RAG System)",
            date: "Mar 2025 - Aug 2025",
            desc: "Intelligent document assistant using Flask, LangChain, ChromaDB, and OpenAI embeddings to process local PDF documents contextually via Retrieval-Augmented Generation.",
            skills: ["Python", "Flask", "LangChain", "Docker", "RAG"],
            link: "https://github.com/johnnietse/pdf-chatbot"
        },
        {
            title: "Virtual Try-On: Clothing Overlay AI",
            date: "Jun 2025 - Jul 2025",
            desc: "Web app utilizing cvzone's PoseModule and OpenCV for real-time key body landmark detection to dynamically conform and overlay clothing on user-uploaded videos.",
            skills: ["Python", "Flask", "OpenCV", "Computer Vision"],
            link: "https://github.com/johnnietse/cloth-try-on"
        },
        {
            title: "LinkedIn UI Automation Tool",
            date: "Jun 2025 - Jul 2025",
            desc: "Python automation tool integrating Selenium, OpenCV, and PyAutoGUI, implementing hybrid detection logic combining text scraping with computer vision (template matching). Educational prototype only.",
            skills: ["Python", "Selenium", "OpenCV", "PyAutoGUI", "Pandas"],
            link: "https://github.com/johnnietse/linkedin-connection-automation-tool"
        },
        {
            title: "YOLO Dataset Visualizer",
            date: "Jun 2025 - Jul 2025",
            desc: "Web-based visualization tool for YOLO object detection datasets allowing rapid batch validation of bounding boxes with dynamic class management.",
            skills: ["Python", "Flask", "OpenCV", "Tailwind CSS"],
            link: "https://github.com/johnnietse/boundingBoxVisualizer"
        }
    ];

    return (
        <main className="section container" style={{ paddingTop: '8rem' }}>

            <div className="text-center" style={{ marginBottom: '4rem' }}>
                <h1 className="title" data-aos="zoom-in">Featured Projects.</h1>
                <p className="subtitle" data-aos="fade-up" data-aos-delay="200" style={{ margin: '0 auto' }}>
                    Explore my latest technical builds, ranging from Machine Learning RAG pipelines and custom AgTech IoT hardware to high-performance C++ control systems and scalable full-stack web platforms.
                </p>
            </div>

            <div className="projects-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))' }}>
                {projects.map((proj, index) => (
                    <div className="glass-card" key={index} data-aos="fade-up" data-aos-delay={(index % 3) * 100} style={{ display: 'flex', flexDirection: 'column', padding: '2rem' }}>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <h3 className="project-title" style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.4rem' }}>{proj.title}</h3>
                        </div>

                        <p style={{ color: 'var(--accent-color)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', letterSpacing: '0.05em' }}>
                            {proj.date}
                        </p>

                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1, lineHeight: '1.6' }}>
                            {proj.desc}
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2rem' }}>
                            {proj.skills.map((skill, i) => (
                                <span key={i} style={{
                                    background: 'var(--form-bg)',
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

                        {proj.link && (
                            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ alignSelf: 'flex-start', fontSize: '0.9rem', padding: '0.6rem 1.2rem', marginTop: 'auto' }}>
                                View Repository &rarr;
                            </a>
                        )}

                    </div>
                ))}
            </div>

        </main>
    );
}
