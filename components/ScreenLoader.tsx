import Lottie from '@/components/Lottie';
import { useEnvironment } from '@/hooks/useEnvironment';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import metaboleFull from '../public/lotties/metabole-full-loader.json';

const ScreenLoader = () => {
  const lottieRef = useRef(null);
  const screenLoaderRef = useRef(null);

  const { isProd } = useEnvironment();
  const { contextSafe } = useGSAP();

  useGSAP(() => {
    gsap.set(screenLoaderRef.current, {
      delay: 1.8,
      display: 'none',
    });
  }, []);

  const handdleEndLottie = contextSafe(() => {
    gsap
      .timeline()
      .to(
        lottieRef.current,
        {
          scaleY: 0,
          duration: 0.1,
          ease: 'power2.out',
        },
        '-=0.6',
      )
      .set([lottieRef.current, screenLoaderRef.current], {
        display: 'none',
      });
  });

  return (
    <>
      <div ref={screenLoaderRef} className="fixed inset-0 z-[950] bg-white"></div>
      {isProd && (
        <div
          ref={lottieRef}
          className="fixed top-1/2 left-1/2 z-[970] -translate-x-1/2 -translate-y-1/2"
        >
          <Lottie
            animationData={metaboleFull}
            className="h-48"
            loop={false}
            onComplete={handdleEndLottie}
          />
        </div>
      )}
    </>
  );
};

export default ScreenLoader;
