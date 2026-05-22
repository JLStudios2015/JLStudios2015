// Mobile burger menu
const nav = document.querySelector('.nav');
const burger = document.querySelector('.nav__burger');

burger?.addEventListener('click', () => nav.classList.toggle('open'));

document.querySelectorAll('.nav__links a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// Scroll-reveal animation
const revealEls = document.querySelectorAll(
  '.card, .about__text, .skills, .contact__item, .section__title'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.15 }
);

revealEls.forEach(el => observer.observe(el));

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${sec.id}` ? 'var(--text)' : '';
      });
    }
  });
}, { passive: true });
