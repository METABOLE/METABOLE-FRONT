import { forwardRef, ReactNode, useImperativeHandle, useRef } from 'react';
import { ShapeCorner } from './Shapes';
import { COLORS } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export interface AnimatedCutoutWrapperRef {
  openCutoutWrapper: () => void;
  closeCutoutWrapper: () => void;
}

const CutoutWrapper = forwardRef<AnimatedCutoutWrapperRef, { children: ReactNode }>(
  ({ children }, ref) => {
    const wrapperRef = useRef(null);
    const borderRefs = {
      top: useRef(null),
      right: useRef(null),
      bottom: useRef(null),
      left: useRef(null),
    };
    const sectionRef = useRef(null);
    const cornersRef = {
      topLeft: useRef(null),
      topRight: useRef(null),
      bottomLeft: useRef(null),
      bottomRight: useRef(null),
    };
    const timeline = useRef<gsap.core.Timeline>(
      gsap.timeline({ defaults: { duration: 0.8, ease: 'power2.inOut' } }),
    );

    useImperativeHandle(ref, () => ({
      openCutoutWrapper: () => timeline.current.play(),
      closeCutoutWrapper: () => timeline.current.reverse(),
    }));

    useGSAP(() => {
      gsap.set(wrapperRef.current, { display: 'none' });

      gsap.set(borderRefs.top.current, { transformOrigin: 'top left' });
      gsap.set(borderRefs.right.current, { transformOrigin: 'top right' });
      gsap.set(borderRefs.bottom.current, { transformOrigin: 'bottom left' });
      gsap.set(borderRefs.left.current, { transformOrigin: 'top left' });

      gsap.set(borderRefs.top.current, { scaleX: 0 });
      gsap.set(borderRefs.right.current, { scaleX: 0 });
      gsap.set(borderRefs.bottom.current, { scaleY: 0 });
      gsap.set(borderRefs.left.current, { scaleY: 0 });

      gsap.set(
        [
          [
            cornersRef.topLeft.current,
            cornersRef.bottomLeft.current,
            cornersRef.bottomRight.current,
            cornersRef.topRight.current,
          ],
        ],
        { scale: 0 },
      );

      gsap.set(sectionRef.current, {
        paddingInline: '0',
        paddingBlock: '0',
      });

      timeline.current
        .set(wrapperRef.current, { display: 'block' })
        .addLabel('start')
        .to([borderRefs.top.current, borderRefs.right.current], { scaleX: 1 }, 'start')
        .to([borderRefs.bottom.current, borderRefs.left.current], { scaleY: 1 }, 'start')
        .to(
          sectionRef.current,
          {
            paddingInline: 'clamp(20px, 8vw, 100px)',
            paddingBlock: 32,
          },
          'start',
        )
        .to(
          [
            cornersRef.topLeft.current,
            cornersRef.bottomLeft.current,
            cornersRef.bottomRight.current,
            cornersRef.topRight.current,
          ],
          { scale: 1 },
          'start',
        )
        .pause();
    }, []);

    return (
      <div ref={wrapperRef} className="fixed inset-0 z-[800] hidden">
        <div
          ref={borderRefs.top}
          className="w-x-default absolute top-0 left-0 h-screen origin-top bg-black"
        />
        <div
          ref={borderRefs.left}
          className="absolute top-0 left-0 h-8 w-screen origin-left bg-black"
        />
        <div
          ref={borderRefs.bottom}
          className="absolute bottom-0 left-0 h-8 w-screen origin-bottom bg-black"
        />
        <div
          ref={borderRefs.right}
          className="w-x-default absolute top-0 right-0 h-screen origin-right bg-black"
        />
        <div ref={sectionRef} className="relative inset-0 h-full w-full">
          <div className="relative h-full w-full">
            <div ref={cornersRef.topLeft} className="absolute top-0 left-0 z-10 origin-top-left">
              <ShapeCorner
                className="-translate-x-1/2 -translate-y-1/2 -rotate-90"
                color={COLORS.BLACK}
              />
            </div>
            <div ref={cornersRef.topRight} className="absolute top-0 right-0 z-10 origin-top-right">
              <ShapeCorner className="translate-x-1/2 -translate-y-1/2" color={COLORS.BLACK} />
            </div>
            <div
              ref={cornersRef.bottomRight}
              className="absolute right-0 bottom-0 z-10 origin-bottom-right"
            >
              <ShapeCorner
                className="translate-x-1/2 translate-y-1/2 rotate-90"
                color={COLORS.BLACK}
              />
            </div>
            <div
              ref={cornersRef.bottomLeft}
              className="absolute bottom-0 left-0 z-10 origin-bottom-left"
            >
              <ShapeCorner
                className="-translate-x-1/2 translate-y-1/2 rotate-180"
                color={COLORS.BLACK}
              />
            </div>
            {children}
          </div>
        </div>
      </div>
    );
  },
);

export default CutoutWrapper;
