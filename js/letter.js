const CORRECT_PASSWORD = "uta2179";

// DOM Elements
const passwordOverlay = document.getElementById('passwordOverlay');
const letterPage = document.getElementById('letterPage');
const passwordInput = document.getElementById('passwordInput');
const submitBtn = document.getElementById('submitPasswordBtn');
const errorMessage = document.getElementById('errorMessage');
const backToHomeBtn = document.getElementById('backToHomeFromPasswordBtn');

// Modal Elements
const modal = document.getElementById('docModal');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const viewDocBtn = document.getElementById('viewDocBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

// Lightbox Elements
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

let currentDocFile = '';
let currentDocTitle = '';

// Unlock page function
function unlockPage() {
  passwordOverlay.style.display = 'none';
  letterPage.style.display = 'block';
}

// Verify password
function verifyPassword() {
  const enteredPassword = passwordInput.value.trim();
  
  if (enteredPassword === CORRECT_PASSWORD) {
    unlockPage();
  } else {
    errorMessage.classList.add('show');
    passwordInput.value = '';
    passwordInput.focus();
    
    // Shake animation
    const modal = document.querySelector('.password-modal');
    if (modal) {
      modal.style.animation = 'none';
      setTimeout(() => {
        modal.style.animation = 'fadeInUp 0.4s ease';
      }, 10);
    }
  }
}

// Handle enter key press
function handleKeyPress(e) {
  if (e.key === 'Enter') {
    verifyPassword();
  }
}

// Back to home function
function backToHome() {
  window.location.href = 'index.html#recognition';
}

// Modal Functions
function openModal(title, date, docFile) {
  currentDocFile = docFile;
  currentDocTitle = title;
  modalTitle.textContent = title;
  modalDate.innerHTML = `<i class="far fa-calendar-alt"></i> ${date}`;
  modal.classList.add('active');
}

function closeModal() {
  modal.classList.remove('active');
}

function viewDocument() {
  if (currentDocFile) {
    closeModal();
    lightboxImage.src = currentDocFile;
    lightboxCaption.textContent = currentDocTitle;
    lightbox.classList.add('active');
  } else {
    alert('Document file not found.');
  }
}

// Lightbox Functions
function closeLightbox() {
  lightbox.classList.remove('active');
  lightboxImage.src = '';
  lightboxCaption.textContent = '';
}

// Event Listeners for Letter Cards
function attachCardEvents() {
  const cards = document.querySelectorAll('.letter-card');
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      const title = card.getAttribute('data-doc-title') || 'Document';
      const date = card.getAttribute('data-doc-date') || '';
      const docFile = card.getAttribute('data-doc-file') || '';
      openModal(title, date, docFile);
    });
  });
}

// Main initialization
function init() {
  // Password form events
  if (submitBtn) {
    submitBtn.addEventListener('click', verifyPassword);
  }
  if (passwordInput) {
    passwordInput.addEventListener('keypress', handleKeyPress);
  }
  if (backToHomeBtn) {
    backToHomeBtn.addEventListener('click', backToHome);
  }
  
  // Modal events
  if (viewDocBtn) viewDocBtn.addEventListener('click', viewDocument);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  
  // Lightbox events
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }
  
  // Close modal on outside click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
  
  // Escape key handler
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modal && modal.classList.contains('active')) {
        closeModal();
      }
      if (lightbox && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    }
  });
  
  // Attach card events after page is ready
  attachCardEvents();
}

// Run initialization
init();

// Back to Home button on main page
const backToHomeMainBtn = document.getElementById('backToHomeBtn');
if (backToHomeMainBtn) {
  backToHomeMainBtn.addEventListener('click', () => {
    window.location.href = 'index.html#recognition';
  });
}