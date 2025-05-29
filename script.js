// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle functionality
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    
    mobileMenu.classList.toggle('active');
    mobileNavMenu.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    
    mobileMenu.classList.remove('active');
    mobileNavMenu.classList.remove('active');
}

// Resume download functionality
function downloadResume() {
    // You can replace this with your actual resume file path
    const resumeUrl = 'https://drive.google.com/file/d/1eZG2uDTxvV4PDa3QJUPQkw2TE6k9LWrI/view?usp=sharing';
    

    
    // Uncomment and modify the following lines when you have your resume file:
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Prince_Kumar_Arya_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Contact form handling
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (name && email && message) {
        // You can integrate with a backend service or email service here
        alert('Thank you for your message! I\'ll get back to you soon.');
        this.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Active navigation highlighting
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', updateActiveNav);

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    const navContainer = document.querySelector('.nav-container');
    
    if (!navContainer.contains(e.target) && mobileNavMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (window.innerWidth > 768) {
        mobileNavMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Update active navigation on page load
    updateActiveNav();
    
    // Add smooth loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Smooth scroll to top function (optional)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Performance optimization - throttle scroll events
let ticking = false;

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateActiveNav);
        ticking = true;
    }
}

// Replace the direct scroll listener with throttled version
window.removeEventListener('scroll', updateActiveNav);
window.addEventListener('scroll', function() {
    requestTick();
    ticking = false;
});

// Add loading states for better UX
function showLoading(element) {
    element.style.opacity = '0.7';
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Enhanced form submission with better UX
function handleFormSubmission(form) {
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    showLoading(submitBtn);
    submitBtn.textContent = 'Sending...';
    
    // Simulate form processing (replace with actual form handling)
    setTimeout(() => {
        hideLoading(submitBtn);
        submitBtn.textContent = originalText;
    }, 2000);
}

// Add intersection observer for skill items animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${entry.target.dataset.delay || 0}ms`;
            entry.target.classList.add('animate-in');
        }
    });
}, {
    threshold: 0.3
});

// Initialize skill animations
document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.dataset.delay = index * 100;
    skillObserver.observe(item);
});

// Add smooth hover effects for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});