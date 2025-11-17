// Page Loading Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
        }, 500);
    }, 1000);
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
if (themeIcon) {
    themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
}

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const header = document.getElementById('header');
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    if (scrollProgress) {
        scrollProgress.style.width = scrollPercent + '%';
    }
    
    // Header scroll effect
    if (header) {
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Floating Particles Animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuToggle.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuToggle.textContent = '☰';
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Typing Effect for Hero Title
function typeWriter() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
    
    const texts = [
        'Expert Training',
        'Live Sessions',
        'Career Growth',
        'Hands-on Labs'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const delayBetweenTexts = 2000;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => {
                isDeleting = true;
            }, delayBetweenTexts);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        const speed = isDeleting ? erasingSpeed : typingSpeed;
        setTimeout(type, speed);
    }

    // Start typing effect after page loads
    setTimeout(type, 2000);
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add staggered animation for service cards
            if (entry.target.classList.contains('service-card')) {
                const cards = document.querySelectorAll('.service-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animations
document.querySelectorAll('.service-card, .testimonial-card, .stat-item, .section-header, .solution-card, .timeline-item, .philosophy-card, .expertise-card, .offering-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Animated counter for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target === 100 || target === 80) {
                counter.textContent = Math.floor(current) + '%';
            } else if (target === 7) {
                counter.textContent = Math.floor(current) + '+';
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 16);
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Form submission handling with enhanced validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading cursor
        if (customCursor) {
            customCursor.setLoading(true);
        }
        
        // Add submitting class for cursor detection
        this.classList.add('submitting');
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Enhanced validation
        if (!data.name.trim()) {
            showAlert('Please enter your full name.', 'error');
            this.classList.remove('submitting');
            if (customCursor) customCursor.setLoading(false);
            return;
        }
        
        if (!data.email.trim()) {
            showAlert('Please enter your email address.', 'error');
            this.classList.remove('submitting');
            if (customCursor) customCursor.setLoading(false);
            return;
        }
        
        if (!data.phone.trim()) {
            showAlert('Please enter your phone number.', 'error');
            this.classList.remove('submitting');
            if (customCursor) customCursor.setLoading(false);
            return;
        }
        
        if (!data['training-type']) {
            showAlert('Please select a training program.', 'error');
            this.classList.remove('submitting');
            if (customCursor) customCursor.setLoading(false);
            return;
        }
        
        if (!data.message.trim()) {
            showAlert('Please tell us aboutyour goals.', 'error');
            this.classList.remove('submitting');
            if (customCursor) customCursor.setLoading(false);
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showAlert('Please enter a valid email address.', 'error');
            this.classList.remove('submitting');
            if (customCursor) customCursor.setLoading(false);
            return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(data.phone)) {
            showAlert('Please enter a valid phone number.', 'error');
            this.classList.remove('submitting');
            if (customCursor) customCursor.setLoading(false);
            return;
        }
        
        // Simulate processing time
        setTimeout(() => {
            // Show success message with animation
            showAlert('Thank you for your interest! We will get back to you within 24 hours to schedule your free consultation.', 'success');
            
            // Reset form with animation
            this.reset();
            this.classList.remove('submitting');
            
            // Reset cursor
            if (customCursor) {
                customCursor.setLoading(false);
            }
            
            // Add success animation to submit button
            const submitBtn = document.querySelector('.btn-submit');
            if (submitBtn) {
                submitBtn.style.background = 'linear-gradient(135deg, #059669, #047857)';
                submitBtn.textContent = '✓ Submitted Successfully!';
                
                setTimeout(() => {
                    submitBtn.style.background = 'linear-gradient(135deg, var(--primary-blue), var(--secondary-blue))';
                    submitBtn.textContent = 'Book Free Consultation →';
                }, 3000);
            }
            
            // Here you would normally send the form data to your backend
            console.log('Form Data:', data);
        }, 2000); // 2 second delay to show loading cursor
    });
}

