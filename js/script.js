/**
 * CREST & PEAK CONSULTANCY - Modern Apple-Style Animations
 * Smooth transitions, scroll reveals, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Detect touch / small-screen devices to disable heavy mouse interactions
    const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || window.innerWidth < 768;
    // ==========================================
    // THEME TOGGLE - Light/Dark Mode
    // ==========================================
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    function applyTheme(theme) {
        // Add transition class to body for overlay animation
        document.body.classList.add('theme-transitioning');
        
        // Add rotating animation to icon
        if (themeIcon) {
            themeIcon.classList.add('rotating');
        }
        
        // Animate the transition with a slight delay for visual effect
        setTimeout(() => {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            
            // Update icon
            if (themeIcon) {
                themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }, 150);
        
        // Remove transition class
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
            if (themeIcon) {
                themeIcon.classList.remove('rotating');
            }
        }, 450);
    }
    
    // Apply initial theme
    applyTheme(savedTheme);
    
    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }
    
    // ==========================================
    // SMOOTH SCROLLING WITH EASING
    // ==========================================
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-links');
                const menuToggle = document.querySelector('.menu-toggle');
                if (navMenu) navMenu.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
                
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
    const navMenu = document.querySelector('.nav-links');
    
    if (menuToggle && navMenu) {
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
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');
    revealElements.forEach(el => revealObserver.observe(el));

    // Disable heavy mouse interactions on touch/small screens
    if (!isTouch) {
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
    }

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
    // PARALLAX EFFECT FOR HERO (desktop only)
    // ==========================================
    if (!isTouch) {
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
        top: 0;
        left: 0;
        width: 0%;
        height: 2px;
        background: linear-gradient(90deg, #0071e3, #00c6ff);
        z-index: 1001;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);

    const positionProgressBar = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('header nav');
        const headerHeight = header?.getBoundingClientRect().height || 0;
        const navHeight = nav?.getBoundingClientRect().height || 64;
        const offset = headerHeight || navHeight;
        progressBar.style.top = `${offset}px`;
    };

    positionProgressBar();
    window.addEventListener('resize', positionProgressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    }, { passive: true });

    // ==========================================
    // CURSOR GLOW EFFECT (desktop only)
    // ==========================================
    if (!isTouch) {
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
    }

    console.log('🏔️ Crest & Peak Consultancy - Modern animations loaded');
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

    const form = document.getElementById('contact-form');
    const button = form.querySelector('button');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    button.disabled = true;

    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        button.style.background = '#34C759';
        
        setTimeout(() => {
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

    const message = `Hi, I'm ${name}.\n\n📊 Business Stage: ${stage}\n🎯 Biggest Challenge: ${challenge}\n📱 WhatsApp: ${whatsapp}\n\nI'd like to book a scaling audit with Crest & Peak Consultancy.`;

    const whatsappUrl = `https://wa.me/254712345678?text=${encodeURIComponent(message)}`;

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

    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        
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

// ==========================================
// FAQ ACCORDION
// ==========================================
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });
        
        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
            button.setAttribute('aria-expanded', 'true');
        }
    });
});

// ==========================================
// LIVE CHAT WIDGET
// ==========================================
const chatWidget = document.getElementById('chat-widget');
const chatToggle = document.querySelector('.chat-toggle');
const chatClose = document.querySelector('.chat-close');
const chatInput = document.querySelector('.chat-input');
const chatSend = document.querySelector('.chat-send');
const chatMessages = document.querySelector('.chat-messages');
const quickReplies = document.querySelectorAll('.quick-reply');
const chatBadge = document.querySelector('.chat-badge');

if (chatToggle) {
    // Toggle chat window
    chatToggle.addEventListener('click', () => {
        chatWidget.classList.toggle('active');
        if (chatWidget.classList.contains('active')) {
            chatBadge.style.display = 'none';
            chatInput.focus();
        }
    });
    
    // Close chat
    if (chatClose) {
        chatClose.addEventListener('click', () => {
            chatWidget.classList.remove('active');
        });
    }
    
    // Send message function
    function sendMessage(text) {
        if (!text.trim()) return;
        
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'chat-message user';
        userMessage.innerHTML = `
            <p>${text}</p>
            <span class="message-time">Just now</span>
        `;
        chatMessages.appendChild(userMessage);
        
        // Clear input
        chatInput.value = '';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Hide quick replies after first message
        const quickRepliesContainer = document.querySelector('.chat-quick-replies');
        if (quickRepliesContainer) {
            quickRepliesContainer.style.display = 'none';
        }
        
        // Bot response after delay
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'chat-message bot';
            botMessage.innerHTML = `
                <p>Thanks for your message! Our team will get back to you shortly. In the meantime, feel free to call us at <a href="tel:+254743481406">+254 743 481 406</a> or send us a WhatsApp message.</p>
                <span class="message-time">Just now</span>
            `;
            chatMessages.appendChild(botMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
    
    // Send button click
    if (chatSend) {
        chatSend.addEventListener('click', () => {
            sendMessage(chatInput.value);
        });
    }
    
    // Enter key to send
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage(chatInput.value);
            }
        });
    }
    
    // Quick replies
    quickReplies.forEach(btn => {
        btn.addEventListener('click', () => {
            const message = btn.getAttribute('data-message');
            sendMessage(message);
        });
    });
}