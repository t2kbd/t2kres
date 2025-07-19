document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initializeAnimations();
    addReadMoreButtons();
    addScrollAnimations();
    addParticleEffect();
    initializeContactForm();
    addSmoothScrolling();
    addLoadingStates();
    addAdvancedHoverEffects();
    addIconAnimations();
    addSeparateScrollEffects();
    addAdvancedIDTargeting();
    addTitleAnimations();
    addInteractiveEffects();
    addSmoothScrollWithBlur();
    addScrollUpButton();
});

// Enhanced ID targeting with specific animations
function addAdvancedIDTargeting() {
    // Target main blog container
    const blogContainer = document.getElementById('Blog1');
    if (blogContainer) {
        blogContainer.style.position = 'relative';
        addFloatingOrbs(blogContainer);
    }

    // Target sidebar widgets with specific animations
    const widgets = [
        { id: 'BlogArchive1', animation: 'slideInLeft' },
        { id: 'FeaturedPost1', animation: 'scaleIn' },
        { id: 'BlogSearch1', animation: 'slideInRight' },
        { id: 'ContactForm1', animation: 'fadeInUp' },
        { id: 'Label2', animation: 'bounce' },
        { id: 'Label1', animation: 'rotateIn' },
        { id: 'PopularPosts1', animation: 'zoomIn' }
    ];

    widgets.forEach((widget, index) => {
        const element = document.getElementById(widget.id);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = getInitialTransform(widget.animation);

            setTimeout(() => {
                animateElement(element, widget.animation);
            }, 200 + (index * 150));
        }
    });
}

// Get initial transform for different animation types
function getInitialTransform(animation) {
    switch(animation) {
        case 'slideInLeft': return 'translateX(-100px)';
        case 'slideInRight': return 'translateX(100px)';
        case 'scaleIn': return 'scale(0.5)';
        case 'fadeInUp': return 'translateY(50px)';
        case 'bounce': return 'translateY(-20px)';
        case 'rotateIn': return 'rotate(-180deg) scale(0.5)';
        case 'zoomIn': return 'scale(0.3)';
        default: return 'translateY(30px)';
    }
}

// Animate elements with specific animation types
function animateElement(element, animation) {
    element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    element.style.opacity = '1';
    element.style.transform = 'translateX(0) translateY(0) scale(1) rotate(0deg)';

    // Add special effects based on animation type
    if (animation === 'bounce') {
        setTimeout(() => {
            element.style.animation = 'bounce 0.6s ease-out';
        }, 800);
    }
}

// Enhanced title animations
function addTitleAnimations() {
    const titles = document.querySelectorAll('.widget .title, .post-title, h1, h2, h3');

    titles.forEach((title, index) => {
        // Add typing effect
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '2px solid #3b82f6';
        title.style.animation = 'blink 1s infinite';

        let i = 0;
        const typeWriter = setInterval(() => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
                title.style.borderRight = 'none';
                title.style.animation = 'none';

                // Add glow effect after typing
                title.style.textShadow = '0 0 10px rgba(59, 130, 246, 0.5)';
            }
        }, 50 + Math.random() * 50);

        // Delay each title
        setTimeout(() => {
            // Start typing animation
        }, index * 200);
    });
}

// Add floating orbs to blog container
function addFloatingOrbs(container) {
    const orbsContainer = document.createElement('div');
    orbsContainer.className = 'floating-orbs';
    orbsContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;

    container.appendChild(orbsContainer);

    // Create floating orbs
    for (let i = 0; i < 5; i++) {
        createFloatingOrb(orbsContainer, i);
    }
}

