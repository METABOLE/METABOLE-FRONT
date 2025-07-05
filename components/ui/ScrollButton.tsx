import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { IconChevron } from './Icons';

const ScrollButton = () => {
  const smoothScrollTo = (targetY: number, duration = 1300) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <button
      className="label group/scroll-button relative flex cursor-pointer flex-col items-center gap-1.5"
      onMouseMove={(e) => useMagnet(e, 0.8)}
      onMouseOut={(e) => useResetMagnet(e)}
      onClick={() => {
        const currentScrollY = window.scrollY;
        const targetScrollY = currentScrollY + window.innerHeight;

        smoothScrollTo(targetScrollY);
      }}
    >
      SCROLL
      <IconChevron className="ease-power4-in-out -rotate-90 stroke-black transition-transform duration-500 group-hover/scroll-button:translate-y-2" />
    </button>
  );
};

export default ScrollButton;
