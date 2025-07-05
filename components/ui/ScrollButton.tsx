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
      className="label relative flex cursor-pointer flex-col items-center gap-1.5"
      onClick={() => {
        const currentScrollY = window.scrollY;
        const targetScrollY = currentScrollY + window.innerHeight;

        smoothScrollTo(targetScrollY);
      }}
    >
      SCROLL
      <IconChevron className="-rotate-90 stroke-black" />
    </button>
  );
};

export default ScrollButton;
