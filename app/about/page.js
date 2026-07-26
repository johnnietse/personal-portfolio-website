"use client";

import ScrollReveal from '@/components/ScrollReveal';
import Image from 'next/image';

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
        company: "vLLM",
        role: "Open Source Research Contributor | llm-d (vLLM ecosystem)",
        date: "May 2026 - Present · 2 mos",
        location: "Remote",
        logo: "/vllm.png",
        bullets: [
            "Open-source development for llm-d, a Kubernetes-native LLM serving framework, focusing on sustainable and carbon-aware AI infrastructure. Designed and engineered an Energy-Aware Endpoint Picker Plugin (EPP) to optimize token-level routing across heterogeneous hardware accelerators (e.g., H100s, L4s).",
            "Architected a Multi-Objective Routing Engine: Developed a high-performance Kubernetes Gateway API Inference Extension (GIE) sidecar in Go (v1.25), introducing a strict epsilon-constraint routing pipeline that optimizes for energy and carbon efficiency while strictly enforcing TTFT and TPOT latency SLOs.",
            "Phase-Aware Disaggregated Serving: Designed dynamic scoring models that differentiate between compute-bound prefill phases and memory-bound decode phases, actively routing requests to the most thermodynamically efficient nodes while calculating network KV-cache transfer penalties.",
            "Carbon-Aware Controller: Implemented real-time dynamic weight modulation based on grid carbon intensity (SCI standards) and cluster thermal budgets, enabling micro-spatial workload shifting during carbon spikes.",
            "High-Performance Go Engineering: Built a highly concurrent, thread-safe asynchronous eBPF telemetry ingestion plane using DCGM and RAPL metrics and Welford's Algorithm for ms-precision signal filtering. Containerized the microservice into an ultra-minimal 8.6 MB distroless image with a negligible 101 microseconds routing overhead.",
            "Kubernetes CRD Reconciliation: Designed a native client-go Informer architecture to actively reconcile InferenceObjective CRDs, allowing cluster admins to dynamically pivot between autonomous 'Carbon-Critical' and 'Load-Shedding' control states.",
            "Quantifiable Impact: Achieved an average 17.4% reduction in LLM inference energy consumption (up to 32.3% for decode-heavy workloads) compared to standard round-robin scheduling, driving significant reductions in Scope 2 and Scope 3 data center emissions."
        ],
        skills: ["Go", "Kubernetes", "vLLM", "eBPF", "Telemetry", "Distributed Systems", "Energy Optimization", "Carbon-Aware Computing", "LLM Infrastructure", "Controller-Runtime", "Multi-Objective Routing"]
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
        company: "Queen's AutoDrive Team",
        role: "CAN Lead & Embedded System Engineer",
        date: "Aug 2025 - Present · 8 mos",
        location: "Kingston, Ontario, Canada",
        logo: "/autodrive.png",
        bullets: [
            "Member of the Queen's AutoDrive Embedded Systems Subteam. Designing an SAE Level-4 autonomous vehicle as part of the SAE & GM AutoDrive Challenge II competition by 2026.",
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
            "Represent Sci '26/Class of 2026 as a voting member of the Engineering Society (EngSoc) Council to ensure Sci '26 voices are heard in key governance decisions affecting the 3,000+ engineering student body.",
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
            "[Financial/Sponsorships Lead]: Managed a $10,000+ operating budget preparing 40+ members to compete at SC25/SC26 and secured $10,000+ in funding from partners like Dell and Queen's Centre for Advanced Computing. Automated purchasing analysis and optimized supply logistics using Excel-based workflow analysis, reducing procurement cycle time by 20% and 15% in overall expenses.",
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
            "Integrated UserWay's AI-powered accessibility widget to ensure WCAG 2.1 AA compliance."
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

export default function About() {
    return (
        <main className="about-page">
            {/* HERO */}
            <ScrollReveal>
                <section className="about-hero">
                    <div className="about-hero-inner">
                        <div className="about-photo-wrap">
                            <Image src="/profilephoto.png" alt="Johnnie Tse" width={320} height={320} className="about-photo" />
                        </div>
                        <div className="about-hero-text">
                            <h1 className="hero-title">About Me.</h1>
                            <p className="hero-subtitle">
                                Hello! I'm Johnnie. I'm a Computer Engineering student at Queen's University with a strong passion for scalable backends, Kubernetes ecosystems, modern high-performance web applications, and autonomous embedded systems (HPC & ROS2). I focus heavily on contributing to monumental open-source architectures while pushing modern scalable limits.
                            </p>
                            <p className="hero-subtitle">
                                In web execution, I'm focused on engineering distributed robust full-stack applications leveraging architectures within React, Next.js, and Node.js. My experiences span through creating enterprise RAG models deploying containerized infrastructure with Docker and multi-host Azure Kubernetes clusters.
                            </p>
                            <p className="hero-subtitle">
                                Beyond the web, I architect C++ automotive applications for autonomous embedded systems via Controller Area Networks (CAN) and ROS2, while co-heading the Queen's HPC organization dictating high-performance compute architecture methodologies (MPI, Thread Networking, OpenMP, GPU scaling) for global Student Cluster Competitions.
                            </p>
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* EXPERIENCE */}
            <ScrollReveal>
                <section className="about-section">
                    <h2 className="section-head">Experience</h2>
                    <p className="section-lead">My professional journey engineering open-source architectures, robust scalable platforms, and advanced high-performance solutions.</p>

                    <div className="about-timeline">
                        {experiences.map((exp, idx) => (
                            <div key={idx} className="about-entry">
                                <div className="about-entry-header">
                                    {exp.logo && (
                                        <div className="about-entry-logo">
                                            <img src={exp.logo} alt={`${exp.company} Logo`} />
                                        </div>
                                    )}
                                    <div>
                                        <h3>{exp.role}</h3>
                                        <span className="about-date">{exp.date}</span>
                                        <h4>{exp.company} · {exp.location}</h4>
                                    </div>
                                </div>
                                <ul className="about-bullets">
                                    {exp.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}
                                </ul>
                                <div className="about-tags">
                                    {exp.skills.map((skill, i) => (
                                        <span key={i} className="about-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </ScrollReveal>

            {/* EDUCATION */}
            <ScrollReveal>
                <section className="about-section">
                    <h2 className="section-head">Education & Certifications</h2>
                    <p className="section-lead">Academic background, continuous learning, and official certifications.</p>

                    <div className="about-timeline">
                        {education.map((edu, idx) => (
                            <div key={`edu-${idx}`} className="about-entry">
                                <div className="about-entry-header">
                                    {edu.logo && (
                                        <div className="about-entry-logo">
                                            <img src={edu.logo} alt={`${edu.institution} Logo`} />
                                        </div>
                                    )}
                                    <div>
                                        <h3>{edu.degree}</h3>
                                        <span className="about-date">{edu.date}</span>
                                        <h4>{edu.institution}</h4>
                                    </div>
                                </div>
                                {edu.bullets && (
                                    <ul className="about-bullets">
                                        {edu.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}
                                    </ul>
                                )}
                                <div className="about-tags">
                                    {edu.skills.map((skill, i) => (
                                        <span key={i} className="about-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="about-certs">
                        {certifications.map((cert, idx) => (
                            <div key={`cert-${idx}`} className="about-cert">
                                {cert.logo && (
                                    <img src={cert.logo} alt={`${cert.issuer} Logo`} className="about-cert-logo" />
                                )}
                                <div>
                                    <h4>{cert.name}</h4>
                                    <p>{cert.issuer} · {cert.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </ScrollReveal>

            {/* SKILLS */}
            <ScrollReveal>
                <section className="about-section">
                    <h2 className="section-head">Technical Arsenal</h2>
                    <p className="section-lead">A comprehensive overview of the tools, languages, and frameworks that power my workflows.</p>

                    <div className="about-skills-category">
                        <h3>Languages, Frameworks, and Libraries</h3>
                        <div className="about-tags">
                            {['HTML5','CSS','JavaScript (JS)','TypeScript 5.8','Tailwind CSS','Bootstrap','Material Tailwind','React.js & React Native','Next.js','Expo','Node.js','Express.js','Python','C','C++ & Embedded C++','Java','Kotlin','Go','Perl','R','SQL','MongoDB','Mongoose','MySQL','PostgreSQL','Django','Flask','FastAPI','Spring Boot','Google Gemini','LangChain','LangGraph','Pinecone','ChromaDB','scikit-learn','PyTorch','TensorFlow & Lite','Hugging Face','LLaMA & CTransformers','pandas','NumPy','Matplotlib','Seaborn','OpenCV','CVZone','Assembly language','ROS2','VHDL','SystemVerilog/Verilog','LaTeX','Bash/Shell','Framer Motion','GSAP','Three.js','Canvas Confetti','Lucide & Heroicons','React Hook Form','Vite','GraphQL','Webhooks','Context API','Redux','Selenium','BeautifulSoup','Jest','Supertest','OpenMPI','OpenMP','Room Database','Retrofit','Android Jetpack Compose','Next.js API Routes','Nodemailer (SMTP)','Sharp','PostCSS','Autoprefixer','ESLint'].map((skill, i) => (
                                <span key={i} className="about-tag">{skill}</span>
                            ))}
                        </div>
                    </div>

                    <div className="about-skills-category">
                        <h3>Developer Tools & Workflows</h3>
                        <div className="about-tags">
                            {['Kubernetes (SIG-Apps)','LeaderWorkerSet (LWS)','Kubespray & SIG Cluster Lifecycle','Docker','Helm','OpenShift Kubernetes','GitHub Actions CI/CD','GitLab CI','Bitbucket','Jira (Scrum)','Confluence','Jenkins','Ansible','Terraform','VMware','VS Code','Vim','JetBrains Suite','Android Studio','SolidWorks','Figma','Fritzing','KiCad','LTspice','Intel Quartus Prime, Quartus II, ModelSim','Grafana','Postman','MySQL Workbench','Slurm & Bash','Zephyr RTOS','CAN / ISO-TP','ISO 26262 (ASIL-D)','Google Cloud Build (GCB)','KIND (Kubernetes in Docker)','Dependabot','Vagrant','Google Lighthouse','WCAG 2.1 AA','Agile','Scrum','SDLC','Office 365','Google Colab','Jupyter'].map((skill, i) => (
                                <span key={i} className="about-tag">{skill}</span>
                            ))}
                        </div>
                    </div>

                    <div className="about-skills-category">
                        <h3>Databases and Enterprise Cloud Architectures</h3>
                        <div className="about-tags">
                            {['SAP S/4HANA Cloud','ORACLE Database','Microsoft Power BI','AWS (EC2, S3, Lambda, SQS, SNS)','AWS CloudWatch & Step Function','Azure & Azure Kubernetes Service (AKS)','Google Cloud Platform (GCP)','Vercel','Cloudflare','Supabase (PostgreSQL with RLS)','Firebase','Render','MySQL Database','PostgreSQL / SQLite','Redis','Prisma','Stripe','Excel (Dynamic Arrays & Stock Data)','SharePoint','Dataverse','Microsoft Power Automate'].map((skill, i) => (
                                <span key={i} className="about-tag">{skill}</span>
                            ))}
                        </div>
                    </div>

                    <div className="about-skills-category">
                        <h3>Hardware, Systems & Networking</h3>
                        <div className="about-tags">
                            {['Raspberry Pi 5','PREEMPT_RT Linux','ValueCAN 4 & DBC Parsing','XML-driven config','MPMC zero-copy ROS–CAN transfer','ECU systems & CAN bus','SPI / I2C / UART','nRF52840 / ESP32 / Arduino / RF','Cyclone V FPGA','RISC-V ISA','Thread mesh networking','Coral TPU & EfficientDet','CUDA & MPI','DVFS & RAPL','OpenConfig','etcd & CoreDNS','Linux cgroup v1 deprecation','pod DNS & DPANIC crashes'].map((skill, i) => (
                                <span key={i} className="about-tag">{skill}</span>
                            ))}
                        </div>
                    </div>

                    <div className="about-skills-category">
                        <h3>Data, ML & Software Engineering Concepts</h3>
                        <div className="about-tags">
                            {['structure-aware semantic chunking','Random Forest & GridSearchCV','Gini feature importance','legal interpretability & LLM hallucinations','LLM-powered resume automation SaaS','memory-efficient RAG chatbot','quantized LLaMA models (.gguf)','context windows & token limits'].map((skill, i) => (
                                <span key={i} className="about-tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            <style jsx>{`
                .about-page {
                    max-width: 65ch;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }

                .about-hero {
                    padding: 4rem 0 6rem;
                }

                .about-hero-inner {
                    display: flex;
                    gap: 3rem;
                    align-items: center;
                    flex-wrap: wrap;
                }

                .about-photo-wrap {
                    flex: 0 0 auto;
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    padding: 6px;
                    background: linear-gradient(135deg, rgba(77, 163, 255, 0.4), rgba(30, 41, 59, 0));
                }

                .about-photo {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 3px solid var(--surface-color);
                }

                .about-hero-text {
                    flex: 1;
                    min-width: 280px;
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }

                .hero-title {
                    font-family: 'Fraunces', serif;
                    font-size: clamp(2.5rem, 5vw + 1rem, 4.5rem);
                    font-weight: 700;
                    line-height: 1.05;
                    letter-spacing: -0.03em;
                    background: var(--title-gradient);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin: 0;
                }

                .hero-subtitle {
                    font-size: 1.05rem;
                    line-height: 1.75;
                    color: var(--text-secondary);
                    margin: 0;
                }

                .about-section {
                    padding: 6rem 0;
                }

                .section-head {
                    font-family: 'Fraunces', serif;
                    font-size: clamp(1.75rem, 3vw + 0.5rem, 2.5rem);
                    font-weight: 600;
                    line-height: 1.15;
                    margin-bottom: 1rem;
                    background: var(--title-gradient);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    letter-spacing: -0.02em;
                }

                .section-lead {
                    font-size: 1.05rem;
                    color: var(--text-secondary);
                    line-height: 1.7;
                    margin-bottom: 3rem;
                    max-width: 50ch;
                }

                .about-timeline {
                    display: flex;
                    flex-direction: column;
                    gap: 2.5rem;
                }

                .about-entry {
                    padding: 2rem 0;
                    border-top: 1px solid var(--border-color);
                }

                .about-entry-header {
                    display: flex;
                    gap: 1.25rem;
                    align-items: flex-start;
                    margin-bottom: 1rem;
                }

                .about-entry-logo {
                    width: 48px;
                    height: 48px;
                    border-radius: 10px;
                    background: var(--surface-color);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid var(--border-color);
                    overflow: hidden;
                    padding: 4px;
                    flex-shrink: 0;
                }

                .about-entry-logo img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }

                .about-entry-header h3 {
                    font-size: 1.15rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin: 0 0 0.25rem 0;
                }

                .about-entry-header h4 {
                    font-size: 1rem;
                    color: var(--accent-color);
                    font-weight: 500;
                    margin: 0.25rem 0 0 0;
                }

                .about-date {
                    font-size: 0.85rem;
                    color: var(--text-muted);
                    font-weight: 500;
                    display: block;
                    margin-bottom: 0.25rem;
                }

                .about-bullets {
                    margin: 0 0 1rem 1.5rem;
                    color: var(--text-secondary);
                    font-size: 0.95rem;
                    line-height: 1.7;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .about-bullets li {
                    list-style: none;
                    position: relative;
                    padding-left: 1rem;
                }

                .about-bullets li::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0.5em;
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background: var(--accent-color);
                }

                .about-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .about-tag {
                    background: var(--form-bg);
                    border: 1px solid var(--border-color);
                    color: var(--text-primary);
                    padding: 0.3rem 0.75rem;
                    border-radius: 100px;
                    font-size: 0.78rem;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }

                .about-tag:hover {
                    border-color: var(--accent-color);
                    color: var(--accent-color);
                }

                .about-certs {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1.5rem;
                    margin-top: 2rem;
                }

                .about-cert {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1.25rem;
                    border: 1px solid var(--border-color);
                    border-radius: 16px;
                    flex: 1 1 280px;
                    background: var(--surface-color);
                }

                .about-cert-logo {
                    width: 40px;
                    height: 40px;
                    border-radius: 8px;
                    object-fit: contain;
                }

                .about-cert h4 {
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin: 0 0 0.15rem 0;
                }

                .about-cert p {
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                    margin: 0;
                }

                .about-skills-category {
                    margin-bottom: 2.5rem;
                }

                .about-skills-category h3 {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: var(--accent-color);
                    margin-bottom: 1rem;
                }

                @media (max-width: 768px) {
                    .about-hero-inner {
                        flex-direction: column;
                        text-align: center;
                    }

                    .about-photo-wrap {
                        width: 160px;
                        height: 160px;
                    }

                    .about-entry-header {
                        flex-direction: column;
                        gap: 0.75rem;
                    }

                    .about-bullets {
                        font-size: 0.9rem;
                    }
                }
            `}</style>
        </main>
    );
}