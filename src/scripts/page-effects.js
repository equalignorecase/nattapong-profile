export function initPageEffects() {
  const sections = [...document.querySelectorAll('main > section[id]')];
  const links = document.querySelectorAll('.site-header nav a[href^="#"]');
  const header = document.querySelector('.site-header');

  const updateNavigation = () => {
    const isScrolled = window.scrollY > 25;
    const height = header?.getBoundingClientRect().height ?? 0;
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= height + 24) current = section;
    }
    if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      current = sections.at(-1);
    }

    header?.classList?.toggle?.('is-scrolled', isScrolled);
    document.documentElement.style.setProperty('--header-height', `${height}px`);
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
  }, { threshold: 0.05, rootMargin: '80px 0px' });

  targets.forEach(element => observer.observe(element));
}
