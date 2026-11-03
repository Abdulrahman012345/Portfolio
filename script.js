// ===== Mobile menu =====
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

// ===== Scroll reveal =====
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  reveals.forEach(el => io.observe(el));
} else {
  reveals.forEach(el => el.classList.add('in'));
}

// ===== Active nav link =====
const links = [...navLinks.querySelectorAll('a')];
const sections = links.map(a => document.querySelector(a.getAttribute('href')));
function updateActive() {
  const y = window.scrollY + 120;
  let current = 0;
  sections.forEach((s, i) => { if (s && s.offsetTop <= y) current = i; });
  links.forEach((a, i) => a.classList.toggle('active', i === current));
}

// ===== Nav shadow + back-to-top =====
const nav = document.getElementById('nav');
const topBtn = document.getElementById('top');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
  topBtn.classList.toggle('show', window.scrollY > 500);
  updateActive();
}, { passive: true });
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
updateActive();

// ===== Contact form validation (no email is sent; connect a form service for that) =====
const form = document.getElementById('form');
const status = document.getElementById('status');
const rules = {
  name:    v => v.trim().length >= 2 ? '' : 'Enter your name.',
  email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address.',
  subject: v => v.trim().length >= 3 ? '' : 'Enter a subject.',
  message: v => v.trim().length >= 10 ? '' : 'Write at least 10 characters.'
};
form.addEventListener('submit', e => {
  e.preventDefault();
  let ok = true;
  Object.keys(rules).forEach(k => {
    const msg = rules[k](form.elements[k].value);
    document.getElementById('e-' + k).textContent = msg;
    form.elements[k].setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (msg) ok = false;
  });
  status.textContent = ok ? 'Looks good. Connect a form service (see the note below) to deliver this message.' : '';
  if (ok) form.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();
