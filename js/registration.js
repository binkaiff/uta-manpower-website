// registration.js - Images open in LIGHTBOX (can close with X, click outside, or ESC)

const registrationCards = document.querySelectorAll('.registration-card');
const modal = document.getElementById('docModal');
const modalTitle = document.getElementById('modalTitle');
const modalClient = document.getElementById('modalClient');
const modalDate = document.getElementById('modalDate');
const viewDocBtn = document.getElementById('viewDocBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

// Lightbox elements
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

let currentDocFile = '';
let currentDocTitle = '';

// Open modal when clicking on any registration card
registrationCards.forEach(card => {
  card.addEventListener('click', (e) => {
    const title = card.getAttribute('data-doc-title') || 'Document';
    const client = card.getAttribute('data-doc-client') || '';
    const date = card.getAttribute('data-doc-date') || '';
    const docFile = card.getAttribute('data-doc-file') || '';
    
    currentDocFile = docFile;
    currentDocTitle = title;
    modalTitle.textContent = title;
    
    if (client) {
      modalClient.innerHTML = `<i class="fas fa-building"></i> ${client}`;
    } else {
      modalClient.innerHTML = '';
    }
    
    modalDate.innerHTML = `<i class="far fa-calendar-alt"></i> ${date}`;
    modal.classList.add('active');
  });
});

// View Document button - OPENS IMAGE IN LIGHTBOX (same page, can close!)
function viewDocument() {
  if (currentDocFile) {
    // Close the modal first
    closeModal();
    // Open image in lightbox
    lightboxImage.src = currentDocFile;
    lightboxCaption.textContent = currentDocTitle;
    lightbox.classList.add('active');
  } else {
    alert('Document not found.');
  }
}

// Close lightbox function
function closeLightbox() {
  lightbox.classList.remove('active');
  lightboxImage.src = '';
  lightboxCaption.textContent = '';
}

// Close modal function
function closeModal() {
  modal.classList.remove('active');
}

// Event listeners
viewDocBtn.addEventListener('click', viewDocument);
closeModalBtn.addEventListener('click', closeModal);
lightboxClose.addEventListener('click', closeLightbox);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (modal.classList.contains('active')) {
      closeModal();
    }
    if (lightbox.classList.contains('active')) {
      closeLightbox();
    }
  }
});

// Back to Home button functionality
const backToHomeBtn = document.getElementById('backToHomeBtn');
if (backToHomeBtn) {
  backToHomeBtn.addEventListener('click', () => {
    window.location.href = 'index.html#recognition';
  });
}