import { ANIMATIONS } from '@/constants/websiteBuilder.constant';
import { Animation } from '@/types';
import clsx from 'clsx';
import { useState } from 'react';

export const StepAnimations = ({
  onAnimationChange,
}: {
  onAnimationChange?: (animation: Animation) => void;
  initialAnimation?: Animation;
}) => {
  const [selectedAnimation, setSelectedAnimation] = useState<Animation | null>(null);

  const handleSelectAnimation = (animation: Animation) => {
    setSelectedAnimation(animation);
    if (onAnimationChange) {
      onAnimationChange(animation);
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      {ANIMATIONS.map((animation) => (
        <button
          key={animation.title.en}
          className={clsx(
            'group flex h-11 w-fit cursor-pointer items-center gap-2.5 overflow-hidden rounded-full bg-white px-6 text-black transition-colors duration-150 hover:text-white',
            selectedAnimation?.title.en === animation.title.en
              ? 'bg-blue text-white'
              : 'bg-white text-black',
          )}
          onClick={() => handleSelectAnimation(animation)}
        >
          <div className="relative z-0">
            <div
              className={clsx(
                'ease-power2-in-out top-0 z-10 h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:bg-white',
                selectedAnimation?.title.en === animation.title.en ? 'bg-white' : 'bg-blue',
              )}
            />
            <div
              className={clsx(
                'bg-blue ease-power2-in-out absolute top-0 -z-10 h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:scale-[50]',
                selectedAnimation?.title.en === animation.title.en ? 'scale-[50]' : 'scale-0',
              )}
            />
          </div>
          <span className="z-10">{animation.title.en}</span>
        </button>
      ))}
    </div>
  );
};
