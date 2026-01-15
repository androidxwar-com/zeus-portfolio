// ===================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ===================================

// Initialize Intersection Observer for fade-in-up animations
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

// Initialize Intersection Observer for FADE-OUT (scrolling up)
// Elements fade out when they leave the top of the viewport
const fadeOutObserverOptions = {
    threshold: [0, 0.2, 0.5, 0.8, 1], // Multiple thresholds for smoother checking
    rootMargin: '-10% 0px -20% 0px' // Trigger when element is near top
};

const fadeOutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Calculate relative position
        const rect = entry.target.getBoundingClientRect();
        const viewHeight = window.innerHeight;

        // If element is scrolling out to the top (top is negative or close to 0)
        // and is not intersecting well anymore
        if (rect.top < viewHeight * 0.2) {
            // Calculate opacity based on scroll position logic could go here
            // But for simplicity/performance in this customized observer:
        }
    });
}, fadeOutObserverOptions);


// Alternative: Scroll Event Listener for dynamic fade out
// This gives the "linear" feel requested by user
function handleScrollFade() {
    const elements = document.querySelectorAll('.hero, .feature-section, .horizontal-scroll-section, .gallery-section, .final-cta');
    const triggerPoint = window.innerHeight * 0.3; // Start fading when top of element hits this point

    elements.forEach(el => {
        const rect = el.getBoundingClientRect();

        // If element top is above the trigger point (scrolling up)
        if (rect.top < triggerPoint) {
            // Check if it's completely out of view for performance?
            // Just apply class
            if (rect.bottom < 0) {
                // Completely gone
            } else {
                // In transition zone
                // Calculate how far past it is
                // As rect.top goes from triggerPoint to -height
                // We want opacity to go from 1 to 0

                // Keep it simple: Add class if top is substantially negative
                if (rect.top < -100) {
                    el.classList.add('scroll-fade-out');
                } else {
                    el.classList.remove('scroll-fade-out');
                }
            }
        } else {
            el.classList.remove('scroll-fade-out');
        }
    });
}

// Add to our existing unified scroll handler
// Note: We need to modify the existing scroll handler to include this function call
// or merge it.

// Observe all elements with fade-in-up class
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));

    // Observe main sections for fade-out performance
    const sections = document.querySelectorAll('.feature-section, .horizontal-scroll-section, .gallery-section, .final-cta');
    sections.forEach(el => fadeOutObserver.observe(el));

    // Hero fade-out using IntersectionObserver + gradual opacity
    const heroSection = document.querySelector('.hero-fixed');
    const heroSpacer = document.querySelector('.hero-spacer');

    if (heroSection && heroSpacer) {
        // Use IntersectionObserver to detect when to start fading
        let shouldFade = false;

        const heroFadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // When spacer is out of view, enable fading
                shouldFade = !entry.isIntersecting;

                // If spacer is back in view, ensure Hero is visible
                if (entry.isIntersecting) {
                    updateHeroOpacity();
                }
            });
        }, {
            threshold: 0,
            rootMargin: '0px'
        });

        heroFadeObserver.observe(heroSpacer);

        // Gradual opacity based on scroll position
        let ticking = false;

        function updateHeroOpacity() {
            const scrollY = window.scrollY;
            const fadeStart = 300; // Start fading at 300px
            const fadeEnd = 700;   // Fully transparent at 700px

            let opacity = 1;

            if (scrollY >= fadeEnd) {
                opacity = 0;
            } else if (scrollY >= fadeStart) {
                // Gradual fade between fadeStart and fadeEnd
                const fadeRange = fadeEnd - fadeStart;
                const scrollInRange = scrollY - fadeStart;
                opacity = 1 - (scrollInRange / fadeRange);
            }

            heroSection.style.opacity = opacity;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateHeroOpacity();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // Initial opacity
        updateHeroOpacity();
    }
});

// ===================================
// HORIZONTAL SCROLL AUTO-ANIMATION
// ===================================

// Pause horizontal scroll on hover
const scrollTrack = document.getElementById('scrollTrack');

if (scrollTrack) {
    scrollTrack.addEventListener('mouseenter', () => {
        scrollTrack.style.animationPlayState = 'paused';
    });

    scrollTrack.addEventListener('mouseleave', () => {
        scrollTrack.style.animationPlayState = 'running';
    });
}

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Don't prevent default for links that just have # (like signup, login)
        if (href === '#' || href === '#signup' || href === '#login') {
            return;
        }

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// BUTTON RIPPLE EFFECT (OPTIONAL ENHANCEMENT)
// ===================================

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.classList.add('ripple');

    const existingRipple = button.getElementsByClassName('ripple')[0];
    if (existingRipple) {
        existingRipple.remove();
    }

    button.appendChild(ripple);
}

// Add ripple effect to all buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// ===================================
// UNIFIED SCROLL HANDLER (OPTIMIZED)
// ===================================

let ticking = false;
let lastScroll = 0;
const header = document.querySelector('.header');
const hero = document.querySelector('.hero');

function handleScroll() {
    const currentScroll = window.pageYOffset;

    // Parallax effect on hero (subtle)
    if (hero) {
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${currentScroll * parallaxSpeed}px)`;
    }

    // Header shadow on scroll
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px rgba(183, 148, 246, 0.2)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
    ticking = false;
}

// Single scroll listener with requestAnimationFrame throttling
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
    }
}, { passive: true });

// ===================================
// GALLERY CARD TILT EFFECT (OPTIONAL)
// ===================================

const galleryCards = document.querySelectorAll('.gallery-card');

galleryCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Lazy load images (if needed in the future)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    // Observe images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// CONSOLE MESSAGE (EASTER EGG)
// ===================================

console.log('%c⚡ Neural Fusion Engine', 'font-size: 24px; font-weight: bold; color: #B794F6; text-shadow: 0 0 10px #B794F6;');
console.log('%cMulti-Core AI Architecture with Map-Reduce Synthesis', 'font-size: 14px; color: #00FF88;');
console.log('%cPowered by vanilla HTML, CSS, and JavaScript', 'font-size: 12px; color: #A0A0A0;');

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key to close any modals (if added in the future)
    if (e.key === 'Escape') {
        // Close modal logic here
    }
});

// Focus visible for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ===================================
// ANALYTICS PLACEHOLDER
// ===================================

// Track button clicks (placeholder for analytics)
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent.trim();
        console.log(`Button clicked: ${buttonText}`);
        // Add your analytics tracking here
        // Example: gtag('event', 'button_click', { button_name: buttonText });
    });
});

// ===================================
// INITIALIZATION
// ===================================

console.log('✅ Neural Fusion Engine initialized successfully!');
