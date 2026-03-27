"use client";

import Link from 'next/link';
import SolarSystemBackground from '@/components/SolarSystemBackground';
import HolographicCard from '@/components/HolographicCard';
import LiveGithubProjects from '@/components/LiveGithubProjects';

export default function Project() {
    const projects = [
        {
            title: "G.O.S. Phytotron Sensor Node & AI Engine",
            date: "Jan 2026 - Present",
            desc: "End-to-end development of an ultra-low-power IoT monitoring system for precision agriculture. Engineered custom 4-layer PCB (KiCad) with nRF52840 SoC, achieving 360nA quiescent current and 7+ year battery life. Integrated Zephyr RTOS Thread mesh networking for institutional-grade plant phenotyping.",
            skills: ["Embedded C/C++", "Python", "Zephyr RTOS", "KiCad", "nRF52840 SoC", "Thread Mesh", "PCB Design", "IoT"],
            link: "https://github.com/johnnietse/strawberry-farm"
        },
        {
            title: "HPC Energy Optimization & DVFS Control System",
            date: "Sep 2025 - Mar 20, 2026",
            desc: "Dynamic frequency scaling system for miniMD reducing energy consumption during non-compute phases. Implemented a Beta-Adaptation algorithm and a 'Race-to-Idle' strategy for MPI communication phases, using Intel RAPL to validate energy efficiency on 32-core Xeon/EPYC nodes.",
            skills: ["C++", "Python", "MPI", "HPC", "Intel RAPL", "DVFS Control", "Beta-Adaptation", "Race-to-Idle"],
            link: "https://github.com/johnnietse/elec-498-group-30-2025-2026-proxy-app"
        },
        {
            title: "Advanced Kubernetes SIG-Apps Contribution (lws)",
            date: "Feb 2026 - Present",
            desc: "Upstream core contributor to the Kubernetes LeaderWorkerSet (LWS) controller. Implementing state-machine fixes for highly-available pod orchestration and improving API boundary safety for distributed GPU scheduling.",
            skills: ["Go", "Kubernetes", "Controller-Runtime", "SIG-Apps", "Distributed Systems", "API Design", "gRPC"],
            link: "https://github.com/johnnietse/lws"
        },
        {
            title: "Kubernetes SIG-Cluster-Lifecycle (kubespray)",
            date: "Mar 20, 2026 - Present",
            desc: "Active upstream contribution to Kubespray for large-scale cluster deployments. Focusing on cgroup v2 migration pathways and automated bootstrap stability for production-ready bare-metal infrastructure.",
            skills: ["Go", "Kubernetes", "Ansible", "Terraform", "Cloud Infrastructure", "Systems Architecture"],
            link: "https://github.com/johnnietse/kubespray"
        },
        {
            title: "ApplicaAI - AI-Powered Job Assistant",
            date: "Aug 2025 - Jan 10, 2026",
            desc: "Production-grade AI SaaS resume builder architecting a streaming chat system using Vercel AI SDK. Orchestrates 13 LLM models across 3 providers with Redis-backed leaky bucket rate limiting and Supabase PostgreSQL backend with JSONB storage.",
            skills: ["Next.js", "React", "Python", "Supabase", "Stripe", "Docker", "LangGraph", "Redis"],
            link: "https://github.com/johnnietse/AI-Powered_Professional_Job_Application_Assistant"
        },
        {
            title: "High-Fidelity Engineering Portfolio (v2)",
            date: "Mar 26, 2026 - Present",
            desc: "The very site you are viewing. Developed with Next.js 16 and React 19, featuring an interactive 3D WebGL Command Center, custom HUD components, and real-time GitHub synchronization using the GraphQL API.",
            skills: ["Next.js 16", "React 19", "Three.js", "WebGL", "GraphQL API", "Framer Motion", "Tailwind CSS"],
            link: "https://github.com/johnnietse/personal-portfolio-website"
        },
        {
            title: "Automated Stock Trading Agent (DQN)",
            date: "May 2025 - Present",
            desc: "Intelligent stock trading agent leveraging Reinforcement Learning (DQN) and OpenAI Gym. Trained on historical data with technical indicators (EMA, MACD, RSI), featuring experience replay and epsilon-greedy exploration for optimal trading policies.",
            skills: ["Python", "Machine Learning", "Reinforcement Learning", "DQN", "OpenAI Gym", "Matplotlib"],
            link: "https://github.com/johnnietse/Deep-Q-Network-reinforcement-learning-stock-trading"
        },
        {
            title: "PortraitArt Gallery",
            date: "Jun 2025 - Mar 13, 2026",
            desc: "Full-stack web application leveraging U²-Net architecture for salient object detection to transform images into high-quality artistic portraits. Features custom-built PyTorch inference pipeline and OpenCV morphological mask refinement for professional edge quality.",
            skills: ["Python", "PyTorch", "Flask", "React", "OpenCV", "Deep Learning", "U²-Net Architecture"],
            link: "https://github.com/johnnietse/Portrait_Gallery"
        },
        {
            title: "Algorithmic Cryptocurrency Trading System (v2)",
            date: "May 2025 - Jan 5, 2026",
            desc: "Modular backtesting system for 28+ assets with a 5-stage pipeline. Engineered an API management layer with exponential backoff and calculated critical KPIs including Sharpe Ratio (2.69) and Maximum Drawdown across volatile markets.",
            skills: ["Python", "Pandas", "Scikit-Learn", "API Architecture", "Quantitative Analysis", "Risk Analytics", "Jupyter"],
            link: "https://github.com/johnnietse/cryptocurrency-trading-system-with-coingecko-api"
        },
        {
            title: "RISC-V CPU Architecture",
            date: "Sep 2024 - Feb 10, 2026",
            desc: "32-bit single-cycle RISC-V processor architected in VHDL/Verilog for ELEC 374. Features a complete instruction set (R-type, I-type, S-type, B-type) with integrated ALUs, control units, and hazard detection logic.",
            skills: ["VHDL", "Verilog", "RISC-V", "CPU Design", "Digital Logic", "FPGA"],
            link: "https://github.com/johnnietse/RISC_V_CPU"
        },
        {
            title: "L4 Autonomous Vehicle Object Detection",
            date: "Aug 2025 - Mar 20, 2026",
            desc: "Custom YOLOv8 training pipeline for the Queen's AutoDrive team. Orchestrated large-scale dataset labeling and model fine-tuning to achieve high-precision detection of urban driving obstacles (cones, pedestrians, signals).",
            skills: ["Python", "YOLOv8", "OpenCV", "Dataset Labeling", "TensorFlow", "AutoDrive"],
            link: "https://github.com/johnnietse/L4-autonomous-vehicle-object-detection-model-training"
        },
        {
            title: "Flight Planning System",
            date: "Jan 2024 - Mar 25, 2026",
            desc: "Robust Java-based flight trajectory planning system. Implemented Dijkstra’s algorithm and graph-based data structures to calculate optimal paths with real-time constraint handling for multi-leg air travel.",
            skills: ["Java", "Data Structures", "Dijkstra's Algorithm", "Graph Theory", "Software Engineering"],
            link: "https://github.com/johnnietse/Flight_planning_system"
        },
        {
            title: "PDF Chatbot (RAG System)",
            date: "Mar 2025 - Feb 15, 2026",
            desc: "Intelligent document assistant using LangChain and OpenAI’s GPT-3.5-turbo. Employs PyPDFLoader for semantic chunking and ChromaDB for vector retrieval-augmented generation (RAG).",
            skills: ["Python", "Flask", "LangChain", "Docker", "RAG", "ChromaDB", "Vector Embeddings"],
            link: "https://github.com/johnnietse/pdf-chatbot"
        },
        {
            title: "FYIC 2025 Conference Website",
            date: "Mar 2025 - Feb 18, 2026",
            desc: "High-traffic server-side rendered application for 18+ universities. Automated image optimization using Sharp (95+ Lighthouse score) and orchestrated GitHub Actions for zero-downtime Vercel/Cloudflare deployments.",
            skills: ["Next.js 15", "TypeScript", "Tailwind CSS", "CI/CD", "Node.js", "WCAG 2.1 AA", "GitHub Actions"],
            link: "https://github.com/johnnietse/2025-fyic"
        },
        {
            title: "Deel Legal Intelligence AI",
            date: "Feb 7, 2026",
            desc: "Advanced RAG-based legal analysis engine designed for contract compliance and clause identification. Utilizes recursive character splitting and specialized vector index tuning for high-precision legal document retrieval.",
            skills: ["Python", "RAG", "LangChain", "OpenAI API", "Legal Tech", "Vector Databases"],
            link: "https://github.com/johnnietse/deel-legal-ai"
        },
        {
            title: "Summer of Code Debian Technical Proposal",
            date: "Mar 22, 2026",
            desc: "Formal architectural proposal for the Debian Summer of Code 2026, focusing on infrastructure automation and package management optimization.",
            skills: ["HTML", "Technical Writing", "Debian Infrastructure", "Systems Research"],
            link: "https://github.com/johnnietse/Summer_of_code_proposal_Debian_2026"
        },
        {
            title: "GitHub Analytics Command Center",
            date: "Mar 27, 2026",
            desc: "Internal data engine used to synchronize repository metadata, activity streams, and technical skill clusters for this portfolio portfolio. Powered by Python and GitHub REST/GraphQL APIs.",
            skills: ["Python", "GitHub API", "Data Analytics", "JSON Processing", "Automation"],
            link: "https://github.com/johnnietse/github-analytics"
        },
        {
            title: "HPC Deep Learning",
            date: "Sep 2024 - Dec 20, 2025",
            desc: "High-performance deep learning repository for ELEC 475. Implemented distributed training of CNNs on GPU clusters, focusing on batch-normalization optimization and memory-efficient compute.",
            skills: ["Python", "PyTorch", "HPC", "CUDA", "CNN Training", "Distributed Systems"],
            link: "https://github.com/johnnietse/ELEC-475"
        },
        {
            title: "Virtual Try-On: Clothing AI",
            date: "Jun 2025 - Dec 15, 2025",
            desc: "Perspective transformation-based clothing overlay utilizing cvzone’s PoseModule and OpenCV warping functions. Implemented semi-transparent overlay blending and green screen removal for realistic media streaming.",
            skills: ["Python", "Flask", "OpenCV", "Computer Vision", "Pose Estimation", "Warping Functions"],
            link: "https://github.com/johnnietse/cloth-try-on"
        },
        {
            title: "Local LLM PDF Chatbot",
            date: "Apr 2025 - Dec 5, 2025",
            desc: "Privacy-centric RAG system using local LLMs (via Ollama/LlamaCpp). Integrates LangChain for document ingestion and ChromaDB as a local vector store, ensuring data never leaves the host machine.",
            skills: ["Python", "LangChain", "Ollama", "ChromaDB", "LlamaCpp", "Local AI"],
            link: "https://github.com/johnnietse/localLLM-pdf-chatbot"
        },
        {
            title: "YOLO Dataset Visualizer",
            date: "Jun 2025 - Jul 11, 2025",
            desc: "Web-based validation tool for YOLO object detection datasets. Accelerates ML pipelines by providing rapid batch visual verification of bounding boxes and class-label mappings with ZIP export capability.",
            skills: ["Python", "Flask", "OpenCV", "Tailwind CSS", "Machine Learning", "Dataset Validation"],
            link: "https://github.com/johnnietse/boundingBoxVisualizer"
        },
        {
            title: "Software Specifications Suite",
            date: "Sep 2024 - Jun 28, 2025",
            desc: "Comprehensive documentation and formal modeling of complex software systems. Developed UML diagrams, state machines, and functional requirements for scalable enterprise architectures.",
            skills: ["UML", "Software Engineering", "Functional Specs", "Documentation", "Agile"],
            link: "https://github.com/johnnietse/software-specifications"
        },
        {
            title: "Conference DB Management",
            date: "Jan 2025 - Jun 28, 2025",
            desc: "Full-scale SQL database for conference orchestration. Designed normalized schemas (3NF/BCNF) and implemented complex triggers/procedures for registration, scheduling, and attendance tracking.",
            skills: ["SQL", "Database Design", "PostgreSQL", "Stored Procedures", "Normalization", "PHP"],
            link: "https://github.com/johnnietse/conference-database-management-system"
        },
        {
            title: "XML Annotation Processor",
            date: "May 2025 - Jun 28, 2025",
            desc: "Python-based utility for mass processing of machine learning annotations. Automates the transformation of XML (Pascal VOC) to TXT (YOLO) formats with data augmentation and validation checks.",
            skills: ["Python", "XML Parsing", "Machine Learning Data", "Computer Vision", "Automation"],
            link: "https://github.com/johnnietse/XML-annotation-batch-processor"
        },
        {
            title: "Classic Pacman Engine",
            date: "Jan 2024 - Jun 28, 2025",
            desc: "Classic arcade game recreation in Java/Python. Implemented A* pathfinding for ghost AI behavior and collision detection algorithms for real-time gameplay optimization.",
            skills: ["Java", "AI Pathfinding", "Game Engine", "A* Algorithm", "Collision Detection"],
            link: "https://github.com/johnnietse/pacman-game"
        },
        {
            title: "Walk-Jump Motion Classifier",
            date: "Jun 2, 2025",
            desc: "Human activity recognition system using IMU sensor data. Trained a Random Forest classifier to distinguish between walking, jumping, and stationary states with high temporal precision.",
            skills: ["Python", "Machine Learning", "Scikit-Learn", "IMU Sensors", "Signal Processing"],
            link: "https://github.com/johnnietse/walk-jump-motion-classifier"
        },
        {
            title: "GuessMaster Android Game",
            date: "May 2024 - Jun 2025",
            desc: "Interactive Android quiz application developed in Java. Features a modular activity-based architecture with dynamic ranking systems and persistent user score storage.",
            skills: ["Android", "Java", "Mobile UX", "SQLite", "Activity Lifecycle"],
            link: "https://github.com/johnnietse/guessmaster-android-game"
        },
        {
            title: "Excel Data Modeling",
            date: "Jan 2025 - Mar 20, 2026",
            desc: "Complex financial modeling and cell-lineage data analysis initially in Excel, now being integrated into lightweight C-based terminal spreadsheeting tools.",
            skills: ["C", "Excel", "Power Query", "Data Analysis", "Financial Modeling"],
            link: "https://github.com/johnnietse/fundamental-cell-excel-spreadsheet"
        },
        {
            title: "CUDA GPU Programming",
            date: "Oct 2024 - May 16, 2025",
            desc: "High-performance parallel algorithms implemented in CUDA C++. Optimized matrix multiplications, stencils, and reductions to achieve significant speedups over CPU-based baselines.",
            skills: ["CUDA", "C++", "Parallel Computing", "GPU Optimization", "Memory Architecture"],
            link: "https://github.com/johnnietse/cuda-GPU-programming"
        },
        {
            title: "Arduino Rock-Paper-Scissors",
            date: "Nov 2023 - Oct 19, 2024",
            desc: "Hand-gestured interactive game using infrared sensors and Arduino. Engineered real-time gesture matching and competitive scoring logic for a physical hardware interface.",
            skills: ["Arduino", "C++", "Sensors", "Physical Computing", "Embedded Systems"],
            link: "https://github.com/johnnietse/arduino-rock-paper-scissors-duel"
        },
        {
            title: "EV Battery Enclosure",
            date: "Jan 2023 - Oct 19, 2024",
            desc: "Mechanical design and BMS for an EV conversion. Engineered a custom aluminum enclosure with integrated liquid cooling, reducing peak thermal spikes by 40%.",
            skills: ["SolidWorks", "Embedded Systems", "Thermal Management", "EV Engineering", "C++"],
            link: "https://github.com/johnnietse/electric-vehicle-automated-battery-enclosure"
        },
        {
            title: "Smart Home Security Platform",
            date: "Oct 19, 2024",
            desc: "Arduino-based physical security platform integrating PIR and ultrasonic sensors for intrusion detection. Features custom state-machine logic for comprehensive monitoring.",
            skills: ["Arduino", "Sensors", "I2C/SPI", "Hardware Interfacing", "State Machines"],
            link: "https://github.com/johnnietse/smart-home-security-system"
        },
        {
            title: "Arduino Robotic Assistive Arm",
            date: "Aug 2023 - Oct 18, 2024",
            desc: "AI-driven robotic arm integration for accessibility. Developed a computer vision pipeline using OpenCV to coordinate a 6-DOF Kinova arm with a Clearpath Jackal UGV.",
            skills: ["Robotics", "OpenCV", "Embedded Systems", "Kinova API", "ROS2", "C++"],
            link: "https://github.com/johnnietse/arduino-robotic-assistive-arm"
        },
        {
            title: "Desktop Lighting IoT Lamp",
            date: "Dec 2024 - Oct 18, 2024",
            desc: "IoT-enabled smart lamp project. Features custom PCB design with PWM-based dimming control and remote activation via ESP32 integration.",
            skills: ["ESP32", "IoT", "PCB Design", "PWM Control", "WiFi Integration"],
            link: "https://github.com/johnnietse/desktop-lighting-lamp"
        },
        {
            title: "SolidWorks Camera Design",
            date: "Jan 2025 - Oct 18, 2024",
            desc: "Mechanical design and casing for a robust security camera system. Modeled in SolidWorks with considerations for IP67 weatherproofing.",
            skills: ["SolidWorks", "Industrial Design", "CAD", "Weatherproofing", "Thermal Analysis"],
            link: "https://github.com/johnnietse/solidworks-security-camera"
        },
        {
            title: "TaskMaster Productivity Suite",
            date: "Apr 2025",
            desc: "Full-featured task management app with complex database schemas and PostgreSQL triggers for automated profiling. Implemented row-level security (RLS) for data isolation.",
            skills: ["React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "RLS"],
            link: "https://github.com/johnnietse/manage-mode-ui"
        },
        {
            title: "Workout Streak Hub",
            date: "Apr 2025",
            desc: "Personal fitness tracker developed with modern React patterns and Supabase authentication. Features daily workout logging, progress visualization, and CI/CD on Vercel.",
            skills: ["React", "Vite", "TypeScript", "Supabase", "Vercel", "Tailwind CSS"],
            link: "https://github.com/johnnietse/workout-streak-hub"
        },
        {
            title: "travelExpenseTracker",
            date: "Dec 2024 - Jun 22, 2025",
            desc: "Android finance app with SQLite-backed authentication and real-time spending analytics using MPAndroidChart for competition teams.",
            skills: ["Kotlin", "Java", "Android Studio", "SQLite", "MPAndroidChart", "Mobile Dev"],
            link: "https://github.com/johnnietse/travelExpenseTracker"
        },
        {
            title: "ChillnCharm Ecommerce Engine",
            date: "May 2024 - Aug 2024",
            desc: "Android e-commerce prototype built with MVVM and Clean Architecture. Integrates Retrofit and ROOM for localized SQLite caching.",
            skills: ["Android", "Kotlin", "MVVM", "Clean Architecture", "Retrofit", "ROOM Database"],
            link: "https://github.com/johnnietse/ChillnCharm"
        },
        {
            title: "LinkedIn Connection Automator",
            date: "Jun 3, 2025",
            desc: "Python automation tool integrating Selenium and OpenCV template matching to identify UI states. Fault-tolerant workflow for educational technical demonstration.",
            skills: ["Python", "Selenium", "OpenCV", "Automation", "Computer Vision"],
            link: "https://github.com/johnnietse/linkedin-connection-automation-tool"
        },
        {
            title: "ASL Hand Sign Detector",
            date: "May 2025 - Jun 3, 2025",
            desc: "Deep learning system for sign language recognition. Trained a custom CNN to classify ASL alphabets from live video feeds.",
            skills: ["Python", "TensorFlow", "Keras", "OpenCV", "Deep Learning"],
            link: "https://github.com/johnnietse/asl-hand-sign-detector"
        },
        {
            title: "Enterprise Stock Dashboard",
            date: "May 2025",
            desc: "Comprehensive financial analytics suite built with Power BI and Excel Power Query. Normalizes disparate market data into interactive visualizations.",
            skills: ["Power BI", "Excel Power Query", "Data Visualization", "Financial Modeling"],
            link: "https://github.com/johnnietse/stock-dashboard"
        },
        {
            title: "Mobile Virtual Try-On (AR)",
            date: "Jul 2025 - Dec 1, 2025",
            desc: "Experimental mobile application utilizing augmented reality and Pose Estimation to simulate clothing trial for e-commerce platforms.",
            skills: ["Android", "OpenCV", "Pose Estimation", "AR", "Mobile Development", "Python"],
            link: "https://github.com/johnnietse/cloth-virtual-try-on"
        },
        {
            title: "Algorithmic Crypto Trading (v1)",
            date: "Apr 2025 - Jul 11, 2025",
            desc: "Initial prototype of a modular trading engine focusing on basic backtesting and historical data ingestion for limited assets.",
            skills: ["Python", "Pandas", "Quantitative Analysis", "Finance", "Jupyter"],
            link: "https://github.com/johnnietse/cryptocurrency-trading-system"
        },
        {
            title: "Summer of Code Debian 2026",
            date: "Mar 22, 2026",
            desc: "Technical implementation research and proposal for automated package testing architectures within the Debian ecosystem.",
            skills: ["Technical Writing", "Linux Infrastructure", "Automation", "HTML"],
            link: "https://github.com/johnnietse/Summer_of_code_proposal_Debian_2026"
        },
        {
            title: "Nios II Assembly Engineering",
            date: "Jan 15, 2026",
            desc: "Laboratory series focusing on Nios II Soft Processor architecture. Designed low-level interrupt handlers, memory-mapped I/O routines, and performance-tuned assembly algorithms.",
            skills: ["Assembly", "Nios II", "Embedded Systems", "Hardware Architecture"],
            link: "https://github.com/johnnietse/nios2-assembly-language-labs"
        },
        {
            title: "Autonomous Mode CAN Bus DBC",
            date: "Jan 20, 2026",
            desc: "DBC file architecture and message mapping for L4 autonomous vehicle mode switching via CAN bus. Defines critical safety messages and control unit arbitration logic.",
            skills: ["CAN Bus", "DBC", "Autonomous Driving", "Systems Engineering"],
            link: "https://github.com/johnnietse/LS-dbc-autonomous-mode"
        },
        {
            title: "Contributor Playground",
            date: "Feb 18, 2026",
            desc: "Sandboxed Docker environment for rapid testing of upstream Kubernetes patches and CI/CD workflow simulations.",
            skills: ["Docker", "Linux", "CI/CD", "Contributor Excellence"],
            link: "https://github.com/johnnietse/contributor-playground"
        },
        {
            title: "Engineering Hub (Profile Data)",
            date: "Jun 1, 2025",
            desc: "Central configuration and meta-data engine for my GitHub profile, including automated status tracking and technical identity orchestration.",
            skills: ["Markdown", "Config Management", "GitHub Actions"],
            link: "https://github.com/johnnietse/johnnietse"
        },
        {
            title: "Legacy Archive: First Repo",
            date: "Aug 12, 2024",
            desc: "My initial foray into open-source version control. Represents the foundational commit that started this engineering journey.",
            skills: ["Git", "Version Control", "Documentation"],
            link: "https://github.com/johnnietse/my-repo"
        },
        {
            title: "Fyic 2025 Website (Prototype)",
            date: "Dec 10, 2025",
            desc: "Initial architectural prototype and skeleton for the FYIC 2025 conference platform.",
            skills: ["JavaScript", "HTML", "CSS", "Next.js Prototype"],
            link: "https://github.com/johnnietse/fyic-2025-website"
        },
        {
            title: "GitHub Infrastructure Dashboard",
            date: "Mar 27, 2026",
            desc: "Real-time analytics engine and dashboard interface for monitoring GitHub repository metrics and contribution velocity.",
            skills: ["Python", "API Orchestration", "Next.js", "Dashboard Engineering"],
            link: "https://github.com/johnnietse/github-stats"
        }
    ];

    return (
        <main className="section container" style={{ paddingTop: '8rem', position: 'relative' }}>
            {/* Guarantee seamless WebGL persistence across routes seamlessly */}
            <SolarSystemBackground />

            <div className="text-center" style={{ marginBottom: '4rem' }}>
                <h1 className="title" data-aos="zoom-in">Featured Projects.</h1>
                <p className="subtitle" data-aos="fade-up" data-aos-delay="200" style={{ margin: '0 auto' }}>
                    Explore my latest technical builds, ranging from Machine Learning RAG pipelines and custom AgTech IoT hardware to high-performance C++ control systems and scalable full-stack web platforms.
                </p>
            </div>

            <div className="projects-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))' }}>
                {projects.map((proj, index) => (
                    <HolographicCard key={index} data-aos="fade-up" data-aos-delay={(index % 3) * 100} style={{ display: 'flex', flexDirection: 'column', padding: '2rem' }}>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <h3 className="project-title" style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.4rem' }}>{proj.title}</h3>
                        </div>

                        <p style={{ color: 'var(--accent-color)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', letterSpacing: '0.05em' }}>
                            {proj.date}
                        </p>

                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1, lineHeight: '1.6' }}>
                            {proj.desc}
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2rem' }}>
                            {proj.skills.map((skill, i) => (
                                <span key={i} style={{
                                    background: 'var(--form-bg)',
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

                        {proj.link && (
                            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ alignSelf: 'flex-start', fontSize: '0.9rem', padding: '0.6rem 1.2rem', marginTop: 'auto' }}>
                                View Repository &rarr;
                            </a>
                        )}

                    </HolographicCard>
                ))}
            </div>

            {/* Live GitHub Feed Section */}
            <div data-aos="fade-up" data-aos-delay="200" style={{ marginTop: '8rem' }}>
                <div className="text-center" style={{ marginBottom: '4rem' }}>
                    <h2 className="title" style={{ fontSize: '2.5rem' }}>Live GitHub Feed.</h2>
                    <p className="subtitle" style={{ margin: '1rem auto' }}>
                        Real-time synchronization with my public repositories. This section is powered by the GitHub GraphQL API, showcasing my latest technical iterations and open-source contributions.
                    </p>
                </div>
                <LiveGithubProjects />
            </div>

        </main>
    );
}
