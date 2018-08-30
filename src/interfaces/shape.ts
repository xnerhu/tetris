export interface Shape {
  color?: string;
  description?: string;
  x?: number;
  y?: number;
  points?: {
    x: number;
    y: number;
  }[];
}
