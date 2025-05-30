import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ReactNode, RefObject, useEffect, useRef } from 'react';

const Hint = ({
  children,
  container,
  isLeft,
}: {
  children: ReactNode;
  container: RefObject<HTMLElement | null>;
  isLeft?: boolean;
}) => {
  const containerHintRef = useRef(null);
  const wrapperHintRef = useRef<HTMLDivElement>(null);
  const textHintRef = useRef(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const { contextSafe } = useGSAP();

  useGSAP(() => {
    if (!wrapperHintRef.current || !textHintRef.current) return;

    timelineRef.current = contextSafe(() =>
      gsap
        .timeline({ paused: true })
        .to(wrapperHintRef.current, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out',
        })
        .to(
          wrapperHintRef.current,
          {
            width: 250,
            duration: 0.3,
            ease: 'power2.out',
          },
          '-=0.15',
        )
        .to(
          textHintRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.2,
            ease: 'power2.out',
          },
          '-=0.1',
        ),
    )();
  });

  const handleMouseMove = (e: MouseEvent) => {
    if (!container.current || !wrapperHintRef.current || !timelineRef.current) return;

    const rect = container.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
      handleMouseLeave();
      return;
    }

    timelineRef.current.play();

    const wrapperRect = wrapperHintRef.current.getBoundingClientRect();

    gsap.to(containerHintRef.current, {
      x: x + (isLeft ? -10 : 10),
      y: y - wrapperRect.height - 40,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!timelineRef.current) return;
    timelineRef.current.reverse();
  };

  useEffect(() => {
    if (!container.current) return;

    container.current.addEventListener('mousemove', handleMouseMove);
    container.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.current?.removeEventListener('mousemove', handleMouseMove);
      container.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [container]);

  return (
    <div
      ref={containerHintRef}
      className={clsx(
        'pointer-events-none absolute z-50 h-fit',
        isLeft ? '-translate-x-full' : 'translate-x-full',
      )}
    >
      <div
        ref={wrapperHintRef}
        className={clsx(
          'bg-blur-glass flex w-[250px] shrink scale-0 overflow-hidden rounded-3xl p-5 backdrop-blur-xl',
          isLeft
            ? 'origin-bottom-right -translate-x-full rounded-br-none'
            : 'origin-bottom-left rounded-bl-none',
        )}
      >
        <div
          ref={textHintRef}
          className={clsx(
            'p3 inline w-fit shrink pt-0.5 text-left !text-black opacity-0',
            isLeft ? 'translate-x-3' : '-translate-x-3',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Hint;
