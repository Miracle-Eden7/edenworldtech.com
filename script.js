// script.js — Navigation, theme, and simple form handling for Edenworld Tech
(() => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);

  // Footer year
  $('#year').textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = $('#nav-toggle');
  const navList = $('#nav-list');
  navToggle.addEventListener('click', () => {
    const wasOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!wasOpen));
    navList.dataset.open = String(!wasOpen);
    if (!wasOpen) {
      // focus first link
      navList.querySelector('a')?.focus();
    }
  });

  // Close mobile nav when link clicked
  navList.addEventListener('click', (e) => {
    if (e.target.matches('a')) {
      navList.dataset.open = 'false';
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Theme toggle (persist to localStorage)
  const themeToggle = $('#theme-toggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('eden-theme'); // 'light' or 'dark'
  const applyTheme = (t) => {
    if (t === 'light') {
      root.classList.add('light');
      themeToggle.setAttribute('aria-pressed', 'true');
    } else {
      root.classList.remove('light');
      themeToggle.setAttribute('aria-pressed', 'false');
    }
  };
  applyTheme(savedTheme || 'dark');
  themeToggle.addEventListener('click', () => {
    const isLight = root.classList.toggle('light');
    applyTheme(isLight ? 'light' : 'dark');
    localStorage.setItem('eden-theme', isLight ? 'light' : 'dark');
  });

  // Close nav with Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navList.dataset.open = 'false';
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Contact form validation + simulated send
  const contactForm = $('#contact-form');
  const status = $('#form-status');
  if (contactForm) {
    contactForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      status.textContent = '';
      const name = $('#name'), email = $('#email'), message = $('#message');
      $('#err-name').textContent = '';
      $('#err-email').textContent = '';
      $('#err-message').textContent = '';

      let ok = true;
      if (!name.value || name.value.trim().length < 2) {
        $('#err-name').textContent = 'Please enter your name (2+ characters).';
        ok = false;
      }
      if (!email.value || !/^\S+@\S+\.\S+$/.test(email.value)) {
        $('#err-email').textContent = 'Please enter a valid email address.';
        ok = false;
      }
      if (!message.value || message.value.trim().length < 10) {
        $('#err-message').textContent = 'Message must be at least 10 characters.';
        ok = false;
      }

      if (!ok) {
        status.textContent = 'Please fix the errors above.';
        return;
      }

      // Disable submit and simulate
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // Simulate network and response
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
        contactForm.reset();
        status.textContent = 'Thanks! Your message was received (simulated). We will reply shortly.';
      }, 900);
    });
  }

  // Newsletter form
  const newsForm = $('#news-form');
  if (newsForm) {
    newsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = $('#news-email');
      const s = $('#news-status');
      s.textContent = '';
      if (!/^\S+@\S+\.\S+$/.test(email.value || '')) {
        s.textContent = 'Please enter a valid email.';
        return;
      }
      s.textContent = 'Subscribed — check your email (simulated).';
      newsForm.reset();
    });
  }

})();
