document.addEventListener('DOMContentLoaded', () => {

  // ─── Nav: scroll state ───────────────────────────────────────
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ─── Nav: active link highlight ─────────────────────────────
  const sections    = document.querySelectorAll('section[id]');
  const navLinks    = document.querySelectorAll('.nav__links a');

  const linkObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => linkObserver.observe(s));

  // ─── Mobile burger menu ──────────────────────────────────────
  const burger = document.querySelector('.nav__burger');
  burger?.addEventListener('click', () => nav.classList.toggle('open'));

  document.querySelectorAll('.nav__links a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });

  // ─── Scroll reveal ───────────────────────────────────────────
  const addReveal = selectors => {
    document.querySelectorAll(selectors).forEach((el, i) => {
      el.setAttribute('data-reveal', i % 4 === 0 ? '' : `delay-${i % 4}`);
    });
  };

  addReveal('.service-card, .portfolio-item, .bts-item, .studio-feat, .capability, .contact-ch');

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

  // ─── Portfolio filter ────────────────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portItems  = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      portItems.forEach(item => {
        const cat = item.dataset.category;
        item.classList.toggle('hidden', filter !== 'all' && cat !== filter);
      });
    });
  });

  // ─── Contact form ────────────────────────────────────────────
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  form?.addEventListener('submit', e => {
    e.preventDefault();
    // Encode data for mailto or handle via fetch to a backend/Formspree
    const data = Object.fromEntries(new FormData(form).entries());
    const body = `Name: ${data.name}\nContact: ${data.contact}\nProject: ${data.project}\n\n${data.message}`;
    const mailto = `mailto:jlstudios2015@gmail.com?subject=Project Inquiry — ${data.project || 'General'}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    success.style.display = 'block';
    form.reset();
    setTimeout(() => { success.style.display = 'none'; }, 6000);
  });

  // ─── Smooth anchor scroll (offset for fixed nav) ─────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});
