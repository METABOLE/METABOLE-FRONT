import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useLanguage } from '@/providers/language.provider';
import { COLORS } from '@/types';
import { useGSAP } from '@gsap/react';
import { clsx } from 'clsx';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import Link from 'next/link';
import {
  ComponentProps,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

gsap.registerPlugin(SplitText);

interface BaseButtonProps {
  children: ReactNode;
  className?: string;
  transformOrigin?: 'left' | 'right' | 'center';
  color?: 'primary' | 'secondary' | 'tertiary';
  isDark?: boolean;
  disabled?: boolean;
}

type DivButtonProps = BaseButtonProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof BaseButtonProps> & {
    href?: never;
    target?: never;
  };

interface LinkButtonProps extends BaseButtonProps {
  href: string;
  target?: string;
  scroll?: boolean;
}

type ButtonProps = DivButtonProps | LinkButtonProps;

type DynamicElementProps = {
  href?: string;
  target?: string;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  scroll?: boolean;
} & ComponentProps<'div'>;

const DynamicElement = ({ href, disabled, scroll = false, ...props }: DynamicElementProps) => {
  const Component = href && !disabled ? Link : 'button';
  return <Component {...(props as LinkButtonProps)} {...(href && !disabled && { href, scroll })} />;
};

export interface AnimatedButtonRef {
  play: () => void;
  reverse: () => void;
}

const Button = forwardRef<AnimatedButtonRef, ButtonProps>(
  (
    {
      children,
      href,
      transformOrigin = 'left',
      color = 'primary',
      target,
      isDark = false,
      className,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const wrapperButtonRef = useRef(null);
    const backgroudButtonRef = useRef(null);
    const buttonRef = useRef(null);
    const hiddenButtonRef = useRef<HTMLDivElement>(null);
    const textRef = useRef(null);
    const currentChildRef = useRef(null);
    const absoluteChildRef = useRef(null);
    const timelineHoverRef = useRef<gsap.core.Timeline | null>(null);

    const { contextSafe } = useGSAP();
    const { isFrench } = useLanguage();

    const [currentChild, setCurrentChild] = useState(children);

    useGSAP(() => {
      if (currentChild === children) return;

      const widthHiddenButton = hiddenButtonRef.current?.getBoundingClientRect();

      gsap
        .timeline()
        .to(textRef.current, {
          width: widthHiddenButton?.width,
          duration: 0.3,
          ease: 'power2.inOut',
        })
        .to(
          textRef.current,
          {
            y: -50,
            opacity: 0,
            duration: 0.15,
            ease: 'power2.in',
          },
          '<',
        )
        .add(() => {
          setCurrentChild(children);
        })
        .set(textRef.current, {
          y: 50,
          opacity: 0,
        })
        .to(
          textRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.15,
            ease: 'power2.out',
          },
          '<',
        );
    }, [currentChild, isFrench]);

    useGSAP(() => {
      if (disabled) return;
      if (timelineHoverRef.current) timelineHoverRef.current.kill();

      const splitText = new SplitText(currentChildRef.current, {
        type: 'chars',
        mask: 'chars',
      });
      const absoluteSplitText = new SplitText(absoluteChildRef.current, {
        type: 'chars',
        mask: 'chars',
      });

      gsap.set(splitText.chars, { y: 0 });
      gsap.set(absoluteSplitText.chars, { y: 20 });

      timelineHoverRef.current = gsap
        .timeline({ paused: true })
        .to(splitText.chars, {
          y: -20,
          duration: 0.2,
          stagger: 0.015,
          ease: 'power2.in',
        })
        .to(
          absoluteSplitText.chars,
          {
            y: 0,
            duration: 0.3,
            stagger: 0.015,
            ease: 'power2.out',
          },
          '<0.1',
        );
    }, [currentChild]);

    useGSAP(() => {
      if (!ref) return;
      gsap.set(wrapperButtonRef.current, {
        width: 30,
        scale: 0,
        display: 'none',
      });
      gsap.set(buttonRef.current, {
        opacity: 0,
        scale: 0.5,
      });
    }, []);

    const openButton = contextSafe(() => {
      return gsap
        .timeline()
        .set(wrapperButtonRef.current, {
          display: 'flex',
        })
        .set(wrapperButtonRef.current, {
          width: 30,
          scale: 0,
        })
        .set(buttonRef.current, {
          opacity: 0,
          scale: 0.5,
        })
        .to(wrapperButtonRef.current, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
        .to(
          buttonRef.current,
          {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
          },
          '-=0.3',
        )
        .to(
          buttonRef.current,
          {
            scale: 1,
            duration: 1.2,
            ease: 'elastic.out',
          },
          '<',
        )
        .to(
          wrapperButtonRef.current,
          {
            width: 'auto',
            duration: 1.4,
            ease: 'elastic.out',
          },
          '<',
        );
    });

    const closeButton = contextSafe(() => {
      return gsap
        .timeline()
        .to(wrapperButtonRef.current, {
          scale: 0,
          duration: 0.3,
          ease: 'power2.in',
        })
        .set(wrapperButtonRef.current, {
          display: 'none',
        });
    });

    const showBackground = contextSafe(() => {
      if (disabled) return;

      gsap
        .timeline({
          defaults: {
            duration: 0.6,
            ease: 'power2.out',
          },
        })
        .set(backgroudButtonRef.current, {
          y: 0,
        })
        .to(backgroudButtonRef.current, {
          y: -66,
        })
        .to(
          textRef.current,
          {
            color: color === 'primary' && isDark ? COLORS.BLACK : COLORS.WHITE,
          },
          '<',
        );
    });

    const hideBackground = contextSafe(() => {
      if (disabled) return;

      gsap
        .timeline({
          defaults: {
            duration: 0.6,
            ease: 'power2.out',
          },
        })
        .to(backgroudButtonRef.current, {
          y: -132,
        })
        .to(
          textRef.current,
          {
            color: color === 'secondary' || isDark ? COLORS.WHITE : COLORS.BLACK,
          },
          '<',
        );
    });

    useImperativeHandle(ref, () => ({
      play: openButton,
      reverse: closeButton,
    }));

    return (
      <>
        <DynamicElement
          ref={wrapperButtonRef}
          className={clsx(
            'label group/button inline-block h-11 w-fit cursor-pointer overflow-hidden rounded-full uppercase backdrop-blur-xl',
            color === 'primary' && 'bg-blur-glass text-black',
            color === 'primary' && isDark && 'text-white',
            color === 'secondary' && 'bg-blue text-white',
            color === 'tertiary' && 'bg-yellow text-black',
            `origin-${transformOrigin}`,
            disabled ? 'cursor-default! opacity-70' : 'cursor-pointer',
            className,
          )}
          {...props}
          disabled={disabled}
          href={href}
          target={target}
          onMouseMove={(e) => useMagnet(e, 0.8)}
          onMouseOut={(e) => useResetMagnet(e)}
          onMouseEnter={() => {
            showBackground();
            timelineHoverRef.current?.play();
          }}
          onMouseLeave={() => {
            hideBackground();
            timelineHoverRef.current?.reverse();
          }}
        >
          <div
            ref={backgroudButtonRef}
            className={clsx(
              'absolute top-full -left-1/4 h-22 w-[150%] rounded-[100%]',
              color === 'primary' ? 'bg-blue' : 'bg-black',
              color === 'primary' && isDark && 'bg-yellow',
            )}
          />
          <div
            ref={buttonRef}
            className="flex h-full w-full items-center"
            onMouseMove={(e) => useMagnet(e, 0.4)}
            onMouseOut={(e) => useResetMagnet(e)}
          >
            <div
              ref={textRef}
              className="relative flex w-fit items-center justify-center px-6 whitespace-nowrap"
            >
              <span ref={currentChildRef}>{currentChild}</span>
              <span ref={absoluteChildRef} className="absolute">
                {currentChild}
              </span>
            </div>
          </div>
        </DynamicElement>
        <div
          ref={hiddenButtonRef}
          className="label pointer-events-none invisible fixed top-0 left-0 -z-10 h-full w-fit items-center justify-center px-6 whitespace-nowrap uppercase opacity-0"
        >
          {children}
        </div>
      </>
    );
  },
);

export default Button;
