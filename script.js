// Navigation Toggle for Mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
        position: relative;
    }
    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--primary-color);
    }
`;
document.head.appendChild(style);

// Animate Brand Sections and Icons on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.brand-section, .design-icon-btn').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    scrollObserver.observe(el);
});

// Design Modal Logic
const modal = document.getElementById('designModal');
const modalImg = document.getElementById('modalImg');
const captionText = document.getElementById('modalCaption');
const closeBtn = document.querySelector('.close-modal');

document.querySelectorAll('button.design-icon-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const imgSrc = btn.getAttribute('data-img');
        const label = btn.querySelector('.label').textContent;
        const brand = btn.closest('.brand-section').querySelector('.brand-title').textContent;
        
        modal.style.display = "block";
        modalImg.src = imgSrc;
        captionText.innerHTML = `${brand} - ${label}`;
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
});

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside the image
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === "block") {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
    }
});

// Contact Form Handling - WhatsApp Redirect
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;

        // Simple validation
        if (!name || !message) {
            alert('Please fill in all fields');
            return;
        }

        // WhatsApp configuration
        const phoneNumber = "201064463104"; // Your WhatsApp number
        const text = `Hello Mohamed,\n\nMy name is: ${name}\n\nMessage: ${message}`;
        const encodedText = encodeURIComponent(text);
        
        // WhatsApp URL (works for both mobile and web)
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
        
        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');
        
        // Reset form
        contactForm.reset();
    });
}

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Parallax Effect for Hero Section - تم إزالته لتجنب ظهور Hero في الخلفية
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const hero = document.querySelector('.hero');
//     if (hero && scrolled < window.innerHeight) {
//         hero.style.transform = `translateY(${scrolled * 0.5}px)`;
//         hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
//     }
// });

// Ensure body is visible on load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

