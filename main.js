/**
 * Caesar Komolafe Portfolio - Main Javascript
 * Handles UI interactions, scroll effects, and dynamic behaviors.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for fixed navbar height
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Sticky Navbar Styling on Scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Cascading Animation for Elements
    const fadeElements = document.querySelectorAll('.expertise-card, .metric-item, .about-highlight-column, .prof-item, .qual-item, .event-card');
    
    // Add base hidden class to all elements meant to fade
    fadeElements.forEach(el => el.classList.add('fade-in-hidden'));
    
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -20px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        // Filter intersecting entries to stagger them together
        const intersecting = entries.filter(entry => entry.isIntersecting);
        
        intersecting.forEach((entry, index) => {
            // Apply a staggered delay based on its index in this scroll batch for cascading effect
            if (entry.target.classList.contains('prof-item') || entry.target.classList.contains('qual-item')) {
                 entry.target.style.transitionDelay = `${index * 0.08}s`;
            } else {
                 entry.target.style.transitionDelay = `${index * 0.15}s`;
            }
            
            // Trigger animation
            entry.target.classList.add('fade-in-visible');
            entry.target.classList.remove('fade-in-hidden');
            
            // Stop observing
            observer.unobserve(entry.target);
            
            // Clean up inline delay after animation so hover states work cleanly
            setTimeout(() => {
                entry.target.style.transitionDelay = '0s';
            }, 1000);
        });
    }, appearOptions);

    fadeElements.forEach(fadeEl => {
        appearOnScroll.observe(fadeEl);
    });
});
