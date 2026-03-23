"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <main>
      {/* HERO SECTION */}
      <section id="hero" className="section container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '4rem', alignItems: 'center', width: '100%' }}>

          <div data-aos="fade-up" data-aos-duration="1000">
            <h2 style={{ fontSize: '1.25rem', color: 'var(--accent-color)', fontWeight: 600, marginBottom: '1rem', letterSpacing: '0.1em' }}>HELLO, I'M</h2>
            <h1 className="title" data-aos="fade-right" data-aos-delay="200" style={{ fontSize: '5rem' }}>
              Johnnie Tse.
            </h1>
            <p className="subtitle" data-aos="fade-up" data-aos-delay="400" style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
              Computer Engineering Student @ Queen's University.
            </p>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: 1.7 }} data-aos="fade-up" data-aos-delay="500">
              I specialize in building exceptional digital experiences, combining mobile app development, modern web technologies, and high-performance computing to create scalable, user-centric software.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }} data-aos="fade-up" data-aos-delay="600">
              <Link href="/project" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                View My Work
              </Link>

              <div style={{ display: 'flex', gap: '1rem', marginLeft: '1rem' }}>
                <a href="https://github.com/johnnietse" target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="GitHub">
                  <svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                </a>
                <a href="https://www.linkedin.com/in/johnnie-tse/" target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
                <a href="mailto:johnnietse994@gmail.com" className="btn-icon" aria-label="Email">
                  <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="herocontact" className="section container" data-aos="fade-up" data-aos-duration="1000">
        <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          <div className="text-center mb-8">
            <h2 className="title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Get in Touch</h2>
            <p className="subtitle" style={{ margin: '0 auto' }}>
              I'm always excited to discuss technology, mobile and web development, HPC, or anything else you’d like to share—let’s connect! 🤝
            </p>
          </div>

          <form action="https://api.web3forms.com/submit" method="POST">
            <input type="hidden" name="access_key" value="9667b268-56d2-448c-9bc9-b0a4d2de19e2" />

            <div className="form-group" data-aos="fade-up" data-aos-delay="100">
              <input type="text" id="name" name="name" placeholder="Your Name" className="form-control" autoComplete="off" required />
            </div>

            <div className="form-group" data-aos="fade-up" data-aos-delay="200">
              <input type="email" id="email" name="email" placeholder="Your Email Address" className="form-control" autoComplete="off" required />
            </div>

            <div className="form-group" data-aos="fade-up" data-aos-delay="300">
              <textarea name="content" id="content" placeholder="How can I help you?" className="form-control" autoComplete="off" required></textarea>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }} data-aos="fade-up" data-aos-delay="400">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
