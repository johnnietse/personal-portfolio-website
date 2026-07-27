'use client';

import Link from 'next/link';
import { useState } from 'react';

const PAGE_SECTIONS = [
  { name: 'Home', href: '/', desc: 'Return to the homepage' },
  { name: 'About', href: '/about', desc: 'Experience, education & skills' },
  { name: 'Projects', href: '/project', desc: 'Featured projects & work' },
];

export default function NotFound() {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const filtered = query.trim()
    ? PAGE_SECTIONS.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.desc.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        padding: '2rem',
        textAlign: 'center',
        gap: '1.5rem',
      }}
    >
      <span
        style={{
          fontSize: '0.8rem',
          fontWeight: 600,
          letterSpacing: '0.15em',
          color: 'var(--accent-color)',
          textTransform: 'uppercase',
        }}
      >
        Error 404
      </span>
      <h1
        className="title"
        style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: 0 }}
      >
        Page Not Found
      </h1>
      <p
        style={{
          color: 'var(--text-secondary)',
          fontSize: '1.1rem',
          maxWidth: '500px',
          lineHeight: 1.7,
        }}
      >
        The route you&apos;re looking for doesn&apos;t exist in this
        architecture. Let me redirect you back to somewhere that does.
      </p>

      {/* Search */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
        <input
          type="text"
          placeholder="Search pages..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          style={{
            width: '100%',
            padding: '0.75rem 1rem 0.75rem 2.5rem',
            background: 'var(--form-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            color: 'var(--text-primary)',
            fontFamily: 'inherit',
            fontSize: '0.95rem',
            outline: 'none',
          }}
        />
        <span
          style={{
            position: 'absolute',
            left: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            pointerEvents: 'none',
          }}
        >
          🔍
        </span>
        {showResults && filtered.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: '0.5rem',
              background: 'var(--surface)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              overflow: 'hidden',
              zIndex: 10,
            }}
          >
            {filtered.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={() => { setShowResults(false); setQuery(''); }}
                style={{
                  display: 'block',
                  padding: '0.75rem 1rem',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--border-color)',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                  {s.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {s.desc}
                </div>
              </Link>
            ))}
          </div>
        )}
        {showResults && query.trim() && filtered.length === 0 && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: '0.5rem',
              background: 'var(--surface)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '0.75rem 1rem',
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              zIndex: 10,
            }}
          >
            No pages found for &quot;{query}&quot;
          </div>
        )}
      </div>

      {/* Recent Sections */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          justifyContent: 'center',
          marginTop: '0.5rem',
        }}
      >
        {PAGE_SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            style={{
              padding: '0.5rem 1.25rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border-color)',
              borderRadius: '30px',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
          >
            {s.name}
          </Link>
        ))}
      </div>

      <Link href="/" className="btn-primary" style={{ marginTop: '1rem' }}>
        Return Home
      </Link>
    </main>
  );
}
