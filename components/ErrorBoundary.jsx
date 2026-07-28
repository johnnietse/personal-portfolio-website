"use client";

import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          minHeight: '100dvh', padding: '2rem', textAlign: 'center', gap: '1.5rem'
        }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--accent-color)', textTransform: 'uppercase' }}>
            Render Error
          </span>
          <h1 className="title" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: 0 }}>
            Something went wrong
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px', lineHeight: 1.7 }}>
            A component failed to render. Please try refreshing the page.
          </p>
          <button onClick={() => window.location.reload()} className="btn-primary" style={{ marginTop: '1rem', cursor: 'pointer' }}>
            Reload Page
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}
