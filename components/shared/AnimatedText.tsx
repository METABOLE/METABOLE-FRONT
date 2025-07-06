import { useLanguage } from '@/providers/language.provider';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { forwardRef, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, SplitText);

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  start?: string;
  stagger?: number;
  duration?: number;
}

const AnimatedText = forwardRef<HTMLElement, AnimatedTextProps>(
  (
    {
      children,
      className,
      variant = 'p',
      start = 'top 80%',
      duration = 1.2,
      stagger = 0.02,
      ...props
    },
    ref,
  ) => {
    const textRef = useRef(null);
    const elementRef = ref || textRef;

    const { isFrench } = useLanguage();

    const { contextSafe } = useGSAP();

    const animateText = contextSafe(() => {
      const element = elementRef as React.RefObject<HTMLElement>;
      if (!element?.current) return;

      const split = new SplitText(element.current, {
        type: 'words',
      });

      gsap.set(split.words, {
        yPercent: 100,
        opacity: 0,
        filter: 'blur(10px)',
      });

      gsap.to(split.words, {
        yPercent: 0,
        opacity: 1,
        duration,
        filter: 'blur(0px)',
        stagger,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: element.current,
          start,
          toggleActions: 'play none none reverse',
        },
      });
    });

    useGSAP(() => {
      animateText();
    }, [isFrench]);

    const Tag = variant;

    return (
      <Tag ref={elementRef as React.RefObject<HTMLHeadingElement>} className={className} {...props}>
        {children}
      </Tag>
    );
  },
);

export default AnimatedText;
