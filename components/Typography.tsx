import clsx from 'clsx';
import gsap from 'gsap';
import React, {
  forwardRef,
  isValidElement,
  type ReactNode,
  type ReactElement,
  useImperativeHandle,
  useRef,
} from 'react';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

type Props = {
  variant: Variant;
  animate?: boolean;
  children: ReactNode;
  className?: string;
};

export type AnimatedTypoRef = {
  play: () => gsap.core.Tween;
  reverse: () => gsap.core.Tween;
  reset: () => gsap.core.Tween;
};

interface ElementWithProps extends ReactElement {
  props: {
    children?: ReactNode;
    [key: string]: unknown;
  };
}

const Typography = forwardRef<AnimatedTypoRef, Props>(
  ({ variant, animate = false, children, className }, ref) => {
    const elementRef = useRef<HTMLElement>(null);

    useImperativeHandle(ref, () => ({
      play: () =>
        gsap.fromTo(
          elementRef.current?.querySelectorAll('span') || [],
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, duration: 1.2, ease: 'power2.out' },
        ),
      reverse: () =>
        gsap.to(elementRef.current?.querySelectorAll('span') || [], {
          y: 40,
          opacity: 0,
          stagger: 0.02,
          duration: 1.2,
          ease: 'power2.out',
        }),
      reset: () =>
        gsap.set(elementRef.current?.querySelectorAll('span') || [], { y: 40, opacity: 0 }),
    }));

    const processNode = (node: ReactNode): ReactNode => {
      if (typeof node === 'string') {
        if (!animate) return node;

        return node.split(' ').map((word, index, array) => (
          <span key={index} className="inline-block">
            {word}
            {index !== array.length - 1 && '\u00A0'}
          </span>
        ));
      }

      if (isValidElement(node)) {
        const element = node as ElementWithProps;
        if (element.type === 'span') {
          return element;
        }

        const processedChildren = React.Children.map(element.props.children, (child) =>
          processNode(child),
        );

        return React.cloneElement(element, {
          ...element.props,
          children: processedChildren,
        });
      }

      if (Array.isArray(node)) {
        return node.map((child, index) => (
          <React.Fragment key={index}>{processNode(child)}</React.Fragment>
        ));
      }

      return node;
    };

    return React.createElement(
      variant,
      {
        ref: elementRef,
        className: clsx(className, 'animate-text inline-block overflow-hidden'),
      },
      processNode(children),
    );
  },
);

export default Typography;
