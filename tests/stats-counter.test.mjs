import test from 'node:test';
import assert from 'node:assert/strict';
import { parseStatValue, formatStatValue, initStatsCounter } from '../src/scripts/stats-counter.js';

test('parseStatValue correctly parses GPAX decimal', () => {
  const parsed = parseStatValue('3.86');
  assert.equal(parsed.target, 3.86);
  assert.equal(parsed.decimals, 2);
  assert.equal(parsed.padLength, 0);
  assert.equal(parsed.suffix, '');
  assert.equal(parsed.raw, '3.86');
});

test('parseStatValue correctly parses zero-padded integer', () => {
  const parsed = parseStatValue('05');
  assert.equal(parsed.target, 5);
  assert.equal(parsed.decimals, 0);
  assert.equal(parsed.padLength, 2);
  assert.equal(parsed.suffix, '');
});

test('parseStatValue correctly parses padded integer with plus suffix', () => {
  const parsed = parseStatValue('06+');
  assert.equal(parsed.target, 6);
  assert.equal(parsed.decimals, 0);
  assert.equal(parsed.padLength, 2);
  assert.equal(parsed.suffix, '+');
});

test('parseStatValue correctly parses non-padded integer with plus suffix', () => {
  const parsed = parseStatValue('28+');
  assert.equal(parsed.target, 28);
  assert.equal(parsed.decimals, 0);
  assert.equal(parsed.padLength, 0);
  assert.equal(parsed.suffix, '+');
});

test('formatStatValue formats decimals and padded values accurately', () => {
  const decMeta = parseStatValue('3.86');
  assert.equal(formatStatValue(0, decMeta), '0.00');
  assert.equal(formatStatValue(1.93, decMeta), '1.93');
  assert.equal(formatStatValue(3.86, decMeta), '3.86');

  const padMeta = parseStatValue('06+');
  assert.equal(formatStatValue(0, padMeta), '00+');
  assert.equal(formatStatValue(3, padMeta), '03+');
  assert.equal(formatStatValue(6, padMeta), '06+');
});

test('initStatsCounter runs count-up loop and clears is-counting on finish', () => {
  const classes = new Set();
  const element = {
    textContent: '00',
    getAttribute: (name) => name === 'data-stat-target' ? '3.86' : null,
    classList: {
      add: (c) => classes.add(c),
      remove: (c) => classes.delete(c),
    },
  };
  const container = { parentElement: null };

  let rafCallback = null;
  let rafId = 1;

  globalThis.document = {
    querySelectorAll: (sel) => sel === '[data-stat-target]' ? [element] : [],
    querySelector: (sel) => sel === '.swiss-stats-grid' ? container : null,
  };

  let simulatedNow = 1000;
  globalThis.performance = {
    now: () => simulatedNow,
  };

  globalThis.window = {
    matchMedia: () => ({ matches: false }),
    requestAnimationFrame: (cb) => {
      rafCallback = cb;
      return rafId++;
    },
    cancelAnimationFrame: () => {
      rafCallback = null;
    },
  };

  let observerCb = null;
  globalThis.IntersectionObserver = class {
    constructor(cb) {
      observerCb = cb;
    }
    observe() {}
    disconnect() {}
  };

  const stop = initStatsCounter({ duration: 1000 });

  // Trigger intersection
  observerCb([{ isIntersecting: true }]);

  assert.equal(classes.has('is-counting'), true);

  // Advance to 50%
  simulatedNow = 1500;
  const cb1 = rafCallback;
  rafCallback = null;
  cb1(1500);

  assert.notEqual(element.textContent, '00');
  assert.equal(classes.has('is-counting'), true);

  // Advance to 100%
  simulatedNow = 2000;
  const cb2 = rafCallback;
  rafCallback = null;
  cb2(2000);

  assert.equal(element.textContent, '3.86');
  assert.equal(classes.has('is-counting'), false);

  stop();
});

test('initStatsCounter respects prefers-reduced-motion', () => {
  const element = {
    textContent: '00',
    getAttribute: (name) => name === 'data-stat-target' ? '28+' : null,
    classList: { add: () => {}, remove: () => {} },
  };

  globalThis.document = {
    querySelectorAll: () => [element],
    querySelector: () => null,
  };

  globalThis.window = {
    matchMedia: (query) => ({ matches: query.includes('prefers-reduced-motion') }),
  };

  initStatsCounter();
  assert.equal(element.textContent, '28+');
});
