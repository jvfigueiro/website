/* ==========================================================================
   jvfigueiro.com - Global JavaScript
   ========================================================================== */

// Update dynamic footer year
const yearElement = document.getElementById('currentYear');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Dark/Light theme switcher
const themeToggleBtn = document.getElementById('themeToggleBtn');
const htmlElement = document.documentElement;

if (themeToggleBtn) {
    const icon = themeToggleBtn.querySelector('i');

    const setTheme = (theme) => {
        htmlElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (theme === 'dark') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    };

    const getPreferredTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    setTheme(getPreferredTheme());

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (!localStorage.getItem('theme')) {
            setTheme(getPreferredTheme());
        }
    });
}

// Mobile navigation drawer toggle
const navToggleBtn = document.getElementById('navToggleBtn');
const navMenu = document.getElementById('navMenu');

if (navToggleBtn && navMenu) {
    navToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navMenu.classList.toggle('is-active');
        navToggleBtn.setAttribute('aria-expanded', isOpen);
        const icon = navToggleBtn.querySelector('i');
        if (icon) {
            icon.className = isOpen ? 'fas fa-xmark' : 'fas fa-bars';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (navMenu.classList.contains('is-active') && !navMenu.contains(event.target) && !navToggleBtn.contains(event.target)) {
            navMenu.classList.remove('is-active');
            navToggleBtn.setAttribute('aria-expanded', 'false');
            const icon = navToggleBtn.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        }
    });

    // Close mobile menu on Escape key press
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navMenu.classList.contains('is-active')) {
            navMenu.classList.remove('is-active');
            navToggleBtn.setAttribute('aria-expanded', 'false');
            const icon = navToggleBtn.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Typewriter effect on homepage
    const typewriterElement = document.getElementById('typewriter');
    
    if (typewriterElement) {
        const textToType = typewriterElement.getAttribute('data-text');
        let index = 0;

        typewriterElement.textContent = '';

        function typeWriter() {
            if (index < textToType.length) {
                typewriterElement.textContent += textToType.charAt(index);
                index++;
                setTimeout(typeWriter, 40); // Typing speed (40ms)
            }
        }
        
        typeWriter();
    }

    document.body.classList.add('page-loaded');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scroll reveal animations
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const revealTargets = document.querySelectorAll(
            '.content-section, .project-card, .project-list-item, .retrofit-category, .service-category, .card, .timeline-item'
        );

        revealTargets.forEach(el => el.classList.add('reveal-on-scroll'));

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealTargets.forEach(el => revealObserver.observe(el));
    } else {
        document.querySelectorAll('.content-section, .project-card, .project-list-item, .retrofit-category, .service-category, .card')
            .forEach(el => el.classList.add('is-visible'));
    }

    // Avatar parallax effect on desktop
    const avatarContainer = document.querySelector('.profile-avatar-container');
    if (avatarContainer && !prefersReducedMotion && window.innerWidth >= 992) {
        window.addEventListener('scroll', () => {
            const offset = window.scrollY * 0.08;
            avatarContainer.style.transform = `translateY(${offset}px)`;
        }, { passive: true });
    }
});