// Enhanced JavaScript for vibrant interactions
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling with enhanced easing
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
            }
        });
    });

    // Enhanced navbar with gradient scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.95))';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        lastScroll = currentScroll;
    });

    // Enhanced Intersection Observer with multiple animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Add stagger animation for cards
                if (entry.target.classList.contains('about-card') || 
                    entry.target.classList.contains('program-card') ||
                    entry.target.classList.contains('involvement-card')) {
                    const cards = entry.target.parentElement.children;
                    Array.from(cards).forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('slide-in-up');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animateElements = document.querySelectorAll('.about-card, .program-card, .involvement-card, .stat-item, .contact-item');
    animateElements.forEach(el => observer.observe(el));

    // Enhanced form submission with validation
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[placeholder="Subject"]').value;
            const message = this.querySelector('textarea').value;
            
            // Enhanced validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                shakeForm(this);
                return;
            }
            
            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                shakeForm(this);
                return;
            }
            
            // Show success with confetti effect
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            createConfetti();
            this.reset();
        });
    }

    // Enhanced button interactions with ripple effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .donate-btn, .card-btn, .involvement-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(e, this);
            
            // Add haptic feedback simulation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });

    // Donate amount selection
    const donateAmounts = document.querySelectorAll('.donate-amount');
    donateAmounts.forEach(amount => {
        amount.addEventListener('click', function() {
            donateAmounts.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            if (this.classList.contains('custom')) {
                const customAmount = prompt('Enter custom donation amount:');
                if (customAmount && !isNaN(customAmount) && customAmount > 0) {
                    this.textContent = `$${customAmount}`;
                    this.dataset.amount = customAmount;
                }
            }
        });
    });

    // Enhanced floating elements with mouse interaction
    const floatingElements = document.querySelectorAll('.element');
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Enhanced parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = hero ? hero.offsetTop : 0;
        if (hero && scrolled < parallax + hero.offsetHeight) {
            const translateY = scrolled * 0.5;
            const scale = 1 + scrolled * 0.0005;
            hero.style.transform = `translateY(${translateY}px) scale(${scale})`;
        }
    });

    // Enhanced counter animation with easing
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            start = Math.floor(target * easeOutQuart);
            
            element.textContent = start.toLocaleString() + (element.dataset.suffix || '');
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    // Observe stats for counter animation
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));

    // Enhanced mobile menu toggle
    function createMobileMenu() {
        const navbar = document.querySelector('.navbar');
        const navMenu = document.querySelector('.nav-menu');
        
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-toggle')) {
            const mobileToggle = document.createElement('button');
            mobileToggle.className = 'mobile-menu-toggle';
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            mobileToggle.style.cssText = `
                background: linear-gradient(135deg, #FF6B6B, #4ECDC4);
                border: none;
                font-size: 1.5rem;
                color: white;
                cursor: pointer;
                display: block;
                padding: 0.5rem;
                border-radius: 8px;
                transition: all 0.3s ease;
            `;
            
            navbar.appendChild(mobileToggle);
            
            mobileToggle.addEventListener('click', function() {
                const isOpen = navMenu.style.display === 'flex';
                navMenu.style.display = isOpen ? 'none' : 'flex';
                navMenu.style.cssText = isOpen ? 'display: none' : `
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.95));
                    flex-direction: column;
                    padding: 2rem;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                    backdrop-filter: blur(15px);
                `;
                
                this.innerHTML = isOpen ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
            });
        }
    }

    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.about-card, .program-card, .involvement-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-20px) scale(1.03)';
            this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });

    // Dynamic year in footer
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} Saagar Foundation. All rights reserved.`;
    }

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Helper functions
function scrollToSection(sectionId) {
    const section = document.querySelector(`#${sectionId}`);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function createRipple(e, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function shakeForm(form) {
    form.style.animation = 'shake 0.5s';
    setTimeout(() => {
        form.style.animation = '';
    }, 500);
}

function createConfetti() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#FF8E53', '#FE6B8B'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: -10px;
            opacity: 0.8;
            transform: rotate(${Math.random() * 360}deg);
            pointer-events: none;
            z-index: 10000;
        `;
        
        document.body.appendChild(confetti);
        
        const duration = Math.random() * 2 + 1;
        const horizontalMovement = (Math.random() - 0.5) * 100;
        
        confetti.animate([
            { transform: `translateY(0) translateX(0) rotate(0deg)`, opacity: 0.8 },
            { transform: `translateY(100vh) translateX(${horizontalMovement}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => confetti.remove();
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    `;

    // Set background color based on type
    const colors = {
        success: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        error: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        info: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    };
    notification.style.background = colors[type] || colors.info;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Add CSS for ripple effect
const rippleCSS = document.createElement('style');
rippleCSS.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn-primary, .btn-secondary, .donate-btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleCSS);

// Loading animation for page
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
