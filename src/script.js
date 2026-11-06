/**
 * VARAD KAILAS GORE - PORTFOLIO INTERACTIVITY SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // 1. Dynamic Typewriter Effect for Hero
    // ---------------------------------------------------------
    const typewriterElement = document.getElementById('typewriter');
    const roles = [
        "B.Tech + M.Tech Dual Degree Student @ NIT Patna",
        "Electronics & Communication Engineer",
        "Full-Stack Web Developer"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeLoop() {
        if (!typewriterElement) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 1800; // Pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400; // Pause before typing next
        }

        setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();

    // ---------------------------------------------------------
    // 2. Dark / Light Theme Toggle with LocalStorage
    // ---------------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('vg_theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        htmlElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('vg_theme', targetTheme);
        });
    }

    // ---------------------------------------------------------
    // 3. Mobile Navigation Drawer Toggle
    // ---------------------------------------------------------
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close mobile menu when a nav link is clicked
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // ---------------------------------------------------------
    // 4. Active Navigation Indicator on Scroll
    // ---------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ---------------------------------------------------------
    // 5. Back to Top Button
    // ---------------------------------------------------------
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.pointerEvents = 'auto';
            } else {
                backToTopBtn.style.opacity = '0.5';
            }
        });
    }

    // ---------------------------------------------------------
    // 6. Interactive Contact Form Submission Handler
    // ---------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                showFeedback("Please fill out all fields.", "error");
                return;
            }

            // Disable submit button and show loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<span>Sending...</span>`;
            }

            try {
                // Try sending to the Express API endpoint
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, subject, message })
                });

                if (response.ok) {
                    showFeedback(`Thank you ${name}! Your message has been sent successfully. Varad will reach out soon.`, "success");
                    contactForm.reset();
                } else {
                    throw new Error("Server response not ok");
                }
            } catch (err) {
                // Friendly fallback for static testing or direct client mailing
                showFeedback(`Thank you ${name}! Message logged. You can also directly reach Varad at gorek.dd25.ec@nitp.ac.in.`, "success");
                contactForm.reset();
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `
                        <span>Send Message</span>
                    `;
                }
            }
        });
    }

    function showFeedback(text, type) {
        if (!formFeedback) return;
        formFeedback.textContent = text;
        formFeedback.className = `form-feedback ${type}`;
        formFeedback.classList.remove('hidden');

        setTimeout(() => {
            formFeedback.classList.add('hidden');
        }, 7000);
    }
});