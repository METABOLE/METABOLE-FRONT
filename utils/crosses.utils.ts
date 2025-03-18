import Matter from 'matter-js';

export const SIZE = 60;
export const THICKNESS = 12;
export const DEFAULT_CROSS_COLORS = ['#1b17ee', '#141418'];

export const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

export const calculateSpeed = (
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

export const getRandomColor = (colors: string[]): string => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export const createFallingCross = (
  engine: Matter.Engine,
  x: number,
  y: number,
  velocityX: number,
  velocityY: number,
  speed: number,
  previousMouseX: number,
  previousMouseY: number,
  crossColors: string[] = DEFAULT_CROSS_COLORS,
): Matter.Body => {
  const { Bodies, Body, Composite } = Matter;

  const crossColor = getRandomColor(crossColors);

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

  const velocityMagnitude = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
  const directionX = velocityX / velocityMagnitude;
  const directionY = velocityY / velocityMagnitude;

  const velocityFactor = Math.min(speed / 100, 12);

  const mouseVectorX = x - previousMouseX;
  const mouseVectorY = y - previousMouseY;

  const mouseMagnitude = Math.sqrt(mouseVectorX * mouseVectorX + mouseVectorY * mouseVectorY);

  const crossProduct = mouseVectorX * velocityY - mouseVectorY * velocityX;
  const rotationDirection = Math.sign(crossProduct);

  const rotationCoefficient = 0.45;

  const mouseInfluence = Math.max(1.0, mouseMagnitude / 10);

  const angularVelocity =
    rotationDirection * (velocityFactor * rotationCoefficient) * mouseInfluence;

  const randomFactor = (Math.random() - 0.5) * 0.1;

  Body.setVelocity(cross, {
    x: directionX * velocityFactor,
    y: directionY * velocityFactor,
  });

  Body.setAngularVelocity(cross, angularVelocity + randomFactor);

  Composite.add(engine.world, cross);

  return cross;
};

export const setupPhysicsEngine = (
  canvas: HTMLCanvasElement,
  footerSelector = 'footer',
  footerOffset = 0,
): {
  engine: Matter.Engine;
  render: Matter.Render;
  ground: Matter.Body;
  walls: Matter.Body[];
} => {
  const { Engine, Render, Runner, Bodies, Composite, MouseConstraint, Mouse } = Matter;

  const engine = Engine.create({
    gravity: { x: 0, y: 1, scale: 0.001 },
  });

  const render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
      width: window.innerWidth,
      height: window.innerHeight,
      wireframes: false,
      background: 'transparent',
    },
  });

  const footer = document.querySelector(footerSelector);
  const footerTop = footer
    ? footer.getBoundingClientRect().top + footerOffset
    : window.innerHeight - 100;

  const ground = Bodies.rectangle(
    window.innerWidth / 2,
    footerTop,
    window.innerWidth - clampVw(20, 8, 100),
    20,
    {
      isStatic: true,
      render: { visible: false },
    },
  );

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

  return {
    engine,
    render,
    ground,
    walls: [leftWall, rightWall],
  };
};

export const clampVw = (minPx: number, maxPx: number, defaultPx: number): number => {
  return Math.min(Math.max(minPx, defaultPx), maxPx);
};

export const handleResize = (
  render: Matter.Render,
  ground: Matter.Body,
  rightWall: Matter.Body,
  footerSelector = 'footer',
  footerOffset = 0,
): void => {
  render.options.width = window.innerWidth;
  render.options.height = window.innerHeight;
  render.canvas.width = window.innerWidth;
  render.canvas.height = window.innerHeight;

  const footer = document.querySelector(footerSelector);
  const footerTop = footer
    ? footer.getBoundingClientRect().top + footerOffset
    : window.innerHeight - 100;

  Matter.Body.setPosition(ground, {
    x: window.innerWidth / 2,
    y: footerTop,
  });

  Matter.Body.scale(
    ground,
    window.innerWidth - clampVw(20, 8, 100) / ground.bounds.max.x - ground.bounds.min.x,
    1,
  );

  Matter.Body.setPosition(rightWall, {
    x: window.innerWidth + 50,
    y: window.innerHeight / 2,
  });
};

export const handleScroll = (
  ground: Matter.Body,
  footerSelector = 'footer',
  footerOffset = 0,
): void => {
  const footer = document.querySelector(footerSelector);
  if (!footer) return;

  const footerRect = footer.getBoundingClientRect();
  const footerTop = footerRect.top + footerOffset;

  Matter.Body.setPosition(ground, {
    x: window.innerWidth / 2,
    y: footerTop,
  });
};
