import { useTouchDevice } from '@/hooks/useTouchDevice';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { ReactNode, RefObject, useRef } from 'react';

const ScrollingContainer = ({
  children,
  scrollSpeed = 10,
  className = '',
}: {
  children: ReactNode;
  scrollSpeed?: number;
  className?: string;
}) => {
  const scrollContainer = useRef(null);
  const infiniteAnimationRef = useRef<gsap.core.Tween[]>([]);

  const { contextSafe } = useGSAP();

  const animateInfinite = (element: RefObject<HTMLDivElement | null>) => {
    if (!element.current) return;

    const tween = gsap.to(element.current.children, {
      x: '-100%',
      duration: scrollSpeed,
      repeat: -1,
      ease: 'none',
      paused: false,
    });

    infiniteAnimationRef.current.push(tween);
  };

  const controlScroll = contextSafe((action: 'play' | 'pause') => {
    infiniteAnimationRef.current.map((animation) => {
      gsap.to(animation, {
        timeScale: action === 'play' ? 1 : 0,
        duration: 1,
        ease: 'power.out',
        overwrite: true,
      });
    });
  });

  const animateScroll = contextSafe(() => {
    if (!scrollContainer.current) return;

    gsap.to(scrollContainer.current, {
      x: -400,
      ease: 'none',
      scrollTrigger: {
        trigger: scrollContainer.current,
        start: 'top bottom+=100vh',
        end: 'bottom top-=100vh',
        scrub: true,
      },
    });
  });

  useGSAP(() => {
    ScrollTrigger.refresh();
    animateInfinite(scrollContainer);
    if (useTouchDevice()) return;
    animateScroll();
  }, []);

  return (
    <div className="overflow-hidden">
      <div
        ref={scrollContainer}
        className={`flex w-screen flex-row items-center justify-center ${className}`}
        onMouseLeave={() => controlScroll('play')}
        onMouseOver={() => controlScroll('pause')}
      >
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="shrink-0">
              {children}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ScrollingContainer;
