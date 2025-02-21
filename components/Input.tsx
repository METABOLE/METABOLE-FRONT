import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { forwardRef, ReactNode, useImperativeHandle, useRef, useState } from 'react';

type InputProps = {
  name: string;
  label?: string;
  errorMessage?: string;
  children?: ReactNode;
  animate?: boolean;
  isDark?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  React.SelectHTMLAttributes<HTMLSelectElement>;

export interface AnimatedIputRef {
  play: () => void;
  reverse: () => void;
  reset: () => void;
}

const Input = forwardRef<AnimatedIputRef, InputProps>(
  (
    {
      name,
      label,
      type = 'text',
      placeholder = '',
      required = false,
      value,
      errorMessage,
      children,
      animate = false,
      isDark = false,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef(null);
    const lineRef = useRef(null);
    const errorLineRef = useRef(null);
    const errorMessageRef = useRef(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const { contextSafe } = useGSAP();
    const [error, setError] = useState<string | undefined>(undefined);

    const play = contextSafe(() => {
      gsap
        .timeline()
        .fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power2.out' })
        .fromTo(inputRef.current, { y: 96 }, { y: 0, duration: 1, ease: 'power2.out' }, '<');
    });

    const reverse = contextSafe(() => {
      gsap
        .timeline()
        .to(lineRef.current, { scaleX: 0, duration: 1, ease: 'power2.out' })
        .to(inputRef.current, { y: 96, duration: 1, ease: 'power2.out' }, '-=0.8');
    });

    const reset = contextSafe(() => {
      gsap.set(inputRef.current, { y: 96 });
      gsap.set(lineRef.current, { scaleX: 0 });
    });

    useImperativeHandle(ref, () => ({
      play,
      reverse,
      reset,
    }));

    const createErrorTimeline = contextSafe(() => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      timelineRef.current = gsap.timeline();

      if (errorMessage) {
        timelineRef.current
          .add(() => {
            setError(errorMessage);
          })
          .to(errorMessageRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
          .to(errorLineRef.current, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, '<');
      } else {
        timelineRef.current
          .to(errorMessageRef.current, { y: -16, opacity: 0, duration: 0.5, ease: 'power2.in' })
          .to(errorLineRef.current, { scaleX: 0, duration: 0.5, ease: 'power2.out' }, '<')
          .add(() => {
            setError(undefined);
          });
      }
    });

    useGSAP(() => {
      createErrorTimeline();
    }, [errorMessage]);

    const baseClasses = [
      'p3 apparence-none w-full rounded-t-md rounded-b-none bg-transparent py-2  focus:pl-2 focus:outline-none',
      isDark ? 'text-white placeholder:text-white/40' : 'text-black placeholder:text-black/40',
    ];

    const renderInputField = () => {
      switch (type) {
        case 'textarea':
          return (
            <textarea
              className={clsx(baseClasses, 'h-16 resize-none !transition-[padding,height]')}
              id={name}
              placeholder={placeholder}
              value={value}
              data-lenis-prevent
              onChange={(e) => props.onChange?.(e)}
              {...props}
            />
          );
        case 'select':
          return (
            <select
              className={clsx(baseClasses, '!transition-[padding]')}
              id={name}
              value={value}
              {...props}
            >
              {children}
            </select>
          );
        default:
          return (
            <input
              className={clsx(baseClasses, '!transition-[padding]')}
              id={name}
              placeholder={placeholder}
              type={type}
              value={value}
              {...props}
            />
          );
      }
    };

    return (
      <div className="relative flex flex-col gap-4">
        {label && (
          <label className="text2 cursor-pointer" htmlFor={name}>
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className="h-fit overflow-hidden pb-px">
          <div ref={inputRef} className={clsx(animate && 'translate-y-24')}>
            {renderInputField()}
          </div>
          <div
            ref={lineRef}
            className={clsx(
              'absolute bottom-0 left-0 h-px w-full origin-left',
              isDark ? 'bg-white' : 'bg-black',
              animate && 'scale-x-0',
            )}
          />
          <div
            ref={errorLineRef}
            className={clsx(
              'absolute bottom-0 left-0 h-px w-full origin-right bg-red-500',
              animate && 'scale-x-0',
            )}
          />
        </div>
        <div className="absolute -bottom-5 h-fit overflow-hidden">
          <p ref={errorMessageRef} className={clsx('-translate-y-4 text-xs text-red-500')}>
            {error}
          </p>
        </div>
      </div>
    );
  },
);

export default Input;
