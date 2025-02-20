import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { COLORS } from '@/types';
import { useGSAP } from '@gsap/react';
import { clsx } from 'clsx';
import gsap from 'gsap';
import Link from 'next/link';
import {
  ComponentProps,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useImperativeHandle,
  useRef,
} from 'react';

interface BaseButtonProps {
  children: ReactNode;
  className?: string;
  transformOrigin?: 'left' | 'right' | 'center';
}

type DivButtonProps = BaseButtonProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof BaseButtonProps> & {
    href?: never;
    target?: never;
  };

interface LinkButtonProps extends BaseButtonProps {
  href: string;
  target?: string;
}

type ButtonProps = DivButtonProps | LinkButtonProps;

type DynamicElementProps = {
  href?: string;
  target?: string;
  className?: string;
  children: ReactNode;
} & ComponentProps<'div'>;

const DynamicElement = ({ href, ...props }: DynamicElementProps) => {
  const Component = href ? Link : 'button';
  return <Component {...(props as LinkButtonProps)} {...(href && { href })} />;
};

export interface AnimatedButtonRef {
  play: () => void;
  reverse: () => void;
}

const Button = forwardRef<AnimatedButtonRef, ButtonProps>(
  ({ children, href, transformOrigin = 'left', target, className, ...props }, ref) => {
    const wrapperButtonRef = useRef(null);
    const backgroudButtonRef = useRef(null);
    const buttonRef = useRef(null);
    const textRef = useRef(null);

    const { contextSafe } = useGSAP();

    useGSAP(() => {
      if (!ref) return;
      gsap.set(wrapperButtonRef.current, {
        width: 30,
        scale: 0,
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
            ease: 'power.out',
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
            color: COLORS.WHITE,
          },
          '<',
        );
    });

    const hideBackground = contextSafe(() => {
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
            color: COLORS.BLACK,
          },
          '<',
        );
    });

    useImperativeHandle(ref, () => ({
      play: openButton,
      reverse: closeButton,
    }));

    return (
      <DynamicElement
        ref={wrapperButtonRef}
        className={clsx(
          'label group/button inline-block h-11 w-fit cursor-pointer overflow-hidden rounded-full bg-[#C5C4FF]/30 text-black backdrop-blur-xl',
          `origin-${transformOrigin}`,
          className,
        )}
        {...props}
        href={href}
        target={target}
        onMouseEnter={showBackground}
        onMouseLeave={hideBackground}
        onMouseMove={(e) => useMagnet(e, 0.8)}
        onMouseOut={(e) => useResetMagnet(e)}
      >
        <div
          ref={backgroudButtonRef}
          className="bg-blue absolute top-full h-22 w-[150%] -translate-x-1/8 rounded-[100%]"
        />
        <div
          className="h-full w-full"
          onMouseMove={(e) => useMagnet(e, 0.4)}
          onMouseOut={(e) => useResetMagnet(e)}
        >
          <div
            ref={textRef}
            className="relative flex h-full w-full items-center justify-center px-6 whitespace-nowrap"
          >
            {children}
          </div>
        </div>
      </DynamicElement>
    );
  },
);

export default Button;
