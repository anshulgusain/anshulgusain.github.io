(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-panel');
  const navLinks = [...document.querySelectorAll('.nav-links a')];

  const closeMenu = () => {
    menu?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('menu-open');
  };

  menuButton?.addEventListener('click', () => {
    const opening = !menu?.classList.contains('open');
    menu?.classList.toggle('open', opening);
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open', opening);
  });
  navLinks.forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.08 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else revealItems.forEach((item) => item.classList.add('visible'));

  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
    }, { rootMargin: '-20% 0px -60% 0px', threshold: [0, .25, .5] });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  const copyButton = document.querySelector('#copy-command');
  copyButton?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('npx autostack-ai');
      const label = copyButton.querySelector('span');
      if (label) label.textContent = 'Copied';
      setTimeout(() => { if (label) label.textContent = 'Copy'; }, 1800);
    } catch { copyButton.querySelector('span').textContent = 'Select'; }
  });

  const year = document.querySelector('#current-year');
  if (year) year.textContent = new Date().getFullYear();

  const form = document.querySelector('#contact-form');
  const error = document.querySelector('#form-error');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const subject = String(data.get('subject') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (!name || !email || !subject || !message) { error.textContent = 'Please complete every field.'; return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { error.textContent = 'Please enter a valid email address.'; return; }
    error.textContent = '';
    const body = `Hi Anshul,\n\n${message}\n\nFrom: ${name} (${email})`;
    window.location.href = `mailto:anshulgusain99@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
