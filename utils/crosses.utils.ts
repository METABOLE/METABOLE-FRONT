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
    restitution: 0.1,
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

  const footer = document.querySelector('#footer');
  const wrapperFooter = document.querySelector('#wrapper-footer');
  const footerTop = wrapperFooter
    ? wrapperFooter.getBoundingClientRect().top
    : window.innerHeight - 100;
  const footerWidth = footer ? footer.getBoundingClientRect().width : window.innerWidth;
  const footerHeight = footer ? footer.getBoundingClientRect().height : 100;

  const ground = Bodies.rectangle(
    window.innerWidth / 2,
    footerTop + footerHeight / 2,
    footerWidth,
    footerHeight,
    {
      isStatic: true,
      chamfer: { radius: 24 },
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

export const handleScroll = (ground: Matter.Body): void => {
  const wrapperFooter = document.querySelector('#wrapper-footer');
  const footer = document.querySelector('#wrapper-footer');
  if (!wrapperFooter || !footer) return;

  const wrapperFooterRect = wrapperFooter.getBoundingClientRect();
  const footerRect = footer.getBoundingClientRect();
  const footerHeight = footerRect.height;
  const footerTop = wrapperFooterRect.top;

  Matter.Body.setPosition(ground, {
    x: window.innerWidth / 2,
    y: footerTop + footerHeight / 2,
  });
};
