export function getDistance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

export function createNode(width, height, rng = Math.random) {
  const speed = 0.2 + rng() * 0.35;
  const angle = rng() * Math.PI * 2;
  return {
    x: rng() * width,
    y: rng() * height,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: 1.2 + rng() * 1.6,
    baseAlpha: 0.3 + rng() * 0.4,
  };
}

export function updateNode(node, width, height) {
  node.x += node.vx;
  node.y += node.vy;

  if (node.x <= 0) {
    node.x = 0;
    node.vx = Math.abs(node.vx);
  } else if (node.x >= width) {
    node.x = width;
    node.vx = -Math.abs(node.vx);
  }

  if (node.y <= 0) {
    node.y = 0;
    node.vy = Math.abs(node.vy);
  } else if (node.y >= height) {
    node.y = height;
    node.vy = -Math.abs(node.vy);
  }
}

export function initNetworkMesh(options = {}) {
  const {
    canvasSelector = '#network-mesh-canvas',
    heroSelector = '.swiss-hero',
    maxDistance = 125,
    mouseRadius = 140,
    accentColor = '249, 115, 22',
  } = options;

  if (typeof document === 'undefined') return () => {};

  const canvas = document.querySelector(canvasSelector);
  const hero = document.querySelector(heroSelector);
  if (!canvas || !hero) return () => {};

  const ctx = canvas.getContext ? canvas.getContext('2d') : null;
  if (!ctx) return () => {};

  let width = 0;
  let height = 0;
  let dpr = 1;
  let nodes = [];
  let animId = null;
  let isRunning = false;
  let isVisible = true;
  const mouse = { x: -9999, y: -9999, active: false };

  const resize = () => {
    const rect = hero.getBoundingClientRect ? hero.getBoundingClientRect() : { width: 800, height: 600 };
    width = rect.width || 800;
    height = rect.height || 600;
    dpr = Math.min(typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    const count = Math.min(Math.max(Math.floor((width * height) / 26000), 16), 42);
    if (nodes.length === 0 || Math.abs(nodes.length - count) > 10) {
      nodes = Array.from({ length: count }, () => createNode(width, height));
    } else {
      nodes.forEach(n => {
        n.x = Math.min(n.x, width);
        n.y = Math.min(n.y, height);
      });
    }
  };

  const drawFrame = () => {
    if (!ctx || width === 0 || height === 0) return;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const nLen = nodes.length;

    // Draw connection lines between nodes
    for (let i = 0; i < nLen; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nLen; j++) {
        const b = nodes[j];
        const dist = getDistance(a.x, a.y, b.x, b.y);
        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.18;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${accentColor}, ${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }

      // Draw connection to mouse if active
      if (mouse.active) {
        const mDist = getDistance(a.x, a.y, mouse.x, mouse.y);
        if (mDist < mouseRadius) {
          const mAlpha = (1 - mDist / mouseRadius) * 0.35;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${accentColor}, ${mAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw node dot
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${accentColor}, ${a.baseAlpha})`;
      ctx.fill();
    }

    ctx.restore();
  };

  const tick = () => {
    if (!isRunning) return;

    nodes.forEach(node => updateNode(node, width, height));
    drawFrame();

    if (typeof window !== 'undefined' && window.requestAnimationFrame) {
      animId = window.requestAnimationFrame(tick);
    }
  };

  const start = () => {
    if (isRunning) return;
    isRunning = true;
    if (typeof window !== 'undefined' && window.requestAnimationFrame) {
      animId = window.requestAnimationFrame(tick);
    }
  };

  const stop = () => {
    isRunning = false;
    if (animId !== null && typeof window !== 'undefined' && window.cancelAnimationFrame) {
      window.cancelAnimationFrame(animId);
      animId = null;
    }
  };

  const onPointerMove = (e) => {
    const rect = hero.getBoundingClientRect ? hero.getBoundingClientRect() : { left: 0, top: 0 };
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  };

  const onPointerLeave = () => {
    mouse.active = false;
    mouse.x = -9999;
    mouse.y = -9999;
  };

  hero.addEventListener('pointermove', onPointerMove, { passive: true });
  hero.addEventListener('pointerleave', onPointerLeave, { passive: true });

  const reducedMotionQuery = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  const isReduced = reducedMotionQuery?.matches ?? false;

  resize();

  if (isReduced) {
    drawFrame();
    return () => {
      hero.removeEventListener('pointermove', onPointerMove);
      hero.removeEventListener('pointerleave', onPointerLeave);
    };
  }

  let observer = null;
  if (typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      isVisible = entry ? entry.isIntersecting : true;
      if (isVisible && !document.hidden) {
        start();
      } else {
        stop();
      }
    }, { threshold: 0.05 });
    observer.observe(hero);
  } else {
    start();
  }

  const onVisibilityChange = () => {
    if (document.hidden) {
      stop();
    } else if (isVisible) {
      start();
    }
  };
  document.addEventListener('visibilitychange', onVisibilityChange);

  const onResize = () => {
    resize();
    if (isReduced) drawFrame();
  };
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', onResize, { passive: true });
  }

  return () => {
    stop();
    hero.removeEventListener('pointermove', onPointerMove);
    hero.removeEventListener('pointerleave', onPointerLeave);
    document.removeEventListener('visibilitychange', onVisibilityChange);
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', onResize);
    }
    if (observer) observer.disconnect();
  };
}
