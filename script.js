const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');
const installButtons = document.querySelectorAll('.js-install');
let deferredPrompt;

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealNodes = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealNodes.forEach((node) => io.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add('visible'));
}

const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  const lbImg = lightbox.querySelector('img');
  document.querySelectorAll('[data-lightbox]').forEach((img) => {
    img.addEventListener('click', () => {
      lbImg.src = img.getAttribute('src');
      lbImg.alt = img.getAttribute('alt') || 'Imagen ampliada';
      lightbox.classList.add('open');
    });
  });

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox || event.target.classList.contains('close-lightbox')) {
      lightbox.classList.remove('open');
    }
  });
}

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installButtons.forEach((btn) => { btn.hidden = false; });
});

installButtons.forEach((btn) => {
  btn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installButtons.forEach((b) => { b.hidden = true; });
  });
});

window.addEventListener('appinstalled', () => {
  installButtons.forEach((btn) => { btn.hidden = true; });
});

const y = document.querySelector('[data-year]');
if (y) y.textContent = String(new Date().getFullYear());

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  });
}
