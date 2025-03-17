import { useTouchDevice } from '@/hooks/useTouchDevice';
import { clampVw } from '@/utils/clamp.utils';
import clsx from 'clsx';
import Matter from 'matter-js';
import { useEffect, useRef, useState } from 'react';

interface FallingCrossesProps {
  className?: string;
  footerSelector?: string;
  footerOffset?: number;
}

interface MousePosition {
  x: number;
  y: number;
  timestamp: number;
}

const SIZE = 30;
const THICKNESS = 6;

const FallingCrosses = ({
  className,
  footerSelector = 'footer',
  footerOffset = 0,
}: FallingCrossesProps) => {
  const isTouchDevice = useTouchDevice();

  if (isTouchDevice) return null;

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const groundRef = useRef<Matter.Body | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const lastPositionRef = useRef<MousePosition | null>(null);
  const lastCrossPositionRef = useRef<{ x: number; y: number } | null>(null);

  const crossColors = ['#1b17ee', '#f1f2ff', '#141418', '#caee17'];

  const footer = document.querySelector(footerSelector);

  useEffect(() => {
    if (!canvasRef.current || engineRef.current) return;

    const { Engine, Render, Runner, Bodies, Composite, MouseConstraint, Mouse } = Matter;

    const engine = Engine.create({
      gravity: { x: 0, y: 1, scale: 0.001 },
    });
    engineRef.current = engine;

    const render = Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent',
      },
    });

    const footerTop = footer
      ? footer.getBoundingClientRect().top + footerOffset
      : window.innerHeight - 100;

    const ground = (groundRef.current = Bodies.rectangle(
      window.innerWidth / 2,
      footerTop,
      window.innerWidth - clampVw(20, 8, 100),
      20,
      {
        isStatic: true,
        render: { visible: false },
      },
    ));

    const leftWall = Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight * 2, {
      isStatic: true,
      render: { visible: false },
    });

    const rightWall = Bodies.rectangle(
      window.innerWidth + 50,
      window.innerHeight / 2,
      100,
      window.innerHeight * 2,
      { isStatic: true, render: { visible: false } },
    );

    Composite.add(engine.world, [ground, leftWall, rightWall]);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    Runner.run(Runner.create(), engine);
    Render.run(render);

    setIsInitialized(true);

    const handleResize = () => {
      render.options.width = window.innerWidth;
      render.options.height = window.innerHeight;
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;

      const footerTop = footer
        ? footer.getBoundingClientRect().top + footerOffset
        : window.innerHeight - 100;

      if (groundRef.current) {
        Matter.Body.setPosition(groundRef.current, {
          x: window.innerWidth / 2,
          y: footerTop,
        });

        Matter.Body.scale(
          groundRef.current,
          window.innerWidth -
            clampVw(20, 8, 100) / groundRef.current.bounds.max.x -
            groundRef.current.bounds.min.x,
          1,
        );
      }

      Matter.Body.setPosition(rightWall, {
        x: window.innerWidth + 50,
        y: window.innerHeight / 2,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Render.stop(render);
      Runner.stop(Runner.create());
      Engine.clear(engine);
      engineRef.current = null;
      groundRef.current = null;
    };
  }, [footerSelector, footerOffset]);

  useEffect(() => {
    if (!isInitialized || !groundRef.current) return;

    const handleScroll = () => {
      const footer = document.querySelector(footerSelector);
      if (!footer || !groundRef.current) return;

      const footerRect = footer.getBoundingClientRect();
      const footerTop = footerRect.top + footerOffset;

      Matter.Body.setPosition(groundRef.current, {
        x: window.innerWidth / 2,
        y: footerTop,
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isInitialized, footerSelector, footerOffset]);

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  const calculateSpeed = (
    x1: number,
    y1: number,
    t1: number,
    x2: number,
    y2: number,
    t2: number,
  ): number => {
    const distance = calculateDistance(x1, y1, x2, y2);
    const time = (t2 - t1) / 1000;
    return distance / time;
  };

  const getRandomColor = (): string => {
    const randomIndex = Math.floor(Math.random() * crossColors.length);
    return crossColors[randomIndex];
  };

  const createFallingCross = (x: number, y: number) => {
    if (!engineRef.current) return;

    const { Bodies, Body, Composite } = Matter;

    const crossColor = getRandomColor();

    const horizontal = Bodies.rectangle(x, y, SIZE, THICKNESS, {
      render: {
        fillStyle: crossColor,
      },
    });

    const vertical = Bodies.rectangle(x, y, THICKNESS, SIZE, {
      render: {
        fillStyle: crossColor,
      },
    });

    const cross = Body.create({
      parts: [horizontal, vertical],
      restitution: 0.5,
      friction: 0.1,
      angle: Math.random() * Math.PI,
    });

    Composite.add(engineRef.current.world, cross);
  };

  useEffect(() => {
    if (!isInitialized) return;

    const handleGlobalMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const currentTime = Date.now();

      if (!lastPositionRef.current) {
        lastPositionRef.current = {
          x: clientX,
          y: clientY,
          timestamp: currentTime,
        };
        return;
      }

      const { x: lastX, y: lastY, timestamp: lastTime } = lastPositionRef.current;

      const speed = calculateSpeed(lastX, lastY, lastTime, clientX, clientY, currentTime);

      if (speed > 500) {
        if (
          !lastCrossPositionRef.current ||
          calculateDistance(
            lastCrossPositionRef.current.x,
            lastCrossPositionRef.current.y,
            clientX,
            clientY,
          ) >= 300
        ) {
          createFallingCross(clientX, clientY);
          lastCrossPositionRef.current = { x: clientX, y: clientY };
        }
      }

      lastPositionRef.current = {
        x: clientX,
        y: clientY,
        timestamp: currentTime,
      };
    };

    document.body.addEventListener('mousemove', handleGlobalMouseMove);

    return () => {
      document.body.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isInitialized]);

  return (
    <div ref={containerRef} className={clsx('pointer-events-none fixed inset-0', className)}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};

export default FallingCrosses;
