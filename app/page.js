"use client";

import Link from 'next/link';
import {
  ArrowRight,
  Terminal,
  Cpu,
  Globe,
  Trophy
} from 'lucide-react';

export default function Home() {
  const stats = [
    { icon: <Globe size={32} />, value: "18+", label: "Universities Served" },
    { icon: <Terminal size={32} />, value: "10k+", label: "Documents Processed in RAG" },
    { icon: <Cpu size={32} />, value: "200+", label: "Sub-2ms CAN Signals Handled" },
    { icon: <Trophy size={32} />, value: "Top 5%", label: "Student Cluster Competition" }
  ];

  return (
    <main>
      {/* HERO SECTION */}
      <section id="hero" className="section container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '6rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem', width: '100%' }}>

          <div style={{ flex: '1', minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <span style={{
              color: 'var(--accent-color)',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontSize: '0.9rem'
            }} data-aos="fade-down">
              Software & Embedded Engineer
            </span>

            <h1 className="title" style={{ fontSize: '4.5rem', lineHeight: '1.1', margin: 0 }} data-aos="fade-up" data-aos-delay="100">
              Architecting <br />
              <span className="gradient-text">Scalable Systems.</span>
            </h1>

            <p className="subtitle" style={{ fontSize: '1.2rem', marginTop: '1rem' }} data-aos="fade-up" data-aos-delay="200">
              I build high-performance computing clusters, autonomous embedded networks, and intelligent AI-driven applications utilizing Next.js, Go, and ROS2.
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }} data-aos="fade-up" data-aos-delay="300">
              <Link href="/project" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                View Projects <ArrowRight size={18} />
              </Link>
              <Link href="/about" className="btn-secondary">
                My Experience
              </Link>
            </div>
          </div>

          <div style={{ flex: '1', minWidth: '320px', display: 'flex', justifyContent: 'center', position: 'relative' }} data-aos="zoom-in" data-aos-delay="400">
            <div style={{
              position: 'absolute',
              width: '120%',
              height: '120%',
              background: 'radial-gradient(circle, var(--accent-light) 0%, transparent 70%)',
              opacity: 0.1,
              zIndex: -1,
              filter: 'blur(40px)'
            }}></div>
            <div className="glass-card form-container" style={{ width: '100%', maxWidth: '450px', padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Let's Connect.</h3>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Name</label>
                  <input type="text" placeholder="John Doe" className="form-input" style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email</label>
                  <input type="email" placeholder="john@example.com" className="form-input" style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Message</label>
                  <textarea placeholder="How can we build together?" className="form-input" rows="4" style={{ width: '100%', resize: 'none' }}></textarea>
                </div>
                <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="section container" style={{ paddingBottom: '6rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem'
        }}>
          {stats.map((stat, idx) => (
            <div key={idx} className="glass-card" data-aos="fade-up" data-aos-delay={idx * 100} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3rem 2rem',
              textAlign: 'center',
              gap: '1rem',
              background: 'var(--surface-color)',
              border: '1px solid var(--border-color)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}>
              <div style={{ color: 'var(--accent-color)' }}>
                {stat.icon}
              </div>
              <h3 style={{ fontSize: '3rem', margin: 0, background: 'linear-gradient(45deg, var(--text-primary), var(--accent-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {stat.value}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