// Custom alert function
function showAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `custom-alert ${type}`;
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#059669' : '#dc2626'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
    `;
    
    // Add slide in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    alert.textContent = message;
    document.body.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alert.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => {
            alert.remove();
        }, 300);
    }, 5000);
}

// Parallax scrolling effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Apply parallax to hero shapes
    const heroShapes = document.querySelectorAll('.hero-shape');
    heroShapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.2);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add ripple effect to buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-submit');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

// Card tilt effect
function addCardTiltEffect() {
    const cards = document.querySelectorAll('.service-card, .testimonial-card, .hero-img-container, .about-img-container, .solution-card, .philosophy-card, .expertise-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 3;
            const centerY = rect.height / 3;
            const rotateX = (y - centerY) / 70;
            const rotateY = (centerX - x) / 70;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Enhanced Page Visibility API for performance optimization
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.querySelectorAll('.particle').forEach(particle => {
            particle.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when page becomes visible
        document.querySelectorAll('.particle').forEach(particle => {
            particle.style.animationPlayState = 'running';
        });
    }
});

// Lazy loading for images (if you add images later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Smooth scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button (optional)
function addScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-blue);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
    `;
    
    scrollButton.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollButton);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.transform = 'scale(1)';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.transform = 'scale(0.8)';
        }
    });
    
    scrollButton.addEventListener('mouseenter', () => {
        scrollButton.style.transform = 'scale(1.1)';
        scrollButton.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
    });
    
    scrollButton.addEventListener('mouseleave', () => {
        scrollButton.style.transform = 'scale(1)';
        scrollButton.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.3)';
    });
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && mobileMenu) {
        mobileMenu.classList.remove('active');
        if (mobileMenuToggle) {
            mobileMenuToggle.textContent = '☰';
        }
    }
    
    // Enter key on theme toggle
    if (e.key === 'Enter' && document.activeElement === themeToggle) {
        themeToggle.click();
    }
});

// Add focus styles for keyboard navigation
function addKeyboardSupport() {
    const style = document.createElement('style');
    style.textContent = `
        .theme-toggle:focus,
        .btn-primary:focus,
        .btn-secondary:focus,
        .btn-submit:focus {
            outline: 2px solid var(--primary-blue);
            outline-offset: 2px;
        }
        
        .nav-menu a:focus {
            outline: 2px solid var(--primary-blue);
            outline-offset: 4px;
            border-radius: 4px;
        }
    `;
    document.head.appendChild(style);
}

// Performance optimization: Reduce animations on slower devices
const isSlowDevice = navigator.hardwareConcurrency < 4 || navigator.connection?.effectiveType === 'slow-2g';
if (isSlowDevice) {
    document.documentElement.style.setProperty('--animation-duration', '0.1s');
}

