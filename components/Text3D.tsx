import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import { gsap } from 'gsap';
import React, { useRef } from 'react';

interface Text3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

const Div3D = ({ children, className, intensity = 20 }: Text3DProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(textRef.current, {
        duration: 0.8,
        rotateY: (e.clientX / window.innerWidth - 0.5) * 2 * intensity,
        rotateX: -(e.clientY / window.innerHeight - 0.5) * 2 * intensity,
        transformPerspective: 500,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [intensity]);

  return (
    <div
      ref={textRef}
      className={clsx('inline-block', className)}
      style={{
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </div>
  );
};

export default Div3D;
