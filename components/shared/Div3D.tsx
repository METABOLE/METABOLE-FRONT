import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import { gsap } from 'gsap';
import React, { useRef } from 'react';

interface Div3DProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  intensity?: number;
  followMouse?: boolean;
}

const Div3D = ({ children, id, className, intensity = 20, followMouse = true }: Div3DProps) => {
  const divRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!divRef.current || !followMouse) return;

    gsap.set(divRef.current, {
      rotateY: 0,
      rotateX: 0,
      transformPerspective: 500,
    });

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(divRef.current, {
        duration: 0.8,
        rotateY: (e.clientX / window.innerWidth - 0.5) * 2 * intensity,
        rotateX: -(e.clientY / window.innerHeight - 0.5) * 2 * intensity,
        transformPerspective: 500,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(divRef.current, {
        duration: 1,
        rotateY: 0,
        rotateX: 0,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity, followMouse]);

  return (
    <div
      ref={divRef}
      className={clsx('inline-block', className)}
      id={id}
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
