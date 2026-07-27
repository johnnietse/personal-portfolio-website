export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        gap: '1.5rem',
        padding: '2rem',
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          border: '2px solid var(--border-color)',
          borderTopColor: 'var(--accent-color)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontFamily: 'monospace' }}>
        Loading...
      </span>
    </div>
  );
}
