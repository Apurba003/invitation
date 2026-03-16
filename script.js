document.addEventListener('DOMContentLoaded', () => {
    
    // --- Loader ---
    const loader = document.getElementById('loader');
    setTimeout(() => {
        gsap.to(loader, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                loader.style.display = 'none';
                initHeroAnimations();
                ScrollTrigger.refresh();
            }
        });
    }, 2000); // 2 second loading screen

    // --- Navigation & Scroll ---
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if(navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.add('fa-bars');
            hamburger.querySelector('i').classList.remove('fa-times');
        });
    });

    // --- Countdown Timer ---
    // User requested "countdown happen today days to wedding day".
    // Setting wedding date to 3rd May 2026 as per HTML dummy data.
    const weddingDate = new Date('May 3, 2026 19:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            document.querySelector('.countdown-wrapper').innerHTML = '<h3 class="time" style="font-size: 3rem;">We are Married!</h3>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // --- GSAP Animations ---
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    function initParticles() {
        if(window.particlesJS) {
            particlesJS("particles-js", {
                "particles": {
                    "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                    "color": { "value": "#FFD700" },
                    "shape": { "type": "circle" },
                    "opacity": { "value": 0.4, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                    "size": { "value": 3, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false } },
                    "line_linked": { "enable": true, "distance": 150, "color": "#FFD700", "opacity": 0.2, "width": 1 },
                    "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "repulse" }, "resize": true },
                    "modes": { "bubble": { "distance": 250, "size": 6, "duration": 2, "opacity": 0.8 }, "repulse": { "distance": 200, "duration": 0.4 } }
                },
                "retina_detect": true
            });
        }
    }

    function initHeroAnimations() {
        initParticles();
        const tl = gsap.timeline();
        
        tl.from('.logo', {
            y: -20,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        })
        .from('.nav-links a', {
            y: -20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.4')
        .from('.mandala-img', {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.2')
        .from('.pre-title', {
            text: "",
            duration: 1.5,
            ease: "power2.inOut"
        }, '-=0.5')
        .from('.names', {
            y: 30,
            opacity: 0,
            rotationX: 90,
            transformOrigin: "50% 50% -50px",
            duration: 1.5,
            ease: 'back.out(1.5)'
        }, '-=0.2')
        .from('.date', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.8')
        .from('.couple-silhouette', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.5');

        // Continuous slow rotation for mandala
        gsap.to('.hero-mandala', {
            rotation: 360,
            duration: 60,
            repeat: -1,
            ease: "none"
        });

        // Couple silhouette float
        gsap.to('.couple-silhouette', {
            y: 15,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    // Scroll Animations for Sections
    const animateSectionHeaders = gsap.utils.toArray('.section-header');
    animateSectionHeaders.forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Countdown Boxes animation
    gsap.from('.time-box', {
        scrollTrigger: {
            trigger: '.countdown-wrapper',
            start: 'top 85%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2, // cascades the animation
        ease: 'back.out(1.2)',
        clearProps: "all"
    });

    // Event Cards animation
    gsap.from('.event-card', {
        scrollTrigger: {
            trigger: '.events-container',
            start: 'top 80%'
        },
        y: 60,
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.2)',
        clearProps: "all"
    });

    // Venue Section Animation
    gsap.from('.venue-container', {
        scrollTrigger: {
            trigger: '.venue-section',
            start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        clearProps: "all"
    });

    gsap.from('.venue-icon-wrapper', {
        scrollTrigger: {
            trigger: '.venue-section',
            start: 'top 75%'
        },
        scale: 0,
        rotation: 360,
        opacity: 0,
        duration: 1,
        ease: 'back.out(2)',
        clearProps: "all"
    });

    // Drive section animation
    gsap.from('.drive-container', {
        scrollTrigger: {
            trigger: '.drive-section',
            start: 'top 80%'
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        clearProps: "all"
    });

    // Initialize Vanilla Tilt on any time-boxes
    if(typeof VanillaTilt !== "undefined") {
        VanillaTilt.init(document.querySelectorAll(".time-box"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.4
        });
    }

    // --- Custom Cursor & Scroll Progress ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const scrollProgress = document.querySelector('.scroll-progress');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    const hoverElements = document.querySelectorAll('a, button, .event-card, .time-box, .venue-container');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hovering');
        });
    });

    // Scroll Progress function
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = scrollPercentage + "%";
    });
});
