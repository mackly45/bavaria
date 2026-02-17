
document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader ---
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        // Enable scrolling after loading
        document.body.style.overflow = 'auto';
    }, 2000);

    // --- Sticky Navigation ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // --- Hero Scroll Animation (Video Scrubbing Simulation) ---
    const heroCanvas = document.getElementById('hero-canvas');
    // Placeholder for video duration logic
    // In real implementation: video.currentTime = (scrollPosition / window.innerHeight) * video.duration;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        if (scrollPosition < window.innerHeight) {
            // Simulate "advancing" by scaling and subtle rotation
            const progress = scrollPosition / window.innerHeight;
            heroCanvas.style.transform = `translate(-50%, -50%) scale(${1 + progress * 0.2}) rotate(${progress * 2}deg)`;

            // Fade out hero content on scroll
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.opacity = 1 - progress * 1.5;
                heroContent.style.transform = `translateY(${progress * 100}px)`;
            }
        }
    });

    // --- Intersection Observer for Fade-in Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible to run only once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Select elements to animate
    document.querySelectorAll('.reveal-text, .section h2, .section p, .col-6').forEach(el => {
        el.classList.add('reveal-text'); // Ensure base class is present
        observer.observe(el);
    });

    // --- Generic Parallax Effect ---
    // Usage: Add data-parallax-speed="0.1" to any element
    // Positive speed moves with scroll (slower), Negative moves against.
    const parallaxElements = document.querySelectorAll('[data-parallax-speed]');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        parallaxElements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-parallax-speed'));
            const rect = el.getBoundingClientRect();

            // Only animate if in viewport (roughly)
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const offset = (scrollY - (el.offsetTop - window.innerHeight / 2)) * speed;
                el.style.transform = `translateY(${offset}px)`;
            }
        });
    });

    // --- FAQ Interaction ---
    document.querySelectorAll('.faq-item h3').forEach(item => {
        item.addEventListener('click', () => {
            const p = item.nextElementSibling;
            // Toggle visibility
            if (p.style.display === 'block') {
                p.style.display = 'none';
                item.querySelector('span').textContent = '+';
                item.style.color = 'inherit';
            } else {
                p.style.display = 'block';
                item.querySelector('span').textContent = '-';
                item.style.color = 'var(--color-accent)';
            }
        });

        // Initial state
        item.nextElementSibling.style.display = 'none';
    });

});
