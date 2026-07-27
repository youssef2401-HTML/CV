/* ==========================================================================
   MASTER INTERACTION SCRIPT - YOUSSEF AHMED PORTFOLIO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. DYNAMIC FOOTER YEAR INJECTION
       ========================================================================== */
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }


    /* ==========================================================================
       2. MOBILE NAVIGATION MENU TOGGLE & SMOOTH CLOSING
       ========================================================================== */
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');
    const navItemsList = document.querySelectorAll('.nav-item');

    if (mobileMenuToggle && navLinksContainer) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });

        // Close drawer automatically when any navigation link is clicked
        navItemsList.forEach(item => {
            item.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
            });
        });
    }


    /* ==========================================================================
       3. NAVBAR SCROLL EFFECT STYLING
       ========================================================================== */
    const mainNavbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainNavbar.classList.add('scrolled');
        } else {
            mainNavbar.classList.remove('scrolled');
        }
    });


    /* ==========================================================================
       4. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Trigger animation only once per element
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        revealOnScrollObserver.observe(element);
    });


    /* ==========================================================================
       5. ACTIVE SECTION LINK HIGHLIGHTING ON SCROLL
       ========================================================================== */
    const sectionsToTrack = document.querySelectorAll('section, header[id]');

    window.addEventListener('scroll', () => {
        let currentActiveSectionId = '';
        const scrollPositionWindow = window.scrollY + 200;

        sectionsToTrack.forEach(section => {
            const sectionTopOffset = section.offsetTop;
            const sectionHeightValue = section.offsetHeight;
            const sectionIdAttr = section.getAttribute('id');

            if (scrollPositionWindow >= sectionTopOffset && scrollPositionWindow < sectionTopOffset + sectionHeightValue) {
                currentActiveSectionId = sectionIdAttr;
            }
        });

        navItemsList.forEach(navLink => {
            navLink.classList.remove('active');
            if (navLink.getAttribute('href') === `#${currentActiveSectionId}`) {
                navLink.classList.add('active');
            }
        });
    });


    /* ==========================================================================
       6. CERTIFICATE & IMAGE LIGHTBOX MODAL VIEWER SYSTEM
       ========================================================================== */
    const lightboxModal = document.getElementById('lightbox');
    const lightboxImageNode = document.getElementById('lightbox-img');
    const lightboxCaptionNode = document.getElementById('lightbox-caption');
    const certificateCardsList = document.querySelectorAll('.certificate-card');
    const lightboxCloseButton = document.querySelector('.lightbox-close');

    if (lightboxModal && lightboxImageNode && lightboxCaptionNode) {
        certificateCardsList.forEach(card => {
            const thumbnailImage = card.querySelector('.cert-thumb');
            const certificateHeading = card.querySelector('h3');
            const certificateDescription = card.querySelector('p');

            if (thumbnailImage) {
                card.addEventListener('click', () => {
                    lightboxModal.style.display = "block";
                    lightboxImageNode.src = thumbnailImage.src;
                    
                    let captionTextString = "";
                    if (certificateHeading) captionTextString += certificateHeading.textContent;
                    if (certificateDescription) captionTextString += ` — ${certificateDescription.textContent}`;
                    
                    lightboxCaptionNode.textContent = captionTextString;
                });
            }
        });

        // Close Lightbox via 'X' button
        if (lightboxCloseButton) {
            lightboxCloseButton.addEventListener('click', () => {
                lightboxModal.style.display = "none";
            });
        }

        // Close Lightbox when clicking outside the image content area
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.style.display = "none";
            }
        });

        // Close Lightbox via Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && lightboxModal.style.display === "block") {
                lightboxModal.style.display = "none";
            }
        });
    }


    /* ==========================================================================
       7. BEFORE / AFTER INTERACTIVE RETOUCHING SLIDER CONTROL
       ========================================================================== */
    const imageSliderRangeControl = document.getElementById('slider-ctrl');
    const beforeImageResizableContainer = document.getElementById('before-container');

    if (imageSliderRangeControl && beforeImageResizableContainer) {
        imageSliderRangeControl.addEventListener('input', (e) => {
            beforeImageResizableContainer.style.width = e.target.value + '%';
        });
    }

});