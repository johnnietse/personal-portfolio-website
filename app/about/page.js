"use client";

import Image from 'next/image';

export default function About() {
    const experiences = [
        {
            company: "Kubernetes (Official)",
            role: "Open-Source Contributor & Developer, SIG Apps & SIG Cluster Lifecycle",
            date: "Feb 2026 - Present",
            bullets: [
                "Contributed to LeaderWorkerSet (LWS), a Kubernetes SIG Apps–associated open-source project for managing groups of pods as a single unit of replication, designed for AI/ML inference workloads such as multi-host LLM serving.",
                "Worked on controller-level fixes in the Go codebase for SIG Apps (LWS) & SIG Cluster Lifecycle (kubespray)."
            ],
            skills: ["Go", "Kubernetes", "Linux", "Docker", "Open Source Contribution"]
        },
        {
            company: "Deel",
            role: "Machine Learning Research Assistant",
            date: "Nov 2025 - Present",
            bullets: [
                "Built a scalable legal-data RAG pipeline using Python and Selenium to automate the ingestion of 10,000+ CanLII case law documents into a Pinecone vector database.",
                "Implemented structure-aware semantic chunking that reduced manual data curation time by 15 hours/week and LLM hallucination rates by 30% over baseline GPT-4.",
                "Developed a Random Forest classifier on 1260+ annotated employment-law cases to predict worker classification with 95% accuracy, leveraging Gini feature importance.",
                "Containerized RAG services and FastAPI using multi-stage Docker builds for deployment on Azure Kubernetes Cluster, ensuring 99.5% uptime through automated CI/CD."
            ],
            skills: ["Python", "Selenium", "RAG", "Machine Learning", "FastAPI", "Docker", "Kubernetes"]
        },
        {
            company: "Queen’s AutoDrive Team",
            role: "CAN Lead & Embedded System Engineer",
            date: "Aug 2025 - Present",
            bullets: [
                "Architected and implemented a multi-threaded ROS2 C++ node integrating CAN messaging library with DBC parsing on an on-vehicle computing cluster (Raspberry Pi 5 + Central Compute) for an SAE Level 4 Autonomous Vehicle (Chevrolet Bolt).",
                "Enabled real-time vehicle control commands of 100+ vehicle control signals with 10-50ms cyclic transmission rates across 4 isolated CAN networks.",
                "Implemented ISO-TP diagnostic messaging system reducing diagnostic request setup time by 85% through automated signal encoding.",
                "Developed lock-free MPMC queue-based signal routing system supporting 200+ concurrent CAN signals with zero-copy data transfer between ROS topics, achieving sub-2 ms end-to-end latency.",
                "Built state machine framework ensuring ISO 26262 ASIL-D compliance for autonomous driving functions."
            ],
            skills: ["C/C++", "ROS2", "CAN", "Embedded Systems", "Linux Device Driver", "RTOS", "Raspberry Pi"]
        },
        {
            company: "Engineering Student Societies' Council of Ontario",
            role: "FYIC Webmaster",
            date: "Mar 2025 - Dec 2025",
            bullets: [
                "Spearheaded the end-to-end development, maintenance, optimization, and deployment of the official First Year Integration Conference (FYIC) website for over 18+ universities.",
                "Built a responsive, server-side rendered application using Next.js 15 and Tailwind CSS, achieving sub-second page load speeds and a 95+ Google Lighthouse performance score.",
                "Architected a robust GitHub Actions workflow to automate type-checking, linting, and zero-downtime production deployments to Vercel, reducing release cycles by 60%.",
                "Implemented automated vulnerability scanning within the CI pipeline to detect and patch critical CVEs in React Server Components.",
                "Integrated UserWay’s AI-powered accessibility widget to ensure WCAG 2.1 AA compliance."
            ],
            skills: ["Next.js", "Tailwind CSS", "React.js", "Node.js", "CI/CD Pipeline", "UI/UX Accessibility (WCAG)"]
        },
        {
            company: "Queen's High-Performance Computing",
            role: "Co-Founder / COO",
            date: "Dec 2023 - Present",
            bullets: [
                "Co-founded the first-ratified HPC club at Queen's and established its training/internal competition structural framework.",
                "Delivered tutorials and workshops on HPC fundamentals, including cluster architectures, Linux system administration, parallelization (MPI/OpenMP), and benchmarking.",
                "Managed, developed, and maintained a $10,000+ budget for a high-performance computing team of 40+ members preparing to compete at the international Student Cluster Competitions (SC24/SC25).",
                "Led the club's sponsorship initiatives by managing a team of sponsorships coordinators, successfully securing $10,000+ in funding through personalized outreach.",
                "Designed an Android expense tracking app for competition team members to consistently track travel expenses and export statements."
            ],
            skills: ["HPC", "Cluster Computing", "OpenMPI", "Shell Scripting", "Batch Scheduling", "Android Development"]
        },
        {
            company: "Queen's University Web Development - QWeb",
            role: "Full Stack Developer",
            date: "Sep 2024 - Apr 2025",
            bullets: [
                "Designed and deployed a scalable full-stack e-learning platform using React.js, Node.js, Express.js, and MongoDB — serving 100+ monthly active users.",
                "Improved front-end performance through React.js optimizations like lazy loading and memoization, reducing page render times by 15%.",
                "Built RESTful APIs handling CRUD operations, JWT-based authentication, and data aggregation for client projects.",
                "Containerized the application using Docker and deployed it to AWS Fargate for scalable, production-grade hosting, reducing hosting costs by 30%."
            ],
            skills: ["React.js", "Node.js", "MongoDB", "Express.js", "Docker", "AWS", "RESTful APIs"]
        },
        {
            company: "Freelancer.com",
            role: "Android App Development Freelancer",
            date: "May 2024 - Aug 2024",
            bullets: [
                "Developed, designed, and delivered a feature-rich prototype e-commerce Android application (ChillnCharm) as a proof-of-concept for over 50 products.",
                "Leveraged MVVM architecture, the Repository pattern, and Clean Architecture to build a modular, scalable SDK codebase.",
                "Integrated remote/local data sources using Retrofit (FAKE STORE API) and ROOM Database mapped caches, achieving 25% faster load times."
            ],
            skills: ["Android Studio", "Kotlin/Java", "MVVM Pattern", "Retrofit", "RESTful APIs", "ROOM Database"]
        },
        {
            company: "Foresoon Computer Engineering Co. Ltd.",
            role: "Electrical & Robotics Engineer Assistant",
            date: "Aug 2023 - Sep 2023",
            bullets: [
                "Assisted in designing and implementing an assistive robotic feeding system integrating a Kinova Gen3 6-DOF arm onto a Clearpath Jackal UGV for physically disabled users.",
                "Developed a computer vision pipeline using Python OpenCV and ArUco markers to estimate 3D poses of food items for real-time trajectory offsets.",
                "Co-designed a modular ROS-based state machine to coordinate autonomous workflows with manual joystick overrides."
            ],
            skills: ["Embedded C/C++", "ROS2", "Python", "Computer Vision", "SolidWorks"]
        },
        {
            company: "Arista Networks",
            role: "Project Financial Management Intern",
            date: "May 2023 - Aug 2023",
            bullets: [
                "Conducted financial modeling & viability analysis using Excel to support data-driven decision-making for $2 million worth of client pilot and internal automation portfolios.",
                "Designed real-time tracking dashboards in Power BI and flagged $150K+ in potential overruns on 6 active projects in SAP S/4HANA.",
                "Proposed and prototyped a Power Automate + SharePoint Dataverse workflow to streamline data collection, improving turnaround time by 20%."
            ],
            skills: ["SAP S/4HANA", "Microsoft Power BI", "Power Automate", "Financial Modeling", "Data Analytics"]
        },
        {
            company: "Engineering Society of Queen's University",
            role: "Sci '26 Vice-President & ECE Discipline Club Treasurer",
            date: "Sep 2024 - Present",
            bullets: [
                "Manage a team of 12 executives for the Class of 2026, overseeing event planning for 800+ students while guiding strategic policy initiatives.",
                "Represent Sci ’26 as a voting member of the Engineering Society Council directly dictating governance for 3,000+ students.",
                "Served as ECE Discipline Treasurer managing a $19,000 operating budget, yielding a 30% increase in utilization efficiency and finishing with a $9,000 net surplus."
            ],
            skills: ["Leadership", "Governance", "Budget Management", "Public Speaking", "Agile Project Management"]
        }
    ];

    const renderSkill = (img, label) => (
        <div className="skill-tag">
            <img src={img} alt={label} />
            <span>{label}</span>
        </div>
    );

    return (
        <main className="section container" style={{ paddingTop: '8rem' }}>

            {/* HERO ABOUT SECTION */}
            <div className="glass-card" data-aos="fade-up" data-aos-duration="1000" style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center', marginBottom: '4rem' }}>
                <div style={{ flex: '1', minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ position: 'relative', width: '320px', height: '320px', padding: '10px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(88, 166, 255, 0.4) 0%, rgba(30, 41, 59, 0) 100%)' }}>
                        <img src="/profilephoto.png" alt="Johnnie Tse" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', border: '4px solid var(--surface-color)' }} />
                    </div>
                </div>

                <div style={{ flex: '2', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <h1 className="title" style={{ fontSize: '3rem', marginBottom: '0' }} data-aos="zoom-in" data-aos-delay="100">About Me.</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.7' }} data-aos="fade-up" data-aos-delay="200">
                        Hello! I'm Johnnie. I'm a Computer Engineering student at Queen's University with a strong passion for scalable backends, Kubernetes ecosystems, modern high-performance web applications, and autonomous embedded systems (HPC & ROS2). I focus heavily on contributing to monumental open-source architectures while pushing modern scalable limits.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.7' }} data-aos="fade-up" data-aos-delay="300">
                        In web execution, I’m focused on engineering distributed robust full-stack applications leveraging architectures within React, Next.js, and Node.js. My experiences span through creating enterprise RAG models deploying containerized infrastructure with Docker and multi-host Azure Kubernetes clusters.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.7' }} data-aos="fade-up" data-aos-delay="400">
                        Beyond the web, I architect C++ automotive applications for autonomous embedded systems via Controller Area Networks (CAN) and ROS2, while co-heading the Queen's HPC organization dictating high-performance compute architecture methodologies (MPI, Thread Networking, OpenMP, GPU scaling) for global Student Cluster Competitions.
                    </p>
                </div>
            </div>

            {/* EXPERIENCE SECTION */}
            <h2 className="title" style={{ fontSize: '2.5rem', marginTop: '2rem', textAlign: 'center' }} data-aos="zoom-in">Experience</h2>
            <p className="subtitle" style={{ margin: '0 auto 3rem auto', textAlign: 'center' }} data-aos="fade-up" data-aos-delay="100">
                My professional journey engineering open-source architectures, robust scalable platforms, and advanced high-performance solutions.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '6rem' }}>
                {experiences.map((exp, idx) => (
                    <div className="glass-card" key={idx} data-aos="fade-up" data-aos-delay={(idx % 3) * 100} style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                            <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', margin: 0, fontWeight: 800 }}>{exp.role}</h3>
                            <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 600, background: 'var(--form-bg)', padding: '0.4rem 1rem', borderRadius: '30px', border: '1px solid var(--border-color)' }}>{exp.date}</span>
                        </div>

                        <h4 style={{ fontSize: '1.2rem', color: 'var(--accent-color)', fontWeight: 600, margin: 0 }}>{exp.company}</h4>

                        <ul style={{ marginLeft: '1.5rem', color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                            {exp.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}
                        </ul>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '1rem' }}>
                            {exp.skills.map((skill, i) => (
                                <span key={i} style={{
                                    background: 'rgba(255, 255, 255, 0.02)',
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
                    </div>
                ))}
            </div>

            {/* SKILLS SECTION */}
            <h2 className="title" style={{ fontSize: '2.5rem', textAlign: 'center' }} data-aos="zoom-in" data-aos-delay="100">Technical Arsenal</h2>
            <p className="subtitle" style={{ margin: '0 auto 3rem auto', textAlign: 'center' }} data-aos="fade-up" data-aos-delay="200">
                A comprehensive overview of the tools, languages, and frameworks that power my workflows.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', margin: '0 auto' }}>

                <div className="glass-card" data-aos="fade-up">
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--accent-color)' }}>Languages, Frameworks, and Libraries</h3>
                    <div className="skills-grid">
                        {renderSkill('/icons8-html.png', 'HTML')}
                        {renderSkill('/icons8-css3.png', 'CSS')}
                        {renderSkill('/icons8-javascript.png', 'JavaScript')}
                        {renderSkill('/icons8-c-programming.png', 'C')}
                        {renderSkill('/icons8-c.png', 'C++')}
                        {renderSkill('/icons8-java.png', 'Java')}
                        {renderSkill('/Kotlin_Icon.png', 'Kotlin')}
                        {renderSkill('/icons8-python.png', 'Python')}
                        {renderSkill('/PHP-logo.png', 'PHP')}
                        {renderSkill('/sql.png', 'SQL')}
                        {renderSkill('/icons8-r-project.png', 'R')}
                        {renderSkill('/icons8-arduino.png', 'Arduino')}
                        {renderSkill('/react-logo.png', 'React.js')}
                        {renderSkill('/icons8-nodejs.png', 'Node.js')}
                        {renderSkill('/Bootstrap.png', 'Bootstrap')}
                        {renderSkill('/jquery.png', 'jQuery')}
                        {renderSkill('/Sass.png', 'SASS')}
                        {renderSkill('/mongodb.png', 'MongoDB')}
                        {renderSkill('/VHDL.png', 'VHDL')}
                        {renderSkill('/icons8-latex.png', 'LATEX')}
                        {renderSkill('/icons8-bash.png', 'Bash')}
                        {renderSkill('/terminal.png', 'Shell Scripting')}
                        {renderSkill('/asmlang.png', 'Assembly Language')}
                        {renderSkill('/icons8-git.png', 'Git')}
                        {renderSkill('/icons8-flutter.png', 'Flutter')}
                        {renderSkill('/icons8-npm.png', 'NPM')}
                        {renderSkill('/Matplotlib.png', 'Matplotlib')}
                        {renderSkill('/seaborn.png', 'Seaborn')}
                        {renderSkill('/OpenCV.png', 'OpenCV')}
                        {renderSkill('/SCIPY.png', 'SciPy')}
                        {renderSkill('/Tkinter.jpeg', 'Tkinter')}
                        {renderSkill('/Scikit_learn.png', 'Scikit-learn')}
                        {renderSkill('/NumPy.png', 'NumPy')}
                        {renderSkill('/Pandas.png', 'Pandas')}
                        {renderSkill('/Django_logo.png', 'Django')}
                    </div>
                </div>

                <div className="glass-card" data-aos="fade-up" data-aos-delay="100">
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--accent-color)' }}>Developer Tools & Workflows</h3>
                    <div className="skills-grid">
                        {renderSkill('/microsoft-365.png', 'Microsoft 365')}
                        {renderSkill('/New_Power_BI.png', 'Microsoft Power BI')}
                        {renderSkill('/Adobe_Photoshop.png', 'Adobe Photoshop')}
                        {renderSkill('/icons8-canva.png', 'Canva')}
                        {renderSkill('/Figma-logo.png', 'Figma')}
                        {renderSkill('/Fritzing_icon.png', 'Fritzing')}
                        {renderSkill('/KiCad_logo_square.png', 'KiCAD')}
                        {renderSkill('/LTSpice.jpeg', 'LTSpice')}
                        {renderSkill('/Oracle_SQL_Developer.png', 'Oracle SQL Developer')}
                        {renderSkill('/android-studio-icon.png', 'Android Studio')}
                        {renderSkill('/Visual_Studio_Code.png', 'VS Code')}
                        {renderSkill('/Intel_quartus_prime.png', 'Intel Quartus Prime')}
                        {renderSkill('/github.png', 'Github')}
                        {renderSkill('/solidworks.png', 'SolidWorks')}
                        {renderSkill('/JetBrains-logo.png', 'JetBrains Suite')}
                        {renderSkill('/jupyter.png', 'Jupyter')}
                        {renderSkill('/MySQL.png', 'MySQL')}
                        {renderSkill('/mysql_workbench.png', 'MySQL Workbench')}
                    </div>
                </div>

                <div className="glass-card" data-aos="fade-up" data-aos-delay="200">
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--accent-color)' }}>Databases and Cloud Architectures</h3>
                    <div className="skills-grid">
                        {renderSkill('/sap_s4hana.png', 'SAP S/4HANA Cloud')}
                        {renderSkill('/Oracle_database.png', 'ORACLE Database')}
                        {renderSkill('/Database-mysql.png', 'MySQL Database')}
                    </div>
                </div>

            </div>
        </main>
    );
}
