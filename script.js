const reveals = document.querySelectorAll('.reveal');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('#site-nav');
const navLinks = document.querySelectorAll('#site-nav a');
const installBtn = document.querySelector('#installBtn');
let deferredPrompt;

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((section) => observer.observe(section));
} else {
  reveals.forEach((section) => section.classList.add('visible'));
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;

  if (installBtn) {
    installBtn.hidden = false;
  }
});

if (installBtn) {
  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBtn.hidden = true;
  });
}

window.addEventListener('appinstalled', () => {
  if (installBtn) {
    installBtn.hidden = true;
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js');
  });
}