// Accessibility: Respect user motion preferences
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01s');
    
    // Disable complex animations for users who prefer reduced motion
    const style = document.createElement('style');
    style.textContent = `
        @media (prefers-reduced-motion: reduce) {
            .particle,
            .hero-shape,
            .profile-placeholder::before {
                animation: none !important;
            }
            
            .typing-text {
                border-right: none !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// SEO: Add structured data for better search visibility
const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Hardik Patel Cybersecurity Training",
    "description": "Expert cybersecurity training and CEH certification preparation",
    "provider": {
        "@type": "Person",
        "name": "Hardik Patel",
        "jobTitle": "Certified Ethical Hacker & Cybersecurity Trainer"
    },
    "areaServed": "Pune, India",
    "serviceType": "Cybersecurity Training"
};

// Add structured data to page
const script = document.createElement('script');
script.type = 'application/ld+json';
script.textContent = JSON.stringify(structuredData);
document.head.appendChild(script);

// Error handling for failed resource loads
window.addEventListener('error', (e) => {
    console.error('Resource failed to load:', e.target);
    
    // If Google Fonts fails to load, fallback to system fonts
    if (e.target.tagName === 'LINK' && e.target.href.includes('fonts.googleapis.com')) {
        document.body.style.fontFamily = 'system-ui, -apple-system, sans-serif';
    }
});

// Network status monitoring
window.addEventListener('online', () => {
    showAlert('Connection restored! All features are now available.', 'success');
});

window.addEventListener('offline', () => {
    showAlert('You are currently offline. Some features may be limited.', 'error');
});

// Performance monitoring (simple)
function measurePerformance() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            
            // Log performance data (you can send this to analytics)
            console.log('Page load time:', loadTime + 'ms');
            
            // Show warning if page loads slowly
            if (loadTime > 3000) {
                console.warn('Page loaded slowly. Consider optimizing.');
            }
        }, 0);
    });
}

// Initialize performance monitoring
measurePerformance();

// ========================================
// CUSTOM CYBERSECURITY CURSOR SYSTEM
// ========================================

class CustomCursor {
    constructor() {
        this.cursor = null;
        this.cursorDot = null;
        this.cursorRing = null;
        this.cursorCrosshair = null;
        this.cursorText = null;
        this.cursorScanDots = null;
        this.isVisible = false;
        this.currentState = 'default';
        
        // Check if device supports cursor
        this.isTouchDevice = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        
        if (!this.isTouchDevice) {
            this.init();
        }
    }
    
    init() {
        this.createCursor();
        this.bindEvents();
        this.setupIntersectionObserver();
    }
    
    createCursor() {
        // Create cursor container
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor default';
        
        // Create cursor dot
        this.cursorDot = document.createElement('div');
        this.cursorDot.className = 'cursor-dot';
        
        // Create cursor ring
        this.cursorRing = document.createElement('div');
        this.cursorRing.className = 'cursor-ring';
        
        // Create crosshair
        this.cursorCrosshair = document.createElement('div');
        this.cursorCrosshair.className = 'cursor-crosshair';
        
        // Create text label
        this.cursorText = document.createElement('div');
        this.cursorText.className = 'cursor-text';
        this.cursorText.textContent = 'SCAN';
        
        // Create scanning dots
        this.cursorScanDots = document.createElement('div');
        this.cursorScanDots.className = 'cursor-scan-dots';
        for (let i = 0; i < 8; i++) {
            const dot = document.createElement('div');
            dot.className = 'scan-dot';
            this.cursorScanDots.appendChild(dot);
        }
        
        // Append all elements
        this.cursor.appendChild(this.cursorDot);
        this.cursor.appendChild(this.cursorRing);
        this.cursor.appendChild(this.cursorCrosshair);
        this.cursor.appendChild(this.cursorText);
        this.cursor.appendChild(this.cursorScanDots);
        
        document.body.appendChild(this.cursor);
        console.log('Custom cursor created and added to DOM');
    }
    
    bindEvents() {
        // Mouse move
        document.addEventListener('mousemove', (e) => this.updatePosition(e));
        
        // Mouse enter/leave
        document.addEventListener('mouseenter', () => this.show());
        document.addEventListener('mouseleave', () => this.hide());
        
        // Click events
        document.addEventListener('mousedown', (e) => this.onClick(e));
        document.addEventListener('mouseup', () => this.onRelease());
        
        // Hover events for different elements
        this.setupHoverEvents();
    }
    
    setupHoverEvents() {
        // Wait for DOM to be ready
        setTimeout(() => {
s            // Form inputs (works on all pages)
            const inputs = document.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                if (input) {
                    input.addEventListener('mouseenter', () => this.setState('hover-input', 'INPUT'));
                    input.addEventListener('mouseleave', () => this.setState('default'));
                }
            });
            
            // HOME PAGE - Service cards and interactive elements
            const serviceCards = document.querySelectorAll('.service-card, .testimonial-card, .stat-item');
            serviceCards.forEach(card => {
                if (card) {
                    card.addEventListener('mouseenter', () => this.setState('scanning', 'ANALYZING'));
                    card.addEventListener('mouseleave', () => this.setState('default'));
                }
            });
            
            // ABOUTPAGE - All interactive cards and elements
            const aboutCards = document.querySelectorAll('.solution-card, .timeline-item, .philosophy-card, .expertise-card, .offering-item');
            aboutCards.forEach(card => {
                if (card) {
                    card.addEventListener('mouseenter', () => this.setState('scanning', 'ANALYZING'));
                    card.addEventListener('mouseleave', () => this.setState('default'));
                }
            });
            
            // ABOUTPAGE - Timeline markers
            const timelineMarkers = document.querySelectorAll('.timeline-marker');
            timelineMarkers.forEach(marker => {
                if (marker) {
                    marker.addEventListener('mouseenter', () => this.setState('hover-button', 'MILESTONE'));
                    marker.addEventListener('mouseleave', () => this.setState('default'));
                }
            });
            
            // ABOUTPAGE - Credential items
            const credentials = document.querySelectorAll('.credential-item');
            credentials.forEach(credential => {
                if (credential) {
                    credential.addEventListener('mouseenter', () => this.setState('hover-link', 'CERTIFIED'));
                    credential.addEventListener('mouseleave', () => this.setState('default'));
                }
            });
            
            // ABOUTPAGE - Mission card
            const missionCard = document.querySelector('.mission-card');
            if (missionCard) {
                missionCard.addEventListener('mouseenter', () => this.setState('scanning', 'MISSION'));
                missionCard.addEventListener('mouseleave', () => this.setState('default'));
            }
            
            // ABOUTPAGE - Hero quote
            const heroQuote = document.querySelector('.hero-quote');
            if (heroQuote) {
                heroQuote.addEventListener('mouseenter', () => this.setState('scanning', 'READING'));
                heroQuote.addEventListener('mouseleave', () => this.setState('default'));
            }
            
            // Hero profile images (works on all pages)
            const heroProfile = document.querySelector('.hero-img-container');
            const aboutProfile = document.querySelector('.about-img-container');
            
            if (heroProfile) {
                heroProfile.addEventListener('mouseenter', () => this.setState('hover-button', 'PROFILE'));
                heroProfile.addEventListener('mouseleave', () => this.setState('default'));
            }
            
            if (aboutProfile) {
                aboutProfile.addEventListener('mouseenter', () => this.setState('hover-button', 'PROFILE'));
                aboutProfile.addEventListener('mouseleave', () => this.setState('default'));
            }
            
            console.log('Cursor hover events setup complete for all pages');
        }, 100);
    }
    
    setupIntersectionObserver() {
        // Show loading state when forms are being processed
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && form.classList.contains('submitting')) {
                        this.setState('loading', 'PROCESSING');
                    }
                });
            });
            observer.observe(form);
        });
    }
    
    updatePosition(e) {
        if (!this.cursor) return;
        
        const x = e.clientX;
        const y = e.clientY;
        
        // Smooth cursor movement with requestAnimationFrame for performance
        requestAnimationFrame(() => {
            this.cursor.style.left = x + 'px';
            this.cursor.style.top = y + 'px';
        });
    }
    
    setState(state, text = '') {
        if (this.currentState === state) return;
        
        this.currentState = state;
        this.cursor.className = `custom-cursor ${state}`;
        
        if (text) {
            this.cursorText.textContent = text;
        }
        
        // Add special effects for certain states
        if (state === 'scanning') {
            this.addScanEffect();
        }
    }
    
    addScanEffect() {
        // Add binary trail effect
        setTimeout(() => {
            this.createBinaryTrail();
        }, 100);
    }
    
    createBinaryTrail() {
        const binary = document.createElement('div');
        binary.className = 'cursor-binary';
        binary.textContent = Math.random() > 0.5 ? '1' : '0';
        binary.style.left = (Math.random() * 40 - 20) + 'px';
        binary.style.top = (Math.random() * 40 - 20) + 'px';
        
        this.cursor.appendChild(binary);
        
        // Animate and remove
        setTimeout(() => {
            binary.style.opacity = '1';
            binary.style.transform = 'translate(-50%, -50%) translateY(-20px)';
        }, 10);
        
        setTimeout(() => {
            if (binary.parentNode) {
                binary.parentNode.removeChild(binary);
            }
        }, 500);
    }
    
    onClick(e) {
        this.addRippleEffect(e);
        
        // Add click feedback
        this.cursor.style.transform = 'translate(-50%, -50%) scale(0.9)';
        setTimeout(() => {
            this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 100);
    }
    
    onRelease() {
        // Reset any click effects
        this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    }
    
    addRippleEffect(e) {
        const ripple = document.createElement('div');
        ripple.className = 'cursor-ripple';
        this.cursor.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
    
    show() {
        if (this.cursor) {
            this.cursor.style.opacity = '1';
            this.isVisible = true;
        }
    }
    
    hide() {
        if (this.cursor) {
            this.cursor.style.opacity = '0';
            this.isVisible = false;
        }
    }
    
    // Method to temporarily disable cursor (for loading states)
    setLoading(isLoading) {
        if (isLoading) {
            this.setState('loading', 'LOADING');
        } else {
            this.setState('default');
        }
    }
    
    // Method to add custom text
    setCustomText(text) {
        if (this.cursorText) {
            this.cursorText.textContent = text;
        }
    }
    
    // Cleanup method
    destroy() {
        if (this.cursor && this.cursor.parentNode) {
            this.cursor.parentNode.removeChild(this.cursor);
        }
        
        // Remove all event listeners
        document.removeEventListener('mousemove', this.updatePosition);
        document.removeEventListener('mouseenter', this.show);
        document.removeEventListener('mouseleave', this.hide);
        document.removeEventListener('mousedown', this.onClick);
        document.removeEventListener('mouseup', this.onRelease);
    }
}

// Initialize custom cursor
let customCursor;

// Initialize all animations and effects
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    
    // Only run typeWriter on home page
    if (document.getElementById('typingText')) {
        typeWriter();
    }
    
    addRippleEffect();
    addCardTiltEffect();
    addScrollToTopButton();
    addKeyboardSupport();
    lazyLoadImages();
    
    // Initialize custom cursor - WORKS ON ALL PAGES
    customCursor = new CustomCursor();
    console.log('Custom cursor initialized:', customCursor);
    
    // Add entrance animations with delays
    const elementsToAnimate = document.querySelectorAll('.hero-content, .hero-image, .section-header, .about-hero-content, .about-hero-image');
    elementsToAnimate.forEach((element, index) => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
});

// Debug function to check if cursor is working
function checkCursor() {
    console.log('Checking cursor...');
    console.log('Custom cursor object:', customCursor);
    console.log('Cursor element in DOM:', document.querySelector('.custom-cursor'));
    console.log('Touch device check:', !window.matchMedia('(hover: hover) and (pointer: fine)').matches);
}

// Call debug function after 2 seconds
setTimeout(checkCursor, 2000);

// Performance optimization for cursor
let rafId;
const optimizedMouseMove = (e) => {
    if (rafId) {
        cancelAnimationFrame(rafId);
    }
    rafId = requestAnimationFrame(() => {
        if (customCursor && customCursor.updatePosition) {
            customCursor.updatePosition(e);
        }
    });
};

// Replace default mousemove with optimized version
document.addEventListener('mousemove', optimizedMouseMove, { passive: true });

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (customCursor) {
        customCursor.destroy();
    }
    if (rafId) {
        cancelAnimationFrame(rafId);
    }
});
// ========================================
// CODE PROTECTION SYSTEM
// ========================================

// Disable right-click context menu
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showAlert('Right-click is disabled for security reasons.', 'error');
});

// Disable keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Disable F12 (Developer Tools)
    if (e.key === 'F12') {
        e.preventDefault();
        showAlert('Developer tools are disabled.', 'error');
    }
    
    // Disable Ctrl+Shift+I (Developer Tools)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        showAlert('Developer tools are disabled.', 'error');
    }
    
    // Disable Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        showAlert('View source is disabled.', 'error');
    }
    
    // Disable Ctrl+S (Save Page)
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        showAlert('Save page is disabled.', 'error');
    }
    
    // Disable Ctrl+Shift+C (Inspect Element)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        showAlert('Inspect element is disabled.', 'error');
    }
    
    // Disable Ctrl+A (Select All)
    if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        showAlert('Select all is disabled.', 'error');
    }
});

// Disable text selection
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
});

// Disable drag and drop
document.addEventListener('dragstart', function(e) {
    e.preventDefault();
});

// Clear console periodically
setInterval(function() {
    console.clear();
    console.log('%c🔒 Code Protection Active', 'color: green; font-size: 20px; font-weight: bold;');
    console.log('%c© 2025 iTechFixr - Unauthorized access prohibited', 'color: orange; font-size: 12px;');
}, 5000);

// Protection initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🛡️ Security Protocols Activated', 'color: blue; font-size: 16px; font-weight: bold;');
}); 