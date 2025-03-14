import { useTouchDevice } from '@/hooks/useTouchDevice';
import { COLORS } from '@/types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { IconCross } from './Icons';

enum CURSOR_STATE {
  DEFAULT = 'DEFAULT',
  POINTER = 'POINTER',
  SEE_MORE = 'SEE_MORE',
}

const Cursor = memo(() => {
  if (useTouchDevice()) return null;

  const { contextSafe } = useGSAP();
  const pathname = usePathname();
  const wrapperPointerRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);

  const [cursorState, setCursorState] = useState(CURSOR_STATE.DEFAULT);
  const [isActive, setIsActive] = useState(false);

  const mouseUpSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    clickSoundRef.current = new Audio('/sounds/clickDown.mp3');
    // hoverSoundRef.current = new Audio('/sounds/hover.mp3');
    mouseUpSoundRef.current = new Audio('/sounds/clickDown.mp3');
    clickSoundRef.current.volume = 0.5;
    // hoverSoundRef.current.volume = 0.1;
    mouseUpSoundRef.current.volume = 0.4;
  }, []);

  const cursorStateHandlers = {
    changeToSeeMore: useCallback(() => setCursorState(CURSOR_STATE.POINTER), []),
    changeToButton: useCallback(() => setCursorState(CURSOR_STATE.POINTER), []),
    changeToDefault: useCallback(() => setCursorState(CURSOR_STATE.DEFAULT), []),
  };

  const playClickDownSound = () => {
    if (!clickSoundRef.current) return;
    clickSoundRef.current.currentTime = 0;
    clickSoundRef.current.play();
  };

  const playClickUpSound = () => {
    if (!mouseUpSoundRef.current) return;
    mouseUpSoundRef.current.currentTime = 0;
    mouseUpSoundRef.current.play();
  };

  const playHoverSound = () => {
    if (!hoverSoundRef.current) return;
    hoverSoundRef.current.currentTime = 0;
    hoverSoundRef.current.play();
  };

  const cursorHandlers = {
    moveCursor: contextSafe((e: MouseEvent) => {
      if (!pointerRef.current) return;
      pointerRef.current.style.opacity = '1';
      gsap.to(pointerRef.current, {
        duration: 0.3,
        x: e.clientX,
        y: e.clientY,
        ease: 'power2.out',
      });
      gsap.to(wrapperPointerRef.current, {
        duration: 0.6,
        x: e.clientX,
        y: e.clientY,
        ease: 'power2.out',
      });
    }),
    handleMouseDown: useCallback(() => {
      setIsActive(true);
      playClickDownSound();
    }, []),
    handleMouseUp: useCallback(() => {
      setIsActive(false);
      playClickUpSound();
    }, []),
  };

  const manageCursorEvents = useCallback(
    (event: 'addEventListener' | 'removeEventListener') => {
      const elements = {
        seeMore: document.querySelectorAll('.custom-cursor-see-more'),
        button: document.querySelectorAll('.custom-cursor-pointer'),
      };

      Object.entries({
        seeMore: cursorStateHandlers.changeToSeeMore,
        button: cursorStateHandlers.changeToButton,
      }).forEach(([key, handler]) => {
        elements[key as keyof typeof elements].forEach((el) => {
          el[event]('mouseover', handler);
          el[event]('mouseleave', cursorStateHandlers.changeToDefault);

          if (key === 'button') {
            el[event]('mouseenter', playHoverSound);
          }
        });
      });
    },
    [cursorStateHandlers],
  );

  useEffect(() => {
    observerRef.current = new MutationObserver(() => {
      manageCursorEvents('removeEventListener');
      manageCursorEvents('addEventListener');
    });

    const { moveCursor, handleMouseDown, handleMouseUp } = cursorHandlers;

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    manageCursorEvents('addEventListener');
    observerRef.current.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      manageCursorEvents('removeEventListener');
      observerRef.current?.disconnect();
    };
  }, [cursorHandlers, manageCursorEvents]);

  useEffect(() => {
    setTimeout(() => {
      setCursorState(CURSOR_STATE.DEFAULT);
    }, 1400);
  }, [pathname]);

  return (
    <>
      <div
        ref={wrapperPointerRef}
        className={clsx(
          'pointer-events-none fixed top-0 left-0 z-[9999] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center mix-blend-difference',
        )}
      >
        <div
          className={clsx(
            'border-yellow h-16 w-16 rounded-full border-[1px] transition-[transform,scale,background-color]',
            cursorState === CURSOR_STATE.POINTER && 'bg-yellow scale-50',
            isActive && 'scale-75',
          )}
        ></div>
      </div>
      <div
        ref={pointerRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        <IconCross
          color={COLORS.YELLOW}
          className={clsx(
            'transition-transform',
            cursorState === CURSOR_STATE.POINTER && 'scale-0',
          )}
        />
      </div>
    </>
  );
});

export default Cursor;
