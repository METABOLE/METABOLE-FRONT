import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { MousePosition, PhysicsState } from '../types/crosses.types';
import {
  calculateDistance,
  calculateSpeed,
  createFallingCross,
  setupPhysicsEngine,
  handleScroll,
  DEFAULT_CROSS_COLORS,
} from '../utils/crosses.utils';

const EXPLOSION_FORCE = 0.5;
const EXPLOSION_RADIUS = 200;

export const useFallingCrosses = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  crossColors: string[] = DEFAULT_CROSS_COLORS,
) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const physicsRef = useRef<PhysicsState>({
    engine: null,
    render: null,
    ground: null,
    leftWall: null,
    rightWall: null,
    crosses: [],
  });

  const lastPositionRef = useRef<MousePosition | null>(null);
  const lastCrossPositionRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!canvasRef.current || physicsRef.current.engine) return;

    try {
      const { engine, render, ground, walls } = setupPhysicsEngine(canvasRef.current);

      physicsRef.current = {
        engine,
        render,
        ground,
        leftWall: walls[0],
        rightWall: walls[1],
        crosses: [],
      };

      setIsInitialized(true);

      return () => {
        if (physicsRef.current.render) {
          Matter.Render.stop(physicsRef.current.render);
        }

        if (physicsRef.current.engine) {
          Matter.Runner.stop(Matter.Runner.create());
          Matter.Engine.clear(physicsRef.current.engine);
        }

        physicsRef.current = {
          engine: null,
          render: null,
          ground: null,
          leftWall: null,
          rightWall: null,
          crosses: [],
        };
      };
    } catch (error) {
      console.error('Error initializing physics engine:', error);
    }
  }, []);

  useEffect(() => {
    if (!isInitialized || !physicsRef.current.ground) return;

    const scrollHandler = () => {
      if (!physicsRef.current.ground) return;

      handleScroll(physicsRef.current.ground);
    };

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [isInitialized]);

  useEffect(() => {
    if (!isInitialized || !physicsRef.current.engine) return;

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

      const velocityX = clientX - lastX;
      const velocityY = clientY - lastY;

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
          if (physicsRef.current.engine) {
            const cross = createFallingCross(
              physicsRef.current.engine,
              clientX,
              clientY,
              velocityX,
              velocityY,
              speed,
              lastX,
              lastY,
              crossColors,
            );

            physicsRef.current.crosses.push(cross);
            lastCrossPositionRef.current = { x: clientX, y: clientY };
          }
        }
      }

      lastPositionRef.current = {
        x: clientX,
        y: clientY,
        timestamp: currentTime,
      };
    };

    const handleClick = (event: MouseEvent) => {
      const { clientX, clientY } = event;

      physicsRef.current.crosses.forEach((crossBody) => {
        const crossPosition = crossBody.parts[0].position;

        const dx = crossPosition.x - clientX;
        const dy = crossPosition.y - clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < EXPLOSION_RADIUS) {
          const forceMagnitude =
            (EXPLOSION_FORCE * (EXPLOSION_RADIUS - distance)) / EXPLOSION_RADIUS;

          Matter.Body.applyForce(crossBody, crossPosition, {
            x: (dx / distance) * forceMagnitude,
            y: (dy / distance) * forceMagnitude,
          });
        }
      });
    };

    document.body.addEventListener('mousemove', handleGlobalMouseMove);
    document.body.addEventListener('click', handleClick);

    return () => {
      document.body.removeEventListener('mousemove', handleGlobalMouseMove);
      document.body.removeEventListener('click', handleClick);
    };
  }, [isInitialized]);

  return { isInitialized };
};
