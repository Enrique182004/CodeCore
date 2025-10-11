// Mobile menu functionality for all pages
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    addFlipFunctionality(); // For officers page polaroids
});

function initMobileMenu() {
    const nav = document.querySelector('nav');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const overlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('nav a');
    
    // Exit if required elements don't exist
    if (!nav || !menuToggle || !overlay) {
        console.log('Mobile menu elements not found');
        return;
    }
    
    // Toggle menu function
    function toggleMenu(forceClose = false) {
        const isActive = nav.classList.contains('active');
        
        if (forceClose || isActive) {
            // Close menu
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            overlay.setAttribute('aria-hidden', 'true');
        } else {
            // Open menu
            menuToggle.classList.add('active');
            nav.classList.add('active');
            overlay.classList.add('active');
            document.body.classList.add('menu-open');
            menuToggle.setAttribute('aria-expanded', 'true');
            overlay.setAttribute('aria-hidden', 'false');
        }
    }
    
    // Toggle menu on button click
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        toggleMenu(true);
    });
    
    // Close menu when clicking a navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            toggleMenu(true);
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            toggleMenu(true);
        }
    });
    
    // Close menu when resizing to desktop view
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768 && nav.classList.contains('active')) {
                toggleMenu(true);
            }
        }, 250);
    });
    
    // Set active link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

// Polaroid flip functionality for officers page
function addFlipFunctionality() {
    const polaroids = document.querySelectorAll('.polaroid');
    
    if (polaroids.length === 0) return; // Exit if no polaroids found
    
    polaroids.forEach(polaroid => {
        // Handle click/tap
        polaroid.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
        
        // Handle keyboard navigation (Enter/Space)
        polaroid.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('flipped');
            }
        });
    });
    
    // Fade-in animation on page load
    window.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.polaroid-container').forEach((el, i) => {
            setTimeout(() => el.classList.add('show'), 100 + i * 120);
        });
    });
}