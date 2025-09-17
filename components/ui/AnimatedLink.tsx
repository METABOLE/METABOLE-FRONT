import { useGSAP } from '@gsap/react';
import { clsx } from 'clsx';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import Link from 'next/link';
import { forwardRef, useRef } from 'react';

gsap.registerPlugin(SplitText);

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  scroll?: boolean;
  onClick?: () => void;
  target?: string;
}

const AnimatedLink = forwardRef<HTMLAnchorElement, AnimatedLinkProps>(
  ({ href, children, className, scroll = false, onClick, target, ...props }, ref) => {
    const { contextSafe } = useGSAP();

    const linkRef = useRef<HTMLAnchorElement>(null);
    const currentChildRef = useRef(null);
    const absoluteChildRef = useRef(null);
    const timelineRef = useRef(gsap.timeline({ paused: true }));

    const initSplitText = contextSafe(() => {
      if (!currentChildRef.current || !absoluteChildRef.current) return;

      const splitText = new SplitText(currentChildRef.current, {
        type: 'chars',
        mask: 'chars',
      });
      const absoluteSplitText = new SplitText(absoluteChildRef.current, {
        type: 'chars',
        mask: 'chars',
      });

      gsap.set(splitText.chars, { yPercent: 0 });
      gsap.set(absoluteSplitText.chars, { yPercent: 110 });

      timelineRef.current
        .to(
          splitText.chars,
          {
            yPercent: -110,
            duration: 0.2,
            stagger: 0.015,
            ease: 'power2.in',
          },
          '<',
        )
        .to(
          absoluteSplitText.chars,
          {
            yPercent: 0,
            duration: 0.3,
            stagger: 0.015,
            ease: 'power2.out',
          },
          '<0.1',
        );
    });

    const showHoverAnimation = contextSafe(() => {
      if (!timelineRef.current) return;
      timelineRef.current.play();
    });

    const hideHoverAnimation = contextSafe(() => {
      if (!timelineRef.current) return;
      timelineRef.current.reverse();
    });

    useGSAP(() => {
      initSplitText();
    }, [children]);

    return (
      <Link
        ref={(el) => {
          if (typeof ref === 'function') {
            ref(el);
          } else if (ref) {
            ref.current = el;
          }
          linkRef.current = el;
        }}
        className={clsx('relative flex flex-col overflow-hidden', className)}
        href={href}
        scroll={scroll}
        target={target}
        onClick={onClick}
        onMouseEnter={showHoverAnimation}
        onMouseLeave={hideHoverAnimation}
        {...props}
      >
        <span ref={currentChildRef} className="text-black-70 relative z-10">
          {children}
        </span>
        <span ref={absoluteChildRef} aria-hidden={true} className="text-blue absolute z-10">
          {children}
        </span>
      </Link>
    );
  },
);

AnimatedLink.displayName = 'AnimatedLink';

export default AnimatedLink;
