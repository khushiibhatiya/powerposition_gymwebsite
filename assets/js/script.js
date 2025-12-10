document.addEventListener('DOMContentLoaded', async () => {
    // Load header component into `#site-header`
    async function loadComponent(targetSelector, url) {
        try {
            const resp = await fetch(url);
            if (!resp.ok) throw new Error(`Failed to fetch ${url} (${resp.status})`);
            const html = await resp.text();
            const container = document.querySelector(targetSelector);
            if (container) container.innerHTML = html;
        } catch (err) {
            console.error('Error loading component:', err);
        }
    }

    await loadComponent('#site-header', 'assets/component/header.html');
    // Also load footer component into `#site-footer`
    await loadComponent('#site-footer', 'assets/component/footer.html');
    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible to run animation only once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));

    // Staggered Animation for Grid Items
    const staggerGrids = document.querySelectorAll('.stagger-grid');
    staggerGrids.forEach(grid => {
        const children = grid.children;
        Array.from(children).forEach((child, index) => {
            child.style.transitionDelay = `${index * 100}ms`;
            observer.observe(child);
            child.classList.add('hidden-stagger');
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Hover Tilt Effect for Feature Cards
    const cards = document.querySelectorAll('.feature-card, .class-card, .pricing-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
