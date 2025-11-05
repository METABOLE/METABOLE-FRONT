import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import SafeNumberFlow from '../shared/SafeNumberFlow';
import { useScrollLock } from '@/hooks/useToggleScroll';

export default function ScrollBar() {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);

  const { contextSafe } = useGSAP();
  const { isLocked } = useScrollLock();

  const scrollAnim = contextSafe(() => {
    gsap.set(progressBarRef.current, { height: 0 });

    gsap.to(progressBarRef.current, {
      height: '100%',
      duration: 1,
      ease: 'none',
      scrollTrigger: {
        scrub: true,
        onUpdate: (self) => setPercent(self.progress),
      },
    });
  });

  useGSAP(() => {
    requestAnimationFrame(() => scrollAnim());
  }, []);

  useGSAP(() => {
    scrollAnim();
  }, [isLocked]);

  return (
    <div className="bg-blur-glass pointer-events-none fixed top-1/2 right-10 z-[500] h-48 w-0.5 -translate-y-1/2">
      <div ref={progressBarRef} className="bg-blue absolute h-full w-0.5">
        <SafeNumberFlow
          className="label text-blue absolute right-2 -bottom-[19px] min-w-[3ch] tabular-nums"
          suffix="%"
          value={Math.min(Math.round(percent * 100), 100)}
        />
        <svg
          className="stroke-blue absolute -right-[3px] -bottom-3"
          fill="none"
          height="8"
          viewBox="0 0 8 8"
          width="8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 4L8 4" strokeWidth="2" />
          <path d="M4 0L4 8" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}
