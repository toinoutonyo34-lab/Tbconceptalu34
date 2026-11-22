(() => {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('.menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  function closeMenu() { if (!mobileMenu || !menuButton) return; mobileMenu.classList.remove('is-open'); menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','Ouvrir le menu'); }
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && mobileMenu?.classList.contains('is-open')) { closeMenu(); menuButton.focus(); } });
  document.addEventListener('click', e => { if (header && !header.contains(e.target)) closeMenu(); });

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    });
    mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Ouvrir le menu');
    }));
  }

  if (header) {
    const updateHeader = () => header.classList.toggle('is-compact', window.scrollY > 24);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveal = document.querySelectorAll('.reveal');
  if (!prefersReduced && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -32px' });
    reveal.forEach((el) => observer.observe(el));
  } else {
    reveal.forEach((el) => el.classList.add('is-visible'));
  }
})();

(() => {
 const contact=document.querySelector('form[name="contact-general"]');
 if(contact){
  const select=contact.elements.objet;
  const details=contact.querySelector('.appointment-fields');
  const update=()=>{details.hidden=select.value!=='Rendez-vous';};
  if(new URLSearchParams(location.search).get('objet')==='Rendez-vous')select.value='Rendez-vous';
  const date=contact.elements['jour-souhaite'];
  const now=new Date(); const today=new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().slice(0,10); date.min=today;
  select.addEventListener('change',update);update();
 }
 document.querySelectorAll('form[data-netlify], form[name="devis-rapide"], form[name="contact-general"], form[name="demande-devis-premium"]').forEach(form=>{
  let status=form.querySelector('[data-form-status]');
  if(!status){status=document.createElement('p');status.className='form-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');form.append(status);}
  form.addEventListener('submit',async event=>{
   if(event.defaultPrevented)return;
   event.preventDefault();
   if(form.dataset.sending==='true')return;
   if(!form.checkValidity()){
    const invalid=form.querySelector(':invalid');
    if(invalid && invalid.closest('[hidden]'))return;
    form.reportValidity();return;
   }
   const button=form.querySelector('button[type="submit"]');const label=button.textContent;
   status.classList.remove('is-error');status.textContent='Envoi en cours…';
   const offline=['localhost','127.0.0.1','[::1]'].includes(location.hostname)||location.protocol==='file:';
   if(offline){status.classList.add('is-error');status.textContent='Aperçu local : aucune demande n’a été envoyée. Vous pouvez appeler le 06 98 11 38 75 ou écrire à contact@conceptalu34.fr.';return;}
   form.dataset.sending='true';button.disabled=true;button.textContent='Envoi en cours…';
   const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),20000);
   try{
    const data=new FormData(form);
    const files=[...form.querySelectorAll('input[type="file"]')].flatMap(i=>[...i.files]);
    if(files.reduce((n,f)=>n+f.size,0)>7*1024*1024)throw new Error('files');
    const request=files.length?{body:data}:{body:new URLSearchParams([...data].filter(([,v])=>typeof v==='string')),headers:{'Content-Type':'application/x-www-form-urlencoded'}};
    const response=await fetch('/',{method:'POST',...request,signal:controller.signal});
    if(!response.ok)throw new Error('network');
    location.assign(form.getAttribute('action')||'/merci/');
   }catch(error){status.classList.add('is-error');status.textContent=error.message==='files'?'Les pièces jointes dépassent 7 Mo. Réduisez leur taille avant de réessayer.':'L’envoi n’a pas pu être confirmé. Vos informations restent dans le formulaire. Réessayez ou appelez le 06 98 11 38 75.';button.disabled=false;button.textContent=label;form.dataset.sending='false';}
   finally{clearTimeout(timeout);}
  });
 });
})();
