import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import { gsap } from 'gsap';
import React, { useRef } from 'react';

interface Text3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

const Text3D = ({ children, className, intensity = 20 }: Text3DProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(textRef.current, {
        duration: 0.5,
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
    <span
      ref={textRef}
      className={clsx('inline-block', className)}
      style={{
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </span>
  );
};

export default Text3D;
