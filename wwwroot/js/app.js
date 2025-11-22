// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 5000);

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 45, 77, 0.98)';
    } else {
        navbar.style.background = 'rgba(0, 45, 77, 0.95)';
    }
});

// Hamburger Menu Toggle - FIXED NAV LINKS ON DESKTOP
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburger || !navMenu) {
        return;
    }
    
    let isAnimating = false;
    let isTouchDevice = false;
    
    // Detect if device supports touch
    function detectTouch() {
        isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    
    detectTouch();
    
    // Toggle menu function
    function toggleMenu(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        if (isAnimating) {
            return;
        }
        
        isAnimating = true;
        
        const isOpen = navMenu.classList.contains('open');
        
        if (isOpen) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
        } else {
            hamburger.classList.add('active');
            navMenu.classList.add('open');
        }
        
        setTimeout(() => {
            isAnimating = false;
        }, 350);
    }
    
    // Close menu function
    function closeMenu() {
        if (isAnimating) return;
        
        isAnimating = true;
        
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        
        setTimeout(() => {
            isAnimating = false;
        }, 350);
    }
    
    // Handle hamburger button events
    if (isTouchDevice) {
        // On touch devices, only use touchstart
        hamburger.addEventListener('touchstart', function(e) {
            toggleMenu(e);
        }, { passive: false });
        
        // Prevent click event on touch devices to avoid double trigger
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });
    } else {
        // On non-touch devices, use click
        hamburger.addEventListener('click', toggleMenu);
    }
    
    // Handle nav links - FIXED FOR DESKTOP
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        if (isTouchDevice) {
            // On touch devices when menu is mobile
            link.addEventListener('touchstart', function(e) {
                // Only handle if we're in mobile view (menu is closeable)
                if (window.innerWidth <= 1024) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    closeMenu();
                    
                    // Navigate after menu closes
                    setTimeout(() => {
                        window.location.href = link.href;
                    }, 350);
                }
                // On touch devices in desktop view, let it work normally
            }, { passive: false });
        } else {
            // On desktop, just close menu if it's open (mobile view)
            link.addEventListener('click', function(e) {
                // Only close menu if we're in mobile view
                if (window.innerWidth <= 1024 && navMenu.classList.contains('open')) {
                    closeMenu();
                }
                // Let the link navigate normally - don't prevent default
            });
        }
    });
    
    // Close menu when clicking/touching outside
    function handleOutsideInteraction(event) {
        if (!navMenu.classList.contains('open')) {
            return;
        }
        
        if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
            closeMenu();
        }
    }
    
    if (isTouchDevice) {
        document.addEventListener('touchstart', handleOutsideInteraction, { passive: true });
    } else {
        document.addEventListener('click', handleOutsideInteraction);
    }
    
    // Close menu on window resize to desktop size
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            detectTouch();
            
            if (window.innerWidth > 1024 && navMenu.classList.contains('open')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('open');
                isAnimating = false;
            }
        }, 250);
    });
    
    // Close menu on ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('open')) {
            closeMenu();
        }
    });
    
    // Prevent body scroll when menu is open
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                if (navMenu.classList.contains('open')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    observer.observe(navMenu, { attributes: true });
});

// Set default opacity to 50% (0.5)
document.addEventListener('DOMContentLoaded', function() {
    // Set default overlay opacity to 50%
    document.documentElement.style.setProperty('--hero-overlay-opacity', 0.5);
});

/* OPACITY CONTROL PANEL - TEMPORARILY DISABLED
// Uncomment this section to enable opacity control panel

document.addEventListener('DOMContentLoaded', function() {
    // Create control panel
    const controlPanel = document.createElement('div');
    controlPanel.className = 'opacity-control-panel';
    controlPanel.innerHTML = `
        <div class="control-header">
            <span class="control-title">?? ?i?u Ch?nh ?? M? Banner</span>
            <button class="close-btn" id="closePanel">×</button>
        </div>
        <div class="slider-container">
            <div class="slider-label">
                <span>?? m? l?p ph?:</span>
                <span class="slider-value" id="opacityValue">50%</span>
            </div>
            <input type="range" min="0" max="100" value="50" class="opacity-slider" id="opacitySlider">
        </div>
        <div class="control-buttons">
            <button class="control-btn reset-btn" id="resetBtn">??t l?i</button>
            <button class="control-btn apply-btn" id="applyBtn">Áp d?ng</button>
        </div>
    `;
    document.body.appendChild(controlPanel);

    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'opacity-toggle-btn';
    toggleBtn.innerHTML = '?? ?i?u ch?nh ?? m?';
    toggleBtn.id = 'toggleOpacityPanel';
    document.body.appendChild(toggleBtn);

    // Elements
    const slider = document.getElementById('opacitySlider');
    const valueDisplay = document.getElementById('opacityValue');
    const resetBtn = document.getElementById('resetBtn');
    const applyBtn = document.getElementById('applyBtn');
    const closeBtn = document.getElementById('closePanel');
    const panel = controlPanel;
    const toggle = toggleBtn;

    // Load saved opacity
    const savedOpacity = localStorage.getItem('heroOverlayOpacity');
    if (savedOpacity) {
        const opacityPercent = parseFloat(savedOpacity) * 100;
        slider.value = opacityPercent;
        valueDisplay.textContent = Math.round(opacityPercent) + '%';
        document.documentElement.style.setProperty('--hero-overlay-opacity', savedOpacity);
    }

    // Update display when slider moves
    slider.addEventListener('input', function() {
        const value = this.value;
        valueDisplay.textContent = value + '%';
        const opacity = value / 100;
        document.documentElement.style.setProperty('--hero-overlay-opacity', opacity);
    });

    // Reset button
    resetBtn.addEventListener('click', function() {
        slider.value = 50;
        valueDisplay.textContent = '50%';
        document.documentElement.style.setProperty('--hero-overlay-opacity', 0.5);
    });

    // Apply button - save to localStorage
    applyBtn.addEventListener('click', function() {
        const opacity = slider.value / 100;
        localStorage.setItem('heroOverlayOpacity', opacity);
        
        // Show success message
        applyBtn.textContent = '? ?ã l?u!';
        applyBtn.style.background = '#28a745';
        
        setTimeout(() => {
            applyBtn.textContent = 'Áp d?ng';
            applyBtn.style.background = '';
        }, 2000);
    });

    // Close panel
    closeBtn.addEventListener('click', function() {
        panel.classList.add('hidden');
        toggle.classList.remove('hidden');
    });

    // Toggle panel
    toggle.addEventListener('click', function() {
        panel.classList.remove('hidden');
        toggle.classList.add('hidden');
    });

    // Start with panel visible
    panel.classList.remove('hidden');
    toggle.classList.add('hidden');
});

END OF OPACITY CONTROL PANEL */
