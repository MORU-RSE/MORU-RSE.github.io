/* ============================================================
   RSE Theme — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initHeroCarousel();
  initScrollAnimations();
  initCounterAnimations();
});

/* ── Navigation Mobile Toggle ──────────────────────────────── */
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    const bars = toggle.querySelectorAll('span');
    if (links.classList.contains('open')) {
      bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      bars[1].style.opacity   = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    }
  });
}

/* ── Hero Carousel ─────────────────────────────────────────── */
function initHeroCarousel() {
  const carousel = document.querySelector('.hero');
  if (!carousel) return;

  const track    = carousel.querySelector('.hero-track');
  const slides   = carousel.querySelectorAll('.hero-slide');
  const dots     = carousel.querySelectorAll('.hero-dot');
  const prevBtn  = carousel.querySelector('.hero-arrow-prev');
  const nextBtn  = carousel.querySelector('.hero-arrow-next');
  const progress = carousel.querySelector('.hero-progress');

  if (!slides.length) return;

  let current   = 0;
  let timer     = null;
  let progress_ = 0;
  let progTimer = null;
  const DURATION = 6000;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
    track.style.transform = `translateX(-${current * 100}%)`;
    resetProgress();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function resetProgress() {
    clearInterval(progTimer);
    if (progress) progress.style.transition = 'none';
    progress_ = 0;
    if (progress) { progress.style.width = '0%'; }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (progress) progress.style.transition = `width ${DURATION}ms linear`;
        progress_ = 100;
        if (progress) progress.style.width = '100%';
      });
    });
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(next, DURATION);
    resetProgress();
  }

  function stopAuto() {
    clearInterval(timer);
    clearInterval(progTimer);
    if (progress) { progress.style.transition = 'none'; progress.style.width = '0%'; }
  }

  // Init
  slides[0].classList.add('active');
  dots[0]?.classList.add('active');
  startAuto();

  prevBtn?.addEventListener('click', () => { stopAuto(); prev(); startAuto(); });
  nextBtn?.addEventListener('click', () => { stopAuto(); next(); startAuto(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
  });

  // Pause on hover
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  // Touch/swipe
  let touchStartX = 0;
  carousel.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  carousel.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
  });
}

/* ── Scroll Animations ─────────────────────────────────────── */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up, .fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = el.classList.contains('fade-up') ? 'translateY(24px)' : 'none';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  document.addEventListener('animationend', () => {});
  // Simple class toggle approach
  const style = document.createElement('style');
  style.textContent = `
    .fade-up.visible, .fade-in.visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}

/* ── Counter Animations ────────────────────────────────────── */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target   = parseInt(el.dataset.count);
  const suffix   = el.dataset.suffix || '';
  const prefix   = el.dataset.prefix || '';
  const duration = 1800;
  const start    = performance.now();

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = Math.round(eased * target);
    el.innerHTML   = `${prefix}${current}<em>${suffix}</em>`;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}
