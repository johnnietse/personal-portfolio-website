"use client";

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import SolarSystemBackground from '@/components/SolarSystemBackground';
import HolographicCard from '@/components/HolographicCard';
import SkillConstellation from '@/components/SkillConstellation';
import VisibilityWrapper from '@/components/VisibilityWrapper';
import GitHubStats from '@/components/GitHubStats';
import { EXPERIENCES, EDUCATION, CERTIFICATIONS } from '@/lib/config/experience';

const renderSkill = (img, label) => (
    <div className="skill-tag">
        <img src={img} alt={label} />
        <span>{label}</span>
    </div>
);

export default function About() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <main className="section container" style={{ paddingTop: '8rem', position: 'relative' }}>
            <SolarSystemBackground />

            {/* HERO ABOUT SECTION */}
            <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <HolographicCard style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center', marginBottom: '4rem' }}>
                <div style={{ flex: '1', minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ position: 'relative', width: '320px', height: '320px', padding: '10px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(88, 166, 255, 0.4) 0%, rgba(30, 41, 59, 0) 100%)' }}>
                        <img src="/profilephoto.png" alt="Johnnie Tse" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', border: '4px solid var(--surface-color)' }} fetchPriority="high" />
                    </div>
                </div>

                <div style={{ flex: '2', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <motion.h1
                            className="title"
                            style={{ marginBottom: '0' }}
                            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >About Me.</motion.h1>
                    <motion.p
                            style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.7' }}
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                        Hello! I'm Johnnie. I'm a Computer Engineering student at Queen's University with a strong passion for scalable backends, Kubernetes ecosystems, modern high-performance web applications, and autonomous embedded systems (HPC & ROS2). I focus heavily on contributing to monumental open-source architectures while pushing modern scalable limits.
                    </motion.p>
                    <motion.p
                            style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.7' }}
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                        In web execution, I'm focused on engineering distributed robust full-stack applications leveraging architectures within React, Next.js, and Node.js. My experiences span through creating enterprise RAG models deploying containerized infrastructure with Docker and multi-host Azure Kubernetes clusters.
                    </motion.p>
                    <motion.p
                            style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.7' }}
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                        Beyond the web, I architect C++ automotive applications for autonomous embedded systems via Controller Area Networks (CAN) and ROS2, while co-heading the Queen's HPC organization dictating high-performance compute architecture methodologies (MPI, Thread Networking, OpenMP, GPU scaling) for global Student Cluster Competitions.
                    </motion.p>
                </div>
            </HolographicCard>
            </motion.div>

            {/* EXPERIENCE SECTION */}
            <motion.h2
                className="title"
                style={{ marginTop: '2rem', textAlign: 'center' }}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >Experience</motion.h2>
            <motion.p
                className="subtitle"
                style={{ margin: '0 auto 3rem auto', textAlign: 'center' }}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                My professional journey engineering open-source architectures, robust scalable platforms, and advanced high-performance solutions.
            </motion.p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '6rem' }}>
                {EXPERIENCES.map((exp, idx) => (
                    <motion.div
                        key={exp.id}
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: (idx % 3) * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <HolographicCard style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            {exp.logo && (
                                <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'var(--surface-color)', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--border-color)', overflow: 'hidden', padding: '5px' }}>
                                    <img src={exp.logo} alt={`${exp.company} Logo`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>
                            )}
                            <div style={{ flexGrow: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                                    <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', margin: 0, fontWeight: 800 }}>{exp.role}</h3>
                                    <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 600, background: 'var(--form-bg)', padding: '0.4rem 1rem', borderRadius: '30px', border: '1px solid var(--border-color)' }}>{exp.date}</span>
                                </div>
                                <h4 style={{ fontSize: '1.2rem', color: 'var(--accent-color)', fontWeight: 600, margin: '0.5rem 0 0 0' }}>{exp.company} • {exp.location}</h4>
                            </div>
                        </div>

                        <ul style={{ marginLeft: '1.5rem', color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {exp.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}
                        </ul>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.5rem' }}>
                            {exp.skills.map((skill, i) => (
                                <span key={i} style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-primary)',
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    fontWeight: 600
                                }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </HolographicCard>
                    </motion.div>
                ))}
            </div>

            {/* EDUCATION SECTION */}
            <motion.h2
                className="title"
                style={{ marginTop: '2rem', textAlign: 'center' }}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >Education & Certifications</motion.h2>
            <motion.p
                className="subtitle"
                style={{ margin: '0 auto 3rem auto', textAlign: 'center' }}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                Academic background, continuous learning, and official certifications.
            </motion.p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '6rem' }}>
                {EDUCATION.map((edu, idx) => (
                    <motion.div
                        key={edu.id}
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: (idx % 3) * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >

                        <HolographicCard style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            {edu.logo && (
                                <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'var(--surface-color)', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--border-color)', overflow: 'hidden', padding: '5px' }}>
                                    <img src={edu.logo} alt={`${edu.institution} Logo`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>
                            )}
                            <div style={{ flexGrow: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                                    <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', margin: 0, fontWeight: 800 }}>{edu.degree}</h3>
                                    <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 600, background: 'var(--form-bg)', padding: '0.4rem 1rem', borderRadius: '30px', border: '1px solid var(--border-color)' }}>{edu.date}</span>
                                </div>
                                <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-color)', fontWeight: 600, margin: '0.5rem 0 0 0' }}>{edu.institution}</h4>
                            </div>
                        </div>

                        {edu.bullets && (
                            <ul style={{ marginLeft: '1.5rem', color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {edu.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}
                            </ul>
                        )}

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.5rem' }}>
                            {edu.skills.map((skill, i) => (
                                <span key={i} style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-primary)',
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    fontWeight: 600
                                }}>
                                    {skill}
                                </span>
                            ))}
                        </div>

                    </HolographicCard>
                    </motion.div>
                ))}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                    {CERTIFICATIONS.map((cert, idx) => (
                        <motion.div
                            key={cert.id}
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                        <HolographicCard style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flex: '1 1 300px' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '8px', background: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2px' }}>
                                <img src={cert.logo} alt={`${cert.issuer} Logo`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; }} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: '0 0 0.2rem 0', fontWeight: 600 }}>{cert.name}</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>{cert.issuer} • {cert.date}</p>
                            </div>
                        </HolographicCard>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* SKILLS SECTION */}
            <motion.h2
                className="title"
                style={{ textAlign: 'center' }}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >Technical Arsenal</motion.h2>
            <motion.p
                className="subtitle"
                style={{ margin: '0 auto 3rem auto', textAlign: 'center' }}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                A comprehensive overview of the tools, languages, and frameworks that power my workflows.
            </motion.p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', margin: '0 auto' }}>

                {/* 0. Skill Constellation Card */}
                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                <HolographicCard>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--accent-color)' }}>Skill Constellation</h3>
                    <div style={{ width: '100%', height: '400px' }}>
                        <VisibilityWrapper height="100%">
                            <SkillConstellation />
                        </VisibilityWrapper>
                    </div>
                </HolographicCard>
                </motion.div>

                {/* 1. Languages, Frameworks, and Libraries */}
                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                <HolographicCard>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--accent-color)' }}>Languages, Frameworks, and Libraries</h3>
                    <div className="skills-grid">
                        {renderSkill('/icons8-html.png', 'HTML5')}
                        {renderSkill('/icons8-css3.png', 'CSS')}
                        {renderSkill('/icons8-javascript.png', 'JavaScript (JS)')}
                        {renderSkill('/typescript.svg', 'TypeScript 5.8')}
                        {renderSkill('/Tailwind_CSS_Logo.svg', 'Tailwind CSS')}
                        {renderSkill('/bootstrap.png', 'Bootstrap')}
                        {renderSkill('/material-tailwind.png', 'Material Tailwind')}
                        {renderSkill('/react-logo.png', 'React.js & React Native')}
                        {renderSkill('/nextjs.png', 'Next.js')}
                        {renderSkill('/expo.svg', 'Expo')}
                        {renderSkill('/icons8-nodejs.png', 'Node.js')}
                        {renderSkill('/express.png', 'Express.js')}
                        {renderSkill('/icons8-python.png', 'Python')}
                        {renderSkill('/icons8-c-programming.png', 'C')}
                        {renderSkill('/icons8-c.png', 'C++ & Embedded C++')}
                        {renderSkill('/icons8-java.png', 'Java')}
                        {renderSkill('/Kotlin_Icon.png', 'Kotlin')}
                        {renderSkill('/go.svg', 'Go')}
                        {renderSkill('/perl.svg', 'Perl')}
                        {renderSkill('/icons8-r-project.png', 'R')}
                        {renderSkill('/sql.png', 'SQL')}
                        {renderSkill('/mongodb.png', 'MongoDB')}
                        {renderSkill('/mongooseodm.png', 'Mongoose')}
                        {renderSkill('/Database-mysql.png', 'MySQL')}
                        {renderSkill('/postgresql.svg', 'PostgreSQL')}
                        {renderSkill('/Django_logo.png', 'Django')}
                        {renderSkill('/flask.svg', 'Flask')}
                        {renderSkill('/fastapi.png', 'FastAPI')}
                        {renderSkill('/springboot.svg', 'Spring Boot')}
                        {renderSkill('/google-gemini.svg', 'Google Gemini')}
                        {renderSkill('/langchain.svg', 'LangChain')}
                        {renderSkill('/langgraph.svg', 'LangGraph')}
                        {renderSkill('/pinecone.svg', 'Pinecone')}
                        {renderSkill('/chroma-logo.svg', 'ChromaDB')}
                        {renderSkill('/Scikit_learn.png', 'scikit-learn')}
                        {renderSkill('/pytorch.svg', 'PyTorch')}
                        {renderSkill('/tensorflow.svg', 'TensorFlow & Lite')}
                        {renderSkill('/huggingface.svg', 'Hugging Face')}
                        {renderSkill('/llama.svg', 'LLaMA & CTransformers')}
                        {renderSkill('/Pandas.png', 'pandas')}
                        {renderSkill('/NumPy.png', 'NumPy')}
                        {renderSkill('/Matplotlib.png', 'Matplotlib')}
                        {renderSkill('/seaborn.png', 'Seaborn')}
                        {renderSkill('/OpenCV.png', 'OpenCV')}
                        {renderSkill('/cvzone.webp', 'CVZone')}
                        {renderSkill('/asmlang.png', 'Assembly language')}
                        {renderSkill('/ros_logo.svg', 'ROS2')}
                        {renderSkill('/VHDL.png', 'VHDL')}
                        {renderSkill('/SystemVerilog.svg', 'SystemVerilog/Verilog')}
                        {renderSkill('/icons8-latex.png', 'LaTeX')}
                        {renderSkill('/icons8-bash.png', 'Bash/Shell')}
                        {renderSkill('/framer_motion.png', 'Framer Motion')}
                        {renderSkill('/gsap.png', 'GSAP')}
                        {renderSkill('/Three.js.svg', 'Three.js')}
                        {renderSkill('/canvas-confetti.svg', 'Canvas Confetti')}
                        {renderSkill('/lucide.svg', 'Lucide & Heroicons')}
                        {renderSkill('/react-hook-form.svg', 'React Hook Form')}
                        {renderSkill('/vite.svg', 'Vite')}
                        {renderSkill('/graphql.svg', 'GraphQL')}
                        {renderSkill('/webhook.svg', 'Webhooks')}
                        {renderSkill('/react-logo.png', 'Context API')}
                        {renderSkill('/redux.svg', 'Redux')}
                        {renderSkill('/selenium.svg', 'Selenium')}
                        {renderSkill('/beautiful_soup.png', 'BeautifulSoup')}
                        {renderSkill('/jest.png', 'Jest')}
                        {renderSkill('/supertest.png', 'Supertest')}
                        {renderSkill('/open-mpi-logo.png', 'OpenMPI')}
                        {renderSkill('/openmp.png', 'OpenMP')}
                        {renderSkill('/sqlite.svg', 'Room Database')}
                        {renderSkill('/icons8-java.png', 'Retrofit')}
                        {renderSkill('/jetpackcompose.svg', 'Android Jetpack Compose')}
                        {renderSkill('/nextjs.png', 'Next.js API Routes')}
                        {renderSkill('/nodemailer.svg', 'Nodemailer (SMTP)')}
                        {renderSkill('/sharp.svg', 'Sharp')}
                        {renderSkill('/postcss.svg', 'PostCSS')}
                        {renderSkill('/autoprefixer.svg', 'Autoprefixer')}
                        {renderSkill('/eslint.svg', 'ESLint')}
                    </div>
                </HolographicCard>
                </motion.div>

                {/* 2. Developer Tools & Workflows */}
                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                <HolographicCard>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--accent-color)' }}>Developer Tools & Workflows</h3>
                    <div className="skills-grid">
                        {renderSkill('/kubernetes.png', 'Kubernetes (SIG-Apps)')}
                        {renderSkill('/kubernetes.png', 'LeaderWorkerSet (LWS)')}
                        {renderSkill('/kubernetes.png', 'Kubespray & SIG Cluster Lifecycle')}
                        {renderSkill('/docker-mark-ocean-blue.svg', 'Docker')}
                        {renderSkill('/helm.svg', 'Helm')}
                        {renderSkill('/openshift.svg', 'OpenShift Kubernetes')}
                        {renderSkill('/github.png', 'GitHub Actions CI/CD')}
                        {renderSkill('/icons8-git.png', 'GitLab CI')}
                        {renderSkill('/bitbucket.svg', 'Bitbucket')}
                        {renderSkill('/jira.svg', 'Jira (Scrum)')}
                        {renderSkill('/confluence.svg', 'Confluence')}
                        {renderSkill('/jenkins.svg', 'Jenkins')}
                        {renderSkill('/vscode-ansible.png', 'Ansible')}
                        {renderSkill('/Terraform_Logo.svg', 'Terraform')}
                        {renderSkill('/vmware.svg', 'VMware')}
                        {renderSkill('/Visual_Studio_Code.png', 'VS Code')}
                        {renderSkill('/Vimlogo.svg', 'Vim')}
                        {renderSkill('/JetBrains-logo.png', 'JetBrains Suite')}
                        {renderSkill('/android-studio-icon.png', 'Android Studio')}
                        {renderSkill('/solidworks.png', 'SolidWorks')}
                        {renderSkill('/Figma-logo.png', 'Figma')}
                        {renderSkill('/Fritzing_icon.png', 'Fritzing')}
                        {renderSkill('/KiCad_logo_square.png', 'KiCad')}
                        {renderSkill('/LTSpice.jpeg', 'LTspice')}
                        {renderSkill('/Intel_quartus_prime.png', 'Intel Quartus Prime, Quartus II, ModelSim')}
                        {/* {renderSkill('/jupyter.png', 'Jupyter')} */}
                        {renderSkill('/grafana.svg', 'Grafana')}
                        {renderSkill('/postman.svg', 'Postman')}
                        {renderSkill('/mysql_workbench.png', 'MySQL Workbench')}
                        {renderSkill('/Slurm_logo.svg', 'Slurm & Bash')}
                        {renderSkill('/zephyr_rtos.svg', 'Zephyr RTOS')}
                        {renderSkill('/CAN_Logo.svg', 'CAN / ISO-TP')}
                        {renderSkill('/ISO_26262_ASIL_D.png', 'ISO 26262 (ASIL-D)')}
                        {renderSkill('/gcb.svg', 'Google Cloud Build (GCB)')}
                        {renderSkill('/kind.svg', 'KIND (Kubernetes in Docker)')}
                        {renderSkill('/dependabot.svg', 'Dependabot')}
                        {renderSkill('/vagrant.svg', 'Vagrant')}
                        {renderSkill('/Google_Lighthouse_logo.svg', 'Google Lighthouse')}
                        {renderSkill('/wcag-2.1-aa-logo.svg', 'WCAG 2.1 AA')}
                        {renderSkill('/agile.jpg', 'Agile')}
                        {renderSkill('/Scrum-icon.jpg', 'Scrum')}
                        {renderSkill('/sdlc.png', 'SDLC')}

                        {renderSkill('/microsoft-365.png', 'Office 365')}
                        {renderSkill('/google_colab-logo.png', 'Google Colab')}
                        {renderSkill('/jupyter_icon.svg', 'Jupyter')}

                    </div>
                </HolographicCard>
                </motion.div>

                {/* 3. Databases and Cloud Architectures */}
                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                <HolographicCard>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--accent-color)' }}>Databases and Enterprise Cloud Architectures</h3>
                    <div className="skills-grid">
                        {renderSkill('/sap_s4hana.png', 'SAP S/4HANA Cloud')}
                        {renderSkill('/Oracle_database.png', 'ORACLE Database')}
                        {renderSkill('/New_Power_BI.png', 'Microsoft Power BI')}
                        {renderSkill('/aws.svg', 'AWS (EC2, S3, Lambda, SQS, SNS)')}
                        {renderSkill('/aws.svg', 'AWS CloudWatch & Step Function')}
                        {renderSkill('/azure.svg', 'Azure & Azure Kubernetes Service (AKS)')}
                        {renderSkill('/gcp.svg', 'Google Cloud Platform (GCP)')}
                        {renderSkill('/vercel.svg', 'Vercel')}
                        {renderSkill('/Cloudflare_Logo.svg', 'Cloudflare')}
                        {renderSkill('/supabase.svg', 'Supabase (PostgreSQL with RLS)')}
                        {renderSkill('/firebase.svg', 'Firebase')}
                        {renderSkill('/render.svg', 'Render')}
                        {renderSkill('/Database-mysql.png', 'MySQL Database')}
                        {renderSkill('/sqlite.svg', 'PostgreSQL / SQLite')}
                        {renderSkill('/Redis-Logo.svg', 'Redis')}
                        {renderSkill('/prisma.svg', 'Prisma')}
                        {renderSkill('/stripe.svg', 'Stripe')}
                        {renderSkill('/Fundamental-cell-excel-spreadsheet.png', 'Excel (Dynamic Arrays & Stock Data)')}
                        {renderSkill('/SharePoint.svg', 'SharePoint')}
                        {renderSkill('/dataverse.webp', 'Dataverse')}
                        {renderSkill('/Microsoft_Power_Automate.svg', 'Power Automate')}
                    </div>
                </HolographicCard>
                </motion.div>

                {/* 4. Hardware, Systems & Networking */}
                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                <HolographicCard>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--accent-color)' }}>Hardware, Systems & Networking</h3>
                    <div className="skills-grid">
                        {renderSkill('/raspberrypi.svg', 'Raspberry Pi 5')}
                        {renderSkill('/linux.svg', 'PREEMPT_RT Linux')}
                        {renderSkill('/CAN_Logo.svg', 'ValueCAN 4 & DBC Parsing')}
                        {renderSkill('/CAN_Logo.svg', 'XML-driven config')}
                        {renderSkill('/terminal.png', 'MPMC zero-copy ROS–CAN transfer')}
                        {renderSkill('/CAN_Logo.svg', 'ECU systems & CAN bus')}
                        {renderSkill('/terminal.png', 'SPI / I2C / UART')}
                        {renderSkill('/icons8-arduino.png', 'nRF52840 / ESP32 / Arduino / RF')}
                        {renderSkill('/cyclone-v.png', 'Cyclone V FPGA')}
                        {renderSkill('/icons8-c-programming.png', 'RISC-V ISA')}
                        {renderSkill('/zephyr_rtos.svg', 'Thread mesh networking')}
                        {renderSkill('/google-coral.webp', 'Coral TPU & EfficientDet')}
                        {renderSkill('/Nvidia_CUDA_logo.jpg', 'CUDA & MPI')}
                        {renderSkill('/Slurm_logo.svg', 'DVFS & RAPL')}
                        {renderSkill('/terminal.png', 'OpenConfig')}
                        {renderSkill('/etcd.svg', 'etcd & CoreDNS')}
                        {renderSkill('/etcd.svg', 'Linux cgroup v1 deprecation')}
                        {renderSkill('/terminal.png', 'pod DNS & DPANIC crashes')}
                    </div>
                </HolographicCard>
                </motion.div>

                {/* 5. Software Engineering & MLOps Concepts */}
                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                <HolographicCard>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--accent-color)' }}>Data, ML & Software Engineering Concepts</h3>
                    <div className="skills-grid">
                        {renderSkill('/icons8-python.png', 'structure-aware semantic chunking')}
                        {renderSkill('/Scikit_learn.png', 'Random Forest & GridSearchCV')}
                        {renderSkill('/Scikit_learn.png', 'Gini feature importance')}
                        {renderSkill('/google-gemini.svg', 'legal interpretability & LLM hallucinations')}
                        {renderSkill('/google-gemini.svg', 'LLM-powered resume automation SaaS')}
                        {renderSkill('/pinecone.svg', 'memory-efficient RAG chatbot')}
                        {renderSkill('/huggingface.svg', 'quantized LLaMA models (.gguf)')}
                        {renderSkill('/terminal.png', 'context windows & token limits')}
                        {renderSkill('/cvzone.webp', 'salient object segmentation (U²-Net)')}
                        {renderSkill('/tensorflow.svg', 'two-level nested U²-Net architecture')}
                        {renderSkill('/OpenCV.png', 'OpenCV morphological mask refinement')}
                        {renderSkill('/tensorflow.svg', 'low-power autonomous object detection')}
                        {renderSkill('/icons8-java.png', 'MVVM Clean Architecture & Repository pattern')}
                        {renderSkill('/terminal.png', 'RESTful APIs & FAKE STORE REST API')}
                        {renderSkill('/terminal.png', 'API uptime & rate limiting')}
                        {renderSkill('/github.png', 'CI/CD & modular codebase')}
                        {renderSkill('/Redis-Logo.svg', 'Redis rate limiting & caching layer')}
                        {renderSkill('/icons8-java.png', 'Caffeine & resilience4j')}
                        {renderSkill('/docker-mark-ocean-blue.svg', 'multi-stage Docker builds & containerizing')}
                        {renderSkill('/icons8-python.png', 'data preprocessing')}
                        {renderSkill('/terminal.png', 'offline functionality')}
                        {renderSkill('/canlii.svg', 'CanLII (Legal Data Retrieval)')}
                        {renderSkill('/pdfplumber.svg', 'pdfplumber')}
                    </div>
                </HolographicCard>
                </motion.div>

                {/* 6. Open-Source Contributions */}
                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                <HolographicCard>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--accent-color)' }}>Open-Source Contributions</h3>
                    <div className="skills-grid">
                        {renderSkill('/vllm.png', 'vLLM (llm-d ecosystem)')}
                        {renderSkill('/vllm.png', 'Energy-Aware Endpoint Picker Plugin (EPP)')}
                        {renderSkill('/go.svg', 'Multi-Objective Routing Engine')}
                        {renderSkill('/terminal.png', 'eBPF Telemetry & DCGM / RAPL metrics')}
                        {renderSkill('/kubernetes.png', 'Kubernetes 1.35 cgroup v1 deprecation')}
                        {renderSkill('/kubernetes.png', 'SIG Apps upstream maintainers')}
                        {renderSkill('/kubernetes.png', 'SIG Cluster Lifecycle (kubespray)')}
                        {renderSkill('/kubernetes.png', 'LeaderWorkerSet (LWS) controller fixes')}
                        {renderSkill('/go.svg', 'Go controller-runtime patches')}
                        {renderSkill('/github.png', 'CNCF Open Source Workflow')}
                        {renderSkill('/terminal.png', 'Kubernetes Enhancement Proposals (KEPs)')}
                        {renderSkill('/terminal.png', 'Unit / Integration / E2E Testing')}
                        {renderSkill('/terminal.png', 'Ginkgo & Gomega test frameworks')}
                        {renderSkill('/github.png', 'Code Review & PR collaboration')}
                    </div>
                </HolographicCard>
                </motion.div>

                {/* 6. Live Engineering Intelligence */}
                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 className="title" style={{ textAlign: 'center', marginBottom: '3rem', marginTop: '4rem' }}>Live Engineering Intelligence</h2>
                    <GitHubStats />
                </motion.div>

            </div>
        </main>
    );
}