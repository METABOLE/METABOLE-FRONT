import { COLORS } from '@/types';
import { useMemo } from 'react';
import * as THREE from 'three';

interface CrossProps {
  width?: number;
  height?: number;
  color?: string;
}

const THICKNESS = 0.04;

const Cross = ({ width = 0.2, height = 0.2, color = COLORS.BLUE }: CrossProps) => {
  const geometry = useMemo(() => {
    const vertices = new Float32Array([
      -width / 2,
      -THICKNESS / 2,
      0,
      width / 2,
      -THICKNESS / 2,
      0,
      width / 2,
      THICKNESS / 2,
      0,
      -width / 2,
      THICKNESS / 2,
      0,

      -THICKNESS / 2,
      -height / 2,
      0,
      THICKNESS / 2,
      -height / 2,
      0,
      THICKNESS / 2,
      height / 2,
      0,
      -THICKNESS / 2,
      height / 2,
      0,
    ]);

    const indices = new Uint16Array([0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7]);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    geometry.computeVertexNormals();

    return geometry;
  }, [width, height, THICKNESS]);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

export default Cross;
