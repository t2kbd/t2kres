document.addEventListener('DOMContentLoaded', function() {
    // Initialize new animations and interactions
    initializeNewAnimations();
    makeSearchFunctional();
    makeMobileMenuFunctional();
    addNewScrollEffects();
    addNewHoverEffects();
    addNewLoadingEffects();
    // Initialize smooth scrolling
    initializeSmoothScrolling();
  });
  
  // New entrance animations
  function initializeNewAnimations() {
    const posts = document.querySelectorAll('.post-outer');
    const widgets = document.querySelectorAll('#sidebar .widget');
  
    // Fade in posts with staggered timing
    posts.forEach((post, index) => {
      post.style.opacity = '0';
      post.style.transform = 'translateY(30px)';
  
      setTimeout(() => {
        post.style.transition = 'all 0.6s ease-out';
        post.style.opacity = '1';
        post.style.transform = 'translateY(0)';
      }, index * 200);
    });
  
    // Slide in sidebar widgets
    widgets.forEach((widget, index) => {
      widget.style.opacity = '0';
      widget.style.transform = 'translateX(30px)';
  
      setTimeout(() => {
        widget.style.transition = 'all 0.5s ease-out';
        widget.style.opacity = '1';
        widget.style.transform = 'translateX(0)';
      }, 300 + (index * 100));
    });
  }
  
  // Make search button functional
  function makeSearchFunctional() {
    const searchIcon = document.querySelector('.search-icon');
    const searchDropdown = document.querySelector('.search-dropdown-container');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
  
    if (searchIcon && searchDropdown && searchInput && searchResults) {
      // Toggle search dropdown
      searchIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        searchDropdown.classList.toggle('active');
        if (searchDropdown.classList.contains('active')) {
          setTimeout(() => searchInput.focus(), 100);
        }
      });
  
      // Close search when clicking outside
      document.addEventListener('click', function(e) {
        if (!searchDropdown.contains(e.target) && !searchIcon.contains(e.target)) {
          searchDropdown.classList.remove('active');
        }
      });
  
      // Prevent dropdown from closing when clicking inside
      searchDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
      });
  
      // Search functionality with debouncing for better performance
      let searchTimeout;
      searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
  
        // Clear previous timeout
        clearTimeout(searchTimeout);
  
        // Debounce search to improve performance
        searchTimeout = setTimeout(() => {
          performSearch(query);
        }, 300);
      });
  
      function performSearch(query) {
        searchResults.innerHTML = '';
  
        if (query.length > 0) {
          // Show loading state
          searchResults.innerHTML = '<div class="search-loading">Searching...</div>';
  
          // Use requestAnimationFrame for smooth UI updates
          requestAnimationFrame(() => {
            const posts = document.querySelectorAll('.post-outer');
            const matches = [];
  
            posts.forEach(post => {
              const titleElement = post.querySelector('.post-title a');
              const snippetElement = post.querySelector('.post-snippet');
              const imageElement = post.querySelector('.thumb img');
  
              if (titleElement) {
                const title = titleElement.textContent.toLowerCase();
                const snippet = snippetElement ? snippetElement.textContent.toLowerCase() : '';
  
                // Search in both title and snippet for better results
                if (title.includes(query) || snippet.includes(query)) {
                  matches.push({
                    title: titleElement.textContent,
                    url: titleElement.href,
                    thumbnail: imageElement ? imageElement.src : null,
                    snippet: snippetElement ? snippetElement.textContent.substring(0, 100) + '...' : ''
                  });
                }
              }
            });
  
            // Clear loading state
            searchResults.innerHTML = '';
  
            if (matches.length > 0) {
              matches.slice(0, 5).forEach((match, index) => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.style.animationDelay = `${index * 50}ms`;
  
                const thumbnailHtml = match.thumbnail 
                  ? `<div class="search-result-thumbnail"><img src="${match.thumbnail}" alt="Post thumbnail" loading="lazy"></div>`
                  : `<div class="search-result-thumbnail"><i class="fas fa-image placeholder-icon"></i></div>`;
  
                resultItem.innerHTML = `
                  ${thumbnailHtml}
                  <div class="search-result-content">
                    <a href="${match.url}" title="${match.title}">${highlightText(match.title, query)}</a>
                    ${match.snippet ? `<div class="search-result-snippet">${highlightText(match.snippet, query)}</div>` : ''}
                  </div>
                `;
                searchResults.appendChild(resultItem);
              });
            } else {
              searchResults.innerHTML = '<div class="no-results"><i class="fas fa-search"></i> No posts found matching your search</div>';
            }
          });
        }
      }
  
      // Function to highlight search terms
      function highlightText(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
      }
  
      // Handle enter key for search
      searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          const firstResult = searchResults.querySelector('.search-result-item a');
          if (firstResult) {
            window.location.href = firstResult.href;
          }
        }
      });
    }
  }
  
  // Make mobile menu functional with improved touch handling
  function makeMobileMenuFunctional() {
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const linkListWidget = document.querySelector('#LinkList1');
    let touchStartY = 0;
    let touchEndY = 0;
  
    if (mobileMenuIcon && linkListWidget) {
      // Add touch event handling for better mobile experience
      mobileMenuIcon.addEventListener('touchstart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        linkListWidget.classList.toggle('active');
        toggleMenuIcon();
      }, { passive: false });
  
      mobileMenuIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        linkListWidget.classList.toggle('active');
        toggleMenuIcon();
      });
  
      function toggleMenuIcon() {
        const icon = mobileMenuIcon.querySelector('i');
        if (linkListWidget.classList.contains('active')) {
          icon.className = 'fas fa-times';
          document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
          icon.className = 'fas fa-bars';
          document.body.style.overflow = '';
        }
      }
  
      // Close menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!mobileMenuIcon.contains(e.target) && !linkListWidget.contains(e.target)) {
          closeMenu();
        }
      });
  
      // Swipe to close menu
      linkListWidget.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
      });
  
      linkListWidget.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].clientY;
        if (touchStartY - touchEndY > 50) { // Swipe up to close
          closeMenu();
        }
      });
  
      function closeMenu() {
        linkListWidget.classList.remove('active');
        const icon = mobileMenuIcon.querySelector('i');
        if (icon) {
          icon.className = 'fas fa-bars';
        }
        document.body.style.overflow = '';
      }
  
      // Prevent menu from closing when clicking inside
      linkListWidget.addEventListener('click', function(e) {
        e.stopPropagation();
      });
  
      // Handle submenu toggles on mobile with improved touch
      const hasSubItems = linkListWidget.querySelectorAll('li.has-sub');
      hasSubItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
          link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
              e.preventDefault();
              item.classList.toggle('mobile-open');
            }
          });
          link.addEventListener('touchend', function(e) {
            if (window.innerWidth <= 768) {
              e.preventDefault();
              item.classList.toggle('mobile-open');
            }
          }, { passive: false });
        }
      });
  
      // Close menu on window resize
      window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
          closeMenu();
        }
      });
    }
  }
  
  // New scroll effects
  function addNewScrollEffects() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
  
    document.querySelectorAll('.post-outer, #sidebar .widget').forEach(el => {
      observer.observe(el);
    });
  }
  
  // New hover effects
  function addNewHoverEffects() {
    // Post hover effects
    const posts = document.querySelectorAll('.post-outer');
    posts.forEach(post => {
      post.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
      });
  
      post.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
      });
    });
  
    // Widget hover effects
    const widgets = document.querySelectorAll('#sidebar .widget');
    widgets.forEach(widget => {
      widget.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
      });
  
      widget.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
      });
    });
  }
  
  // Enhanced loading effects with lazy loading
  function addNewLoadingEffects() {
    // Create intersection observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px'
    });
  
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Set initial loading state
      if (!img.complete) {
        img.style.opacity = '0';
        img.style.filter = 'blur(5px)';
        img.style.transform = 'scale(1.1)';
      }
  
      // Handle load event
      img.addEventListener('load', function() {
        this.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        this.style.opacity = '1';
        this.style.filter = 'blur(0)';
        this.style.transform = 'scale(1)';
      });
  
      // Handle error event
      img.addEventListener('error', function() {
        this.style.opacity = '0.5';
        this.style.filter = 'grayscale(100%)';
        this.alt = 'Image failed to load';
      });
  
      // Observe images for lazy loading
      if (img.dataset.src) {
        imageObserver.observe(img);
      }
    });
  
    // Add skeleton loading for content
    const postElements = document.querySelectorAll('.post-outer');
    postElements.forEach(post => {
      const img = post.querySelector('img');
      if (img && !img.complete) {
        const skeleton = document.createElement('div');
        skeleton.className = 'loading-placeholder';
        skeleton.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: inherit;
        `;
        img.parentElement.style.position = 'relative';
        img.parentElement.appendChild(skeleton);
  
        img.addEventListener('load', function() {
          skeleton.remove();
        });
      }
    });
  }
  
  // Initialize smooth scrolling
  function initializeSmoothScrolling() {
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
  
  // Scroll up button functionality
  function addScrollUpButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-up-btn';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);
  
    scrollBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    });
  }
  
  // Initialize scroll up button
  document.addEventListener('DOMContentLoaded', function() {
    addScrollUpButton();
  });
  
  // Window resize handler
  window.addEventListener('resize', function() {
    const linkListWidget = document.querySelector('.widget.LinkList');
    if (window.innerWidth > 768 && linkListWidget) {
      linkListWidget.classList.remove('active');
      const icon = document.querySelector('.mobile-menu-icon i');
      if (icon) {
        icon.className = 'fas fa-bars';
      }
    }
  });

   // particles
   
        // Initialize particles.js with configuration matching your image
        document.addEventListener('DOMContentLoaded', () => {
    // Create and inject the particles-js div
    const hero = document.getElementById('hero');
    if (hero) {
        const particlesDiv = document.createElement('div');
        particlesDiv.id = 'particles-js';
        hero.prepend(particlesDiv); // Add it as the first child of hero
    }
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 100,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": ["#e91e63", "#9c27b0", "#673ab7", "#3f51b5"]
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        }
                    },
                    "opacity": {
                        "value": 0.7,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 1,
                            "opacity_min": 0.3,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 4,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 2,
                            "size_min": 1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 120,
                        "color": "#9c27b0",
                        "opacity": 0.5,
                        "width": 1.5
                    },
                    "move": {
                        "enable": true,
                        "speed": 3,
                        "direction": "none",
                        "random": true,
                        "straight": false,
                        "out_mode": "bounce",
                        "bounce": true,
                        "attract": {
                            "enable": true,
                            "rotateX": 600,
                            "rotateY": 600
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": ["grab", "bubble"]
                        },
                        "onclick": {
                            "enable": true,
                            "mode": ["push", "repulse"]
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 200,
                            "line_linked": {
                                "opacity": 0.8,
                                "color": "#e91e63",
                                "width": 2
                            }
                        },
                        "bubble": {
                            "distance": 150,
                            "size": 8,
                            "duration": 2,
                            "opacity": 1,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 120,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 6
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });

            // Smooth scroll functionality
            document.querySelector('#HTML1 .btn').addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector('#main-wrapper');
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });

            // Enhanced typing effect with dynamic content
            const titleElement = document.querySelector('#Text3 .title');
            const originalText = titleElement.textContent;
            titleElement.textContent = '';
            
            setTimeout(() => {
                let index = 0;
                const typeInterval = setInterval(() => {
                    titleElement.textContent = originalText.slice(0, index + 1);
                    index++;
                    if (index >= originalText.length) {
                        clearInterval(typeInterval);
                    }
                }, 150);
            }, 1000);


        });
   
