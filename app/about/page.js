"use client";

import Image from 'next/image';
import SolarSystemBackground from '@/components/SolarSystemBackground';
import HolographicCard from '@/components/HolographicCard';
import SkillConstellation from '@/components/SkillConstellation';
import VisibilityWrapper from '@/components/VisibilityWrapper';

export default function About() {
    const experiences = [
        {
            company: "Kubernetes (Official)",
            role: "Open-Source Contributor & Developer, SIG Apps & SIG Cluster Lifecycle",
            date: "Feb 2026 - Present · 2 mos",
            location: "Remote",
            logo: "/kubernetes.png",
            bullets: [
                "SIG Apps (LWS) & SIG Cluster Lifecycle (kubespray) Team. Most recently contributed to LeaderWorkerSet (LWS), a Kubernetes SIG Apps–associated open-source project for managing groups of pods as a single unit of replication, designed for AI/ML inference workloads such as multi-host LLM serving. Worked on controller-level fixes in the Go codebase."
            ],
            skills: ["Golang (Go 1.25)", "Ansible", "Git", "Go Modules", "Go Code Generation", "Structured Logging (klog/v2, zap)", "Concurrent Programming", "CRDs & Controller-Runtime", "Kubernetes API Design", "Client-Go", "Admission Webhooks", "Kubebuilder", "RBAC", "Docker & Containerization", "Helm", "Kustomize", "Makefile Automation", "GitHub Actions", "Google Cloud Build (GCB)", "KIND (Kubernetes in Docker)", "Dependabot", "Leader-Worker Pattern", "GPU/TPU Accelerator Support", "Gang Scheduling & Volcano Integration", "Stateful Workload Orchestration", "Kubernetes Enhancement Proposals (KEPs)", "Unit / Integration / E2E Testing", "Ginkgo & Gomega", "Code Coverage (Goveralls)", "Static Analysis & Security Auditing", "Hugo & Genref", "Ansible Core", "Jinja2 & jmespath", "Inventory Validation", "Cluster Lifecycle (kubeadm)", "Control Plane Management (etcd, kubelet)", "Container Runtimes (containerd)", "CNI (Calico, Cilium, Flannel)", "Linux System Engineering (cgroups v1/v2)", "systemd", "GitLab CI", "Vagrant & Terraform", "Python", "Root Cause Analysis", "CNCF Open Source Workflow", "Open Source Contribution"]
        },
        {
            company: "Deel",
            role: "Machine Learning Research Assistant",
            date: "Nov 2025 - Present · 5 mos",
            location: "Remote",
            logo: "/deel.jpeg",
            bullets: [
                "Built a scalable legal-data RAG pipeline using Python and Selenium to automate the ingestion of 10,000+ CanLII case law documents into a Pinecone vector database, implementing structure-aware semantic chunking that reduced manual data curation time by 15 hours/week and LLM hallucination rates by 30% over baseline GPT-4 implementation.",
                "Developed a Random Forest classifier on 1260+ annotated employment-law cases to predict worker classification with 95% accuracy, leveraging Gini feature importance to provide legal interpretability for Sagaz test factors.",
                "Containerized RAG services and FastAPI using multi-stage Docker builds for deployment on Azure Kubernetes Cluster, ensuring 99.5% uptime through automated GitHub Actions CI/CD and liveness/readiness probes."
            ],
            skills: ["Python", "Machine Learning", "Gemini Embeddings", "RAG (Retrieval-Augmented Generation)", "scikit-learn", "Random Forest Classifier", "Model Evaluation", "Pinecone Vector Database", "Selenium", "BeautifulSoup4", "PyMuPDF", "pdfplumber", "pandas", "numpy", "Synthetic Data Generation", "FastAPI", "Uvicorn", "Python asyncio", "Pydantic", "python-dotenv", "tenacity", "Docker", "Docker Compose", "Kubernetes (K8s/AKS)", "GitHub Actions CI/CD", "Azure", "pytest", "pytest-asyncio", "System Integration Testing", "Canadian Employment Law", "CanLII", "Worker Classification (Sagaz Test)"]
        },
        {
            company: "Queen’s AutoDrive Team",
            role: "CAN Lead & Embedded System Engineer",
            date: "Aug 2025 - Present · 8 mos",
            location: "Kingston, Ontario, Canada",
            logo: "/autodrive.png",
            bullets: [
                "Member of the Queen’s AutoDrive Embedded Systems Subteam. Designing an SAE Level-4 autonomous vehicle as part of the SAE & GM AutoDrive Challenge II competition by 2026.",
                "Architected and implemented a multi-threaded ROS2 C++ node integrating CAN messaging library with DBC parsing on an on-vehicle computing cluster (Raspberry Pi 5 + Central Compute) for an SAE Level 4 Autonomous Vehicle (Chevrolet Bolt), enabling real-time vehicle control commands (steering, braking, propulsion) of 100+ vehicle control signals with 10-50ms cyclic transmission rates across 4 isolated CAN networks (High-Speed, Chassis Expansion, Low-Speed, and Scoring CAN).",
                "Implemented ISO-TP diagnostic messaging system with XML-driven configuration, reducing diagnostic request setup time by 85% through automated signal encoding and protection value calculation.",
                "Developed lock-free MPMC queue-based signal routing system supporting 200+ concurrent CAN signals with zero-copy data transfer between ROS topics and vehicle networks, achieving sub-2 ms end-to-end latency.",
                "Built state machine framework with rolling counter protection and CRC validation for safety-critical messages (0x2CB, 0x315, 0x337), ensuring ISO 26262 ASIL-D compliance."
            ],
            skills: ["Concurrent Programming/Multi-threading", "CI/CD Pipelines", "Engine Control Unit (ECU)", "Docker", "Embedded C/C++", "ROS2 (Robot Operating System)", "Raspberry Pi", "V2X", "RTOS", "SELinux", "Linux Device Driver", "V2V", "Controller Area Network (CAN) Protocol", "Hardware Integration/Interfacing (Intrepid Control Systems APIs, libicsneo)", "Signal Processing", "Signal Encoding/Decoding", "Git", "Git Version Control & Submodules", "Embedded Systems", "Control Systems Design", "Wireshark", "Object-Oriented Design", "Object-Oriented Programming (OOP)", "CMake and Build Systems", "Fast / Asynchronous Systems Logging", "XML Parsing", "DBC (CAN Database) Parsing", "Bit-level Manipulation (Masking, Bit-shifting, Endianness)", "High-Performance Logging & Formatting (spdlog, fmt)", "Unit Testing & Behavior Verification", "Concurrent Data Structures (MPMCQueue)", "Thread-safe, Lock-free Programming"]
        },
        {
            company: "Engineering Society of Queen's University",
            role: "Sci '26 Vice-President, Equity Officer & ECE Discipline Club Treasurer",
            date: "Sep 2024 - Present · 1 yr 7 mos",
            location: "Kingston, Ontario, Canada",
            logo: "/engsoc.png",
            bullets: [
                "[Sci '26 VP]: Co-lead and manage a team of 12 executives for the Class of 2026, overseeing event planning for 800+ students while guiding strategic policy initiatives, advocating for student interests in Faculty Board meetings.",
                "Represent Sci ’26/Class of 2026 as a voting member of the Engineering Society (EngSoc) Council to ensure Sci ’26 voices are heard in key governance decisions affecting the 3,000+ engineering student body.",
                "[Equity Officer]: Embedded EDII-AS (Equity, Diversity, Inclusion, Indigeneity, Accessibility, Sustainability) principles into governance frameworks, policy development, and student leadership initiatives to ensure equitable processes across elections, awards, and council operations.",
                "[ECE Treasurer]: Served as ECE Discipline Treasurer managing a $19,000 operating budget, yielding a 30% increase in utilization efficiency. Managed all financial reporting, banking, reimbursement operations, and attained a balanced budget and a $9,000 net surplus by year-end."
            ],
            skills: ["Team Leadership", "Stakeholder Engagement", "Logistics Coordination", "Public Speaking", "Student Advocacy", "Strategic Communications", "Project Management", "Stakeholder Management", "Policy Analysis and Governance", "Event Planning & Management", "Equity, Diversity & Inclusion (EDI/EDII-AS)", "Financial Reporting & Analysis", "Process Optimization & Tools Proficiency", "Revenue Growth & Fundraising", "Budget Management & Financial Stewardship", "Stakeholder Communication & Vendor Management", "Cost Reduction Strategies & Strategic Financial Planning", "Grant Writing & Sponsorship Acquisition", "Governance"]
        },
        {
            company: "Queen's High-Performance Computing",
            role: "Co-Founder, COO, HR Lead & Financial Lead",
            date: "Dec 2023 - Present · 2 yrs 4 mos",
            location: "Kingston, Ontario, Canada",
            logo: "/qhpc.png",
            bullets: [
                "Co-founded the first-ratified HPC club at Queen's and established its training and internal competition structural framework, helping students prepare for international Student Cluster Competitions (IndySCC/SCC).",
                "Delivered tutorials and workshops on HPC fundamentals, including cluster architectures (Frontenac), Linux system administration, parallelization (MPI/OpenMP), and benchmarking (HPL, HPCG, LAMMPS, Phasta).",
                "Implemented a 'Sprint' learning model with 4-week project cycles focused on distributed systems, Linux performance monitoring, and application tuning, creating lasting documentation for 40+ members.",
                "[HR Lead]: Led end-to-end recruitment cycle for the 2026-27 executive team using Breezy HR, conducting structured interviews and preparing relevant documentation for 20+ shortlisted candidates and ensuring EDII-AS policy compliance.",
                "[Financial/Sponsorships Lead]: Managed a $10,000+ operating budget preparing 40+ members to compete at SC25/SC26 and secured $10,000+ in funding from partners like Dell and Queen’s Centre for Advanced Computing. Automated purchasing analysis and optimized supply logistics using Excel-based workflow analysis, reducing procurement cycle time by 20% and 15% in overall expenses.",
                "Orchestrated the assembly and configuration of an 8-node Raspberry Pi cluster, configuring DHCP/TFTP for network boot and NFS for shared scratch disk management.",
                "Designed and developed 'travelExpenseTracker', an Android finance app with SQLite-backed authentication and real-time spending analytics using MPAndroidChart for competition teams."
            ],
            skills: ["High-Performance Computing (HPC)", "HPC Fundamentals", "Cluster Architectures", "Linux System Administration", "Parallel Programming (MPI, OpenMP)", "Benchmarking (HPL, HPCG, LAMMPS, Phasta)", "Slurm Job Scheduling", "Shell Scripting & Automation (Bash, Python)", "Cluster Computing", "Parallel Processing & Distributed Systems", "Vim", "Resource Optimization & Power Management", "GPU-Accelerated Computing (NVIDIA L4)", "Heterogeneous Computing", "Network Boot (TFTP, NFS)", "Raspberry Pi Clustering", "Parallel SSH (pdsh)", "Batch Scheduling", "Resource Optimization", "Project Management", "Breezy HR & Recruitment", "EDII-AS Governance", "Budget Management ($10,000+)", "Grant Writing & Sponsorship Acquisition", "Stakeholder Engagement", "Event Planning & Management", "Logistics Coordination", "Strategic Communications", "Android Development (Kotlin/Java)", "SQLite", "MPAndroidChart", "Financial Software Development", "Expense Tracking Automation", "Git"]
        },
        {
            company: "Engineering Student Societies' Council of Ontario",
            role: "FYIC Webmaster",
            date: "Mar 2025 - Dec 2025 · 10 mos",
            location: "Kingston, Ontario, Canada",
            logo: "/essco.png",
            bullets: [
                "Spearheaded the end-to-end development, maintenance, optimization, and deployment of the official First Year Integration Conference (FYIC) website for over 18+ universities.",
                "Built a responsive, server-side rendered application using Next.js 15 and Tailwind CSS, achieving sub-second page load speeds and a 95+ Google Lighthouse performance score.",
                "Architected a robust GitHub Actions workflow to automate type-checking, linting, and zero-downtime production deployments to Vercel, reducing release cycles by 60%.",
                "Implemented automated vulnerability scanning within the CI pipeline to detect and patch critical CVEs in React Server Components.",
                "Integrated UserWay’s AI-powered accessibility widget to ensure WCAG 2.1 AA compliance."
            ],
            skills: ["Next.js 15 (App Router)", "React 18", "TypeScript 5.8", "Client/Server Architecture", "Tailwind CSS 3", "Material Tailwind", "Responsive & Mobile-First Design", "Framer Motion", "GSAP", "Three.js", "React Three Fiber", "Canvas Confetti", "Lucide & Heroicons", "Next.js API Routes", "Nodemailer (SMTP)", "React Hook Form", "Environment Variable Management", "Node.js Scripting (Sharp)", "Image Optimization (WebP)", "Bundle Size Optimization", "GitHub Actions (CI/CD)", "PostCSS & Autoprefixer", "ESLint", "Modular Component Design", "SEO Best Practices", "Software Lifecycle Management", "Git", "npm", "CI/CD Pipelines", "UI/UX Design", "WCAG Accessibility"]
        },
        {
            company: "Queen's University Web Development - QWeb",
            role: "Full Stack Developer",
            date: "Sep 2024 - Apr 2025 · 8 mos",
            location: "Kingston, Ontario, Canada",
            logo: "/qweb.png",
            bullets: [
                "Designed and deployed a scalable full-stack e-learning platform using React.js, Node.js, Express.js, and MongoDB — serving 100+ monthly active users; managed state with Context API and leveraged Mongoose schemas for data modeling.",
                "Improved front-end performance through React.js optimizations like lazy loading and memoization, reducing page render times by 15% for critical user workflows.",
                "Built RESTful APIs with Node.js, Express.js, and MongoDB to handle CRUD operations, JWT-based authentication, and data aggregation for client projects, improving database query efficiency through efficient indexing and pipeline optimizations.",
                "Collaborated with 4 project designers and developers in Agile teams to build client websites, resolving 95% of identified bugs pre-deployment via automated testing (Jest); implemented Jest unit and integration tests for front-end components and back-end endpoints (via Supertest).",
                "Built responsive, WCAG-compliant UIs by translating Figma mocks into responsive, semantically structured React components with ARIA attributes and CSS modules; delivered full keyboard navigation and color contrast compliance.",
                "Streamlined development workflows using Git and managed CI/CD pipelines via Bitbucket, enabling seamless collaboration across 2 cross-functional teams (UI/UX designer & developer teams).",
                "Containerized the application using Docker and deployed it to AWS Fargate for scalable, production-grade hosting, reducing hosting costs by 30% through efficient container orchestration and RDS configurations."
            ],
            skills: ["React.js", "Express.js", "RESTful APIs", "RESTful API Development", "CI/CD Pipelines", "Docker", "Jira & Atlassian Integration", "UI/UX Design", "WCAG Accessibility", "Amazon Web Services (AWS)", "Automated Testing (Jest/Supertest)", "MongoDB (Mongoose)", "Full Stack Development (MERN Stack)", "Node.js", "Agile Methodologies", "Stakeholder Management", "React.js (Context API)", "Git", "Figma", "JWT Authentication", "AWS ECS", "Containerization", "Performance Optimization (Lazy Loading, Memoization)", "Scalable System Architecture"]
        },
        {
            company: "Freelancer.com",
            role: "Android App Development Freelancer",
            date: "May 2024 - Aug 2024 · 4 mos",
            location: "Remote",
            logo: "/freelancer.jfif",
            bullets: [
                "Developed, designed, and delivered a feature-rich prototype e-commerce Android application (ChillnCharm) as a proof-of-concept for over 50 products.",
                "Leveraged MVVM architecture, the Repository pattern, and Clean Architecture to build a modular, scalable, and maintainable SDK codebase.",
                "Integrated remote and local data sources, using Retrofit to access the FAKE STORE API, retrieving over 50 product listings, and ROOM Database for local storage, achieving a 25% faster load time for cached content compared to API calls in benchmark testing.",
                "Created an intuitive and engaging UI that improved the shopping experience, including product search across 5+ categories, comprehensive cart management, and wish list persistence.",
                "Successfully completed and delivered the demo freelance project within deadlines, demonstrating strong project management skills and adaptability to clients' evolving requirements."
            ],
            skills: ["Android Development (Kotlin/Java)", "MVVM Architecture", "Clean Architecture", "Repository Pattern", "Retrofit & RESTful APIs", "ROOM Database", "Local Data Caching & Performance Optimization", "Jetpack Components", "Figma", "Stakeholder Management", "Agile Methodologies", "Git", "Project Management & Client Collaboration"]
        },
        {
            company: "Foresoon Computer Engineering Co. Ltd.",
            role: "Electrical & Robotics Engineer Assistant",
            date: "Aug 2023 - Sep 2023 · 2 mos",
            location: "Hong Kong SAR",
            bullets: [
                "Assisted in designing and implementing an assistive robotic feeding system integrating a Kinova Gen3 6-DOF collaborative arm onto a Clearpath Jackal UGV to autonomously transfer spoon-held food to physically disabled users.",
                "Developed a computer vision pipeline using Python OpenCV and ArUco markers to estimate 3D poses of food items for real-time trajectory offsets.",
                "Co-designed a modular ROS-based state machine to coordinate autonomous workflows with manual joystick overrides.",
                "Learned to implement Cartesian impedance controller integrating joint torque sensing for force-limited manipulation."
            ],
            skills: ["Embedded C/C++", "ROS2", "SOLIDWORKS", "Python", "Git", "Embedded Systems", "Control Systems Design", "Robot Operating System (ROS)"]
        },
        {
            company: "Arista Networks",
            role: "Project Financial Management Intern",
            date: "May 2023 - Aug 2023 · 4 mos",
            location: "Hong Kong SAR",
            logo: "/arista.png",
            bullets: [
                "Conducted financial modeling & viability analysis using Excel to support data-driven decision-making for $2 million worth of client pilot and internal automation portfolios.",
                "Designed real-time tracking dashboards in Power BI and flagged $150K+ in potential overruns on 6 active projects in SAP S/4HANA.",
                "Proposed and prototyped a Power Automate + SharePoint Dataverse workflow to streamline data collection, improving turnaround time by 20%."
            ],
            skills: ["SAP S/4HANA", "Microsoft Power BI", "Process Optimization", "Microsoft Power Automate", "Budget Management", "Project Management", "SharePoint/Dataverse"]
        },
        {
            company: "Queen's Relectric Car Team",
            role: "Design Engineer",
            date: "Jan 2023 - May 2023 · 5 mos",
            location: "Kingston, Ontario, Canada",
            logo: "/relectric.jpg",
            bullets: [
                "Designed a liquid-cooled battery enclosure for a 16 LiFePO4 batteries battery management system (BMS) in a Jeep TJ conversion.",
                "Modeled a 360mm × 637.5mm × 250mm aluminum 2024 alloy enclosure with SolidWorks, integrating copper tubing (10mm diameter) for heat dissipation.",
                "Conducting thermodynamic simulations and automating coolant pump activation via relay control to reduce thermal spikes by 40% compared to passive cooling."
            ],
            skills: ["Mathematical Modeling", "Embedded C/C++", "Arduino", "Thermal Modeling", "SOLIDWORKS", "Git", "Embedded Systems"]
        }
    ];

    const education = [
        {
            institution: "Queen's University / Stephen J. R. Smith Faculty of Engineering and Applied Science",
            degree: "Bachelor of Applied Science - BASc, Computer Engineering",
            date: "Sep 2022 - May 2026",
            logo: "/queens_university.png",
            skills: ["Circuit Analysis", "Mathematical Modeling", "C (Programming Language)", "Field-Programmable Gate Arrays (FPGA)", "LTSpice", "Verilog", "VHDL", "Logic Design", "Machine Learning"]
        },
        {
            institution: "Pierre Elliott Trudeau High School",
            degree: "High School Diploma",
            date: "Sep 2018 - Jun 2022",
            logo: "/peths.jpg",
            bullets: ["Top 6 Admission Average: 93% (English, Advanced Functions, Calculus and Vectors, Physics, Chemistry, and Mandarin)"],
            skills: ["Arduino", "Fritzing", "Python", "Raspberry Pi", "Java"]
        }
    ];

    const certifications = [
        {
            name: "WHMIS 2015",
            issuer: "Queen's University",
            date: "Issued Feb 2023",
            logo: "/queens_university.png"
        },
        {
            name: "Occupational Health and Safety Awareness and Training Certificate",
            issuer: "Queen's University",
            date: "Issued Feb 2023",
            logo: "/queens_university.png"
        }
    ];

    const renderSkill = (img, label) => (
        <div className="skill-tag">
            <img src={img} alt={label} />
            <span>{label}</span>
        </div>
    );

    return (
        <main className="section container" style={{ paddingTop: '8rem', position: 'relative' }}>
            <SolarSystemBackground />

            {/* HERO ABOUT SECTION */}
            <HolographicCard data-aos="fade-up" data-aos-duration="1000" style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center', marginBottom: '4rem' }}>
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
            </HolographicCard>

            {/* EXPERIENCE SECTION */}
            <h2 className="title" style={{ fontSize: '2.5rem', marginTop: '2rem', textAlign: 'center' }} data-aos="zoom-in">Experience</h2>
            <p className="subtitle" style={{ margin: '0 auto 3rem auto', textAlign: 'center' }} data-aos="fade-up" data-aos-delay="100">
                My professional journey engineering open-source architectures, robust scalable platforms, and advanced high-performance solutions.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '6rem' }}>
                {experiences.map((exp, idx) => (
                    <HolographicCard key={idx} data-aos="fade-up" data-aos-delay={(idx % 3) * 100} style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

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
                ))}
            </div>

            {/* EDUCATION SECTION */}
            <h2 className="title" style={{ fontSize: '2.5rem', marginTop: '2rem', textAlign: 'center' }} data-aos="zoom-in">Education & Certifications</h2>
            <p className="subtitle" style={{ margin: '0 auto 3rem auto', textAlign: 'center' }} data-aos="fade-up" data-aos-delay="100">
                Academic background, continuous learning, and official certifications.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '6rem' }}>
                {education.map((edu, idx) => (
                    <HolographicCard key={`edu-${idx}`} data-aos="fade-up" data-aos-delay={(idx % 3) * 100} style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

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
                ))}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                    {certifications.map((cert, idx) => (
                        <HolographicCard key={`cert-${idx}`} data-aos="fade-up" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flex: '1 1 300px' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '8px', background: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2px' }}>
                                <img src={cert.logo} alt={`${cert.issuer} Logo`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; }} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: '0 0 0.2rem 0', fontWeight: 600 }}>{cert.name}</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>{cert.issuer} • {cert.date}</p>
                            </div>
                        </HolographicCard>
                    ))}
                </div>
            </div>

            {/* SKILLS SECTION */}
            <h2 className="title" style={{ fontSize: '2.5rem', textAlign: 'center' }} data-aos="zoom-in" data-aos-delay="100">Technical Arsenal</h2>
            <p className="subtitle" style={{ margin: '0 auto 3rem auto', textAlign: 'center' }} data-aos="fade-up" data-aos-delay="200">
                A comprehensive overview of the tools, languages, and frameworks that power my workflows.
            </p>

            <div style={{ height: '600px', width: '100%', marginBottom: '2rem' }}>
                <VisibilityWrapper height="600px">
                    <SkillConstellation />
                </VisibilityWrapper>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', margin: '0 auto' }}>

                {/* 1. Languages, Frameworks, and Libraries */}
                <HolographicCard data-aos="fade-up">
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--accent-color)' }}>Languages, Frameworks, and Libraries</h3>
                    <div className="skills-grid">
                        {renderSkill('/icons8-html.png', 'HTML5')}
                        {renderSkill('/icons8-css3.png', 'CSS')}
                        {renderSkill('/icons8-javascript.png', 'JavaScript (JS)')}
                        {renderSkill('/typescript.svg', 'TypeScript 5.8')}
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
                    </div>
                </HolographicCard>

                {/* 2. Developer Tools & Workflows */}
                <HolographicCard data-aos="fade-up" data-aos-delay="100">
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
                        {renderSkill('/jupyter.png', 'Jupyter')}
                        {renderSkill('/grafana.svg', 'Grafana')}
                        {renderSkill('/postman.svg', 'Postman')}
                        {renderSkill('/mysql_workbench.png', 'MySQL Workbench')}
                        {renderSkill('/Slurm_logo.svg', 'Slurm & Bash')}
                        {renderSkill('/zephyr_rtos.svg', 'Zephyr RTOS')}
                        {renderSkill('/CAN_Logo.svg', 'CAN / ISO-TP')}
                        {renderSkill('/ISO_26262_ASIL_D.png', 'ISO 26262 (ASIL-D)')}
                        {renderSkill('/Google_Lighthouse_logo.svg', 'Google Lighthouse')}
                        {renderSkill('/wcag-2.1-aa-logo.svg', 'WCAG 2.1 AA')}
                        {renderSkill('/agile.jpg', 'Agile')}
                        {renderSkill('/Scrum-icon.jpg', 'Scrum')}
                        {renderSkill('/sdlc.png', 'SDLC')}

                        {renderSkill('/microsoft-365.png', 'Office 365')}
                    </div>
                </HolographicCard>

                {/* 3. Databases and Cloud Architectures */}
                <HolographicCard data-aos="fade-up" data-aos-delay="200">
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

                {/* 4. Hardware, Systems & Networking */}
                <HolographicCard data-aos="fade-up" data-aos-delay="300">
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

                {/* 5. Software Engineering & MLOps Concepts */}
                <HolographicCard data-aos="fade-up" data-aos-delay="400">
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
                        {renderSkill('/cvzone.webp', 'two-level nested U²-Net architecture')}
                        {renderSkill('/OpenCV.png', 'OpenCV morphological mask refinement')}
                        {renderSkill('/cvzone.webp', 'low-power autonomous object detection')}
                        {renderSkill('/icons8-java.png', 'MVVM Clean Architecture & Repository pattern')}
                        {renderSkill('/terminal.png', 'RESTful APIs & FAKE STORE REST API')}
                        {renderSkill('/terminal.png', 'API uptime & rate limiting')}
                        {renderSkill('/github.png', 'CI/CD & modular codebase')}
                        {renderSkill('/Redis-Logo.svg', 'Redis rate limiting & caching layer')}
                        {renderSkill('/icons8-java.png', 'Caffeine & resilience4j')}
                        {renderSkill('/docker-mark-ocean-blue.svg', 'multi-stage Docker builds & containerizing')}
                        {renderSkill('/icons8-python.png', 'data preprocessing')}
                        {renderSkill('/terminal.png', 'offline functionality')}
                    </div>
                </HolographicCard>

            </div>
        </main>
    );
}
