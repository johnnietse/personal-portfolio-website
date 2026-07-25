export interface Location {
  city: string;
  lat: number;
  lon: number;
  label: string;
  type: 'education' | 'work' | 'project';
}

/** Personal geographic locations for the WebGL globe. */
export const LOCATIONS: Location[] = [
  { city: 'Kingston, ON', lat: 44.2312, lon: -76.4860, label: "Queen's University", type: 'education' },
];
