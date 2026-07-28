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

        // Close drawer when clicking outside the navbar menu on mobile devices
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !navLinksContainer.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
            }
        });
    }


    /* ==========================================================================
       3. NAVBAR SCROLL EFFECT STYLING & AUTO-HIDE LOGIC
       ========================================================================== */
    const mainNavbar = document.querySelector('.navbar');
    let lastScrollPosition = window.pageYOffset;

    window.addEventListener('scroll', () => {
        const currentScrollPosition = window.pageYOffset;

        // Scrolled background change
        if (currentScrollPosition > 50) {
            mainNavbar.classList.add('scrolled');
        } else {
            mainNavbar.classList.remove('scrolled');
        }

        // Smart hide/show navbar on scroll up/down
        if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100) {
            mainNavbar.style.transform = 'translateY(-100%)';
        } else {
            mainNavbar.style.transform = 'translateY(0)';
        }
        lastScrollPosition = currentScrollPosition;
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
                    document.body.style.overflow = 'hidden'; // Lock background scrolling
                });
            }
        });

        // Close Lightbox function
        const closeLightboxModal = () => {
            lightboxModal.style.display = "none";
            document.body.style.overflow = 'auto'; // Restore background scrolling
        };

        // Close Lightbox via 'X' button
        if (lightboxCloseButton) {
            lightboxCloseButton.addEventListener('click', closeLightboxModal);
        }

        // Close Lightbox when clicking outside the image content area
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightboxModal();
            }
        });

        // Close Lightbox via Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && lightboxModal.style.display === "block") {
                closeLightboxModal();
            }
        });
    }


    /* ==========================================================================
       7. BEFORE / AFTER INTERACTIVE RETOUCHING SLIDER CONTROL (CLIP-PATH FIX)
       ========================================================================== */
    const imageSliderRangeControl = document.getElementById('slider-ctrl');
    const beforeImageResizableContainer = document.getElementById('before-container');
    const sliderHandleLine = document.getElementById('slider-handle-line'); // Optional UI line

    if (imageSliderRangeControl && beforeImageResizableContainer) {
        const updateSliderPosition = (value) => {
            // FIX: Keep the width at 100% so the image never squashes or shrinks
            beforeImageResizableContainer.style.width = '100%';
            
            // Apply a hardware-accelerated clip mask to hide the right side elegantly
            beforeImageResizableContainer.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
            
            // Move the visual divider line if it exists in your DOM layout
            if (sliderHandleLine) {
                sliderHandleLine.style.left = `${value}%`;
            }
        };

        // Initialize default slider state matching current input value
        updateSliderPosition(imageSliderRangeControl.value);

        imageSliderRangeControl.addEventListener('input', (e) => {
            updateSliderPosition(e.target.value);
        });

        // Touch & Mouse drag support optimization for mobile/desktop
        const sliderWrapper = document.querySelector('.slider-wrapper');
        if (sliderWrapper) {
            let isDraggingSlider = false;

            sliderWrapper.addEventListener('pointerdown', (e) => { 
                isDraggingSlider = true; 
                if (sliderWrapper.setPointerCapture) {
                    sliderWrapper.setPointerCapture(e.pointerId);
                }
            });
            
            window.addEventListener('pointerup', (e) => { 
                isDraggingSlider = false; 
            });
            
            sliderWrapper.addEventListener('pointermove', (e) => {
                if (!isDraggingSlider) return;
                const rect = sliderWrapper.getBoundingClientRect();
                const xPos = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                const percentage = (xPos / rect.width) * 100;
                imageSliderRangeControl.value = percentage;
                updateSliderPosition(percentage);
            });
        }
    }


    /* ==========================================================================
       8. QUICK COPY EMAIL FUNCTIONALITY
       ========================================================================== */
    const copyCard = document.getElementById('copy-email-card');
    const copyTooltip = document.getElementById('copy-tooltip');
    const emailAddress = 'youssefelomda12@gmail.com';

    if (copyCard && copyTooltip) {
        copyCard.addEventListener('click', () => {
            navigator.clipboard.writeText(emailAddress).then(() => {
                copyTooltip.style.opacity = '1';
                setTimeout(() => {
                    copyTooltip.style.opacity = '0';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy email address securely: ', err);
            });
        });
    }


    /* ==========================================================================
       9. DYNAMIC LOCAL TIME BADGE (CAIRO, EGYPT)
       ========================================================================== */
    const localTimeBadge = document.getElementById('local-time-badge');

    const updateLocalTime = () => {
        if (!localTimeBadge) return;
        const options = { timeZone: 'Africa/Cairo', hour: 'numeric', minute: '2-digit', hour12: true };
        const timeString = new Intl.DateTimeFormat([], options).format(new Date());
        localTimeBadge.textContent = timeString;
    };

    updateLocalTime();
    setInterval(updateLocalTime, 10000);


    /* ==========================================================================
       10. SKILL MATRIX FILTER TABS SYSTEM
       ========================================================================== */
    const skillTabButtons = document.querySelectorAll('.skill-tab-btn');
    const skillCardsList = document.querySelectorAll('.skill-card');

    skillTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active state styling from all tab buttons
            skillTabButtons.forEach(btn => {
                btn.style.background = 'var(--bg-card)';
                btn.style.color = 'var(--text-primary)';
                btn.style.borderColor = 'var(--border-color)';
            });

            // Highlight the clicked active tab button
            button.style.background = 'var(--accent-gold)';
            button.style.color = 'var(--bg-body)';
            button.style.borderColor = 'var(--accent-gold)';

            const filterValue = button.getAttribute('data-filter');

            skillCardsList.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    /* ==========================================================================
       11. AVAILABILITY STATUS DOT AUTOMATION (ONLINE/OFFLINE SIMULATION)
       ========================================================================== */
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');

    if (statusDot && statusText) {
        const checkAvailability = () => {
            const currentHour = new Date().getHours();
            // Assuming active work hours between 8:00 AM and 11:00 PM local time
            if (currentHour >= 8 && currentHour < 23) {
                statusDot.style.background = '#22c55e'; // Green
                statusText.textContent = 'Available for Hire';
            } else {
                statusDot.style.background = '#eab308'; // Yellow / Away
                statusText.textContent = 'Away / Offline';
            }
        };

        checkAvailability();
        setInterval(checkAvailability, 60000); // Re-check every minute
    }


    /* ==========================================================================
       12. SMOOTH SECTION ANCHOR SCROLL OFFSET ENHANCEMENT
       ========================================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = mainNavbar ? mainNavbar.offsetHeight : 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});