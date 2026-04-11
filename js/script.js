// Mobile Menu Toggle with Animation - RIGHT SIDE
const toggleBtn = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (toggleBtn && navLinks) {
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  // Close menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
}

// Close menu when clicking outside
document.addEventListener('click', (event) => {
  if (navLinks && navLinks.classList.contains('active')) {
    const isClickInsideNav = navLinks.contains(event.target);
    const isClickOnToggle = toggleBtn && toggleBtn.contains(event.target);
    if (!isClickInsideNav && !isClickOnToggle) {
      toggleBtn.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
    toggleBtn.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.classList.remove('menu-open');
  }
});

// Swipe to close on mobile (right to left swipe)
let touchStartX = 0;
let touchEndX = 0;

if (window.innerWidth <= 768) {
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50 && navLinks && navLinks.classList.contains('active')) {
      // Swipe left to close
      toggleBtn.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
}

// ============================================
// FIXED: Smooth scrolling with offset for all anchor links
// Enhanced to properly handle #recognition and any other hash links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').substring(1);
    if (!targetId) return;
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      e.preventDefault();
      
      // Get header height for offset (dynamic to support responsive header)
      const header = document.querySelector('.header');
      const headerOffset = header ? header.offsetHeight : 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({ 
        top: offsetPosition, 
        behavior: 'smooth' 
      });
      
      // Update URL hash without causing jump
      history.pushState(null, null, `#${targetId}`);
    }
  });
});

// Handle initial hash on page load (e.g., direct link to #recognition)
if (window.location.hash) {
  const targetId = window.location.hash.substring(1);
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    setTimeout(() => {
      const header = document.querySelector('.header');
      const headerOffset = header ? header.offsetHeight : 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ 
        top: offsetPosition, 
        behavior: 'smooth' 
      });
    }, 100);
  }
}

// Scroll Spy - Active Navigation Highlight
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

function updateActiveNavOnScroll() {
  let current = '';
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href').substring(1);
    if (href === current) {
      link.classList.add('active');
    }
  });
}

// Initial call
updateActiveNavOnScroll();

// Throttle scroll event for better performance
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateActiveNavOnScroll();
      ticking = false;
    });
    ticking = true;
  }
});

// Header shadow on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (header) {
    header.style.boxShadow = window.scrollY > 50 ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none';
  }
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.team-member, .gallery-card, .award-card, .service-card, .job-card, .mv-card, .contact-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Logo fallback
const logoImg = document.querySelector('.logo-img');
if (logoImg) {
  logoImg.addEventListener('error', function() {
    this.style.display = 'none';
    const fallback = document.querySelector('.logo-icon');
    if (fallback) fallback.style.display = 'flex';
  });
}

// Formspree AJAX Form Handler
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    
    // Show sending indicator
    feedback.innerHTML = '<p style="color: #007bff;">📤 Sending...</p>';
    
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        // Success message
        feedback.innerHTML = '<p style="color: green; font-weight: bold;">✓ Message sent successfully! We\'ll get back to you soon.</p>';
        form.reset();
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          feedback.innerHTML = '';
        }, 5000);
        
      } else {
        // Handle server errors
        const data = await response.json();
        feedback.innerHTML = `<p style="color: red;">✗ Error: ${data.error || 'Something went wrong. Please try again.'}</p>`;
      }
      
    } catch (error) {
      // Handle network errors
      feedback.innerHTML = '<p style="color: red;">✗ Network error. Please check your connection and try again.</p>';
    }
  });
}

// Image loading animation
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('load', function() {
    this.style.opacity = '1';
    this.classList.add('loaded');
  });
  if (img.complete) {
    img.style.opacity = '1';
    img.classList.add('loaded');
  } else {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
  }
});

// Handle window resize - close menu if screen becomes larger
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('active')) {
    toggleBtn.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.classList.remove('menu-open');
  }
});