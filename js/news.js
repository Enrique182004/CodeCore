// News Page JavaScript - Filter Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons and news cards
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');

            // Get the filter category
            const filterCategory = this.getAttribute('data-filter');

            // Filter news cards
            newsCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterCategory === 'all') {
                    // Show all cards
                    card.style.display = 'block';
                    // Re-trigger animation
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = '';
                    }, 10);
                } else {
                    // Show/hide based on category match
                    if (cardCategory === filterCategory) {
                        card.style.display = 'block';
                        // Re-trigger animation
                        card.style.animation = 'none';
                        setTimeout(() => {
                            card.style.animation = '';
                        }, 10);
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // Add smooth scroll for read more links (if they link to anchors)
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add animation on scroll for news cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all news cards
    newsCards.forEach(card => {
        observer.observe(card);
    });
});