export interface Shape {
  color: string;
  x?: number;
  y?: number;
  points?: {
    x: number;
    y: number;
  }[];
}
