(() => {
  const form = document.querySelector('[data-wizard]');
  if (!form) return;

  const steps = [...form.querySelectorAll('.wizard-step')];
  const back = form.querySelector('[data-back]');
  const next = form.querySelector('[data-next]');
  const submit = form.querySelector('[data-submit]');
  const currentEl = document.querySelector('[data-step-current]');
  const progress = document.querySelector('[data-progress]');
  const label = document.querySelector('[data-step-label]');
  const status = form.querySelector('[data-form-status]');
  const summary = form.querySelector('[data-summary] dl');
  const isSmallScreen = window.matchMedia('(max-width: 760px)').matches;
  let current = 0;

  const params = new URLSearchParams(window.location.search);
  const service = params.get('service');
  const city = params.get('ville');

  if (service) {
    const normalized = service.toLocaleLowerCase('fr');
    const match = [...form.querySelectorAll('input[name="menuiserie"]')].find((input) => {
      const value = input.value.toLocaleLowerCase('fr');
      return normalized.includes(value) || value.includes(normalized);
    });
    if (match) match.checked = true;
  }

  if (city) {
    const cityField = form.querySelector('input[name="ville"]');
    if (cityField) cityField.value = city;
  }

  function validateStep(index) {
    const step = steps[index];
    if (!step) return false;

    const fields = [...step.querySelectorAll('input, select, textarea')];
    for (const field of fields) {
      if (field.disabled || field.type === 'file' || field.type === 'hidden') continue;
      if (!field.checkValidity()) {
        field.reportValidity();
        if (typeof field.focus === 'function') field.focus({ preventScroll: true });
        setTimeout(() => field.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
        return false;
      }
    }
    return true;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[char]));
  }

  function updateSummary() {
    if (!summary) return;
    const data = new FormData(form);
    const dimensions = [data.get('largeur-mm'), data.get('hauteur-mm')].filter(Boolean).join(' × ');
    const rows = [
      ['Projet', data.get('type-projet')],
      ['Menuiserie', data.get('menuiserie')],
      ['Dimensions', dimensions ? dimensions + ' mm' : 'À préciser'],
      ['Quantité', data.get('quantite')],
      ['Matériau', data.get('materiau')],
      ['Couleur', data.get('couleur') || data.get('couleur-detail')],
      ['Pose', data.get('type-pose')],
      ['Ville', [data.get('code-postal'), data.get('ville')].filter(Boolean).join(' ')],
      ['Contact', data.get('nom')]
    ].filter(([, value]) => value);

    summary.innerHTML = rows
      .map(([key, value]) => `<div><dt>${escapeHtml(key)}</dt><dd>${escapeHtml(value)}</dd></div>`)
      .join('');
  }

  function show(index) {
    current = Math.max(0, Math.min(index, steps.length - 1));

    steps.forEach((step, i) => {
      const active = i === current;
      step.classList.toggle('is-active', active);
      step.hidden = !active;
      step.setAttribute('aria-hidden', active ? 'false' : 'true');
    });

    back.disabled = current === 0;
    next.hidden = current === steps.length - 1;
    submit.hidden = current !== steps.length - 1;

    if (currentEl) currentEl.textContent = String(current + 1);
    if (progress) progress.style.width = `${((current + 1) / steps.length) * 100}%`;
    if (label) label.textContent = steps[current].dataset.label || '';
    if (current === steps.length - 1) updateSummary();

    status.textContent = '';
    status.classList.remove('is-error');

    // Important on Android: do not force focus onto headings when changing step.
    // Forced focus can immediately steal focus back from text inputs once the keyboard opens.
    if (!isSmallScreen) {
      const heading = steps[current].querySelector('h2');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      }
    }

    const top = form.getBoundingClientRect().top + window.scrollY - 120;
    if (window.scrollY > top + 280) {
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="number"], textarea, select')
    .forEach((field) => {
      field.addEventListener('focus', () => {
        if (!isSmallScreen) return;
        setTimeout(() => {
          const rect = field.getBoundingClientRect();
          const viewportHeight = window.visualViewport?.height || window.innerHeight;
          if (rect.bottom > viewportHeight - 80 || rect.top < 80) {
            field.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 180);
      });
    });

  next.addEventListener('click', () => {
    if (!validateStep(current)) return;
    show(current + 1);
  });

  back.addEventListener('click', () => show(current - 1));

  form.addEventListener('submit', (event) => {
    if (!validateStep(current)) {
      event.preventDefault();
      return;
    }

    const files = [...form.querySelectorAll('input[type="file"]')]
      .flatMap((input) => [...input.files]);
    const total = files.reduce((sum, file) => sum + file.size, 0);

    if (total > 7.5 * 1024 * 1024) {
      event.preventDefault();
      status.textContent = 'Les fichiers dépassent la taille autorisée. Réduisez la taille des photos ou envoyez moins de fichiers.';
      status.classList.add('is-error');
      return;
    }

    submit.disabled = true;
    submit.textContent = 'Envoi en cours…';
  });

  show(0);
})();
