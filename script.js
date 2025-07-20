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

    // Search functionality with real-time results
    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase().trim();
      searchResults.innerHTML = '';

      if (query.length > 0) {
        const posts = document.querySelectorAll('.post-outer');
        const matches = [];

        posts.forEach(post => {
          const titleElement = post.querySelector('.post-title a');
          const imageElement = post.querySelector('.thumb img');
          
          if (titleElement) {
            const title = titleElement.textContent.toLowerCase();
            if (title.includes(query)) {
              matches.push({
                title: titleElement.textContent,
                url: titleElement.href,
                thumbnail: imageElement ? imageElement.src : null
              });
            }
          }
        });

        if (matches.length > 0) {
          matches.slice(0, 5).forEach(match => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            
            const thumbnailHtml = match.thumbnail 
              ? `<div class="search-result-thumbnail"><img src="${match.thumbnail}" alt="Post thumbnail"></div>`
              : `<div class="search-result-thumbnail"><i class="fas fa-image placeholder-icon"></i></div>`;
            
            resultItem.innerHTML = `
              ${thumbnailHtml}
              <div class="search-result-content">
                <a href="${match.url}" title="${match.title}">${match.title}</a>
              </div>
            `;
            searchResults.appendChild(resultItem);
          });
        } else {
          searchResults.innerHTML = '<div class="no-results">No posts found matching your search</div>';
        }
      }
    });

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

// Make mobile menu functional
function makeMobileMenuFunctional() {
  const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
  const linkListWidget = document.querySelector('#LinkList1');

  if (mobileMenuIcon && linkListWidget) {
    mobileMenuIcon.addEventListener('click', function(e) {
      e.stopPropagation();
      linkListWidget.classList.toggle('active');

      // Toggle hamburger to X animation
      const icon = mobileMenuIcon.querySelector('i');
      if (linkListWidget.classList.contains('active')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileMenuIcon.contains(e.target) && !linkListWidget.contains(e.target)) {
        linkListWidget.classList.remove('active');
        const icon = mobileMenuIcon.querySelector('i');
        if (icon) {
          icon.className = 'fas fa-bars';
        }
      }
    });

    // Prevent menu from closing when clicking inside
    linkListWidget.addEventListener('click', function(e) {
      e.stopPropagation();
    });

    // Handle submenu toggles on mobile
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

// New loading effects
function addNewLoadingEffects() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.complete) {
      img.style.opacity = '0';
      img.style.filter = 'blur(5px)';

      img.addEventListener('load', function() {
        this.style.transition = 'all 0.5s ease';
        this.style.opacity = '1';
        this.style.filter = 'blur(0)';
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
