/**
 * ==========================================================================
 * MASTER CONTROL SCRIPT - YOUSSEF AHMED PORTFOLIO
 * Vanilla implementation controlling scroll engines, overlays, and UX logic.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- AUTOMATIC FOOTER YEAR INJECTION ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- MOBILE HAMBURGER MENU ACTIONS ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // --- SCROLL DRIVEN NAVBAR STRUCTURAL SHIFTS ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- HIGH-PERFORMANCE INTERSECTION OBSERVER ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // --- NAVIGATION LINK SPYTRACK ENGINE ---
    const sections = document.querySelectorAll('section, header');
    
    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${currentId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, {
        root: null,
        threshold: 0.5
    });

    sections.forEach(section => {
        spyObserver.observe(section);
    });

    // --- CERTIFICATE LIGHTBOX VIEW INSPECTOR ENGINE ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const certCards = document.querySelectorAll('.certificate-card');

    if (lightbox && lightboxImg && lightboxCaption) {
        certCards.forEach(card => {
            card.addEventListener('click', () => {
                const imgElement = card.querySelector('.cert-thumb');
                const titleElement = card.querySelector('.cert-info h3');
                const subtitleElement = card.querySelector('.cert-info p');

                if (imgElement) {
                    lightboxImg.src = imgElement.src;
                    lightboxImg.alt = imgElement.alt;
                    
                    const titleText = titleElement ? titleElement.textContent : "";
                    const subText = subtitleElement ? subtitleElement.textContent : "";
                    lightboxCaption.innerHTML = `<strong>${titleText}</strong><br><span style="font-size: 0.85rem; color: #BBBBBB;">${subText}</span>`;
                    
                    lightbox.style.display = "block";
                    document.body.style.overflow = "hidden";
                }
            });
        });

        closeBtn.addEventListener('click', () => {
            lightbox.style.display = "none";
            document.body.style.overflow = "auto";
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.style.display === 'block') {
                lightbox.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    }
});