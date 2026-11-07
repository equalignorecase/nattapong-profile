function initTyping() {
  const el = document.querySelector('.typing-text');
  if (!el || typeof el.getAttribute !== 'function' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const raw = el.getAttribute('data-phrases');
  const phrases = raw ? JSON.parse(raw) : [el.textContent?.trim() || 'Full-Stack Developer'];
  if (phrases.length <= 1) return;

  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;

  const step = () => {
    const text = phrases[phraseIdx];
    if (deleting) {
      charIdx--;
      el.textContent = text.substring(0, charIdx);
    } else {
      charIdx++;
      el.textContent = text.substring(0, charIdx);
    }

    let delay = deleting ? 35 : 70;

    if (!deleting && charIdx === text.length) {
      delay = 2200;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 350;
    }

    window.setTimeout(step, delay);
  };

  window.setTimeout(step, 800);
}

export function initPageEffects() {
  const sections = [...document.querySelectorAll('main > section[id]')];
  const links = document.querySelectorAll('.site-header nav a[href^="#"]');
  const header = document.querySelector('.site-header');

  const updateNavigation = () => {
    const isScrolled = window.scrollY > 25;
    header?.classList?.toggle?.('is-scrolled', isScrolled);

    const height = header?.getBoundingClientRect().height ?? 0;
    document.documentElement.style.setProperty('--header-height', `${height}px`);
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= height + 24) current = section;
    }
    if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      current = sections.at(-1);
    }
    for (const link of links) {
      if (current && link.getAttribute('href') === `#${current.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  };

  let scheduled = false;
  const scheduleUpdate = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      updateNavigation();
      scheduled = false;
    });
  };
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  updateNavigation();

  initTyping();

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll(
    '.hero-main, .profile-summary, .section-header, .project-card, .skill-group, .education-item, .contact-intro, .contact-list, .certificates-header, .certificate-card, .education-col, .education-compact-card'
  );

  targets.forEach(el => el.classList.add('reveal-item'));

  document.querySelectorAll('.project-grid, .skills-grid, .certificates-grid, .education-compact-list').forEach(grid => {
    [...(grid.children || [])].forEach((child, idx) => {
      child.style?.setProperty?.('--reveal-delay', String(idx % 4));
    });
  });

  const observer = new window.IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(element => observer.observe(element));
}
