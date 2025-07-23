import { usePerformance } from '@/providers/performance.provider';
import { motion, TargetAndTransition } from 'framer-motion';
import { ReactNode } from 'react';

type CustomVariants = {
  initial?: TargetAndTransition;
  enter?: TargetAndTransition;
  exit?: TargetAndTransition;
};

export default function PageTransition({ children }: { children: ReactNode }) {
  const { isLoading } = usePerformance();

  const leftBlockVariants = {
    initial: {
      scaleX: 1,
    },
    enter: {
      scaleX: 0,
      transition: {
        duration: 0,
      },
    },
    exit: {
      scaleX: 1,
      transition: {
        duration: 1,
        ease: [0.72, 0, 0.3, 0.99],
      },
    },
  };

  const rightBlockVariants = {
    initial: {
      scaleX: 1,
    },
    enter: {
      scaleX: 0,
      transition: {
        duration: 0,
      },
    },
    exit: {
      scaleX: 1,
      transition: {
        duration: 1,
        ease: [0.72, 0, 0.3, 0.99],
      },
    },
  };

  const topBlockVariants = {
    initial: {
      scaleY: 1,
    },
    enter: {
      scaleY: 0,
      transition: {
        duration: 1,
        ease: [0.72, 0, 0.3, 0.99],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        duration: 0,
      },
    },
  };

  const bottomBlockVariants = {
    initial: {
      scaleY: 1,
    },
    enter: {
      scaleY: 0,
      transition: {
        duration: 1,
        ease: [0.72, 0, 0.3, 0.99],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        duration: 0,
      },
    },
  };

  const anim = (variants: CustomVariants) => {
    return {
      initial: 'initial',
      animate: isLoading ? 'initial' : 'enter',
      exit: 'exit',
      variants,
    };
  };

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[900] h-full w-1/2 origin-left bg-black"
        {...anim(leftBlockVariants)}
      />
      <motion.div
        className="pointer-events-none fixed top-0 right-0 z-[900] h-full w-1/2 origin-right bg-black"
        {...anim(rightBlockVariants)}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[900] h-1/2 w-full origin-top bg-black"
        {...anim(topBlockVariants)}
      />
      <motion.div
        className="pointer-events-none fixed bottom-0 left-0 z-[900] h-1/2 w-full origin-bottom bg-black"
        {...anim(bottomBlockVariants)}
      />

      {children}
    </>
  );
}
