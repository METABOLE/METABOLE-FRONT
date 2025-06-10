import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { TAG_TYPE } from '@/types';
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

interface BaseTagProps {
  children: ReactNode;
  type: TAG_TYPE;
  className?: string;
}

type DivTagProps = BaseTagProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof BaseTagProps> & {
    href?: never;
    target?: never;
  };

interface LinkTagProps extends BaseTagProps {
  href: string;
  target?: string;
}

type TagProps = DivTagProps | LinkTagProps;

type DynamicElementProps = {
  href?: string;
  target?: string;
  className?: string;
  children: ReactNode;
} & ComponentProps<'div'>;

const DynamicElement = ({ href, ...props }: DynamicElementProps) => {
  const Component = href ? Link : 'div';
  return <Component {...(props as LinkTagProps)} {...(href && { href })} />;
};

export interface AnimatedTagRef {
  play: () => void;
  reverse: () => void;
}

const Tag = forwardRef<AnimatedTagRef, TagProps>(
  ({ children, type, href, target, className, ...props }, ref) => {
    const wrapperTagRef = useRef(null);
    const tagRef = useRef(null);

    const { contextSafe } = useGSAP();

    useGSAP(() => {
      if (!ref) return;
      gsap.set(wrapperTagRef.current, {
        width: 30,
        scale: 0,
      });
      gsap.set(tagRef.current, {
        opacity: 0,
        scale: 0.5,
      });
    }, []);

    const play = contextSafe(() => {
      return gsap
        .timeline()
        .set(wrapperTagRef.current, {
          width: 30,
          scale: 0,
        })
        .set(tagRef.current, {
          opacity: 0,
          scale: 0.5,
        })
        .to(wrapperTagRef.current, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
        .to(
          tagRef.current,
          {
            opacity: 1,
            duration: 0.3,
            ease: 'power.out',
          },
          '-=0.3',
        )
        .to(
          tagRef.current,
          {
            scale: 1,
            duration: 1,
            ease: 'elastic.out',
          },
          '<',
        )
        .to(
          wrapperTagRef.current,
          {
            width: 'auto',
            duration: 1.2,
            ease: 'elastic.out',
          },
          '<',
        );
    });

    const reverse = contextSafe(() => {
      return gsap.to(wrapperTagRef.current, {
        scale: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    });

    useImperativeHandle(ref, () => ({
      play,
      reverse,
    }));

    return (
      <DynamicElement
        ref={wrapperTagRef}
        className={clsx(
          'label inline-block w-fit origin-left overflow-hidden rounded-full backdrop-blur-xl transition-colors',
          type === TAG_TYPE.WHTIE && 'bg-white-30 text-black hover:bg-white',
          type === TAG_TYPE.STROKE_WHTIE &&
            'border-white-30 hover:bg-white-30 border-1 bg-transparent stroke-2 text-white hover:border-transparent',
          className,
        )}
        {...props}
        href={href}
        target={target}
        onMouseMove={(e) => useMagnet(e, 0.8)}
        onMouseOut={(e) => useResetMagnet(e)}
      >
        <span
          ref={tagRef}
          className="flex h-full w-full origin-left items-center px-3 py-2 whitespace-nowrap"
          onMouseMove={(e) => useMagnet(e, 0.4)}
          onMouseOut={(e) => useResetMagnet(e)}
        >
          {children}
        </span>
      </DynamicElement>
    );
  },
);

export default Tag;
