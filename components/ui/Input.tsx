import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { forwardRef, ReactNode, Ref, useImperativeHandle, useRef, useState } from 'react';

type InputProps = {
  name: string;
  label?: string;
  errorMessage?: string;
  successMessage?: string;
  isLoading?: boolean;
  loadingDuration?: number;
  children?: ReactNode;
  animate?: boolean;
  isDark?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  React.SelectHTMLAttributes<HTMLSelectElement>;

export interface AnimatedInputRef {
  play: () => void;
  reverse: () => void;
  reset: () => void;
  blur: () => void;
}

const Input = forwardRef<AnimatedInputRef, InputProps>(
  (
    {
      name,
      label,
      type = 'text',
      placeholder = '',
      required = false,
      value,
      errorMessage,
      successMessage,
      isLoading = false,
      className,
      children,
      animate = false,
      isDark = false,
      ...props
    },
    ref,
  ) => {
    const wrapperInputRef = useRef(null);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null>(
      null,
    );
    const lineRef = useRef(null);
    const errorLineRef = useRef(null);
    const errorMessageRef = useRef(null);
    const successLineRef = useRef(null);
    const successMessageRef = useRef(null);
    const loaderLineRef = useRef(null);
    const errorTimelineRef = useRef<gsap.core.Timeline | null>(null);
    const successTimelineRef = useRef<gsap.core.Timeline | null>(null);
    const loaderTimelineRef = useRef<gsap.core.Timeline | null>(null);

    const { contextSafe } = useGSAP();
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);

    const play = contextSafe(() => {
      gsap
        .timeline()
        .fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power2.out' })
        .fromTo(wrapperInputRef.current, { y: 96 }, { y: 0, duration: 1, ease: 'power2.out' }, '<');
    });

    const reverse = contextSafe(() => {
      gsap
        .timeline()
        .to(lineRef.current, { scaleX: 0, duration: 1, ease: 'power2.out' })
        .to(wrapperInputRef.current, { y: 96, duration: 1, ease: 'power2.out' }, '-=0.8');
    });

    const reset = contextSafe(() => {
      gsap.set(wrapperInputRef.current, { y: 96 });
      gsap.set(lineRef.current, { scaleX: 0 });
    });

    useImperativeHandle(ref, () => ({
      play,
      reverse,
      reset,
      blur: () => {
        if (!inputRef.current) return;
        inputRef.current.blur();
      },
    }));

    const createErrorTimeline = contextSafe(() => {
      if (errorTimelineRef.current) {
        errorTimelineRef.current.kill();
      }

      errorTimelineRef.current = gsap.timeline();

      if (errorMessage) {
        errorTimelineRef.current
          .add(() => {
            setError(errorMessage);
          })
          .to(errorMessageRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
          .to(errorLineRef.current, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, '<');
      } else {
        errorTimelineRef.current
          .to(errorMessageRef.current, { y: -16, opacity: 0, duration: 0.5, ease: 'power2.in' })
          .to(errorLineRef.current, { scaleX: 0, duration: 0.5, ease: 'power2.out' }, '<')
          .add(() => {
            setError(undefined);
          });
      }
    });

    const createSuccessTimeline = contextSafe(() => {
      if (successTimelineRef.current) {
        successTimelineRef.current.kill();
      }

      successTimelineRef.current = gsap.timeline();

      if (successMessage) {
        successTimelineRef.current
          .add(() => {
            setSuccess(successMessage);
          })
          .to(successMessageRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
          .to(successLineRef.current, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, '<');
      } else {
        successTimelineRef.current
          .to(successMessageRef.current, { y: -16, opacity: 0, duration: 0.5, ease: 'power2.in' })
          .to(successLineRef.current, { scaleX: 0, duration: 0.5, ease: 'power2.out' }, '<')
          .add(() => {
            setSuccess(undefined);
          });
      }
    });

    useGSAP(() => {
      createErrorTimeline();
    }, [errorMessage]);

    useGSAP(() => {
      createSuccessTimeline();
    }, [successMessage]);

    const createLoaderTimeline = contextSafe(() => {
      if (loaderTimelineRef.current) {
        loaderTimelineRef.current.kill();
      }

      loaderTimelineRef.current = gsap.timeline();

      if (isLoading) {
        loaderTimelineRef.current
          .set(loaderLineRef.current, { scaleX: 0, opacity: 1, transformOrigin: 'left center' })
          .to(loaderLineRef.current, { scaleX: 1, duration: 1.2, ease: 'power3.inOut' })
          .to(loaderLineRef.current, {
            scaleX: 0,
            transformOrigin: 'right center',
            duration: 1.2,
            ease: 'power3.inOut',
          })
          .repeatDelay(0)
          .repeat(-1);
      } else {
        loaderTimelineRef.current
          .to(loaderLineRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' })
          .set(loaderLineRef.current, { scaleX: 0 });
      }
    });

    useGSAP(() => {
      createLoaderTimeline();
    }, [isLoading]);

    const renderInputField = () => {
      switch (type) {
        case 'textarea':
          return (
            <textarea
              ref={inputRef as Ref<HTMLTextAreaElement>}
              id={name}
              placeholder={placeholder}
              value={value}
              className={clsx(
                'p3 apparence-none w-full rounded-t-md rounded-b-none bg-transparent py-2 focus:pl-2 focus:outline-none',
                isDark ? 'placeholder-black-30 !text-black' : 'placeholder-white-30 !text-white',
                'h-16 resize-none !transition-[padding,height]',
              )}
              data-lenis-prevent
              onChange={(e) => props.onChange?.(e)}
              {...props}
            />
          );
        case 'select':
          return (
            <select
              ref={inputRef as Ref<HTMLSelectElement>}
              id={name}
              value={value}
              className={clsx(
                'p3 apparence-none w-full rounded-t-md rounded-b-none bg-transparent py-2 focus:pl-2 focus:outline-none',
                isDark ? 'placeholder-black-30 !text-black' : 'placeholder-white-30 !text-white',
                '!transition-[padding]',
              )}
              {...props}
            >
              {children}
            </select>
          );
        default:
          return (
            <input
              ref={inputRef as Ref<HTMLInputElement>}
              id={name}
              placeholder={placeholder}
              type={type}
              value={value}
              className={clsx(
                'p3 apparence-none w-full rounded-t-md rounded-b-none bg-transparent py-2 focus:pl-2 focus:outline-none',
                isDark ? 'placeholder-black-30 !text-black' : 'placeholder-white-30 !text-white',
                '!transition-[padding]',
              )}
              {...props}
            />
          );
      }
    };

    return (
      <div className={clsx('relative flex flex-col gap-4', className)}>
        {label && (
          <label className="text2 cursor-pointer" htmlFor={name}>
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className="h-fit overflow-hidden pb-px">
          <div ref={wrapperInputRef} className={clsx(animate && 'translate-y-24')}>
            {renderInputField()}
          </div>
          <div
            ref={lineRef}
            className={clsx(
              'absolute bottom-0 left-0 h-px w-full origin-left',
              isDark ? 'bg-black' : 'bg-white',
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
          <div
            ref={successLineRef}
            className={clsx(
              'absolute bottom-0 left-0 h-px w-full origin-right bg-green-500',
              animate && 'scale-x-0',
            )}
          />
          <div
            ref={loaderLineRef}
            className={clsx(
              'bg-blue absolute bottom-0 left-0 h-px w-full origin-left scale-x-0',
              animate && 'scale-x-0',
            )}
          />
        </div>
        <div className="absolute -bottom-5 left-0 h-5 w-full overflow-hidden">
          <p
            ref={errorMessageRef}
            className={clsx('absolute -translate-y-4 !text-xs text-red-500 opacity-0')}
          >
            {error}
          </p>
          <p
            ref={successMessageRef}
            className={clsx('absolute -translate-y-4 !text-xs text-green-500 opacity-0')}
          >
            {success}
          </p>
        </div>
      </div>
    );
  },
);

export default Input;
