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

    // Simple Intersection Observer for Fade-in Animations
    const fadeElements = document.querySelectorAll('.expertise-card, .metric-item, .about-highlight-column');
    
    // Add initial opacity styling to them dynamically if JS is running
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
    });
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(fadeEl => {
        appearOnScroll.observe(fadeEl);
    });
    
    // Email Button Interaction
    const btnEmail = document.getElementById('btn-email');
    if (btnEmail) {
        btnEmail.addEventListener('click', (e) => {
            console.log('Contact action initiated');
        });
    }
});
