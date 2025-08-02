import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useRef } from 'react';

const Event = ({
  isSquare = false,
  className,
  icon,
  label,
  duration,
  description,
  onMouseEnter,
  onMouseLeave,
}: {
  isSquare?: boolean;
  className?: string;
  icon: React.ReactNode;
  label: string;
  duration?: string;
  description?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) => {
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const splitTextRef = useRef<SplitText | null>(null);

  useGSAP(() => {
    if (descriptionRef.current && description) {
      splitTextRef.current = new SplitText(descriptionRef.current, {
        type: 'words',
        wordsClass: 'word',
      });
      gsap.set(splitTextRef.current.words, { opacity: 0, y: 20 });
    }
  }, [description]);

  const openTimeline = () => {
    if (!splitTextRef.current) return;

    gsap.killTweensOf(splitTextRef.current.words);
    gsap.to(splitTextRef.current.words, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.01,
      ease: 'power2.out',
    });
  };

  const closeTimeline = () => {
    if (!splitTextRef.current) return;

    gsap.killTweensOf(splitTextRef.current.words);
    gsap.to(splitTextRef.current.words, {
      opacity: 0,
      y: 20,
      duration: 0.2,
      ease: 'power2.in',
    });
  };

  const handleMouseEnter = () => {
    openTimeline();
    onMouseEnter?.();
  };

  const handleMouseLeave = () => {
    closeTimeline();
    onMouseLeave?.();
  };

  return (
    <div
      className={clsx('relative p-[3px]', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={clsx(
          'z-10 flex h-9 items-center gap-2 rounded-xl px-3 md:h-14 md:gap-2.5 md:px-6',
          isSquare ? 'w-9 justify-center bg-white md:w-14' : 'bg-blue',
        )}
      >
        {icon && <div>{icon}</div>}

        <p
          className={clsx(
            'p2 row-span-8 !text-[14px] whitespace-nowrap text-white md:!text-[20px]',
            isSquare && 'absolute left-[calc(100%+14px)]',
          )}
        >
          {label}
        </p>
        {duration && (
          <span className="text-white-30 p2 !text-[14px] whitespace-nowrap md:!text-[20px]">
            (~{duration}.)
          </span>
        )}
      </div>

      {description && (
        <div
          className={clsx(
            'pointer-events-none absolute left-0 z-50 w-[288px] p-3 text-white transition-opacity duration-300',
            isSquare ? 'bottom-full' : 'top-full',
          )}
        >
          <p ref={descriptionRef} className="!text-[14px] !leading-none text-white/80">
            {description}
          </p>
        </div>
      )}
    </div>
  );
};

export default Event;
