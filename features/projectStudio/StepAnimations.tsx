import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useLanguage } from '@/providers/language.provider';
import { Animation } from '@/types';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface StepAnimationsProps {
  animations: Animation[];
  selectedAnimation: Animation;
  onAnimationChange: (animation: Animation) => void;
}

const StepAnimations = ({
  animations,
  selectedAnimation,
  onAnimationChange,
}: StepAnimationsProps) => {
  const { isFrench } = useLanguage();

  return (
    <div className="flex w-full flex-col gap-6 p-6">
      {animations.map((animation, index) => (
        <>
          <motion.button
            key={animation.title.fr}
            animate={{ scale: 1, transformOrigin: 'left' }}
            exit={{ scale: 0, transformOrigin: 'left' }}
            initial={{ scale: 0, transformOrigin: 'left' }}
            className={clsx(
              'group flex w-fit cursor-pointer overflow-hidden rounded-full bg-white text-black transition-colors duration-150 hover:text-white',
              selectedAnimation?.title.fr === animation.title.fr
                ? 'bg-blue text-white'
                : 'bg-white text-black',
            )}
            transition={{
              duration: 0.3,
              ease: [0.76, 0, 0.24, 1],
              delay: index * 0.02,
            }}
            layout
            onClick={() => onAnimationChange(animation)}
            onMouseMove={(e) => useMagnet(e, 0.8)}
            onMouseOut={(e) => useResetMagnet(e)}
          >
            <div
              className="flex h-11 items-center gap-2.5 px-6"
              onMouseMove={(e) => useMagnet(e, 0.4)}
              onMouseOut={(e) => useResetMagnet(e)}
            >
              <div className="relative z-0">
                <div
                  className={clsx(
                    'ease-power2-in-out top-0 z-10 h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:bg-white',
                    selectedAnimation?.type === animation.type ? 'bg-white' : 'bg-blue',
                  )}
                />
                <div
                  className={clsx(
                    'bg-blue ease-power2-in-out absolute top-0 -z-10 h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:scale-[50]',
                    selectedAnimation?.type === animation.type ? 'scale-[50]' : 'scale-0',
                  )}
                />
              </div>
              <span className="z-10">{animation.title[isFrench ? 'fr' : 'en']}</span>
            </div>
          </motion.button>
        </>
      ))}
    </div>
  );
};

export default StepAnimations;