function createFloatingOrb(container, index) {
    const orb = document.createElement('div');
    const size = Math.random() * 60 + 30;
    const colors = ['#3b82f6', '#9333ea', '#ec4899', '#10b981', '#f59e0b'];

    orb.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, ${colors[index % colors.length]}40, transparent);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: floatOrb ${15 + Math.random() * 10}s ease-in-out infinite;
        animation-delay: ${index * 2}s;
        filter: blur(2px);
    `;

    container.appendChild(orb);
}

// Add interactive hover effects for specific elements
function addInteractiveEffects() {
    // Enhanced post hover effects
    const posts = document.querySelectorAll('.post-outer');
    posts.forEach((post, index) => {
        post.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.zIndex = '10';

            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: rgba(59, 130, 246, 0.2);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: -1;
            `;
            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });

        post.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = 'auto';
        });
    });

    // Enhanced widget interactions
    const widgets = document.querySelectorAll('.widget');
    widgets.forEach(widget => {
        widget.addEventListener('click', function() {
            this.style.animation = 'pulse 0.3s ease-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });
}

// Initialize entrance animations
function initializeAnimations() {
    const posts = document.querySelectorAll('.post-outer');

    // Stagger animation for posts
    posts.forEach((post, index) => {
        post.style.opacity = '0';
        post.style.transform = 'translateY(50px) rotateX(10deg)';

        setTimeout(() => {
            post.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            post.style.opacity = '1';
            post.style.transform = 'translateY(0) rotateX(0deg)';
        }, index * 150);
    });
}

// Add read more buttons to each post
function addReadMoreButtons() {
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const postTitle = post.querySelector('.post-title a');
        const postArticle = post.querySelector('.post-article');

        if (postTitle && postArticle && !post.querySelector('.read-more-btn')) {
            const readMoreBtn = document.createElement('a');
            readMoreBtn.href = postTitle.href;
            readMoreBtn.className = 'read-more-btn';
            readMoreBtn.innerHTML = '<span>Read More</span>';

            // Enhanced hover effects
            readMoreBtn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
                this.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.4)';
            });

            readMoreBtn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            });

            postArticle.appendChild(readMoreBtn);
        }
    });
}

// Enhanced scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                if (entry.target.classList.contains('post-outer')) {
                    animatePostEntry(entry.target);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.post-outer, .widget').forEach(el => {
        observer.observe(el);
    });
}

// Animate post entry with special effects
function animatePostEntry(post) {
    const image = post.querySelector('.thumb img');
    const title = post.querySelector('.post-title');
    const meta = post.querySelector('#meta-post');

    if (image) {
        image.style.filter = 'blur(5px) brightness(0.5)';
        setTimeout(() => {
            image.style.transition = 'filter 0.8s ease';
            image.style.filter = 'blur(0) brightness(1)';
        }, 200);
    }

    if (title) {
        title.style.transform = 'translateX(-20px)';
        title.style.opacity = '0';
        setTimeout(() => {
            title.style.transition = 'all 0.6s ease';
            title.style.transform = 'translateX(0)';
            title.style.opacity = '1';
        }, 400);
    }

    if (meta) {
        meta.style.transform = 'translateY(10px)';
        meta.style.opacity = '0';
        setTimeout(() => {
            meta.style.transition = 'all 0.5s ease';
            meta.style.transform = 'translateY(0)';
            meta.style.opacity = '1';
        }, 600);
    }
}

// Enhanced particle effect
function addParticleEffect() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.05;
    `;

    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 15; i++) {
        createAdvancedParticle(particlesContainer);
    }
}

function createAdvancedParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 6 + 2;
    const colors = ['#3b82f6', '#9333ea', '#ec4899', '#10b981'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        animation: advancedFloat ${Math.random() * 15 + 15}s linear infinite;
        left: ${Math.random() * 100}%;
        top: 100%;
        box-shadow: 0 0 ${size * 2}px ${color};
        filter: blur(0.5px);
    `;

    container.appendChild(particle);

    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
        setTimeout(() => createAdvancedParticle(container), Math.random() * 3000);
    }, 30000);
}

// Initialize contact form
function initializeContactForm() {
    const form = document.querySelector('.contact-form-widget form');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
        });

        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// Add smooth scrolling
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Add loading states
function addLoadingStates() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.classList.add('loading');
            img.addEventListener('load', function() {
                this.classList.remove('loading');
                this.style.opacity = '0';
                this.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 50);
            });
        }
    });
}

// Add advanced hover effects
function addAdvancedHoverEffects() {
    const posts = document.querySelectorAll('.post-outer');

    posts.forEach(post => {
        const title = post.querySelector('.post-title a');
        const readBtn = post.querySelector('.read-more-btn');

        post.addEventListener('mouseenter', function() {
            this.style.animation = 'glow 2s ease-in-out infinite';

            if (title) {
                title.style.textShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
            }

            if (readBtn) {
                readBtn.style.transform = 'translateY(-2px) scale(1.05)';
            }
        });

        post.addEventListener('mouseleave', function() {
            this.style.animation = '';

            if (title) {
                title.style.textShadow = 'none';
            }

            if (readBtn) {
                readBtn.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

// Add icon animations
function addIconAnimations() {
    const iconElements = document.querySelectorAll('.author-link, .timestamp-link, .post-cmm');

    iconElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px) scale(1.1)';
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
}

// Add separate scroll effects
function addSeparateScrollEffects() {
    const mainContent = document.querySelector('#main');
    const sidebar = document.querySelector('#sidebar');

    if (mainContent) {
        let scrollTimeout;

        mainContent.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const posts = this.querySelectorAll('.post-outer');

                posts.forEach((post, index) => {
                    const rect = post.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        post.style.opacity = '1';
                        post.style.transform = 'scale(1)';
                    }
                });
            }, 50);
        });
    }

    if (sidebar) {
        sidebar.addEventListener('scroll', function() {
            const widgets = this.querySelectorAll('.widget');
            const scrollProgress = this.scrollTop / (this.scrollHeight - this.clientHeight);

            widgets.forEach((widget, index) => {
                const delay = index * 0.1;
                const progress = Math.max(0, Math.min(1, scrollProgress + delay));
                widget.style.transform = `translateY(${(1 - progress) * 10}px)`;
                widget.style.opacity = Math.max(0.7, progress);
            });
        });
    }
}

