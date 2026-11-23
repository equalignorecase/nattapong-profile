export function initTypingEffect(options = {}) {
  const {
    selector = '[data-typing-phrases]',
    typeSpeed = 55,
    deleteSpeed = 30,
    holdMs = 1800,
    pauseMs = 300,
    startDelay = 120,
  } = options;

  const container = document.querySelector(selector);
  if (!container) return () => {};

  const target = container.querySelector('.typing-text');
  if (!target) return () => {};

  let phrases;
  try {
    phrases = JSON.parse(container.getAttribute('data-typing-phrases') || '[]');
  } catch {
    phrases = [];
  }
  if (!Array.isArray(phrases) || phrases.length < 2) return () => {};

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    target.textContent = phrases[0];
    return () => {};
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let timerId = null;
  let isVisible = true;

  target.textContent = '';

  const clearTimer = () => {
    if (timerId !== null) {
      window.clearTimeout(timerId);
      timerId = null;
    }
  };

  const schedule = (delay) => {
    clearTimer();
    if (!isVisible || document.hidden) return;
    timerId = window.setTimeout(tick, delay);
  };

  const tick = () => {
    timerId = null;
    if (!isVisible || document.hidden) return;

    const current = phrases[phraseIndex];

    if (!isDeleting) {
      if (charIndex < current.length) {
        charIndex += 1;
        target.textContent = current.slice(0, charIndex);
        container.classList.add('is-typing');
        schedule(charIndex === current.length ? holdMs : typeSpeed);
        if (charIndex === current.length) {
          container.classList.remove('is-typing');
          isDeleting = true;
        }
      } else {
        container.classList.remove('is-typing');
        isDeleting = true;
        schedule(holdMs);
      }
    } else if (charIndex > 0) {
      charIndex -= 1;
      target.textContent = current.slice(0, charIndex);
      container.classList.add('is-typing');
      if (charIndex === 0) {
        container.classList.remove('is-typing');
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        schedule(pauseMs);
      } else {
        schedule(deleteSpeed);
      }
    } else {
      container.classList.remove('is-typing');
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      schedule(pauseMs);
    }
  };

  const onVisibilityChange = () => {
    if (document.hidden) clearTimer();
    else if (isVisible && timerId === null) schedule(pauseMs);
  };

  document.addEventListener('visibilitychange', onVisibilityChange);

  let observer = null;
  if ('IntersectionObserver' in window) {
    observer = new window.IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      isVisible = entry.isIntersecting;
      if (isVisible && timerId === null && !document.hidden) {
        schedule(pauseMs);
      } else if (!isVisible) {
        clearTimer();
      }
    }, { threshold: 0 });
    observer.observe(container);
  }

  schedule(startDelay);

  return () => {
    clearTimer();
    document.removeEventListener('visibilitychange', onVisibilityChange);
    observer?.disconnect();
  };
}
