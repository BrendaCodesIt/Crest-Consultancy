/**
 * CREST CONSULTANCY - Modern Apple-Style Animations
 * Smooth transitions, scroll reveals, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // THEME TOGGLE - System/Light/Dark Mode
    // ==========================================
    const themeToggle = document.querySelector('.theme-toggle');
    const themes = ['system', 'light', 'dark'];
    let currentThemeIndex = 0;
    
    // Check for saved theme preference or default to system
    const savedTheme = localStorage.getItem('theme') || 'system';
    currentThemeIndex = themes.indexOf(savedTheme);
    if (currentThemeIndex === -1) currentThemeIndex = 0;
    
    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    function applyTheme(theme) {
        if (theme === 'system') {
            const systemTheme = getSystemTheme();
            document.documentElement.setAttribute('data-theme', 'system');
            // Apply actual system preference
            if (systemTheme === 'light') {
                document.documentElement.style.setProperty('--deep-charcoal', '#ffffff');
                document.documentElement.style.setProperty('--soft-black', '#f5f5f7');
                document.documentElement.style.setProperty('--card-bg', 'rgba(0, 0, 0, 0.03)');
                document.documentElement.style.setProperty('--card-border', 'rgba(0, 0, 0, 0.1)');
                document.documentElement.style.setProperty('--text-primary', '#1d1d1f');
                document.documentElement.style.setProperty('--text-secondary', '#6e6e73');
                document.documentElement.style.setProperty('--header-bg', 'rgba(255, 255, 255, 0.72)');
                document.documentElement.style.setProperty('--header-bg-scrolled', 'rgba(255, 255, 255, 0.95)');
            } else {
                resetToDarkTheme();
            }
        } else {
            document.documentElement.setAttribute('data-theme', theme);
            if (theme === 'dark') {
                resetToDarkTheme();
            }
        }
        localStorage.setItem('theme', theme);
    }
    
    function resetToDarkTheme() {
        document.documentElement.style.setProperty('--deep-charcoal', '#0d0d0d');
        document.documentElement.style.setProperty('--soft-black', '#1d1d1f');
        document.documentElement.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.05)');
        document.documentElement.style.setProperty('--card-border', 'rgba(255, 255, 255, 0.1)');
        document.documentElement.style.setProperty('--text-primary', '#f5f5f7');
        document.documentElement.style.setProperty('--text-secondary', '#86868b');
        document.documentElement.style.setProperty('--header-bg', 'rgba(13, 13, 13, 0.72)');
        document.documentElement.style.setProperty('--header-bg-scrolled', 'rgba(13, 13, 13, 0.95)');
    }
    
    // Apply initial theme
    applyTheme(savedTheme);
    
    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            const newTheme = themes[currentThemeIndex];
            applyTheme(newTheme);
            
            // Show tooltip
            const tooltips = ['System', 'Light', 'Dark'];
            this.title = `Theme: ${tooltips[currentThemeIndex]}`;
        });
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (localStorage.getItem('theme') === 'system') {
            applyTheme('system');
        }
    });
    
    // ==========================================
    // SMOOTH SCROLLING WITH EASING
    // ==========================================
    const navLinks = document.querySelectorAll('header a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                const navUl = document.querySelector('header ul');
                const menuToggle = document.querySelector('.menu-toggle');
                navUl.classList.remove('active');
                menuToggle.classList.remove('active');
                
                // Smooth scroll with offset for fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('header ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // ==========================================
    // HEADER SCROLL EFFECT
    // ==========================================
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class when scrolled
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });

    // ==========================================
    // INTERSECTION OBSERVER FOR REVEAL ANIMATIONS
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Unobserve after animation (performance optimization)
                // Commented out to allow re-animation on re-scroll
                // revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');
    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================
    // HERO TEXT ANIMATION - Cinematic Reveal
    // ==========================================
    const heroHeadline = document.querySelector('.hero-content h1');
    
    if (heroHeadline) {
        // Split text into spans for letter animation
        const text = heroHeadline.innerHTML;
        const lines = text.split('<br>');
        
        let html = '';
        lines.forEach((line, lineIndex) => {
            html += '<span class="line">';
            const chars = line.split('');
            chars.forEach((char, charIndex) => {
                const delay = (lineIndex * 8 + charIndex) * 0.05;
                html += `<span class="char" style="animation-delay: ${delay}s">${char}</span>`;
            });
            html += '</span>';
            if (lineIndex < lines.length - 1) html += '<br>';
        });
        
        heroHeadline.innerHTML = html;
        heroHeadline.classList.add('animated');
    }

    // Add character animation styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .hero-content h1 .char {
            display: inline-block;
            opacity: 0;
            transform: translateY(50px) rotateX(-90deg);
            animation: charReveal 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        @keyframes charReveal {
            to {
                opacity: 1;
                transform: translateY(0) rotateX(0);
            }
        }
        
        .hero-content h1.animated {
            animation: none;
            opacity: 1;
            transform: none;
        }
    `;
    document.head.appendChild(style);

    // ==========================================
    // MAGNETIC CTA BUTTONS
    // ==========================================
    const magneticButtons = document.querySelectorAll('.cta-button');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Subtle magnetic effect
            const moveX = x * 0.15;
            const moveY = y * 0.15;
            
            button.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) scale(1)';
        });
        
        // Ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${e.clientX - rect.left - size/2}px;
                top: ${e.clientY - rect.top - size/2}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out forwards;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
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

    // ==========================================
    // SERVICE CARDS - 3D TILT EFFECT
    // ==========================================
    const serviceCards = document.querySelectorAll('.service');
    
    serviceCards.forEach(card => {
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
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ==========================================
    // CASE STUDY CARDS - HOVER EFFECT
    // ==========================================
    const caseStudies = document.querySelectorAll('.case-study');
    
    caseStudies.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    });

    // ==========================================
    // FORM INPUT ANIMATIONS
    // ==========================================
    const formInputs = document.querySelectorAll('#audit-form input, #audit-form select, #lead-form input');
    
    formInputs.forEach(input => {
        // Focus animation
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value) {
                this.parentElement.classList.add('filled');
            } else {
                this.parentElement.classList.remove('filled');
            }
        });
    });

    // ==========================================
    // IMAGE LAZY LOADING
    // ==========================================
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });

    // ==========================================
    // PARALLAX EFFECT FOR HERO
    // ==========================================
    const hero = document.querySelector('#hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${rate}px)`;
                hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
            }
        }, { passive: true });
    }

    // ==========================================
    // COUNTER ANIMATION FOR STATS
    // ==========================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function update() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }
        
        update();
    }

    // ==========================================
    // TYPEWRITER EFFECT FOR TAGLINE
    // ==========================================
    const tagline = document.querySelector('.tagline');
    
    if (tagline && false) { // Disabled - using CSS animation instead
        const text = tagline.textContent;
        tagline.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }
        
        setTimeout(type, 1500);
    }

    // ==========================================
    // SCROLL PROGRESS INDICATOR
    // ==========================================
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 52px;
        left: 0;
        width: 0%;
        height: 2px;
        background: linear-gradient(90deg, #0071e3, #00c6ff);
        z-index: 1001;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    }, { passive: true });

    // ==========================================
    // CURSOR GLOW EFFECT
    // ==========================================
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    cursorGlow.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(0, 113, 227, 0.08) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
        cursorGlow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    console.log('🏔️ Crest Consultancy - Modern animations loaded');
});

// ==========================================
// FORM SUBMISSION HANDLERS
// ==========================================

// Contact Form Submission with Animation
function handleContactSubmit() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const company = document.getElementById('company').value;
    const message = document.getElementById('message').value;

    // Show loading state
    const form = document.getElementById('contact-form');
    const button = form.querySelector('button');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    button.disabled = true;

    // Simulate sending (replace with actual backend integration)
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        button.style.background = '#34C759';
        
        setTimeout(() => {
            // Show success message
            form.innerHTML = `
                <div class="analyzing">
                    <i class="fas fa-check-circle" style="font-size: 3rem; color: #34C759; margin-bottom: 20px; display: block;"></i>
                    <p style="font-size: 1.25rem; font-weight: 600; margin-bottom: 12px;">Message Sent Successfully!</p>
                    <p style="font-size: 0.9375rem; color: var(--text-secondary);">
                        Thank you, ${name}! We'll get back to you within 24 hours.
                    </p>
                    <button onclick="location.reload()" class="cta-button" style="margin-top: 24px; opacity: 1; transform: none; animation: none;">
                        Send Another Message
                    </button>
                </div>
            `;
        }, 1000);
    }, 1500);

    return false;
}

// WhatsApp Form Submission with Animation
function handleFormSubmit() {
    const name = document.getElementById('name').value;
    const stage = document.getElementById('stage').value;
    const challenge = document.getElementById('challenge').value;
    const whatsapp = document.getElementById('whatsapp').value;

    const message = `Hi, I'm ${name}.\n\n📊 Business Stage: ${stage}\n🎯 Biggest Challenge: ${challenge}\n📱 WhatsApp: ${whatsapp}\n\nI'd like to book a scaling audit with Crest Consultancy.`;

    const whatsappUrl = `https://wa.me/254712345678?text=${encodeURIComponent(message)}`;

    // Show analyzing animation
    const form = document.querySelector('#audit-form form');
    form.innerHTML = `
        <div class="analyzing">
            <p>Analyzing Your Profile...</p>
            <div class="spinner"></div>
            <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 16px;">
                Preparing your personalized consultation
            </p>
        </div>
    `;

    // Redirect to WhatsApp after animation
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        
        // Reset form with success message
        setTimeout(() => {
            form.innerHTML = `
                <div class="analyzing">
                    <i class="fas fa-check-circle" style="font-size: 3rem; color: #34C759; margin-bottom: 20px;"></i>
                    <p>Request Sent Successfully!</p>
                    <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 16px;">
                        We'll get back to you within 24 hours
                    </p>
                    <button onclick="location.reload()" class="cta-button" style="margin-top: 24px; opacity: 1; transform: none; animation: none;">
                        Submit Another Request
                    </button>
                </div>
            `;
        }, 1000);
    }, 2500);

    return false;
}

// Lead Magnet Form Submission
function handleLeadSubmit() {
    const email = document.getElementById('email').value;
    
    // Show loading state
    const form = document.getElementById('lead-form');
    const button = form.querySelector('button');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    button.disabled = true;

    // Simulate sending (replace with actual backend integration)
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Sent!';
        button.style.background = '#34C759';
        
        setTimeout(() => {
            alert(`Thank you! The guide has been sent to ${email}`);
            button.innerHTML = originalText;
            button.style.background = '';
            button.disabled = false;
            form.reset();
        }, 1500);
    }, 1500);

    return false;
}