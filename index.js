//=============================== toggle icon navbar ==================================

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('#nav-menu')

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active')
};

//=============================== resume open in new tab ==================================

document.getElementById("resume-button-2").addEventListener("click", function (e) {
  // Let the default download behavior work — no Google Drive redirect needed
});

//=============================== scroll sections active link ==================================
let sections = document.querySelectorAll('section, #github-stats, #contact');
let navlinks = document.querySelectorAll('header nav a')

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height) {
        navlinks.forEach(links => {
          links.classList.remove('active');
          let match = document.querySelector('header nav a[href*=' + id + ']');
          if (match) match.classList.add('active');
        });
    };

  });
  //=============================== sticky navbar ==================================

  let header = document.querySelector('header');

  header.classList.toggle('sticky', window.scrollY > 100);

  //=============================== remove toggle icon and navbar when click navbar link(scroll) ==================================

  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active')

};

//=============================== scroll reveal ==================================

ScrollReveal({
  distance: '80px',
  duration: 2000,
  delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .skills-container, .project-card, .project-description, .contact form', { origin: 'bottom', distance: '40px' });
ScrollReveal().reveal('.home-content h1', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'left' });
ScrollReveal().reveal('.timeline-item, .service-card, .achievement-card, .testimonial-card', { origin: 'bottom', distance: '30px', interval: 100 });

//=============================== typed js ==================================

const typed = new Typed('.multiple-text', {
  strings: [
    'Full Stack Engineer',
    'MERN-Stack Developer',
    'TypeScript + Next.js',
    'AI & Automation Builder'
  ],
  typeSpeed: 80,
  backSpeed: 50,
  backDelay: 1500,
  loop: true
});

//=============================== count-up stats (hero + achievements) ==================================
// Animates any element with [data-count] from 0 to its target once it scrolls into view.

function animateCount(el) {
  const target = parseInt(el.getAttribute('data-count'), 10) || 0;
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const countEls = document.querySelectorAll('[data-count]');
if ('IntersectionObserver' in window && countEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  countEls.forEach(el => observer.observe(el));
} else {
  countEls.forEach(animateCount);
}