import { useLanguage } from '@/providers/language.provider';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';

gsap.registerPlugin(SplitText);

interface CopyButtonProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  buttonClassName?: string;
  copyText?: string;
  copiedText?: string;
}

const CopyButton = ({ value, children, className, buttonClassName }: CopyButtonProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const copyTextRef = useRef<HTMLSpanElement>(null);
  const copiedTextRef = useRef<HTMLSpanElement>(null);
  const [isCopied, setIsCopied] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const { isFrench } = useLanguage();

  useGSAP(() => {
    const copyOutSplit = new SplitText(copyTextRef.current, {
      type: 'chars',
    });
    const copiedInSplit = new SplitText(copiedTextRef.current, {
      type: 'chars',
    });

    gsap.set(copyOutSplit.chars, { y: 0 });
    gsap.set(copiedInSplit.chars, { y: 20 });

    timelineRef.current = gsap
      .timeline({ paused: true })
      .to(copyOutSplit.chars, {
        y: -20,
        duration: 0.2,
        stagger: 0.02,
        ease: 'power2.in',
      })
      .to(
        copiedInSplit.chars,
        {
          y: 0,
          duration: 0.3,
          stagger: 0.02,
          ease: 'power2.out',
        },
        '<0.1',
      );
  }, [isFrench]);

  useEffect(() => {
    if (!timelineRef.current) return;

    if (isCopied) {
      timelineRef.current.play();
    } else {
      timelineRef.current.reverse();
    }
  }, [isCopied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de la copie:', error);
    }
  };

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!wrapperRef.current || !buttonRef.current) return;

    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const buttonWidth = buttonRef.current.offsetWidth;
    const buttonHeight = buttonRef.current.offsetHeight;

    const x = e.clientX - wrapperRect.left - buttonWidth / 2;
    const y = e.clientY - wrapperRect.top - buttonHeight - 8;

    gsap.to(buttonRef.current, {
      x: x,
      y: y,
      duration: 0.8,
      ease: 'power2.out',
    });
  };

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      gsap.set(buttonRef.current, { scale: 0, opacity: 1 });

      gsap.to(buttonRef.current, {
        scale: 1,
        duration: 0.2,
        ease: 'back.out(1.7)',
      });
    }
  };

  const handleMouseLeave = () => {
    if (isCopied) setIsCopied(false);
    if (!buttonRef.current) return;

    gsap.to(buttonRef.current, {
      scale: 0,
      duration: 0.2,
      ease: 'power2.in',
    });
  };

  return (
    <div
      ref={wrapperRef}
      className={clsx('relative cursor-pointer', className)}
      onClick={handleCopy}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {children}

      <button
        ref={buttonRef}
        className={clsx(
          'pointer-events-none absolute z-50 flex h-16 w-16 scale-0 items-center justify-center rounded-full bg-black text-xs font-medium text-white opacity-0',
          buttonClassName,
        )}
        style={{
          left: 0,
          top: 0,
        }}
      >
        <span
          ref={copyTextRef}
          className="absolute flex w-full items-center justify-center overflow-hidden"
        >
          {isFrench ? 'Copier' : 'Copy'}
        </span>
        <span
          ref={copiedTextRef}
          className="absolute flex w-full items-center justify-center overflow-hidden"
        >
          {isFrench ? 'Copié !' : 'Copied!'}
        </span>
      </button>
    </div>
  );
};

export default CopyButton;
