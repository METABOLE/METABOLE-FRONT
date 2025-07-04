import clsx from 'clsx';
import { useState, useRef, useEffect } from 'react';
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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
          'z-10 flex h-14 items-center gap-2.5 rounded-xl px-6',
          isSquare ? 'w-14 justify-center bg-white' : 'bg-blue',
        )}
      >
        {icon && <div>{icon}</div>}

        <p
          className={clsx(
            'p2 row-span-8 whitespace-nowrap text-white',
            isSquare && 'absolute left-[calc(100%+14px)]',
          )}
        >
          {label}
        </p>
        {duration && <span className="text-white-30 p2 whitespace-nowrap">(~{duration}.)</span>}
      </div>

      {description && (
        <div
          className={clsx(
            'pointer-events-none absolute left-0 z-20 w-[288px] p-4 text-white transition-opacity duration-300',
            isSquare ? 'bottom-full' : 'top-full',
          )}
        >
          <p ref={descriptionRef} className="p2 text-white/80">
            {description}
          </p>
        </div>
      )}
    </div>
  );
};

export default Event;
