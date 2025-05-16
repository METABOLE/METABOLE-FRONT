import { ANIMATIONS } from '@/constants/websiteBuilder.constant';
import { Animation } from '@/types';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

const StepAnimations = ({
  onAnimationChange,
  initialAnimation,
}: {
  onAnimationChange?: (animation: Animation, isValid: boolean) => void;
  initialAnimation?: Animation;
}) => {
  const [selectedAnimation, setSelectedAnimation] = useState<Animation>(
    initialAnimation || ANIMATIONS.IMMERSIVES,
  );

  const validateAnimation = (animation: Animation): boolean => {
    return !!animation;
  };

  useEffect(() => {
    if (onAnimationChange) {
      const isValid = validateAnimation(selectedAnimation);
      onAnimationChange(selectedAnimation, isValid);
    }
  }, []);

  const handleSelectAnimation = (animation: Animation) => {
    setSelectedAnimation(animation);
    if (onAnimationChange) {
      const isValid = validateAnimation(animation);
      onAnimationChange(animation, isValid);
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      {Object.values(ANIMATIONS).map((animation) => (
        <button
          key={animation.title.fr}
          className={clsx(
            'group flex h-11 w-fit cursor-pointer items-center gap-2.5 overflow-hidden rounded-full bg-white px-6 text-black transition-colors duration-150 hover:text-white',
            selectedAnimation?.title.fr === animation.title.fr
              ? 'bg-blue text-white'
              : 'bg-white text-black',
          )}
          onClick={() => handleSelectAnimation(animation)}
        >
          <div className="relative z-0">
            <div
              className={clsx(
                'ease-power2-in-out top-0 z-10 h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:bg-white',
                selectedAnimation?.title.fr === animation.title.fr ? 'bg-white' : 'bg-blue',
              )}
            />
            <div
              className={clsx(
                'bg-blue ease-power2-in-out absolute top-0 -z-10 h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:scale-[50]',
                selectedAnimation?.title.fr === animation.title.fr ? 'scale-[50]' : 'scale-0',
              )}
            />
          </div>
          <span className="z-10">{animation.title.fr}</span>
        </button>
      ))}
    </div>
  );
};

export default StepAnimations;
