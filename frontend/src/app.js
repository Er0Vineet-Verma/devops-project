// Spotify DevOps Dashboard - Interactive Animations
(function () {
  // Utility: throttle with requestAnimationFrame
  const throttleRAF = (callback) => {
    let ticking = false;
    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          callback();
          ticking = false;
        });
        ticking = true;
      }
    };
  };

  // Add loaded class once everything is ready for a nicer fade-in
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  // Intersection Observer fallback
  const ioSupported = 'IntersectionObserver' in window;
  if (!ioSupported) {
    document.documentElement.classList.add('no-intersection');
    return; // Exit – animations disabled
  }

  /* ---------------- Scroll Reveal ---------------- */
  const intersectionOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px',
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // If a section becomes visible animate its children
        if (entry.target.classList.contains('section')) {
          animateSectionChildren(entry.target);
        }
        revealObserver.unobserve(entry.target); // Only animate once
      }
    });
  }, intersectionOptions);

  // Observe all elements with .reveal
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  function animateSectionChildren(section) {
    const featureItems = section.querySelectorAll('.feature-item');
    const techCards = section.querySelectorAll('.tech-card');
    const steps = section.querySelectorAll('.deployment-step');

    featureItems.forEach((item) => item.classList.add('visible'));
    techCards.forEach((card) => card.classList.add('visible'));
    steps.forEach((step) => step.classList.add('visible'));
  }

  /* ---------------- Smooth Scroll Navigation ---------------- */
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  function scrollToSection(targetId) {
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    const headerOffset = navbar.offsetHeight + 10;
    const elementPos = targetEl.getBoundingClientRect().top + window.pageYOffset;

    window.scrollTo({
      top: elementPos - headerOffset,
      behavior: 'smooth',
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('href').replace('#', '');
      scrollToSection(id);
    });
  });

  /* ---------------- Active Nav Highlight ---------------- */
  const sections = document.querySelectorAll('.section');
  function setActiveNav() {
    let current = '';
    const scrollPos = window.pageYOffset + navbar.offsetHeight + 20;

    sections.forEach((sec) => {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        current = sec.id;
      }
    });

    navLinks.forEach((link) => {
      const linkTarget = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', linkTarget === current);
    });
  }
  window.addEventListener('scroll', throttleRAF(setActiveNav));
  setActiveNav(); // Init

  /* ---------------- Ripple Effect ---------------- */
  function createRipple(e) {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const circle = document.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;

    circle.className = 'ripple';
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.style.width = circle.style.height = `${diameter}px`;

    const ripple = btn.querySelector('.ripple');
    if (ripple) ripple.remove();
    btn.appendChild(circle);
  }

  document.querySelectorAll('.footer-link').forEach((el) => {
    el.addEventListener('click', createRipple);
  });
})();