import test from 'node:test';
import assert from 'node:assert/strict';
import { initPageEffects } from '../src/scripts/page-effects.js';

function setup({ reduced = false, observerSupport = true } = {}) {
  const events = {};
  const frames = [];
  const observers = [];
  const properties = new Map();
  const state = { scrollY: 0, innerHeight: 800, headerHeight: 76 };
  const element = (id, top) => ({
    id,
    attributes: new Map(),
    classes: new Set(),
    getBoundingClientRect: () => ({ top: top - state.scrollY }),
    setAttribute(key, value) { this.attributes.set(key, value); },
    getAttribute(key) { return this.attributes.get(key) ?? null; },
    removeAttribute(key) { this.attributes.delete(key); },
    classList: { add(name) { this.element.classes.add(name); } },
  });
  const sections = ['about', 'projects', 'contact'].map((id, i) => element(id, i * 900));
  const links = [...sections, ...sections].map(section => {
    const link = element('', 0);
    link.setAttribute('href', `#${section.id}`);
    return link;
  });
  const reveal = sections.map(section => {
    section.classList.element = section;
    return section;
  });
  const root = { scrollHeight: 2600, style: { setProperty: (key, value) => properties.set(key, value) } };
  globalThis.document = {
    documentElement: root,
    querySelector: () => ({ getBoundingClientRect: () => ({ height: state.headerHeight }) }),
    querySelectorAll: selector => selector === 'main > section[id]' ? sections : selector.includes('nav a') ? links : reveal,
  };
  globalThis.window = {
    get scrollY() { return state.scrollY; },
    get innerHeight() { return state.innerHeight; },
    matchMedia: () => ({ matches: reduced }),
    addEventListener: (event, callback) => { events[event] = callback; },
    requestAnimationFrame: callback => frames.push(callback),
  };
  if (observerSupport) {
    window.IntersectionObserver = class {
      constructor(callback) { this.callback = callback; this.observed = new Set(); observers.push(this); }
      observe(target) { this.observed.add(target); }
      unobserve(target) { this.observed.delete(target); }
    };
  }
  const flush = event => { events[event](); while (frames.length) frames.shift()(); };
  initPageEffects();
  return { sections, links, reveal, observers, properties, state, flush, events, frames };
}

function assertCurrent(links, id) {
  assert.equal(links.filter(link => link.getAttribute('aria-current') === 'location').length, 2);
  for (const link of links) {
    assert.equal(link.getAttribute('aria-current'), link.getAttribute('href') === `#${id}` ? 'location' : null);
  }
}

test('keeps desktop and mobile navigation in sync, including a short final section', () => {
  const env = setup();
  assertCurrent(env.links, 'about');
  env.state.scrollY = 950;
  env.flush('scroll');
  assertCurrent(env.links, 'projects');
  env.state.scrollY = 1400;
  env.state.innerHeight = 1200;
  env.flush('scroll');
  assertCurrent(env.links, 'contact');
});

test('reveals only intersecting content and stops observing it after its first entry', () => {
  const env = setup();
  assert.equal(env.observers.length, 1);
  assert.equal(env.reveal.every(target => target.classes.size === 0), true);
  const observer = env.observers[0];
  observer.callback([{ target: env.reveal[0], isIntersecting: false }]);
  assert.equal(env.reveal[0].classes.size, 0);
  observer.callback([{ target: env.reveal[0], isIntersecting: true }]);
  assert.equal(env.reveal[0].classes.has('reveal-in'), true);
  assert.equal(observer.observed.has(env.reveal[0]), false);
  assert.equal(observer.observed.has(env.reveal[1]), true);
});

for (const options of [{ reduced: true }, { observerSupport: false }]) {
  test(`content stays visible and navigation works with ${JSON.stringify(options)}`, () => {
    const env = setup(options);
    assert.equal(env.observers.length, 0);
    assert.equal(env.reveal.every(target => target.classes.size === 0), true);
    env.state.scrollY = 950;
    env.flush('scroll');
    assertCurrent(env.links, 'projects');
  });
}

test('updates the header offset on resize and coalesces scroll events into one frame', () => {
  const env = setup();
  assert.equal(env.properties.get('--header-height'), '76px');
  env.state.headerHeight = 160;
  env.flush('resize');
  assert.equal(env.properties.get('--header-height'), '160px');
  env.events.scroll();
  env.events.scroll();
  assert.equal(env.frames.length, 1);
});
