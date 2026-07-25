export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'systems' | 'ai' | 'hardware' | 'tools';
}

export const SKILLS: Skill[] = [
  // Systems & Autonomy
  { name: 'ROS2', category: 'systems' },
  { name: 'Sensor Fusion', category: 'systems' },
  { name: 'LiDAR Arrays', category: 'hardware' },
  { name: 'Computer Vision', category: 'ai' },
  // Embedded
  { name: 'IoT Devices', category: 'hardware' },
  { name: 'ESP32', category: 'hardware' },
  { name: 'Microcontrollers', category: 'hardware' },
  { name: 'C++ Firmware', category: 'systems' },
  // HPC
  { name: 'HPC / MPI', category: 'systems' },
  { name: 'Computational Math', category: 'ai' },
  { name: 'PID Hardware Control', category: 'systems' },
  { name: 'Lennard-Jones', category: 'ai' },
  // Frontend
  { name: 'Next.js 16', category: 'frontend' },
  { name: 'React 19', category: 'frontend' },
  { name: 'Three.js', category: 'frontend' },
  { name: 'WebGL', category: 'frontend' },
  { name: 'Framer Motion', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  // Backend
  { name: 'GraphQL API', category: 'backend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'PostgreSQL', category: 'backend' },
  { name: 'Redis', category: 'backend' },
  // Tools
  { name: 'Docker', category: 'tools' },
  { name: 'Git', category: 'tools' },
  { name: 'Linux', category: 'tools' },
  { name: 'CI/CD', category: 'tools' },
];

export const SKILLS_BY_CATEGORY: Record<string, Skill[]> = {};
for (const skill of SKILLS) {
  (SKILLS_BY_CATEGORY[skill.category] ??= []).push(skill);
}
