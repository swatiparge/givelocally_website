document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------------------
     Mobile nav toggle
  --------------------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  navToggle?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  /* ---------------------------------------------------------------------
     Scroll-reveal animations
  --------------------------------------------------------------------- */
  gsap.registerPlugin(ScrollTrigger);

  const TEXT_SELECTOR = 'h1, h2, h3, h4, p, span.eyebrow, .hero__perks, .hero__note, .hero__ctas, .section-sub, span.pill';
  const STAGGER_GRID = '.category-grid, .trust-grid, .how-it-works__grid .steps';

  const revealEls = document.querySelectorAll('[data-reveal]');
  revealEls.forEach((el) => {
    /* Skip elements handled by the stagger grid loop below */
    if (el.closest(STAGGER_GRID)) return;

    const isText = el.matches(TEXT_SELECTOR);
    if (isText) {
      /* Wrap in overflow:hidden shell so translateY stays clipped at the line */
      const shell = document.createElement('div');
      shell.style.cssText = 'overflow:hidden; display:block;';
      el.parentNode.insertBefore(shell, el);
      shell.appendChild(el);
      /* Reset clip-path set by CSS */
      el.style.clipPath = 'none';

      gsap.fromTo(el,
        { y: '105%' },
        {
          y: '0%',
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: shell,
            start: 'top 92%',
            toggleActions: 'play none none none'
          }
        }
      );
    } else {
      gsap.fromTo(el,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });

  /* Stagger category cards and trust cards — fade+slide, not clip */
  gsap.utils.toArray(STAGGER_GRID).forEach((grid) => {
    const items = grid.querySelectorAll('[data-reveal]');
    if (items.length > 1) {
      gsap.fromTo(items,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%'
          }
        }
      );
    }
  });

  /* ---------------------------------------------------------------------
     Header shrink-on-scroll
  --------------------------------------------------------------------- */
  const header = document.getElementById('header');
  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
      header.classList.toggle('is-scrolled', self.scroll() > 80);
    }
  });

});
