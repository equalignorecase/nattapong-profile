import test from 'node:test';
import assert from 'node:assert/strict';
import { getDistance, createNode, updateNode, initNetworkMesh } from '../src/scripts/network-mesh.js';

test('getDistance computes accurate Euclidean distance', () => {
  assert.equal(getDistance(0, 0, 3, 4), 5);
  assert.equal(getDistance(10, 20, 10, 20), 0);
  assert.equal(Math.round(getDistance(0, 0, 10, 10)), 14);
});

test('createNode creates a node within specified boundaries', () => {
  const node = createNode(800, 600, () => 0.5);
  assert.equal(node.x, 400);
  assert.equal(node.y, 300);
  assert.ok(node.radius > 0);
  assert.ok(node.baseAlpha > 0);
  assert.ok(typeof node.vx === 'number');
  assert.ok(typeof node.vy === 'number');
});

test('updateNode moves node and reverses velocity at boundaries', () => {
  const node = { x: 798, y: 100, vx: 5, vy: 0, radius: 2, baseAlpha: 0.5 };
  updateNode(node, 800, 600);
  assert.equal(node.x, 800);
  assert.ok(node.vx < 0, 'Velocity in X should reverse to negative after hitting right wall');

  const nodeLeft = { x: 2, y: 100, vx: -5, vy: 0, radius: 2, baseAlpha: 0.5 };
  updateNode(nodeLeft, 800, 600);
  assert.equal(nodeLeft.x, 0);
  assert.ok(nodeLeft.vx > 0, 'Velocity in X should reverse to positive after hitting left wall');
});

test('initNetworkMesh respects prefers-reduced-motion and draws static frame without animation loop', () => {
  let cleared = false;
  const mockCtx = {
    save: () => {},
    restore: () => {},
    scale: () => {},
    clearRect: () => { cleared = true; },
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    stroke: () => {},
    arc: () => {},
    fill: () => {},
  };

  const mockCanvas = {
    getContext: () => mockCtx,
    width: 0,
    height: 0,
  };

  const mockHero = {
    getBoundingClientRect: () => ({ width: 800, height: 600, left: 0, top: 0 }),
    addEventListener: () => {},
    removeEventListener: () => {},
  };

  globalThis.document = {
    querySelector: (sel) => {
      if (sel === '#network-mesh-canvas') return mockCanvas;
      if (sel === '.swiss-hero') return mockHero;
      return null;
    },
    addEventListener: () => {},
    removeEventListener: () => {},
    hidden: false,
  };

  let rafScheduled = false;
  globalThis.window = {
    matchMedia: (query) => ({ matches: query.includes('prefers-reduced-motion') }),
    requestAnimationFrame: () => { rafScheduled = true; return 1; },
    cancelAnimationFrame: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    devicePixelRatio: 1,
  };

  const stop = initNetworkMesh();
  assert.equal(cleared, true, 'Should draw static frame once');
  assert.equal(rafScheduled, false, 'Should not schedule requestAnimationFrame when reduced motion is requested');
  stop();
});

test('initNetworkMesh schedules animation loop when motion is allowed and viewport intersects', () => {
  const mockCtx = {
    save: () => {},
    restore: () => {},
    scale: () => {},
    clearRect: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    stroke: () => {},
    arc: () => {},
    fill: () => {},
  };

  const mockCanvas = {
    getContext: () => mockCtx,
    width: 0,
    height: 0,
  };

  const mockHero = {
    getBoundingClientRect: () => ({ width: 800, height: 600, left: 0, top: 0 }),
    addEventListener: () => {},
    removeEventListener: () => {},
  };

  globalThis.document = {
    querySelector: (sel) => {
      if (sel === '#network-mesh-canvas') return mockCanvas;
      if (sel === '.swiss-hero') return mockHero;
      return null;
    },
    addEventListener: () => {},
    removeEventListener: () => {},
    hidden: false,
  };

  let rafScheduled = false;
  globalThis.window = {
    matchMedia: () => ({ matches: false }),
    requestAnimationFrame: () => { rafScheduled = true; return 1; },
    cancelAnimationFrame: () => { rafScheduled = false; },
    addEventListener: () => {},
    removeEventListener: () => {},
    devicePixelRatio: 1,
  };

  let observerCb = null;
  globalThis.IntersectionObserver = class {
    constructor(cb) {
      observerCb = cb;
    }
    observe() {}
    disconnect() {}
  };

  const stop = initNetworkMesh();
  observerCb([{ isIntersecting: true }]);

  assert.equal(rafScheduled, true, 'Should start requestAnimationFrame loop when visible');
  stop();
  assert.equal(rafScheduled, false, 'Should cancel loop on stop');
});
