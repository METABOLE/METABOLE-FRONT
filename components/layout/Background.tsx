import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(InertiaPlugin);

interface DotElement extends HTMLDivElement {
  _inertiaApplied: boolean;
  _baseX: number;
  _baseY: number;
}

interface DotCenter {
  el: DotElement;
}

const Background = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<DotElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const threshold = 150;
    const speedThreshold = 100;
    const shockRadius = 250;
    const shockPower = 5;
    const maxSpeed = 5000;

    let dots: DotElement[] = [];
    let dotCenters: DotCenter[] = [];
    let animationFrameId: number | undefined;

    const buildGrid = () => {
      if (!container) return;

      container.innerHTML = '';
      dots = [];

      const contW = container.clientWidth;
      const contH = container.clientHeight;
      const svgSize = 10;
      const gap = 30;

      const cols = Math.floor((contW + gap) / (svgSize + gap));
      const rows = Math.floor((contH + gap) / (svgSize + gap));

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const d = document.createElement('div') as DotElement;

          const x = col * (svgSize + gap) + gap;
          const y = row * (svgSize + gap) + gap;

          d.style.position = 'absolute';
          d.style.left = `${x}px`;
          d.style.top = `${y}px`;
          d.style.width = `${svgSize}px`;
          d.style.height = `${svgSize}px`;
          d.style.transform = 'translate(0, 0)';
          d.style.willChange = 'transform, opacity';
          d.style.transition = 'opacity 0.3s ease';
          d.style.zIndex = '1';
          d.style.pointerEvents = 'none';
          d.style.color = '#1B17EE';
          d.style.opacity = '0.15';

          const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svg.setAttribute('width', '10');
          svg.setAttribute('height', '10');
          svg.setAttribute('viewBox', '0 0 5 5');
          svg.setAttribute('fill', 'none');
          svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', 'M2 3V5H3V3H5V2H3V0H2V2H0V3H2Z');
          path.setAttribute('fill', 'currentColor');

          svg.appendChild(path);
          d.appendChild(svg);

          d._inertiaApplied = false;
          d._baseX = x;
          d._baseY = y;

          container.appendChild(d);
          dots.push(d);
        }
      }

      requestAnimationFrame(() => {
        dotCenters = dots.map((d) => ({ el: d }));
        dotsRef.current = dots;
      });
    };

    let lastTime = 0;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = now - lastTime || 16;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);

      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }

      lastTime = now;
      lastX = e.clientX;
      lastY = e.clientY;

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        dotCenters.forEach(({ el }) => {
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dist = Math.hypot(centerX - e.clientX, centerY - e.clientY);
          const t = Math.max(0, 1 - dist / threshold);
          const opacity = gsap.utils.interpolate(0.15, 1, t);

          el.style.opacity = opacity.toString();

          if (speed > speedThreshold && dist < threshold && !el._inertiaApplied) {
            el._inertiaApplied = true;
            const pushX = (centerX - e.clientX) * 0.1;
            const pushY = (centerY - e.clientY) * 0.1;

            gsap.to(el, {
              x: pushX,
              y: pushY,
              duration: 0.3,
              ease: 'power2.out',
              onComplete() {
                gsap.to(el, {
                  x: 0,
                  y: 0,
                  duration: 1.2,
                  ease: 'elastic.out(1,0.75)',
                });
                el._inertiaApplied = false;
              },
            });
          }
        });
      });
    };

    const handleClick = (e: MouseEvent) => {
      dotCenters.forEach(({ el }) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(centerX - e.clientX, centerY - e.clientY);
        if (dist < shockRadius && !el._inertiaApplied) {
          el._inertiaApplied = true;
          const falloff = Math.max(0, 1 - dist / shockRadius);
          const pushX = (centerX - e.clientX) * shockPower * falloff * 0.1;
          const pushY = (centerY - e.clientY) * shockPower * falloff * 0.1;

          gsap.to(el, {
            x: pushX,
            y: pushY,
            duration: 0.4,
            ease: 'power2.out',
            onComplete() {
              gsap.to(el, {
                x: 0,
                y: 0,
                duration: 1.5,
                ease: 'power4.out',
              });
              el._inertiaApplied = false;
            },
          });
        }
      });
    };

    const handleResize = () => {
      buildGrid();
    };

    buildGrid();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-5] h-screen w-screen opacity-50">
      <div
        ref={containerRef}
        className="pointer-events-none relative h-full w-full overflow-hidden"
      />
    </div>
  );
};

export default Background;
