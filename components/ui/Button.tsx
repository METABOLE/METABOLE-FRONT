import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import usePerformance, { PERFORMANCE_LEVEL } from '@/hooks/usePerformance';
import { COLORS } from '@/types';
import { useGSAP } from '@gsap/react';
import { clsx } from 'clsx';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import Link from 'next/link';
import { ComponentProps, forwardRef, HTMLAttributes, ReactNode, useRef, useState } from 'react';

gsap.registerPlugin(SplitText);

interface BaseButtonProps {
  children: ReactNode;
  className?: string;
  transformOrigin?: 'left' | 'right' | 'center';
  color?: 'primary' | 'secondary' | 'tertiary';
  isDark?: boolean;
  disabled?: boolean;
  isResizable?: boolean;
  onClick?: () => void;
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

const Button = forwardRef<HTMLDivElement, ButtonProps>(
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
      isResizable = false,
      ...props
    },
    ref,
  ) => {
    const { contextSafe } = useGSAP();
    const { isLoading, performanceLevel } = usePerformance();
    const backgroudButtonRef = useRef(null);
    const buttonRef = useRef(null);
    const hiddenButtonRef = useRef<HTMLDivElement>(null);
    const textRef = useRef(null);
    const currentChildRef = useRef(null);
    const absoluteChildRef = useRef(null);
    const splitTextRef = useRef<SplitText | null>(null);
    const absoluteSplitTextRef = useRef<SplitText | null>(null);
    const [currentChild, setCurrentChild] = useState(children);
    const [splitTextsReady, setSplitTextsReady] = useState(false);

    const cleanupSplitText = contextSafe(() => {
      if (splitTextRef.current) {
        splitTextRef.current.revert();
        splitTextRef.current = null;
      }
      if (absoluteSplitTextRef.current) {
        absoluteSplitTextRef.current.revert();
        absoluteSplitTextRef.current = null;
      }
      setSplitTextsReady(false);
    });

    const initSplitText = contextSafe(() => {
      cleanupSplitText();

      if (!currentChildRef.current || !absoluteChildRef.current) return;

      try {
        splitTextRef.current = new SplitText(currentChildRef.current, {
          type: 'chars',
          mask: 'chars',
        });
        absoluteSplitTextRef.current = new SplitText(absoluteChildRef.current, {
          type: 'chars',
          mask: 'chars',
        });

        gsap.set(splitTextRef.current.chars, { y: 0 });
        gsap.set(absoluteSplitTextRef.current.chars, { y: 20 });

        setSplitTextsReady(true);
      } catch (error) {
        console.warn('Failed to initialize SplitText:', error);
      }
    });

    const resizeButton = contextSafe(() => {
      if (!isResizable || currentChild === children) return;

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
    });

    const showBackground = contextSafe(() => {
      if (!splitTextsReady || !splitTextRef.current || !absoluteSplitTextRef.current) return;

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
        )
        .to(
          splitTextRef.current.chars,
          {
            y: -20,
            duration: 0.2,
            stagger: 0.015,
            ease: 'power2.in',
          },
          '<',
        )
        .to(
          absoluteSplitTextRef.current.chars,
          {
            y: 0,
            duration: 0.3,
            stagger: 0.015,
            ease: 'power2.out',
          },
          '<0.1',
        );
    });

    const hideBackground = contextSafe(() => {
      if (!splitTextsReady || !splitTextRef.current || !absoluteSplitTextRef.current) return;

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
        )
        .to(
          splitTextRef.current.chars,
          {
            y: 0,
          },
          '<',
        )
        .to(
          absoluteSplitTextRef.current.chars,
          {
            y: 20,
          },
          '<',
        );
    });

    useGSAP(() => {
      if (!isResizable || isLoading) return;
      cleanupSplitText();
      setCurrentChild(children);
      resizeButton();
    }, [children, isResizable, isLoading]);

    useGSAP(() => {
      if (isLoading) return;
      cleanupSplitText();
      initSplitText();
    }, [currentChild, isLoading]);

    if (performanceLevel === PERFORMANCE_LEVEL.LOW) {
      return (
        <DynamicElement
          ref={ref}
          className={clsx(
            'label inline-block h-11 w-fit cursor-pointer overflow-hidden rounded-full uppercase transition-colors duration-200',
            color === 'primary' && 'bg-menu hover:bg-blue text-black hover:text-white',
            color === 'primary' && isDark && 'text-black hover:text-white',
            color === 'secondary' && 'bg-blue text-white hover:bg-black hover:text-white',
            color === 'tertiary' && 'bg-yellow text-black hover:bg-black hover:text-white',
            `origin-${transformOrigin}`,
            disabled ? 'cursor-default! opacity-70' : 'cursor-pointer',
            className,
          )}
          {...props}
          disabled={disabled}
          href={href}
          target={target}
        >
          <div className="flex h-full w-full items-center justify-center px-6 whitespace-nowrap">
            {children}
          </div>
        </DynamicElement>
      );
    }

    return (
      <>
        <DynamicElement
          ref={ref}
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
          onMouseEnter={() => !disabled && showBackground()}
          onMouseLeave={() => !disabled && hideBackground()}
          onMouseMove={(e) => useMagnet(e, 0.8)}
          onMouseOut={(e) => useResetMagnet(e)}
        >
          <div
            ref={backgroudButtonRef}
            className={clsx(
              'absolute top-full -left-1/4 z-0 h-22 w-[150%] rounded-[100%]',
              color === 'primary' ? 'bg-blue' : 'bg-black',
              color === 'primary' && isDark && 'bg-yellow',
            )}
          />
          <div
            ref={buttonRef}
            className="z-20 flex h-full w-full items-center"
            onMouseMove={(e) => useMagnet(e, 0.4)}
            onMouseOut={(e) => useResetMagnet(e)}
          >
            <div
              ref={textRef}
              className="relative flex w-fit items-center justify-center px-6 whitespace-nowrap"
            >
              <span ref={currentChildRef}>{isResizable ? currentChild : children}</span>
              <span ref={absoluteChildRef} className="absolute">
                {isResizable ? currentChild : children}
              </span>
            </div>
          </div>
        </DynamicElement>
        {isResizable && (
          <div
            ref={hiddenButtonRef}
            className="label pointer-events-none invisible fixed top-0 left-0 -z-10 h-full w-fit items-center justify-center px-6 whitespace-nowrap uppercase opacity-0"
          >
            {children}
          </div>
        )}
      </>
    );
  },
);

export default Button;
