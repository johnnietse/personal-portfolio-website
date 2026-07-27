import Link from 'next/link';

export default function NotFound() {
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
      <Link href="/" className="btn-primary" style={{ marginTop: '1rem' }}>
        Return Home
      </Link>
    </main>
  );
}
