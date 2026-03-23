"use client";

import Link from 'next/link';

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
            date: "Sep 2025 - Present",
            desc: "Dynamic frequency scaling system for miniMD reducing energy consumption during non-compute phases. Implemented a Beta-Adaptation algorithm and a 'Race-to-Idle' strategy for MPI communication phases, using Intel RAPL to validate energy efficiency on 32-core Xeon/EPYC nodes.",
            skills: ["C++", "Python", "MPI", "HPC", "Intel RAPL", "DVFS Control", "Beta-Adaptation", "Race-to-Idle"],
            link: "https://github.com/johnnietse/elec-498-group-30-2025-2026-proxy-app"
        },
        {
            title: "ApplicaAI - AI-Powered Job Assistant",
            date: "Aug 2025 - Present",
            desc: "Production-grade AI SaaS resume builder architecting a streaming chat system using Vercel AI SDK. Orchestrates 13 LLM models across 3 providers with Redis-backed leaky bucket rate limiting and Supabase PostgreSQL backend with JSONB storage.",
            skills: ["Next.js", "React", "Python", "Supabase", "Stripe", "Docker", "LangGraph", "Redis"],
            link: "https://github.com/johnnietse/AI-Powered_Professional_Job_Application_Assistant"
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
            date: "Jun 2025 - Present",
            desc: "Full-stack web application leveraging U²-Net architecture for salient object detection to transform images into high-quality artistic portraits. Features custom-built PyTorch inference pipeline and OpenCV morphological mask refinement for professional edge quality.",
            skills: ["Python", "PyTorch", "Flask", "React", "OpenCV", "Deep Learning", "U²-Net Architecture"],
            link: "https://github.com/johnnietse/Portrait_Gallery"
        },
        {
            title: "Algorithmic Cryptocurrency Trading System (v2)",
            date: "May 2025 - Present",
            desc: "Modular backtesting system for 28+ assets with a 5-stage pipeline. Engineered an API management layer with exponential backoff and calculated critical KPIs including Sharpe Ratio (2.69) and Maximum Drawdown across volatile markets.",
            skills: ["Python", "Pandas", "Scikit-Learn", "API Architecture", "Quantitative Analysis", "Risk Analytics"],
            link: "https://github.com/johnnietse/cryptocurrency-trading-system-with-coingecko-api"
        },
        {
            title: "RISC-V CPU Architecture",
            date: "Sep 2024 - Dec 2024",
            desc: "32-bit single-cycle RISC-V processor architected in VHDL/Verilog for ELEC 374. Features a complete instruction set (R-type, I-type, S-type, B-type) with integrated ALUs, control units, and hazard detection logic.",
            skills: ["VHDL", "Verilog", "RISC-V", "CPU Design", "Digital Logic", "FPGA"],
            link: "https://github.com/johnnietse/RISC_V_CPU"
        },
        {
            title: "L4 Autonomous Vehicle Object Detection",
            date: "Aug 2025 - Present",
            desc: "Custom YOLOv8 training pipeline for the Queen's AutoDrive team. Orchestrated large-scale dataset labeling and model fine-tuning to achieve high-precision detection of urban driving obstacles (cones, pedestrians, signals).",
            skills: ["Python", "YOLOv8", "OpenCV", "Dataset Labeling", "TensorFlow", "AutoDrive"],
            link: "https://github.com/johnnietse/L4-autonomous-vehicle-object-detection-model-training"
        },
        {
            title: "Flight Planning System",
            date: "Jan 2024 - Apr 2024",
            desc: "Robust Java-based flight trajectory planning system. Implemented Dijkstra’s algorithm and graph-based data structures to calculate optimal paths with real-time constraint handling for multi-leg air travel.",
            skills: ["Java", "Data Structures", "Dijkstra's Algorithm", "Graph Theory", "Software Engineering"],
            link: "https://github.com/johnnietse/Flight_planning_system"
        },
        {
            title: "PDF Chatbot (RAG System)",
            date: "Mar 2025 - Aug 2025",
            desc: "Intelligent document assistant using LangChain and OpenAI’s GPT-3.5-turbo. Employs PyPDFLoader for semantic chunking and ChromaDB for vector retrieval-augmented generation (RAG).",
            skills: ["Python", "Flask", "LangChain", "Docker", "RAG", "ChromaDB", "Vector Embeddings"],
            link: "https://github.com/johnnietse/pdf-chatbot"
        },
        {
            title: "FYIC 2025 Conference Website",
            date: "Mar 2025 - Dec 2025",
            desc: "High-traffic server-side rendered application for 18+ universities. Automated image optimization using Sharp (95+ Lighthouse score) and orchestrated GitHub Actions for zero-downtime Vercel/Cloudflare deployments.",
            skills: ["Next.js 15", "TypeScript", "Tailwind CSS", "CI/CD", "Node.js", "WCAG 2.1 AA", "GitHub Actions"],
            link: "https://github.com/johnnietse/2025-fyic"
        },
        {
            title: "HPC Deep Learning (ELEC 475)",
            date: "Sep 2024 - Dec 2024",
            desc: "High-performance deep learning repository for ELEC 475. Implemented distributed training of CNNs on GPU clusters, focusing on batch-normalization optimization and memory-efficient compute.",
            skills: ["Python", "PyTorch", "HPC", "CUDA", "CNN Training", "Distributed Systems"],
            link: "https://github.com/johnnietse/ELEC-475"
        },
        {
            title: "Virtual Try-On: Clothing Overlay AI",
            date: "Jun 2025 - Jul 2025",
            desc: "Perspective transformation-based clothing overlay utilizing cvzone’s PoseModule and OpenCV warping functions. Implemented semi-transparent overlay blending and green screen removal for realistic media streaming.",
            skills: ["Python", "Flask", "OpenCV", "Computer Vision", "Pose Estimation", "Warping Functions"],
            link: "https://github.com/johnnietse/cloth-try-on"
        },
        {
            title: "Local LLM PDF Chatbot",
            date: "Apr 2025",
            desc: "Privacy-centric RAG system using local LLMs (via Ollama/LlamaCpp). Integrates LangChain for document ingestion and ChromaDB as a local vector store, ensuring data never leaves the host machine.",
            skills: ["Python", "LangChain", "Ollama", "ChromaDB", "LlamaCpp", "Local AI"],
            link: "https://github.com/johnnietse/localLLM-pdf-chatbot"
        },
        {
            title: "YOLO Dataset Visualizer",
            date: "Jun 2025 - Jul 2025",
            desc: "Web-based validation tool for YOLO object detection datasets. Accelerates ML pipelines by providing rapid batch visual verification of bounding boxes and class-label mappings with ZIP export capability.",
            skills: ["Python", "Flask", "OpenCV", "Tailwind CSS", "Machine Learning", "Dataset Validation"],
            link: "https://github.com/johnnietse/boundingBoxVisualizer"
        },
        {
            title: "Software Specifications Suite",
            date: "Sep 2024 - Dec 2024",
            desc: "Comprehensive documentation and formal modeling of complex software systems. Developed UML diagrams, state machines, and functional requirements for scalable enterprise architectures.",
            skills: ["UML", "Software Engineering", "Functional Specs", "Documentation", "Agile"],
            link: "https://github.com/johnnietse/software-specifications"
        },
        {
            title: "Conference Database Management System",
            date: "Jan 2025 - Apr 2025",
            desc: "Full-scale SQL database for conference orchestration. Designed normalized schemas (3NF/BCNF) and implemented complex triggers/procedures for registration, scheduling, and attendance tracking.",
            skills: ["SQL", "Database Design", "PostgreSQL", "Stored Procedures", "Normalization"],
            link: "https://github.com/johnnietse/conference-database-management-system"
        },
        {
            title: "XML Annotation Batch Processor",
            date: "May 2025",
            desc: "Python-based utility for mass processing of machine learning annotations. Automates the transformation of XML (Pascal VOC) to TXT (YOLO) formats with data augmentation and validation checks.",
            skills: ["Python", "XML Parsing", "Machine Learning Data", "Computer Vision", "Automation"],
            link: "https://github.com/johnnietse/XML-annotation-batch-processor"
        },
        {
            title: "Classic Pacman Engine",
            date: "Jan 2024",
            desc: "Classic arcade game recreation in Java/Python. Implemented A* pathfinding for ghost AI behavior and collision detection algorithms for real-time gameplay optimization.",
            skills: ["Java", "AI Pathfinding", "Game Engine", "A* Algorithm", "Collision Detection"],
            link: "https://github.com/johnnietse/pacman-game"
        },
        {
            title: "Walk-Jump Motion Classifier",
            date: "Jun 2025",
            desc: "Human activity recognition system using IMU sensor data. Trained a Random Forest classifier to distinguish between walking, jumping, and stationary states with high temporal precision.",
            skills: ["Python", "Machine Learning", "Scikit-Learn", "IMU Sensors", "Signal Processing"],
            link: "https://github.com/johnnietse/walk-jump-motion-classifier"
        },
        {
            title: "GuessMaster Android Game",
            date: "May 2024",
            desc: "Interactive Android quiz application developed in Java. Features a modular activity-based architecture with dynamic ranking systems and persistent user score storage.",
            skills: ["Android", "Java", "Mobile UX", "SQLite", "Activity Lifecycle"],
            link: "https://github.com/johnnietse/guessmaster-android-game"
        },
        {
            title: "Excel Data Modeling (Fundamental Cell)",
            date: "Jan 2025",
            desc: "Complex financial modeling and cell-lineage data analysis using advanced Excel functions. Features automated pivot tables and Power Query transforms for large-scale data sets.",
            skills: ["Excel", "Power Query", "Pivot Tables", "Data Analysis", "Financial Modeling"],
            link: "https://github.com/johnnietse/fundamental-cell-excel-spreadsheet"
        },
        {
            title: "CUDA GPU Programming",
            date: "Oct 2024",
            desc: "High-performance parallel algorithms implemented in CUDA C++. Optimized matrix multiplications, stencils, and reductions to achieve significant speedups over CPU-based baselines.",
            skills: ["CUDA", "C++", "Parallel Computing", "GPU Optimization", "Memory Architecture"],
            link: "https://github.com/johnnietse/cuda-GPU-programming"
        },
        {
            title: "Arduino Rock-Paper-Scissors Duel",
            date: "Nov 2023",
            desc: "Hand-gestured interactive game using infrared sensors and Arduino. Engineered real-time gesture matching and competitive scoring logic for a physical hardware interface.",
            skills: ["Arduino", "C++", "Sensors", "Physical Computing", "Embedded Systems"],
            link: "https://github.com/johnnietse/arduino-rock-paper-scissors-duel"
        },
        {
            title: "Electric Vehicle Battery Enclosure",
            date: "Jan 2023 - May 2023",
            desc: "Mechanical design and BMS for an EV conversion. Engineered a custom aluminum enclosure with integrated liquid cooling, reducing peak thermal spikes by 40% in simulations.",
            skills: ["SolidWorks", "Embedded Systems", "Thermal Management", "EV Engineering"],
            link: "https://github.com/johnnietse/electric-vehicle-automated-battery-enclosure"
        },
        {
            title: "Smart Home Security System",
            date: "Oct 2024",
            desc: "Arduino-based physical security platform integrating PIR and ultrasonic sensors for intrusion detection. Features custom state-machine logic for comprehensive home monitoring.",
            skills: ["Arduino", "Sensors", "I2C/SPI", "Hardware Interfacing", "State Machines"],
            link: "https://github.com/johnnietse/smart-home-security-system"
        },
        {
            title: "Arduino Robotic Assistive Arm",
            date: "Aug 2023",
            desc: "AI-driven robotic arm integration for accessibility. Developed a computer vision pipeline using OpenCV to coordinate a 6-DOF Kinova arm with a Clearpath Jackal UGV.",
            skills: ["Robotics", "OpenCV", "Embedded Systems", "Kinova API", "ROS2"],
            link: "https://github.com/johnnietse/arduino-robotic-assistive-arm"
        },
        {
            title: "Desktop Lighting IoT Lamp",
            date: "Dec 2024",
            desc: "IoT-enabled smart lamp project. Features custom PCB design with PWM-based dimming control and remote activation via ESP32 integration for modern desk setups.",
            skills: ["ESP32", "IoT", "PCB Design", "PWM Control", "WiFi Integration"],
            link: "https://github.com/johnnietse/desktop-lighting-lamp"
        },
        {
            title: "SolidWorks Security Camera Design",
            date: "Jan 2025",
            desc: "Mechanical design and casing for a robust security camera system. Modeled in SolidWorks with considerations for IP67 weatherproofing and optimal heat dissipation.",
            skills: ["SolidWorks", "Industrial Design", "CAD", "Weatherproofing", "Thermal Analysis"],
            link: "https://github.com/johnnietse/solidworks-security-camera"
        },
        {
            title: "TaskMaster - Productivity Analytics Suite",
            date: "Apr 2025 - Present",
            desc: "Full-featured task management app with complex database schemas and PostgreSQL triggers for automated profiling. Implemented row-level security (RLS) for data isolation.",
            skills: ["React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "RLS"],
            link: "https://github.com/johnnietse/manage-mode-ui"
        },
        {
            title: "Workout Streak Hub",
            date: "Apr 2025 - Present",
            desc: "Personal fitness tracker developed with modern React patterns and Supabase authentication. Features daily workout logging, progress visualization, and CI/CD on Vercel.",
            skills: ["React", "Vite", "TypeScript", "Supabase", "Vercel", "Tailwind CSS"],
            link: "https://github.com/johnnietse/workout-streak-hub"
        },
        {
            title: "travelExpenseTracker",
            date: "Dec 2024",
            desc: "Android finance app with SQLite-backed authentication and real-time spending analytics using MPAndroidChart for competition teams.",
            skills: ["Kotlin", "Android Studio", "SQLite", "MPAndroidChart", "Mobile Dev"],
            link: "https://github.com/johnnietse/travelExpenseTracker"
        },
        {
            title: "ChillnCharm E-Commerce App",
            date: "May 2024 - Aug 2024",
            desc: "Android e-commerce prototype built with MVVM and Clean Architecture. Integrates Retrofit and ROOM for localized SQLite caching and performance optimization.",
            skills: ["Android", "Kotlin", "MVVM", "Clean Architecture", "Retrofit", "ROOM Database"],
            link: "https://github.com/johnnietse/ChillnCharm"
        },
        {
            title: "LinkedIn UI Automation Tool",
            date: "Jun 2025 - Jul 2025",
            desc: "Python automation tool integrating Selenium and OpenCV template matching to identify UI states. Engineered a fault-tolerant workflow for educational technical demonstration.",
            skills: ["Python", "Selenium", "OpenCV", "Automation", "Computer Vision"],
            link: "https://github.com/johnnietse/linkedin-connection-automation-tool"
        },
        {
            title: "ASL Hand Sign Detector",
            date: "May 2025",
            desc: "Deep learning system for sign language recognition. Trained a custom CNN to classify ASL alphabets from live video feeds with real-time feedback processing.",
            skills: ["Python", "TensorFlow", "Keras", "OpenCV", "Deep Learning"],
            link: "https://github.com/johnnietse/asl-hand-sign-detector"
        },
        {
            title: "Enterprise Stock Dashboard",
            date: "May 2025",
            desc: "Comprehensive financial analytics suite built with Power BI and Excel Power Query. Normalizes disparate market data into interactive visualizations for risk assessment.",
            skills: ["Power BI", "Excel Power Query", "Data Visualization", "Financial Modeling"],
            link: "https://github.com/johnnietse/stock-dashboard"
        },
        {
            title: "Mobile Virtual Try-On",
            date: "Jul 2025",
            desc: "Experimental mobile application utilizing augmented reality and Pose Estimation to simulate clothing trial for e-commerce platforms.",
            skills: ["Android", "OpenCV", "Pose Estimation", "AR", "Mobile Development"],
            link: "https://github.com/johnnietse/cloth-virtual-try-on"
        },
        {
            title: "Algorithmic Cryptocurrency Trading System (v1)",
            date: "Apr 2025",
            desc: "Initial prototype of a modular trading engine focusing on basic backtesting and historical data ingestion for limited cryptocurrency assets.",
            skills: ["Python", "Pandas", "Quantitative Analysis", "Finance"],
            link: "https://github.com/johnnietse/cryptocurrency-trading-system"
        }
    ];

    return (
        <main className="section container" style={{ paddingTop: '8rem' }}>

            <div className="text-center" style={{ marginBottom: '4rem' }}>
                <h1 className="title" data-aos="zoom-in">Featured Projects.</h1>
                <p className="subtitle" data-aos="fade-up" data-aos-delay="200" style={{ margin: '0 auto' }}>
                    Explore my latest technical builds, ranging from Machine Learning RAG pipelines and custom AgTech IoT hardware to high-performance C++ control systems and scalable full-stack web platforms.
                </p>
            </div>

            <div className="projects-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))' }}>
                {projects.map((proj, index) => (
                    <div className="glass-card" key={index} data-aos="fade-up" data-aos-delay={(index % 3) * 100} style={{ display: 'flex', flexDirection: 'column', padding: '2rem' }}>

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

                    </div>
                ))}
            </div>

        </main>
    );
}
