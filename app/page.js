"use client";

import Link from 'next/link';
import Typewriter from '@/components/Typewriter';
import HeroModel from '@/components/HeroModel';
import AutonomousCar from '@/components/AutonomousCar';
import EmbeddedController from '@/components/EmbeddedController';
import MiniMDSimulation from '@/components/MiniMDSimulation';
import TerminalProfile from '@/components/TerminalProfile';
import SkillTicker from '@/components/SkillTicker';
import VisibilityWrapper from '@/components/VisibilityWrapper';

export default function Home() {
  return (
    <main>
      {/* HERO SECTION */}
      <section id="hero" className="section container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '6rem' }}>
        <div className="hero-grid" style={{ display: 'grid', gap: '4rem', alignItems: 'center', width: '100%' }}>

          <div data-aos="fade-up" data-aos-duration="1000">
            <h2 style={{ fontSize: '1.25rem', color: 'var(--accent-color)', fontWeight: 600, marginBottom: '1rem', letterSpacing: '0.1em' }}>HELLO, I'M</h2>
            <h1 className="title" data-aos="fade-right" data-aos-delay="200" style={{ fontSize: '5rem' }}>
              Johnnie Tse.
            </h1>
            <div className="subtitle" data-aos="fade-up" data-aos-delay="400" style={{ fontSize: '1.5rem', marginTop: '1rem', minHeight: '2.5rem' }}>
              <Typewriter strings={[
                "Computer Engineering Student @ Queen's University.",
                "Architecting Level 4 Autonomous Systems.",
                "Scaling High-Performance Distributed Compute.",
                "Engineering Advanced RAG Neural Architectures.",
                "Building Resilient Full-Stack Infrastructure."
              ]} />
            </div>
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

          {/* Right 3D VR Model Content */}
          <div className="hero-model-container" data-aos="zoom-in" data-aos-duration="1200" style={{ height: '500px', width: '100%', cursor: 'grab' }}>
            <VisibilityWrapper height="500px">
              <HeroModel />
            </VisibilityWrapper>
          </div>

        </div>

        {/* Infinite Edge-to-Edge Hardware Ticker */}
        <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%' }}>
          <SkillTicker />
        </div>
      </section>

      {/* SYSTEM ARCHITECTURE & DIAGNOSTICS */}
      <section className="section container" data-aos="fade-up" data-aos-duration="1000" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '4rem', marginBottom: '4rem' }}>
        <div className="text-center mb-8">
          <h2 className="title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Engineering Core Vectors</h2>
          <p className="subtitle" style={{ margin: '0 auto', maxWidth: '700px' }}>
            Bridging the architectural gap between embedded systems hardware limits and scalable full-stack multi-host orchestration.
          </p>
          <div style={{ marginTop: '1.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(126, 231, 135, 0.3)', padding: '0.8rem 1.5rem', borderRadius: '8px', display: 'inline-block' }}>
            <span style={{ color: '#7ee787', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.05em' }}>_HACK THE TERMINAL</span>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: '0.5rem 0 0 0' }}>
              The Ubuntu boot sequence below terminates into a live, interactive execution shell. Try commanding <code style={{ color: '#79c0ff', background: 'rgba(121, 192, 255, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>whoami</code>, <code style={{ color: '#79c0ff', background: 'rgba(121, 192, 255, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>ls</code>, <code style={{ color: '#79c0ff', background: 'rgba(121, 192, 255, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>clear</code>, or run the hidden <code style={{ color: '#ff7b72', background: 'rgba(255, 123, 114, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>sudo hire johnnie</code> payload explicitly for recruiters!
            </p>
          </div>
        </div>
        <div style={{ width: '100%', padding: '0 1rem' }}>
          <TerminalProfile />
        </div>
      </section>

      {/* SPATIAL COMPUTING SHOWROOM SECTION */}
      <section id="showroom" className="section container" data-aos="fade-up" data-aos-duration="1000" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="text-center mb-8">
          <h2 className="title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Spatial Engineering Showroom</h2>
          <p className="subtitle" style={{ margin: '0 auto' }}>
            Interact in real-time with procedural WebGL architectures reflecting my background in Autonomy and Systems Engineering.
          </p>
        </div>

        <div className="hero-grid" style={{ display: 'grid', gap: '3rem', alignItems: 'center' }}>
          <div data-aos="fade-right">
            <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-color)' }}>Level 4 Autonomous Systems</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              A procedural representation of a sensor-equipped L4 autonomous vehicle. Features computationally active LiDAR arrays, cybernetic chassis rendering, and dynamic emission sensors. Drag to continuously rotate and inspect.
              <br /><br />
              <strong style={{ color: '#c9d1d9' }}>Why this matters: </strong>
              This architecture directly reflects my hands-on professional background in robotics, engineering autonomous vehicle trajectory planners, integrating complex 3D LiDAR point-cloud algorithms, and designing highly concurrent sensor fusion pipelines mounted natively on isolated embedded Linux hardware.
            </p>
            <div className="skills-grid" style={{ marginTop: '1rem' }}>
              <div className="skill-tag">ROS2</div>
              <div className="skill-tag">Sensor Fusion</div>
              <div className="skill-tag">LiDAR Arrays</div>
              <div className="skill-tag">Computer Vision</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '0', overflow: 'hidden', width: '100%', border: '1px solid var(--border-color)' }} data-aos="zoom-in">
            <VisibilityWrapper height="400px">
              <AutonomousCar />
            </VisibilityWrapper>
          </div>
        </div>
      </section>

      {/* EMBEDDED SYSTEMS SHOWROOM SECTION */}
      <section id="embedded" className="section container" data-aos="fade-up" data-aos-duration="1000" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="hero-grid" style={{ display: 'grid', gap: '3rem', alignItems: 'center' }}>

          {/* Left 3D Embedded Microcontroller Content */}
          <div className="glass-card" style={{ padding: '0', overflow: 'hidden', width: '100%', border: '1px solid var(--border-color)' }} data-aos="zoom-in">
            <VisibilityWrapper height="400px">
              <EmbeddedController />
            </VisibilityWrapper>
          </div>

          <div data-aos="fade-left">
            <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-color)' }}>A 3D Embedded Microcontroller</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              A photorealistic, spinning 3D model of an ESP32 / Raspberry Pi 5 logic board procedurally generated natively in WebGL using primitive mathematics to ensure 100% offline proxy immunity.
              <br /><br />
              <strong style={{ color: '#c9d1d9' }}>Why this matters: </strong>
              This mathematical CAD reconstruction explicitly showcases my extensive low-level systems background. I specialize in writing raw C/C++ firmware, architecting custom PCBs mapped with complex I2C/SPI arrays, and deploying strict Zephyr RTOS state machines onto highly constrained Edge IoT devices for real-time electrical telemetry.
            </p>
            <div className="skills-grid" style={{ marginTop: '1rem' }}>
              <div className="skill-tag">IoT Devices</div>
              <div className="skill-tag">ESP32</div>
              <div className="skill-tag">Microcontrollers</div>
              <div className="skill-tag">C++ Firmware</div>
            </div>
          </div>

        </div>
      </section>

      {/* MINIMD HPC PROXY APPLICATION SHOWROOM SECTION */}
      <section id="waveform" className="section container" data-aos="fade-up" data-aos-duration="1000" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="hero-grid" style={{ display: 'grid', gap: '3rem', alignItems: 'center' }}>

          <div data-aos="fade-right">
            <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-color)' }}>miniMD Molecular Dynamics Simulation</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              A real-time native WebGL implementation of the <strong style={{ color: '#79c0ff' }}>Mantevo miniMD</strong> proxy application logic. It continuously computes $O(N^2)$ Lennard-Jones forces and mathematical Velocity Verlet bounds for 300 active particles within local RAM executing ~45,000 concurrent integration operations natively every 16ms!
              <br /><br />
              <strong style={{ color: '#c9d1d9' }}>Why this matters: </strong>
              This live computational grid is a direct visual proxy of my ELEC498 Capstone engineering project mapping MPI synchronizations. I completely architected a PID-controlled power optimization engine tracking the exact Communication Phases of the bare-metal miniMD application. By analyzing RAPL data and MPI wait times natively, my algorithm executes real-time DVFS actuations dynamically shifting processor voltage and core limits natively under heavy 128GB node payloads.
            </p>
            <div className="skills-grid" style={{ marginTop: '1rem' }}>
              <div className="skill-tag">HPC / MPI</div>
              <div className="skill-tag">Computational Math</div>
              <div className="skill-tag">PID Hardware Control</div>
              <div className="skill-tag">Lennard-Jones</div>
            </div>
          </div>

          {/* Right 3D Data Content */}
          <div className="glass-card" style={{ padding: '0', overflow: 'hidden', width: '100%', border: '1px solid var(--border-color)' }} data-aos="zoom-in">
            <VisibilityWrapper height="400px">
              <MiniMDSimulation />
            </VisibilityWrapper>
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
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

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
