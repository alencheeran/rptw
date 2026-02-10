/**
 * Rock Paper Tuition - Main Script
 * Optimized for Production with safe DOM navigation
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });
        revealElements.forEach(el => revealObserver.observe(el));
    }

    // --- 2. Hero Mouse Parallax Effect ---
    const heroSection = document.querySelector('.hero');
    const planets = document.querySelectorAll('.planet');
    const floatingCard = document.querySelector('.floating-card');

    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            if (planets.length > 0) {
                planets.forEach((planet, index) => {
                    const speed = (index + 1) * 20;
                    planet.style.transform = `translate(-${x * speed}px, -${y * speed}px)`;
                });
            }

            if (floatingCard) {
                floatingCard.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
            }
        });
    }

    // --- 3. Enhanced Parallax (Floating Loot) ---
    const floatingIcons = document.querySelectorAll('.floating-icon');
    if (floatingIcons.length > 0) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            floatingIcons.forEach((icon, index) => {
                const speed = (index + 1) * 15;
                icon.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });
    }

    // --- 4. FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) otherItem.classList.remove('active');
                    });
                    item.classList.toggle('active');
                });
            }
        });
    }

    // --- 5. Card Expansion Logic ---
    const realmCards = document.querySelectorAll('.realm-card');
    if (realmCards.length > 0) {
        realmCards.forEach(card => {
            card.addEventListener('click', () => {
                const isExpanded = card.classList.contains('expanded');
                realmCards.forEach(c => c.classList.remove('expanded'));
                if (!isExpanded) card.classList.add('expanded');
            });
        });
    }

    // --- 6. Animated Number Counter ---
    const statsSection = document.querySelector('#counter-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    let counterStarted = false;

    if (statsSection && statNumbers.length > 0) {
        const startCount = (el) => {
            const target = parseInt(el.getAttribute('data-target')) || 0;
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    el.innerText = target + "+";
                    clearInterval(timer);
                } else {
                    el.innerText = Math.ceil(current);
                }
            }, 16);
        };

        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counterStarted) {
                statNumbers.forEach(num => startCount(num));
                counterStarted = true;
            }
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

    // --- 7. Smart Reviews Marquee ---
    const reviewTrack = document.querySelector('.marquee-track');
    const reviewCards = document.querySelectorAll('.trading-card');
    if (reviewTrack && reviewCards.length < 4) {
        reviewTrack.classList.add('static-mode');
    }

    // --- 8. Contact Form Handling ---
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzbbRH5U-nuIb_GoKlrfRG1j7_fEm4sSXXKs_krJGx-vEvMJuI6zg9D3ycQUo2yn25YIA/exec';
    const contactForm = document.forms['contactForm'];

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : "Send";

            if (submitBtn) {
                submitBtn.innerHTML = "Sending Transmission... 📡";
                submitBtn.disabled = true;
            }

            const formData = new FormData(contactForm);
            fetch(scriptURL, {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            })
                .then(() => {
                    if (submitBtn) {
                        submitBtn.style.background = "#22c55e";
                        submitBtn.innerHTML = "Success! ✅";
                    }
                    setTimeout(() => {
                        window.location.href = 'thank-you.html';
                    }, 1500);
                })
                .catch(err => {
                    console.error("Transmission failed:", err);
                    if (submitBtn) {
                        submitBtn.style.background = "#ef4444";
                        submitBtn.innerHTML = "Failed ❌";
                    }
                    alert("Transmission failed. Please check your connection.");
                    setTimeout(() => {
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.style.background = "";
                            submitBtn.innerHTML = originalBtnText;
                        }
                    }, 3000);
                });
        });
    }

    // --- 9. Mobile Menu Logic ---
    const hamburger = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const menuLinks = document.querySelectorAll('.nav-links a');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
});