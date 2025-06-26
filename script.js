document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.slider-image');
  const leftBtn = document.querySelector('.slider-btn.left');
  const rightBtn = document.querySelector('.slider-btn.right');

  let currentIndex = 0;

  function slideToCurrent() {
    const container = document.querySelector('.slider-wrapper');
    const containerWidth = container.offsetWidth;
    const slideWidth = containerWidth / 2;
    const gap = 16;
    track.style.transform = `translateX(-${currentIndex * (slideWidth + gap)}px)`;
  }

  if (rightBtn && leftBtn && track && slides.length) {
    rightBtn.addEventListener('click', () => {
      if (currentIndex < slides.length - 2) {
        currentIndex++;
        slideToCurrent();
      }
    });

    leftBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        slideToCurrent();
      }
    });

    window.addEventListener('resize', slideToCurrent);
    window.addEventListener('load', slideToCurrent);
  }

  const counters = document.querySelectorAll('.counter');
  const speed = 200;

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = Math.ceil(target / speed);

      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });

  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  const scrollBtn = document.querySelector('.scroll-to-top');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    scrollBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const body = document.body;
  const overlay = document.querySelector('.menu-overlay');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      body.classList.toggle('menu-open');
    });
  }

  if (overlay && mobileMenu) {
    overlay.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      body.classList.remove('menu-open');
    });
  }

  const slideDownEl = document.querySelector('.slide-down-init');
  if (slideDownEl) {
    setTimeout(() => {
      slideDownEl.classList.add('active');
    }, 100);
  }

  const options = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;

      if (el.classList.contains('slide-left-up-init')) {
        if (entry.isIntersecting) {
          el.classList.add('active');
          el.classList.remove('exiting');
        } else {
          if (entry.boundingClientRect.top > 0) {
            el.classList.remove('active');
            el.classList.add('exiting');
          } else {
            el.classList.remove('active', 'exiting');
          }
        }
      } else {
        if (entry.isIntersecting) {
          el.classList.add('active');
        }
      }
    });
  }, options);

  document.querySelectorAll('.slide-left-init, .slide-left-up-init, .fade-in-right').forEach(el => {
    observer.observe(el);
  });
});
