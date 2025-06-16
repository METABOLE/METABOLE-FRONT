import { COLORS } from '@/types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import { gsap } from 'gsap';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

interface WaveProps {
  className?: string;
  color?: COLORS;
  amplitude?: number;
  segments?: number;
  width?: number;
  height?: number;
  duration?: number;
  autoPlay?: boolean;
}

export interface WaveHandles {
  play: () => void;
  pause: () => void;
}

const Wave = forwardRef<WaveHandles, WaveProps>(
  (
    {
      className,
      color = COLORS.WHITE,
      amplitude = 8,
      segments = 30,
      width = 20,
      height = 30,
      duration = 2,
      autoPlay = false,
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const polylineRef = useRef<SVGPolylineElement>(null);
    const mainTimelineRef = useRef<gsap.core.Timeline | null>(null);
    const isPlayingRef = useRef<boolean>(autoPlay);
    const lastProgressRef = useRef<number>(0);

    const calculateWaveY = useCallback(
      (position: number, phaseOffset: number): number =>
        Math.sin(position * Math.PI * 2 + phaseOffset) * (amplitude / 2),
      [amplitude],
    );

    useGSAP(() => {
      if (!svgRef.current || !polylineRef.current) return;

      const svg = svgRef.current;
      const polyline = polylineRef.current;
      const interval = width / (segments - 1);

      while (polyline.points.numberOfItems > 0) {
        polyline.points.removeItem(0);
      }

      if (mainTimelineRef.current) {
        mainTimelineRef.current.kill();
      }

      for (let i = 0; i < segments; i++) {
        const point = svg.createSVGPoint();
        point.x = i * interval;
        point.y = autoPlay ? calculateWaveY(i / (segments - 1), 0) : 0;

        polyline.points.appendItem(point);
      }

      const waveTl = gsap.timeline({
        repeat: -1,
        paused: !autoPlay,
        onUpdate: () => {
          lastProgressRef.current = waveTl.progress();

          for (let i = 0; i < segments; i++) {
            if (polyline.points.numberOfItems <= i) continue;

            const point = polyline.points.getItem(i);
            const normalizedPos = i / (segments - 1);
            const phaseOffset = waveTl.progress() * Math.PI * 2;

            point.y = calculateWaveY(normalizedPos, phaseOffset);
          }
        },
      });

      waveTl.to({}, { duration });
      mainTimelineRef.current = waveTl;
      isPlayingRef.current = autoPlay;
    }, []);

    const play = () => {
      if (isPlayingRef.current) return;
      isPlayingRef.current = true;

      if (polylineRef.current && mainTimelineRef.current) {
        const { points } = polylineRef.current;

        const initialState = Array.from({ length: points.numberOfItems }).map((_, i) => ({
          element: points.getItem(i),
          startY: points.getItem(i).y,
          index: i,
        }));

        mainTimelineRef.current.progress(lastProgressRef.current);
        mainTimelineRef.current.play();

        const animationProxy = { progress: 0 };
        gsap.to(animationProxy, {
          progress: 1,
          duration: 0.6,
          ease: 'power2.out',
          onUpdate: () => {
            initialState.forEach((data) => {
              if (!polylineRef.current) return;

              const livePoint = polylineRef.current.points.getItem(data.index);
              const targetY = livePoint.y;

              data.element.y = gsap.utils.interpolate(
                data.startY,
                targetY,
                animationProxy.progress,
              );
            });
          },
        });
      }
    };

    const pause = () => {
      if (!isPlayingRef.current) return;

      if (mainTimelineRef.current) {
        lastProgressRef.current = mainTimelineRef.current.progress();
        mainTimelineRef.current.pause();
      }

      if (polylineRef.current) {
        const { points } = polylineRef.current;

        const currentState = Array.from({ length: points.numberOfItems }).map((_, i) => ({
          element: points.getItem(i),
          startY: points.getItem(i).y,
        }));

        const animationProxy = { progress: 0 };
        gsap.to(animationProxy, {
          progress: 1,
          duration: 0.6,
          ease: 'power2.inOut',
          onUpdate: () => {
            currentState.forEach((data) => {
              data.element.y = gsap.utils.interpolate(data.startY, 0, animationProxy.progress);
            });
          },
          onComplete: () => {
            isPlayingRef.current = false;
          },
        });
      } else {
        isPlayingRef.current = false;
      }
    };

    useImperativeHandle(ref, () => ({
      play,
      pause,
    }));

    return (
      <div ref={containerRef}>
        <svg
          ref={svgRef}
          className={clsx('h-auto w-full', className)}
          preserveAspectRatio="xMidYMid meet"
          viewBox={`0 0 ${width} ${height}`}
        >
          <g transform={`translate(0, ${height / 2})`}>
            <polyline
              ref={polylineRef}
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </g>
        </svg>
      </div>
    );
  },
);

export default Wave;
