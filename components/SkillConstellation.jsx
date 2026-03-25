"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';

// Orbital mechanics representing high-end engineering skills natively hovering in WebGL Spherical coordinates
const SkillNode = ({ img, label, radius, angle, speed, index }) => {
    const ref = useRef();

    // Strict mathematical orbital locking generating beautiful intersecting rotational rings
    useFrame((state) => {
        if (!ref.current) return;
        const time = state.clock.elapsedTime * speed;
        // Orbit equation mapping items spherically based on deterministic indexing (X, Y, Z translations)
        ref.current.position.x = Math.sin(time + angle) * radius;
        ref.current.position.z = Math.cos(time + angle) * radius;
        ref.current.position.y = Math.sin(time * 0.5 + index) * (radius * 0.4);
    });

    return (
        <group ref={ref}>
            {/* The Html tag bridges native Three.js 3D coordinates back into the React DOM seamlessly! */}
            <Html transform sprite center distanceFactor={15}>
                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(15, 23, 42, 0.8)', padding: '12px', borderRadius: '16px',
                    border: '1px solid rgba(56, 189, 248, 0.4)', backdropFilter: 'blur(4px)',
                    pointerEvents: 'none', userSelect: 'none'
                }}>
                    <img src={img} alt={label} style={{ width: '45px', height: '45px', objectFit: 'contain', marginBottom: '8px' }} />
                    <span style={{ color: '#e2e8f0', fontSize: '11px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{label}</span>
                </div>
            </Html>
        </group>
    );
};

export default function SkillConstellation() {
    // Array of critical top-level technical skills extracted natively from the engineering matrix
    const skills = useMemo(() => [
        { img: '/nextjs.png', label: 'Next.js 15' },
        { img: '/react-logo.png', label: 'React.js' },
        { img: '/kubernetes.png', label: 'Kubernetes' },
        { img: '/docker-mark-ocean-blue.svg', label: 'Docker' },
        { img: '/icons8-python.png', label: 'Python ML' },
        { img: '/icons8-c.png', label: 'C++ Systems' },
        { img: '/go.svg', label: 'Golang Core' },
        { img: '/ros_logo.svg', label: 'ROS2 Autonomy' },
        { img: '/Three.js.svg', label: 'Three.js Spatial' },
        { img: '/open-mpi-logo.png', label: 'OpenMPI HPC' },
        { img: '/Terraform_Logo.svg', label: 'AWS & Terraform' },
        { img: '/pytorch.svg', label: 'PyTorch' },
        { img: '/huggingface.svg', label: 'Hugging Face' },
        { img: '/sql.png', label: 'SQL DBs' },
        { img: '/mongodb.png', label: 'MongoDB' },
        { img: '/VHDL.png', label: 'FPGA VHDL' },
        { img: '/linux.svg', label: 'Linux OS' },
        { img: '/ansible.png', label: 'Ansible' },
        { img: '/solidworks.png', label: 'SolidWorks' },
        { img: '/pinecone.svg', label: 'Pinecone Vector' },
        { img: '/fastapi.png', label: 'FastAPI' },
        { img: '/icons8-java.png', label: 'Java Apps' },
        { img: '/Kotlin_Icon.png', label: 'Kotlin' },
        { img: '/Grafana.svg', label: 'Grafana' }
    ], []);

    return (
        <Canvas camera={{ position: [0, 5, 25], fov: 50 }} style={{ cursor: 'grab', background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.2) 0%, transparent 100%)' }}>
            <ambientLight intensity={1.5} />
            <pointLight position={[0, 0, 0]} intensity={3} color="#38bdf8" />

            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Central Core representing computational mind */}
                <mesh>
                    <icosahedronGeometry args={[2.5, 2]} />
                    <meshPhysicalMaterial color="#0ea5e9" wireframe={true} emissive="#0284c7" emissiveIntensity={0.8} />
                </mesh>

                {/* Orbital Nodes Mapping */}
                {skills.map((skill, index) => {
                    // Staggering the rings mathematically so they don't clip into each other
                    const radius = 7 + (index % 4) * 3;
                    const angle = (index / skills.length) * Math.PI * 2;
                    const speed = 0.2 + (index % 3) * 0.1; // Differential rotation speeds

                    return (
                        <SkillNode
                            key={`skill-node-${index}`}
                            index={index}
                            img={skill.img}
                            label={skill.label}
                            radius={radius}
                            angle={angle}
                            speed={index % 2 === 0 ? speed : -speed} // Intersecting counter-rotating orbits
                        />
                    );
                })}
            </Float>

            {/* Permits the user to literally grab the galaxy and spin it to examine their skills 3-dimensionally */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={true}
                autoRotateSpeed={1.0}
            />
        </Canvas>
    );
}
