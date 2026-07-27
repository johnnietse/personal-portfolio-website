export interface Location {
  city: string;
  lat: number;
  lon: number;
  label: string;
  type: 'education' | 'work' | 'project';
  icon: string;
  experiences: string[];
}

/**
 * Geographic locations for the WebGL globe.
 * Each pin links to experiences from that location.
 */
export const LOCATIONS: Location[] = [
  {
    city: 'Kingston, ON',
    lat: 44.2312,
    lon: -76.4860,
    label: "Queen's University",
    type: 'education',
    icon: '/globe-kingston.svg',
    experiences: [
      'Computer Engineering (B.A.Sc.)',
      "AutoDrive Team — CAN Lead, Embedded Systems (SAE Level 4)",
      'QHPC — Co-Founder & COO (40+ member HPC club)',
      "EngSoc — Sci '26 Vice-President, Equity Officer, ECE Club Treasurer",
      'QWeb — Full Stack Developer (e-learning platform)',
      'FYIC — Webmaster (130+ students, 18+ universities)',
      'Relectric Car Team — Design Engineer (EV battery enclosure)',
    ],
  },
  {
    city: 'Hong Kong SAR',
    lat: 22.3193,
    lon: 114.1694,
    label: 'Hong Kong',
    type: 'work',
    icon: '/globe-hk.svg',
    experiences: [
      'Arista Networks — Project Financial Management Intern ($2M portfolio analysis)',
      'Foresoon Engineering — Electrical & Robotics Engineer Assistant (Kinova arm + ROS)',
    ],
  },
  {
    city: 'Remote',
    lat: 0,
    lon: 0,
    label: 'Remote / Distributed',
    type: 'project',
    icon: '/globe-remote.svg',
    experiences: [
      'vLLM — Open Source Research Contributor (llm-d ecosystem)',
      'Kubernetes — SIG Apps & SIG Cluster Lifecycle Contributor',
      'Deel — ML Research Assistant (Legal AI, RAG + MCTS)',
    ],
  },
];
