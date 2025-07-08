import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { IconChevron } from './Icons';

const ScrollButton = () => {
  const { scrollToNextSection } = useSmoothScroll();

  return (
    <button
      className="label group/scroll-button relative flex cursor-pointer flex-col items-center gap-1.5"
      onClick={scrollToNextSection}
      onMouseMove={(e) => useMagnet(e, 0.8)}
      onMouseOut={(e) => useResetMagnet(e)}
    >
      SCROLL
      <IconChevron className="ease-power4-in-out -rotate-90 stroke-black transition-transform duration-500 group-hover/scroll-button:translate-y-2" />
    </button>
  );
};

export default ScrollButton;