// Add CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes blink {
        0%, 50% { border-color: #3b82f6; }
        51%, 100% { border-color: transparent; }
    }

    @keyframes ripple {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }

    @keyframes floatOrb {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
        }
        25% {
            transform: translate(100px, -100px) rotate(90deg);
        }
        50% {
            transform: translate(-100px, -200px) rotate(180deg);
        }
        75% {
            transform: translate(-200px, 100px) rotate(270deg);
        }
    }

    @keyframes advancedFloat {
        0% {
            transform: translateY(0) rotate(0deg) scale(0);
            opacity: 0;
        }
        5% {
            opacity: 1;
            transform: translateY(-5vh) rotate(18deg) scale(1);
        }
        50% {
            transform: translateY(-50vh) rotate(180deg) scale(1.2);
        }
        95% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg) scale(0);
            opacity: 0;
        }
    }
  .post-outer:hover .thumb img {
    transform: scale(1.08);
  }
`;
document.head.appendChild(styleSheet);

// Add smooth scroll with blur effects
function addSmoothScrollWithBlur() {
    const mainContainer = document.querySelector('#main');
    const sidebar = document.querySelector('#sidebar');

    function addBlurEffect(container) {
        if (!container) return;

        let scrollTimeout;
        let isScrolling = false;

        container.addEventListener('scroll', function() {
            if (!isScrolling) {
                isScrolling = true;
                container.classList.add('scrolling');

                // Add blur to child elements
                const children = container.querySelectorAll('.post-outer, .widget');
                children.forEach(child => {
                    child.style.filter = 'blur(1px)';
                    child.style.transition = 'filter 0.2s ease';
                });
            }

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
                container.classList.remove('scrolling');

                // Remove blur from child elements
                const children = container.querySelectorAll('.post-outer, .widget');
                children.forEach(child => {
                    child.style.filter = 'blur(0px)';
                    child.style.transition = 'filter 0.4s ease';
                });
            }, 150);
        });
    }

    addBlurEffect(mainContainer);
    addBlurEffect(sidebar);
}

// Add scroll up button functionality
function addScrollUpButton() {
    // Create scroll up button
    const scrollUpBtn = document.createElement('button');
    scrollUpBtn.className = 'scroll-up-btn';
    scrollUpBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollUpBtn);

    const mainContainer = document.querySelector('#main');

    // Show/hide button based on scroll position
    function toggleScrollButton() {
        const scrollTop = mainContainer ? mainContainer.scrollTop : window.pageYOffset;

        if (scrollTop > 300) {
            scrollUpBtn.classList.add('visible');
        } else {
            scrollUpBtn.classList.remove('visible');
        }
    }

    // Scroll to top function with smooth animation
    function scrollToTop() {
        const target = mainContainer || window;
        const startPosition = mainContainer ? mainContainer.scrollTop : window.pageYOffset;
        const distance = startPosition;
        const duration = 1000;
        let start = null;

        // Add blur effect during scroll
        document.body.classList.add('scroll-up-blur');

        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = easeInOutCubic(timeElapsed, startPosition, -distance, duration);

            if (mainContainer) {
                mainContainer.scrollTop = run;
            } else {
                window.scrollTo(0, run);
            }

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                // Remove blur effect after scroll
                setTimeout(() => {
                    document.body.classList.remove('scroll-up-blur');
                }, 100);
            }
        }

        function easeInOutCubic(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }

        requestAnimationFrame(animation);
    }

    // Event listeners
    scrollUpBtn.addEventListener('click', scrollToTop);

    if (mainContainer) {
        mainContainer.addEventListener('scroll', toggleScrollButton);
    } else {
        window.addEventListener('scroll', toggleScrollButton);
    }

    // Initial check
    toggleScrollButton();
}

// Window resize handler
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.post-outer').forEach(post => {
            post.style.transform = 'none';
        });
    }
});
