// Mobile Menu
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.querySelector('.nav-links');
menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Dark/Light Mode
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Load Saved Theme
window.addEventListener('load', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    toggle.checked = true;
  }
});

// Scroll-to-top
const scrollBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll Animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});
for (const el of document.querySelectorAll('.fade-in, .slide-up')) {
  observer.observe(el);
}

// Lightbox
if (document.getElementById('lightbox')) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.close-lightbox');
  const images = document.querySelectorAll('.lightbox-img');
  
  for (const img of images) {
    img.addEventListener('click', () => {
      lightbox.style.display = 'block';
      lightboxImg.src = img.src;
    });
  }
  
  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });
  
  window.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.style.display = 'none';
  });
}
// SCROLL PROGRESS BAR
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById('scroll-progress').style.width = progress + '%';
});
// TESTIMONIAL SLIDER
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;
setInterval(() => {
  testimonials[currentTestimonial].classList.remove('active');
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  testimonials[currentTestimonial].classList.add('active');
}, 4000);
// LIGHTBOX GALLERY
const lightboxLinks = document.querySelectorAll('.lightbox');
const lightboxOverlay = document.createElement('div');
lightboxOverlay.classList.add('lightbox-overlay');
document.body.appendChild(lightboxOverlay);

for (const link of lightboxLinks) {
  link.addEventListener('click', e => {
    e.preventDefault();
    const img = document.createElement('img');
    img.src = link.href;
    lightboxOverlay.innerHTML = '';
    lightboxOverlay.appendChild(img);
    lightboxOverlay.classList.add('active');
  });
}

lightboxOverlay.addEventListener('click', () => {
  lightboxOverlay.classList.remove('active');
});
// AUTO DETECT DARK/LIGHT THEME
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (localStorage.getItem('theme')) {
  if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');
} else if (prefersDark) {
  document.body.classList.add('dark');
  toggle.checked = true;
}
