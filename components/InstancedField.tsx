import { OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';

const fragmentShader = `
  uniform vec3 uColor;
  varying vec2 vUv;
  
  float createCross(vec2 pos, float size) {
    float horizontal = smoothstep(size, size * 0.3, abs(pos.y)) * step(abs(pos.x), 0.2);
    float vertical = smoothstep(size, size * 0.3, abs(pos.x)) * step(abs(pos.y), 0.2);
    return max(horizontal, vertical);
  }

  void main() {
    vec2 pos = fract(vUv * 70.0) * 2.0 - 1.0;
    float crossShape = createCross(pos, 0.03);
    gl_FragColor = vec4(uColor, crossShape);
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const GridField = () => {
  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color('#1b17ee') },
    }),
    [],
  );

  return (
    <mesh scale={[20, 20, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        depthWrite={false}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        vertexShader={vertexShader}
        transparent
      />
    </mesh>
  );
};

const InstancedField = () => {
  return (
    <div className="fixed inset-0 -z-20 opacity-20">
      <Canvas>
        <OrthographicCamera position={[0, 0, 5]} zoom={140} makeDefault />
        <GridField />
      </Canvas>
    </div>
  );
};

export default InstancedField;
