export interface Shape {
  color?: string;
  description?: string;
  x?: number;
  y?: number;
  rotation?: '0' | '90' | '180' | '270';
  points?: {
    x: number;
    y: number;
  }[];
}
