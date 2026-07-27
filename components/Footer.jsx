"use client";

import { Github, Linkedin, Mail, FileText } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-color)',
        padding: '3rem 2rem',
        marginTop: '4rem',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          &copy; {currentYear} Johnnie Tse
        </div>

        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <a
            href="https://github.com/johnnietse"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={{ color: 'var(--text-secondary)', transition: 'color 0.3s ease', display: 'flex' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-color)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '')}
          >
            <Github size={22} />
          </a>
          <a
            href="https://www.linkedin.com/in/johnnie-tse-10a9b91b0/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{ color: 'var(--text-secondary)', transition: 'color 0.3s ease', display: 'flex' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-color)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '')}
          >
            <Linkedin size={22} />
          </a>
          <a
            href="mailto:johnnietse994@gmail.com"
            aria-label="Email"
            style={{ color: 'var(--text-secondary)', transition: 'color 0.3s ease', display: 'flex' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-color)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '')}
          >
            <Mail size={22} />
          </a>
          <span style={{ color: 'var(--border-strong)', fontSize: '0.8rem' }}>/</span>
          <a
            href="/Resume%20-%20Queen's%20University%20(Johnnie%20Tse%20-%202025-2026).pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', gap: '0.4rem' }}
          >
            <FileText size={16} />
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
