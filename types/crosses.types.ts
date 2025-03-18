export interface FallingCrossesProps {
  className?: string;
  footerSelector?: string;
  footerOffset?: number;
  crossColors?: string[];
}

export interface MousePosition {
  x: number;
  y: number;
  timestamp: number;
}

export interface PhysicsState {
  engine: Matter.Engine | null;
  render: Matter.Render | null;
  ground: Matter.Body | null;
  leftWall: Matter.Body | null;
  rightWall: Matter.Body | null;
  crosses: Matter.Body[];
}
