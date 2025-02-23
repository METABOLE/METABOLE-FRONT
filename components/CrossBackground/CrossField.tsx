import { COLORS } from '@/types';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Vector2, Vector3 } from 'three';
import Cross from './Cross';

interface CrossFieldProps {
  rows?: number;
  columns?: number;
  spacing?: number;
  crossSize?: number;
  color?: string;
  repulsionRadius?: number;
  repulsionStrength?: number;
}

const CrossField = ({
  rows = 10,
  columns = 10,
  spacing = 0.3,
  crossSize = 0.2,
  color = COLORS.BLUE,
  repulsionRadius = 30,
  repulsionStrength = 0.8,
}: CrossFieldProps) => {
  const mouse = useRef(new Vector2());
  const crossRefs = useRef<THREE.Group[]>([]);
  const { camera } = useThree();

  const crosses = useMemo(() => {
    const items = [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const x = (j - columns / 2) * spacing;
        const y = (i - rows / 2) * spacing;

        items.push({
          originalPosition: new Vector3(x, y, 0),
          key: `cross-${i}-${j}`,
        });
      }
    }

    return items;
  }, [rows, columns, spacing]);

  const onMouseMove = (event: MouseEvent) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;

    const orthoCam = camera as THREE.OrthographicCamera;
    mouse.current.x = (x * (orthoCam.right - orthoCam.left)) / (2 * orthoCam.zoom);
    mouse.current.y = (y * (orthoCam.top - orthoCam.bottom)) / (2 * orthoCam.zoom);
  };

  useMemo(() => {
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [camera]);

  useFrame(() => {
    crosses.forEach((cross, index) => {
      const crossRef = crossRefs.current[index];
      if (!crossRef) return;

      const distanceToMouse = new Vector2(
        cross.originalPosition.x - mouse.current.x,
        cross.originalPosition.y - mouse.current.y,
      ).length();

      if (distanceToMouse < repulsionRadius) {
        const angle = Math.atan2(
          cross.originalPosition.y - mouse.current.y,
          cross.originalPosition.x - mouse.current.x,
        );

        const repulsion = (1 - distanceToMouse / repulsionRadius) * repulsionStrength;

        crossRef.position.x = cross.originalPosition.x + Math.cos(angle) * repulsion;
        crossRef.position.y = cross.originalPosition.y + Math.sin(angle) * repulsion;
      } else {
        crossRef.position.copy(cross.originalPosition);
      }
    });
  });

  return (
    <group>
      {crosses.map((cross, index) => (
        <group
          key={cross.key}
          ref={(el) => (crossRefs.current[index] = el!)}
          position={cross.originalPosition}
        >
          <Cross color={color} height={crossSize} width={crossSize} />
        </group>
      ))}
    </group>
  );
};

export default CrossField;
