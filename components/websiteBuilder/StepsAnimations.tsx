import { Animation } from '@/types';
import clsx from 'clsx';

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
  return (
    <div className="flex w-full flex-col gap-6">
      {animations.map((animation) => (
        <button
          key={animation.title.fr}
          className={clsx(
            'group flex h-11 w-fit cursor-pointer items-center gap-2.5 overflow-hidden rounded-full bg-white px-6 text-black transition-colors duration-150 hover:text-white',
            selectedAnimation?.title.fr === animation.title.fr
              ? 'bg-blue text-white'
              : 'bg-white text-black',
          )}
          onClick={() => onAnimationChange(animation)}
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
