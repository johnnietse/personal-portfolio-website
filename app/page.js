"use client";

import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import Typewriter from '@/components/Typewriter';
import HeroModel from '@/components/HeroModel';
import AutonomousCar from '@/components/AutonomousCar';
import EmbeddedController from '@/components/EmbeddedController';
import MiniMDSimulation from '@/components/MiniMDSimulation';
import TerminalProfile from '@/components/TerminalProfile';
import SkillTicker from '@/components/SkillTicker';
import VisibilityWrapper from '@/components/VisibilityWrapper';
import GlobeFootprint from '@/components/GlobeFootprint';
import RenderOnScroll from '@/components/RenderOnScroll';
import { SKILLS } from '@/lib/config/skills';

export default function Home() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main>
      {/* HERO SECTION */}
      <section id="hero" className="section container" style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', paddingTop: '6rem' }}>
        <div className="hero-grid" style={{ display: 'grid', gap: '4rem', alignItems: 'center', width: '100%' }}>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 style={{ fontSize: '1.25rem', color: 'var(--accent-color)', fontWeight: 600, marginBottom: '1rem', letterSpacing: '0.1em' }}>HELLO, I'M</h2>
            <motion.h1
              className="title"
              initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Johnnie Tse.
            </motion.h1>
            <motion.div
              className="subtitle"
              style={{ marginTop: '1rem', minHeight: '2.5rem' }}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Typewriter strings={[
                "Computer Engineering Student @ Queen's University.",
                "Architecting Level 4 Autonomous Systems.",
                "Scaling High-Performance Distributed Compute.",
                "Engineering Advanced RAG Neural Architectures.",
                "Building Resilient Full-Stack Infrastructure."
              ]} />
            </motion.div>
            <motion.p
              style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: 1.7 }}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              I build exceptional digital experiences — mobile apps, modern web, and high-performance compute — for scalable, user-centric software.
            </motion.p>

            <motion.div
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href="/project" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                View My Work
              </Link>

              <div style={{ display: 'flex', gap: '1rem', marginLeft: '1rem' }}>
                <a href="https://github.com/johnnietse" target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="GitHub">
                  <Github size={22} />
                </a>
                <a href="https://www.linkedin.com/in/johnnie-tse-10a9b91b0/" target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="LinkedIn">
                  <Linkedin size={22} />
                </a>
                <a href="mailto:johnnietse994@gmail.com" className="btn-icon" aria-label="Email">
                  <Mail size={22} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right 3D VR Model Content */}
          <motion.div
            className="hero-model-container"
            style={{ position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto', cursor: 'grab', aspectRatio: '1/1', display: 'block' }}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <VisibilityWrapper height="100%" width="100%">
              <HeroModel />
            </VisibilityWrapper>
          </motion.div>

        </div>
      </section>

      {/* Infinite Edge-to-Edge Hardware Ticker */}
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <SkillTicker />
      </div>

      {/* SYSTEM ARCHITECTURE & DIAGNOSTICS */}
      <motion.section
        className="section container"
        style={{ minHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '4rem', marginBottom: '4rem' }}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-center mb-8">
          <h2 className="title" style={{ marginBottom: '1rem' }}>Engineering Core Vectors</h2>
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
      </motion.section>

      {/* SPATIAL COMPUTING SHOWROOM SECTION */}
      <motion.section
        id="showroom"
        className="section container"
        style={{ minHeight: 'auto', padding: '4rem 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-center mb-8">
          <h2 className="title" style={{ marginBottom: '1rem' }}>Spatial Engineering Showroom</h2>
          <p className="subtitle" style={{ margin: '0 auto' }}>
            Interact in real-time with procedural WebGL architectures reflecting my background in Autonomy and Systems Engineering.
          </p>
        </div>

        <div className="hero-grid" style={{ display: 'grid', gap: '3rem', alignItems: 'center' }}>
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-color)' }}>Level 4 Autonomous Systems</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              A procedural representation of a sensor-equipped L4 autonomous vehicle. Features computationally active LiDAR arrays, cybernetic chassis rendering, and dynamic emission sensors. Drag to continuously rotate and inspect.
              <br /><br />
              <strong style={{ color: '#c9d1d9' }}>Why this matters: </strong>
              This architecture directly reflects my hands-on professional background in robotics, engineering autonomous vehicle trajectory planners, integrating complex 3D LiDAR point-cloud algorithms, and designing highly concurrent sensor fusion pipelines mounted natively on isolated embedded Linux hardware.
            </p>
            <div className="skills-grid" style={{ marginTop: '1rem' }}>
              {SKILLS.filter(s => ['ROS2', 'Sensor Fusion', 'LiDAR Arrays', 'Computer Vision'].includes(s.name)).map(s => (
                <div className="skill-tag" key={s.name}>{s.name}</div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="glass-card"
            style={{ position: 'relative', padding: '0', overflow: 'hidden', width: '100%', border: '1px solid var(--border-color)', aspectRatio: '1/1', maxWidth: '400px', margin: '0 auto', display: 'block' }}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <VisibilityWrapper height="100%" width="100%">
              <RenderOnScroll rootMargin="300px" fallback={<div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',color:'#58a6ff',background:'rgba(15,23,42,0.3)',border:'1px dashed rgba(88,166,255,0.3)',borderRadius:'12px'}}>Scroll to render Autonomous Car...</div>}>
                <AutonomousCar />
              </RenderOnScroll>
            </VisibilityWrapper>
          </motion.div>
        </div>
      </motion.section>

      {/* EMBEDDED SYSTEMS SHOWROOM SECTION */}
      <motion.section
        id="embedded"
        className="section container"
        style={{ minHeight: 'auto', padding: '4rem 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hero-grid" style={{ display: 'grid', gap: '3rem', alignItems: 'center' }}>

          {/* Left 3D Embedded Microcontroller Content */}
          <motion.div
            className="glass-card"
            style={{ position: 'relative', padding: '0', overflow: 'hidden', width: '100%', border: '1px solid var(--border-color)', aspectRatio: '1/1', maxWidth: '400px', margin: '0 auto', display: 'block' }}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <VisibilityWrapper height="100%" width="100%">
              <RenderOnScroll rootMargin="300px" fallback={<div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',color:'#58a6ff',background:'rgba(15,23,42,0.3)',border:'1px dashed rgba(88,166,255,0.3)',borderRadius:'12px'}}>Scroll to render Embedded Controller...</div>}>
                <EmbeddedController />
              </RenderOnScroll>
            </VisibilityWrapper>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-color)' }}>A 3D Embedded Microcontroller</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              A photorealistic, spinning 3D model of an ESP32 / Raspberry Pi 5 logic board procedurally generated natively in WebGL using primitive mathematics to ensure 100% offline proxy immunity.
              <br /><br />
              <strong style={{ color: '#c9d1d9' }}>Why this matters: </strong>
              This mathematical CAD reconstruction explicitly showcases my extensive low-level systems background. I specialize in writing raw C/C++ firmware, architecting custom PCBs mapped with complex I2C/SPI arrays, and deploying strict Zephyr RTOS state machines onto highly constrained Edge IoT devices for real-time electrical telemetry.
            </p>
            <div className="skills-grid" style={{ marginTop: '1rem' }}>
              {SKILLS.filter(s => ['IoT Devices', 'ESP32', 'Microcontrollers', 'C++ Firmware'].includes(s.name)).map(s => (
                <div className="skill-tag" key={s.name}>{s.name}</div>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.section>

      {/* MINIMD HPC PROXY APPLICATION SHOWROOM SECTION */}
      <motion.section
        id="waveform"
        className="section container"
        style={{ minHeight: 'auto', padding: '4rem 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hero-grid" style={{ display: 'grid', gap: '3rem', alignItems: 'center' }}>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-color)' }}>miniMD Molecular Dynamics Simulation</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              A real-time native WebGL implementation of the <strong style={{ color: '#79c0ff' }}>Mantevo miniMD</strong> proxy application logic. It continuously computes $O(N^2)$ Lennard-Jones forces and mathematical Velocity Verlet bounds for 300 active particles within local RAM executing ~45,000 concurrent integration operations natively every 16ms!
              <br /><br />
              <strong style={{ color: '#c9d1d9' }}>Why this matters: </strong>
              This live computational grid is a direct visual proxy of my ELEC498 Capstone engineering project mapping MPI synchronizations. I completely architected a phase-aware DVFS with thermal throttling engine tracking the exact Communication Phases of the bare-metal miniMD application. By analyzing RAPL data and MPI wait times natively, my algorithm executes real-time DVFS actuations dynamically shifting processor voltage and core limits natively under heavy 128GB node payloads.
            </p>
            <div className="skills-grid" style={{ marginTop: '1rem' }}>
              {SKILLS.filter(s => ['HPC / MPI', 'Computational Math', 'Phase-Aware DVFS Control', 'Lennard-Jones'].includes(s.name)).map(s => (
                <div className="skill-tag" key={s.name}>{s.name}</div>
              ))}
            </div>
          </motion.div>

          {/* Right 3D Data Content */}
          <motion.div
            className="glass-card"
            style={{ position: 'relative', padding: '0', overflow: 'hidden', width: '100%', border: '1px solid var(--border-color)', aspectRatio: '1/1', maxWidth: '400px', margin: '0 auto', display: 'flex', alignItems: 'stretch', justifyContent: 'stretch' }}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <RenderOnScroll rootMargin="300px" fallback={<div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',color:'#58a6ff',background:'rgba(15,23,42,0.3)',border:'1px dashed rgba(88,166,255,0.3)',borderRadius:'12px',minHeight:'300px'}}>Scroll to render miniMD Simulation...</div>}>
              <MiniMDSimulation />
            </RenderOnScroll>
          </motion.div>

        </div>
      </motion.section>

      {/* GLOBAL ENGINEERING FOOTPRINT */}
      <motion.section
        id="footprint"
        className="section container"
        style={{ minHeight: 'auto', padding: '4rem 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hero-grid" style={{ display: 'grid', gap: '3rem', alignItems: 'center' }}>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-color)' }}>Global Engineering Footprint</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Interactive 3D globe mapping my academic and professional journey across North America.
              <br /><br />
              <strong style={{ color: '#c9d1d9' }}>From the Great Lakes to the South China Sea: </strong>
              Click the city badges to explore the experiences that shaped my engineering journey ΓÇö from embedded systems and HPC at Queen's to finance and robotics in Hong Kong.
            </p>
          </motion.div>

          {/* Right Globe Visual */}
          <motion.div
            className="glass-card"
            style={{ position: 'relative', padding: '6px', overflow: 'hidden', width: '100%', border: '1px solid var(--border-color)', aspectRatio: '1/1', maxWidth: '400px', margin: '0 auto', display: 'flex', alignItems: 'stretch', justifyContent: 'stretch' }}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden', display: 'flex', alignItems: 'stretch', justifyContent: 'stretch' }}>
              <RenderOnScroll rootMargin="300px" fallback={<div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',color:'#58a6ff',background:'rgba(15,23,42,0.3)',border:'1px dashed rgba(88,166,255,0.3)',borderRadius:'12px'}}>Scroll to render Globe...</div>}>
                <GlobeFootprint />
              </RenderOnScroll>
            </div>
          </motion.div>

        </div>
      </motion.section>

      {/* CONTACT SECTION */}
      <motion.section
        id="herocontact"
        className="section container"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          <div className="text-center mb-8">
            <h2 className="title" style={{ marginBottom: '1rem' }}>Get in Touch</h2>
            <p className="subtitle" style={{ margin: '0 auto' }}>
              I'm always excited to discuss technology, mobile and web development, HPC, or anything else you'd like to share — let's connect! 🤝
            </p>
          </div>

          <form action="https://api.web3forms.com/submit" method="POST">
            <input type="hidden" name="access_key" value={process.env.WEB3FORMS_ACCESS_KEY} />
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

            <motion.div
              className="form-group"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <input type="text" id="name" name="name" placeholder="Your Name" className="form-control" autoComplete="off" required />
            </motion.div>

            <motion.div
              className="form-group"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <input type="email" id="email" name="email" placeholder="Your Email Address" className="form-control" autoComplete="off" required />
            </motion.div>

            <motion.div
              className="form-group"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <textarea name="content" id="content" placeholder="How can I help you?" className="form-control" autoComplete="off" required></textarea>
            </motion.div>

            <motion.button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.2 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </motion.section>
    </main>
  );
}
