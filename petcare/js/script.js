// Add interactivity to the wireframes

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initTabs();
    addAnimations();
    initActiveNavLinks();
    addScrollEffects();
    initMobileMenu();
});

// Initialize tabs functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Initialize the first tab as active (it's already marked active in HTML)
    tabContents[0].classList.add('active-tab');
    
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active-tab'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            tabContents[index].classList.add('active-tab');
        });
    });
}

// Add animation classes to elements when they come into view
function addAnimations() {
    // Add animation classes to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add animations to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add animations to testimonials
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach((testimonial, index) => {
        testimonial.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
    });
    
    // Add animations to staff cards
    const staffCards = document.querySelectorAll('.staff-card');
    staffCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Set active class on navigation links based on current page
function initActiveNavLinks() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Add scroll effects for header and other elements
function addScrollEffects() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add box shadow to header on scroll
        if (scrollTop > 10) {
            header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Initialize mobile menu functionality
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        // Add click event directly to the toggle button
        mobileMenuToggle.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent the event from bubbling up
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside, but check if menu is actually active first
        document.addEventListener('click', function(event) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(event.target) && 
                !mobileMenuToggle.contains(event.target)) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Debug message to ensure function runs
    console.log('Mobile menu initialized');
}

// Interactive hover effects for service icons
const serviceIcons = document.querySelectorAll('.service-icon');
serviceIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.1)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1)';
    });
});

// Form validation for contact form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // Simple validation
        if (nameInput && nameInput.value.trim() === '') {
            nameInput.style.borderColor = '#ff6b6b';
            isValid = false;
        } else if (nameInput) {
            nameInput.style.borderColor = '#ddd';
        }
        
        if (emailInput && emailInput.value.trim() === '') {
            emailInput.style.borderColor = '#ff6b6b';
            isValid = false;
        } else if (emailInput) {
            emailInput.style.borderColor = '#ddd';
        }
        
        if (messageInput && messageInput.value.trim() === '') {
            messageInput.style.borderColor = '#ff6b6b';
            isValid = false;
        } else if (messageInput) {
            messageInput.style.borderColor = '#ddd';
        }
        
        if (isValid) {
            // Show success message (in a real site, this would submit the form)
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Message Sent!';
            submitButton.style.backgroundColor = '#c8e6c9';
            submitButton.style.borderColor = '#a5d6a7';
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.backgroundColor = '';
                submitButton.style.borderColor = '';
                contactForm.reset();
            }, 3000);
        }
    });
}

// Add interactivity to WhatsApp buttons
const whatsappButtons = document.querySelectorAll('.whatsapp-button, .whatsapp-contact');
whatsappButtons.forEach(button => {
    button.addEventListener('click', () => {
        // In a real site, this would open WhatsApp
        alert('This would open WhatsApp in a real implementation');
    });
}); 