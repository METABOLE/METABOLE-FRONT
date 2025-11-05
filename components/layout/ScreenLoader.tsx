import { useScroll } from '@/hooks/useScroll';
import { usePerformance } from '@/providers/performance.provider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import SafeNumberFlow from '../shared/SafeNumberFlow';

const ScreenLoader = () => {
  const screenLoaderRef = useRef(null);
  const maskRef = {
    topLeft: useRef(null),
    topRight: useRef(null),
    bottomLeft: useRef(null),
    bottomRight: useRef(null),
  };
  const barRefs = {
    vertical: useRef(null),
    horizontalRight: useRef(null),
    horizontalLeft: useRef(null),
  };
  const progressWrapperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const progressRef = useRef({ value: 0 });

  const { contextSafe } = useGSAP();
  const { lockScroll } = useScroll();
  const { isLoading } = usePerformance();

  const revealAnimation = contextSafe(() => {
    if (
      !barRefs.vertical.current ||
      !barRefs.horizontalRight.current ||
      !barRefs.horizontalLeft.current
    )
      return;

    gsap
      .timeline({
        delay: 0.5,
        defaults: {
          duration: 1.2,
          ease: 'power4.inOut',
        },
      })
      .to(progressWrapperRef.current, {
        scale: 1,
        duration: 0.5,
      })
      .to(
        barRefs.vertical.current,
        {
          scaleY: 1,
          duration: 0.5,
        },
        '<',
      )
      .to(
        [barRefs.horizontalRight.current, barRefs.horizontalLeft.current],
        {
          scaleX: 1,
          duration: 0.5,
        },
        '<',
      )
      .to({}, { duration: 0.5 })
      .addLabel('progress')
      .to(
        progressRef.current,
        {
          value: 100,
          duration: 2,
          ease: 'power4.inOut',
          onUpdate: function () {
            setProgress(Math.round(progressRef.current.value));
          },
        },
        'progress',
      )
      .to(
        [barRefs.horizontalRight.current, barRefs.horizontalLeft.current],
        {
          duration: 2,
          width: '50vw',
        },
        'progress+=0.2',
      )
      .to(
        barRefs.vertical.current,
        {
          duration: 2,
          height: '100vh',
        },
        'progress+=0.2',
      )
      .to({}, { duration: 1 })
      .add(() => setIsRevealed(true));
  });

  const disappearAnimation = contextSafe(() => {
    if (
      !barRefs.vertical.current ||
      !barRefs.horizontalRight.current ||
      !barRefs.horizontalLeft.current
    )
      return;

    gsap
      .timeline()
      .addLabel('disappear')
      .to(
        barRefs.vertical.current,
        {
          opacity: 0,
          duration: 0.3,
        },
        'disappear',
      )
      .set(
        [barRefs.horizontalRight.current, barRefs.horizontalLeft.current],
        {
          transformOrigin: (i) => (i === 0 ? 'left' : 'right'),
        },
        'disappear',
      )
      .to(
        progressWrapperRef.current,
        {
          x: 200,
          duration: 0.4,
          ease: 'power4.in',
        },
        'disappear',
      )
      .to(
        [
          maskRef.topLeft.current,
          maskRef.bottomLeft.current,
          maskRef.topRight.current,
          maskRef.bottomRight.current,
          barRefs.horizontalRight.current,
          barRefs.horizontalLeft.current,
        ],
        {
          scaleX: 0,
          duration: 1,
          ease: 'power4.inOut',
        },
        'disappear',
      )
      .add(() => lockScroll(false), 'disappear+=0.5')
      .set(screenLoaderRef.current, {
        display: 'none',
      });
  });

  useGSAP(() => {
    revealAnimation();
  }, []);

  useGSAP(() => {
    if (isLoading || !isRevealed) return;
    disappearAnimation();
  }, [isLoading, isRevealed]);

  return (
    <div ref={screenLoaderRef} className="fixed inset-0 z-[950] grid grid-cols-2 grid-rows-2">
      <div ref={maskRef.topLeft} className="h-full w-full origin-left bg-black" />
      <div ref={maskRef.topRight} className="h-full w-full origin-right bg-black" />
      <div ref={maskRef.bottomLeft} className="h-full w-full origin-left bg-black" />
      <div ref={maskRef.bottomRight} className="h-full w-full origin-right bg-black" />
      <div className="absolute bottom-1/2 left-1/2 overflow-hidden p-4">
        <div ref={progressWrapperRef} className="origin-bottom-left scale-0 text-white">
          <SafeNumberFlow
            format={{ minimumIntegerDigits: 3, useGrouping: false }}
            value={progress}
          />
        </div>
      </div>
      <div
        ref={barRefs.vertical}
        className="absolute top-1/2 left-1/2 h-2 w-0.5 -translate-x-1/2 -translate-y-1/2 scale-y-0 bg-white"
      />
      <div
        ref={barRefs.horizontalRight}
        className="absolute top-1/2 right-1/2 h-0.5 w-1 origin-right -translate-y-1/2 scale-x-0 bg-white"
      />
      <div
        ref={barRefs.horizontalLeft}
        className="absolute top-1/2 left-1/2 h-0.5 w-1 origin-left -translate-y-1/2 scale-x-0 bg-white"
      />
    </div>
  );
};

export default ScreenLoader;
