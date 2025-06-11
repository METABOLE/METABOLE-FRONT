import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import { forwardRef, type ReactNode, useImperativeHandle, useRef } from 'react';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

type Props = {
  variant: Variant;
  animate?: boolean;
  children: ReactNode;
  className?: string;
};

export type AnimatedTypoRef = {
  play: () => gsap.core.Tween | gsap.core.Timeline;
  reverse: () => gsap.core.Tween | gsap.core.Timeline;
  reset: () => void;
};

const Typography = forwardRef<AnimatedTypoRef, Props>(
  ({ variant, animate = false, children, className }, ref) => {
    const elementRef = useRef<HTMLElement>(null);
    const splitText = useRef<SplitText | null>(null);

    const { contextSafe } = useGSAP();

    useGSAP(() => {
      if (!elementRef.current) return;
      splitText.current = new SplitText(elementRef.current, {
        type: 'words',
        mask: 'words',
      });
      if (!animate) return;
      gsap.set([...splitText.current.words], { y: 40, opacity: 0 });
    }, [children]);

    const play = contextSafe(() => {
      if (!splitText.current) return gsap.timeline();
      gsap.killTweensOf(splitText.current.words);
      return gsap.fromTo(
        splitText.current.words,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.02,
          duration: 1.2,
          ease: 'power2.out',
        },
      );
    });

    const reverse = contextSafe(() => {
      if (!splitText.current) return gsap.timeline();
      gsap.killTweensOf(splitText.current.words);
      return gsap.to(splitText.current.words, {
        y: 40,
        opacity: 0,
        stagger: 0.02,
        duration: 1.2,
        ease: 'power2.out',
      });
    });

    const reset = contextSafe(() => {
      if (!splitText.current) return;
      gsap.set(splitText.current.words, { y: 40, opacity: 0 });
    });

    useImperativeHandle(ref, () => ({
      play,
      reverse,
      reset,
    }));

    const Tag = variant;

    return (
      <Tag
        ref={(el) => {
          elementRef.current = el;
        }}
        className={clsx(className)}
      >
        {children}
      </Tag>
    );
  },
);

export default Typography;
