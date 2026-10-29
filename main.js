// Picnic Fun Zone — static site interactions
const nav = document.querySelector('.nav-links');
const toggle = document.querySelector('[data-menu-toggle]');
if (toggle && nav) {
  toggle.setAttribute('aria-expanded','false');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false');
    }
  });
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false');
  }));
}
// Indicate current page in navigation.
document.querySelectorAll('.nav-links a').forEach(a => {
  const aPath = new URL(a.href, location.href).pathname;
  if (aPath === location.pathname) a.setAttribute('aria-current','page');
});
// Select adventure type and open a composed email; no false success confirmation.
document.querySelectorAll('.adventure-pick .pick').forEach(p => p.addEventListener('click', () => {
  p.parentElement.querySelectorAll('.pick').forEach(x=>x.classList.remove('active'));
  p.classList.add('active');
}));
const enquiry=document.querySelector('[data-enquiry-form]');
if(enquiry){
  if(new URLSearchParams(location.search).get('intent')==='booking'){
    const hint=enquiry.querySelector('.form-hint');
    if(hint)hint.textContent='Tell us what you would like to book. Your email app will open with the enquiry prepared.';
  }
  enquiry.addEventListener('submit',e=>{
    e.preventDefault();
    if(!enquiry.reportValidity())return;
    const name=enquiry.querySelector('[name="name"]')?.value.trim()||'';
    const email=enquiry.querySelector('[name="email"]')?.value.trim()||'';
    const message=enquiry.querySelector('[name="message"]')?.value.trim()||'';
    const type=enquiry.querySelector('.pick.active')?.textContent.trim()||'General enquiry';
    const subject=encodeURIComponent('Picnic Fun Zone enquiry — '+type);
    const body=encodeURIComponent(`Name: ${name}\nEmail: ${email}\nAdventure: ${type}\n\n${message}`);
    location.href=`mailto:hello@picnicgames.pk?subject=${subject}&body=${body}`;
  });
}
// Detail page gallery thumbnails.
document.addEventListener('click',e=>{
 const thumb=e.target.closest('.hero-gallery .thumb');
 if(!thumb)return;
 const gallery=thumb.closest('.hero-gallery');
 const main=gallery?.querySelector('.main-image');
 if(main){e.preventDefault();main.src=thumb.src;main.alt=thumb.alt;
 gallery.querySelectorAll('.thumb').forEach(x=>x.classList.remove('active'));thumb.classList.add('active');}
});
// Gentle scroll reveal, respects reduced-motion preferences.
if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
 const io=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}
 }),{threshold:.07});
 document.querySelectorAll('.section,.page-hero,.card,.game-card,.place,.info-card').forEach(el=>{el.classList.add('reveal');io.observe(el);});
}

// Video Modal functionality
document.addEventListener('DOMContentLoaded', () => {
  const watchStoryBtn = document.getElementById('watchStoryBtn');
  const videoModal = document.getElementById('videoModal');
  const closeVideoModal = document.getElementById('closeVideoModal');
  const storyVideo = document.getElementById('storyVideo');

  // Open video modal
  if (watchStoryBtn) {
    watchStoryBtn.addEventListener('click', () => {
      videoModal.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      
      // Auto-play video when modal opens
      if (storyVideo) {
        setTimeout(() => {
          storyVideo.play().catch(e => {
            console.log('Auto-play prevented:', e);
          });
        }, 300);
      }
    });
  }

  // Close video modal
  function closeModal() {
    videoModal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
    
    // Pause video when modal closes
    if (storyVideo) {
      storyVideo.pause();
      storyVideo.currentTime = 0; // Reset to beginning
    }
  }

  // Close modal when clicking X button
  if (closeVideoModal) {
    closeVideoModal.addEventListener('click', closeModal);
  }

  // Close modal when clicking outside the modal content
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('show')) {
      closeModal();
    }
  });

  // Handle video end
  if (storyVideo) {
    storyVideo.addEventListener('ended', () => {
      // Optionally keep modal open or close after video ends
      // closeModal(); // Uncomment to close modal when video ends
    });
  }
});

// Highlight active nav link by current path
(function () {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });
})();
