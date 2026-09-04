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
  let current = 0;

  const params = new URLSearchParams(window.location.search);
  const service = params.get('service');
  const city = params.get('ville');
  if (service) {
    const match = [...form.querySelectorAll('input[name="menuiserie"]')].find(i => service.toLowerCase().includes(i.value.toLowerCase()) || i.value.toLowerCase().includes(service.toLowerCase()));
    if (match) match.checked = true;
  }
  if (city) {
    const field = form.querySelector('input[name="ville"]');
    if (field) field.value = city;
  }

  function validateStep(index) {
    const step = steps[index];
    const fields = [...step.querySelectorAll('input, select, textarea')];
    for (const field of fields) {
      if (field.disabled || field.type === 'file') continue;
      if (!field.checkValidity()) {
        field.reportValidity();
        return false;
      }
    }
    return true;
  }

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
  }

  function updateSummary() {
    if (!summary) return;
    const data = new FormData(form);
    const rows = [
      ['Projet', data.get('type-projet')],
      ['Menuiserie', data.get('menuiserie')],
      ['Dimensions', [data.get('largeur-mm'), data.get('hauteur-mm')].filter(Boolean).join(' × ') + (data.get('largeur-mm') || data.get('hauteur-mm') ? ' mm' : '')],
      ['Quantité', data.get('quantite')],
      ['Matériau', data.get('materiau')],
      ['Couleur', data.get('couleur')],
      ['Pose', data.get('type-pose')],
      ['Ville', [data.get('code-postal'), data.get('ville')].filter(Boolean).join(' ')],
      ['Contact', data.get('nom')]
    ].filter(([,value]) => value);
    summary.innerHTML = rows.map(([k,v]) => `<div><dt>${escapeHtml(k)}</dt><dd>${escapeHtml(String(v))}</dd></div>`).join('');
  }

  function show(index) {
    current = Math.max(0, Math.min(index, steps.length - 1));
    steps.forEach((step, i) => {
      step.classList.toggle('is-active', i === current);
      step.setAttribute('aria-hidden', i === current ? 'false' : 'true');
    });
    back.disabled = current === 0;
    next.hidden = current === steps.length - 1;
    submit.hidden = current !== steps.length - 1;
    if (currentEl) currentEl.textContent = String(current + 1);
    if (progress) progress.style.width = `${((current + 1) / steps.length) * 100}%`;
    if (label) label.textContent = steps[current].dataset.label || '';
    if (current === steps.length - 1) updateSummary();
    status.textContent = '';
    const heading = steps[current].querySelector('h2');
    if (heading) { heading.setAttribute('tabindex','-1'); heading.focus({ preventScroll: true }); }
    const top = form.getBoundingClientRect().top + window.scrollY - 120;
    if (window.scrollY > top + 300) window.scrollTo({ top, behavior: 'smooth' });
  }

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
    const files = [...form.querySelectorAll('input[type="file"]')].flatMap(input => [...input.files]);
    const total = files.reduce((sum, f) => sum + f.size, 0);
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
