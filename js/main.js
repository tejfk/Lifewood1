document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const header = document.querySelector(".header");
    const pageTransitioner = document.querySelector(".page-transitioner");

    // Hamburger Menu
    if (hamburger) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("left-0");
            navMenu.classList.toggle("-left-full");
            document.body.classList.toggle("overflow-hidden");
        });
    }

    // Sticky Header
    const handleScroll = () => {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 50);
        }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Page Transitions
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href.startsWith('/') || href.includes('.html')) && !href.startsWith('#') && link.target !== '_blank') {
            link.addEventListener('click', e => {
                e.preventDefault();
                if(pageTransitioner) {
                    pageTransitioner.classList.add('scale-y-100');
                }
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            });
        }
    });

    // Accordions (for Services page etc.)
    const accordions = document.querySelectorAll(".accordion-item");
    accordions.forEach(item => {
        const trigger = item.querySelector(".accordion-trigger");
        const content = item.querySelector(".accordion-content");
        const icon = trigger.querySelector("i");

        trigger.addEventListener("click", () => {
            const isOpen = item.classList.contains("open");
            item.classList.toggle("open", !isOpen);
            icon?.classList.toggle("rotate-180", !isOpen);
            content.style.maxHeight = !isOpen ? content.scrollHeight + "px" : null;
        });
    });

    // General Scroll-triggered Animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => scrollObserver.observe(el));

    // Animated Number Counter
    const counters = document.querySelectorAll('.number-counter');
    const speed = 200; // The lower the faster
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText.replace(/,/g, '');
                    const increment = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment).toLocaleString();
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target.toLocaleString();
                    }
                };
                updateCount();
                observer.unobserve(counter); // Animate only once
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));
});