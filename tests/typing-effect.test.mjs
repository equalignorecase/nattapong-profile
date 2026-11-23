import test from 'node:test';
import assert from 'node:assert/strict';
import { initTypingEffect } from '../src/scripts/typing-effect.js';

function createEnv({ phrases = ['AB', 'XY'], reduced = false } = {}) {
  const timers = new Map();
  let nextId = 1;
  const listeners = {};
  const classes = new Set();
  const target = { textContent: phrases[0] };
  const container = {
    getAttribute: (name) => name === 'data-typing-phrases' ? JSON.stringify(phrases) : null,
    querySelector: (sel) => sel === '.typing-text' ? target : null,
    classList: {
      add: (c) => classes.add(c),
      remove: (c) => classes.delete(c),
    },
  };

  globalThis.document = {
    hidden: false,
    querySelector: (sel) => sel === '[data-typing-phrases]' ? container : null,
    addEventListener: (event, cb) => { listeners[event] = cb; },
    removeEventListener: (event) => { delete listeners[event]; },
  };
  globalThis.window = {
    matchMedia: () => ({ matches: reduced }),
    setTimeout: (cb, delay) => {
      const id = nextId++;
      timers.set(id, { cb, delay });
      return id;
    },
    clearTimeout: (id) => { timers.delete(id); },
  };

  const step = () => {
    const first = timers.entries().next().value;
    if (!first) return null;
    const [id, entry] = first;
    timers.delete(id);
    entry.cb();
    return entry.delay;
  };

  const stop = initTypingEffect({ typeSpeed: 50, deleteSpeed: 25, holdMs: 1000, pauseMs: 200, startDelay: 100 });
  return { target, classes, timers, step, stop };
}

test('types, deletes, and loops continuously back to the first phrase without double-hold', () => {
  const env = createEnv({ phrases: ['AB', 'XY'] });
  assert.equal(env.target.textContent, '');
  // Start typing 'A' -> 'AB'
  assert.equal(env.step(), 100);
  assert.equal(env.target.textContent, 'A');
  assert.equal(env.classes.has('is-typing'), true);
  assert.equal(env.step(), 50);
  assert.equal(env.target.textContent, 'AB');
  assert.equal(env.classes.has('is-typing'), false);
  // Single holdMs (1000ms), then immediately deletes 'B' -> 'A'
  assert.equal(env.step(), 1000);
  assert.equal(env.target.textContent, 'A');
  assert.equal(env.step(), 25);
  assert.equal(env.target.textContent, '');
  // Pause (200ms), then types 'X' -> 'XY'
  assert.equal(env.step(), 200);
  assert.equal(env.target.textContent, 'X');
  assert.equal(env.step(), 50);
  assert.equal(env.target.textContent, 'XY');
  // Hold (1000ms), deletes 'Y' -> 'X' -> ''
  assert.equal(env.step(), 1000);
  assert.equal(env.target.textContent, 'X');
  assert.equal(env.step(), 25);
  assert.equal(env.target.textContent, '');
  // Loops back to first phrase 'A'
  assert.equal(env.step(), 200);
  assert.equal(env.target.textContent, 'A');
  env.stop();
  assert.equal(env.timers.size, 0);
});

test('respects prefers-reduced-motion and schedules no timers', () => {
  const env = createEnv({ phrases: ['STATIC', 'OTHER'], reduced: true });
  assert.equal(env.target.textContent, 'STATIC');
  assert.equal(env.timers.size, 0);
});
