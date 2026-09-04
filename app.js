(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    });
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Ouvrir le menu');
      });
    });
  }

  const serviceSelect = document.querySelector('#service-select');
  document.querySelectorAll('[data-service]').forEach((link) => {
    link.addEventListener('click', () => {
      const value = link.getAttribute('data-service');
      if (serviceSelect && value) serviceSelect.value = value;
    });
  });

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px' });
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }
})();