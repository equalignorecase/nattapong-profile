export function parseStatValue(raw) {
  if (typeof raw !== 'string') raw = String(raw ?? '');
  const trimmed = raw.trim();
  const match = trimmed.match(/^([^0-9.]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { target: 0, decimals: 0, padLength: 0, prefix: '', suffix: '', raw: trimmed };
  }
  const prefix = match[1];
  const numStr = match[2];
  const suffix = match[3];
  const target = parseFloat(numStr);
  const dotIndex = numStr.indexOf('.');
  const decimals = dotIndex !== -1 ? numStr.length - dotIndex - 1 : 0;
  const intPart = dotIndex !== -1 ? numStr.slice(0, dotIndex) : numStr;
  const padLength = intPart.length > 1 && intPart.startsWith('0') ? intPart.length : 0;

  return { target, decimals, padLength, prefix, suffix, raw: trimmed };
}

export function formatStatValue(currentNum, meta) {
  let numStr;
  if (meta.decimals > 0) {
    numStr = currentNum.toFixed(meta.decimals);
  } else {
    const rounded = Math.round(currentNum);
    numStr = meta.padLength > 0 ? String(rounded).padStart(meta.padLength, '0') : String(rounded);
  }
  return `${meta.prefix}${numStr}${meta.suffix}`;
}

export function initStatsCounter(options = {}) {
  const {
    selector = '[data-stat-target]',
    containerSelector = '.swiss-stats-grid',
    duration = 1200,
  } = options;

  if (typeof document === 'undefined') return () => {};

  const elements = Array.from(document.querySelectorAll(selector));
  if (elements.length === 0) return () => {};

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => {
      const target = el.getAttribute('data-stat-target');
      if (target) el.textContent = target;
    });
    return () => {};
  }

  const container = document.querySelector(containerSelector) || elements[0]?.parentElement;

  let animFrameId = null;
  let hasTriggered = false;

  const startAnimation = () => {
    if (hasTriggered) return;
    hasTriggered = true;

    const parsedStats = elements.map(el => ({
      el,
      meta: parseStatValue(el.getAttribute('data-stat-target') || el.textContent || ''),
    }));

    elements.forEach(el => el.classList.add('is-counting'));

    const startTime = typeof performance !== 'undefined' ? performance.now() : Date.now();

    const frame = (now) => {
      const elapsed = (now ?? (typeof performance !== 'undefined' ? performance.now() : Date.now())) - startTime;
      const progress = Math.min(Math.max(elapsed / duration, 0), 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);

      parsedStats.forEach(({ el, meta }) => {
        const current = meta.target * ease;
        el.textContent = formatStatValue(current, meta);
      });

      if (progress < 1) {
        animFrameId = window.requestAnimationFrame(frame);
      } else {
        animFrameId = null;
        parsedStats.forEach(({ el, meta }) => {
          el.textContent = meta.raw;
          el.classList.remove('is-counting');
        });
      }
    };

    animFrameId = window.requestAnimationFrame(frame);
  };

  let observer = null;
  if (typeof IntersectionObserver !== 'undefined' && container) {
    observer = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting)) {
        observer.disconnect();
        observer = null;
        startAnimation();
      }
    }, { threshold: 0.15 });
    observer.observe(container);
  } else {
    startAnimation();
  }

  return () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    if (animFrameId !== null && typeof window !== 'undefined' && window.cancelAnimationFrame) {
      window.cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
  };
}
