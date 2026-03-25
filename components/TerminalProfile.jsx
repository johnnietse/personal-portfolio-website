"use client";
import React, { useState, useEffect, useRef } from 'react';

const bootSequence = [
    "johnnie@server:~$ fetch --system",
    "Loading kernel diagnostics...",
    "[ OK ] Mounted /dev/core/skills",
    " ",
    "OS: Ubuntu 24.04 LTS x86_64",
    "Host: Queen's Compute Cluster [Node 32]",
    "Kernel: 6.8.0-generic",
    "Uptime: 4 years, 8 months (System Engineering)",
    "Packages: 3845 (dpkg), 12 (flatpak)",
    "Shell: bash 5.2.21",
    " ",
    "------ ACTIVE PROFILES ------",
    "> LOW-LEVEL: C/C++, Rust, Assembly, Zephyr RTOS, CAN/ISO-TP",
    "> DISTRIBUTED: Kubernetes (LWS), Docker, MPI, CUDA",
    "> FULL-STACK: React, Next.js, Node.js, PostgreSQL, Redis",
    "> INTELLIGENCE: PyTorch, TensorFlow, LangChain, RAG",
    "-----------------------------",
    " ",
    "johnnie@server:~$ status --active",
    "Status: RUNNING | Memory: 42.1G / 128.0G | Threads: 256",
    "READY."
];

export default function TerminalProfile() {
    const [lines, setLines] = useState([]);
    const [mounted, setMounted] = useState(false);
    const [isBooted, setIsBooted] = useState(false);
    const [input, setInput] = useState("");
    const terminalEndRef = useRef(null);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim();
            setLines(prev => [...prev, `johnnie@server:~$ ${cmd}`]);
            setInput("");

            if (cmd === 'whoami') {
                setLines(prev => [...prev, "Johnnie Tse - High-Performance Systems Engineer"]);
            } else if (cmd === 'sudo hire johnnie') {
                setLines(prev => [...prev, "[ OK ] Root Privileges Granted. Awaiting offer details...", "Deploying Celebration Protocol! 🎉"]);
            } else if (cmd === 'clear') {
                setLines([]);
            } else if (cmd === 'ls') {
                setLines(prev => [...prev, "portfolio.cpp   resume.pdf   autonomous_car_nodes/   fluid_solver.r3f"]);
            } else if (cmd === '') {
                // Return carriage silently
            } else {
                setLines(prev => [...prev, `bash: ${cmd}: command not found`]);
            }
        }
    };

    useEffect(() => {
        setMounted(true);
        setLines([]); // Explicitly reset buffer bypassing Next.js FastRefresh artifacts
        let currentLine = 0;
        const interval = setInterval(() => {
            if (currentLine < bootSequence.length) {
                setLines(prev => [...prev, bootSequence[currentLine]]);
                currentLine++;
            } else {
                clearInterval(interval);
                setIsBooted(true);
            }
        }, 120); // Accelerated mechanical typing speed
        return () => clearInterval(interval);
    }, []);

    // Mechanical Auto-Scroll tracking the input bounds continuously
    useEffect(() => {
        if (terminalEndRef.current) {
            terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [lines, isBooted]);

    if (!mounted) return null;

    return (
        <div style={{ background: '#0d1117', borderRadius: '12px', border: '1px solid #30363d', padding: '1rem', width: '100%', maxWidth: '850px', margin: '0 auto', fontFamily: "'Fira Code', 'Courier New', monospace", boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
            {/* Terminal Window Header (MacOS / Ubuntu generic) */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', borderBottom: '1px solid #30363d', paddingBottom: '0.8rem', alignItems: 'center' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
                <span style={{ marginLeft: '1rem', color: '#8b949e', fontSize: '0.85rem', fontWeight: 600 }}>bash - ssh johnnie@cluster.hpc</span>
            </div>
            {/* Terminal Execution Window */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', height: '380px', overflowY: 'auto', paddingRight: '10px' }}>
                {lines.map((line, i) => (
                    <div key={i} style={{
                        color: line?.startsWith('johnnie@') ? '#7ee787' : line?.startsWith('>') ? '#79c0ff' : line?.startsWith('[ OK ]') ? '#56d364' : '#c9d1d9',
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                        whiteSpace: 'pre-wrap'
                    }}>
                        {line}
                    </div>
                ))}

                {/* Dynamically mount interactive prompt when boot metrics finish traversing */}
                {isBooted ? (
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                        <span style={{ color: '#7ee787', marginRight: '8px', fontSize: '0.95rem' }}>johnnie@server:~$</span>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleCommand}
                            autoFocus
                            spellCheck={false}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#c9d1d9',
                                fontFamily: 'inherit',
                                fontSize: '0.95rem',
                                outline: 'none',
                                flexGrow: 1,
                                caretColor: '#c9d1d9'
                            }}
                        />
                    </div>
                ) : (
                    <div className="cursor-blink" style={{ width: '10px', height: '18px', background: '#c9d1d9', marginTop: '4px', animation: 'blink 1s step-end infinite' }} />
                )}

                <div ref={terminalEndRef} />
            </div>
            <style jsx>{`
                @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
            `}</style>
        </div>
    );
}
