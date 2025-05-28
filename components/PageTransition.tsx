import { motion, TargetAndTransition } from 'framer-motion';
import { ReactNode } from 'react';

type CustomVariants = {
  initial?: TargetAndTransition;
  enter?: TargetAndTransition;
  exit?: TargetAndTransition;
};

export default function PageTransition({ children }: { children: ReactNode }) {
  const expand = {
    initial: {
      scaleY: 1,
      transformOrigin: 'top',
    },
    enter: {
      scaleY: 0,
      transition: {
        duration: 0.5,
        ease: [0.72, 0, 0.3, 0.99],
      },
      transitionEnd: {
        transformOrigin: 'bottom',
      },
    },
    exit: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.72, 0, 0.3, 0.99],
      },
    },
  };

  const anim = (variants: CustomVariants) => {
    return {
      initial: 'initial',
      animate: 'enter',
      exit: 'exit',
      variants,
    };
  };

  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0 z-[910] h-screen w-screen bg-black"
        {...anim(expand)}
      />
      {children}
    </>
  );
}
