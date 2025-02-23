import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import CrossField from './CrossField';
import { COLORS } from '@/types';

const InstancedField = () => {
  return (
    <div className="fixed inset-0 -z-20 opacity-20">
      <Canvas>
        <OrbitControls />
        <OrthographicCamera position={[0, 0, 10]} rotation={[0, 0, 0]} zoom={30} makeDefault />
        <CrossField color={COLORS.BLUE} columns={70} crossSize={0.2} rows={50} spacing={1} />
      </Canvas>
    </div>
  );
};

export default InstancedField;
