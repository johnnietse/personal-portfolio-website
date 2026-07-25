export interface Location {
  city: string;
  lat: number;
  lon: number;
  label: string;
  type: 'education' | 'work' | 'project';
}

/**
 * Geographic locations for the WebGL globe.
 * Replace with your own locations — format: { city, lat, lon, label, type }
 * 
 * @example
 * export const LOCATIONS: Location[] = [
 *   { city: 'San Francisco, CA', lat: 37.7749, lon: -122.4194, label: 'Work', type: 'work' },
 *   { city: 'Boston, MA', lat: 42.3601, lon: -71.0589, label: 'University', type: 'education' },
 * ];
 * 
 * @example
 * // Public school info is fine to include:
 * export const LOCATIONS: Location[] = [
 *   { city: 'Kingston, ON', lat: 44.2312, lon: -76.4860, label: "Queen's University", type: 'education' },
 * ];
 */
export const LOCATIONS: Location[] = [
  // Public education info is fine to include
  { city: 'Kingston, ON', lat: 44.2312, lon: -76.4860, label: "Queen's University", type: 'education' },
  // Add your own locations here:
  // { city: 'City, State', lat: 0.0, lon: 0.0, label: 'Label', type: 'work' },
];
