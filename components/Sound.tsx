import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useSound } from '@/providers/sound.provider';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import { gsap } from 'gsap';
import { useRef } from 'react';

const Sound = ({ className }: { className?: string }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { isSoundOn, setIsSoundOn } = useSound();
  const timelineRef = useRef<gsap.core.Timeline>(gsap.timeline());

  const { contextSafe } = useGSAP();

  const soundOn = contextSafe(() => {
    if (!wrapperRef.current) return;

    const children = Array.from(wrapperRef.current.children);

    timelineRef.current?.kill();

    timelineRef.current = gsap
      .timeline({
        repeat: -1,
      })
      .to(children, {
        scaleY: 1,
        duration: 0.3,
        ease: 'power2.inOut',
        stagger: {
          each: 0.1,
        },
      })
      .to(children, {
        scaleY: 0.5,
        duration: 0.3,
        ease: 'power2.inOut',
        stagger: {
          each: 0.1,
        },
      });
  });

  const soundOff = contextSafe(() => {
    if (!wrapperRef.current) return;

    const children = Array.from(wrapperRef.current.children);

    timelineRef.current?.kill();

    timelineRef.current = gsap.timeline().to(children, {
      scaleY: 0.15,
      duration: 0.3,
      ease: 'power2.inOut',
      stagger: {
        each: 0.08,
        from: 'center',
      },
    });
  });

  useGSAP(() => {
    if (isSoundOn) {
      soundOn();
    } else {
      soundOff();
    }
  }, [isSoundOn]);

  return (
    <div
      className={clsx('bg-blue h-11 w-11 cursor-pointer rounded-full', className)}
      onClick={() => setIsSoundOn(!isSoundOn)}
      onMouseMove={(e) => useMagnet(e, 0.8)}
      onMouseOut={(e) => useResetMagnet(e)}
    >
      <div
        ref={wrapperRef}
        className="flex h-full w-full items-center justify-center gap-1"
        onMouseMove={(e) => useMagnet(e, 0.4)}
        onMouseOut={(e) => useResetMagnet(e)}
      >
        {[...Array(4)].map((_, index) => (
          <div key={index} className="h-[18px] w-0.5 origin-center rounded-full bg-white" />
        ))}
      </div>
    </div>
  );
};

export default Sound;
