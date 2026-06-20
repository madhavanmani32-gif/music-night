document.addEventListener('DOMContentLoaded', () => {
    
    /* -----------------------------------------------------
       1. Global Fade-In Intersection Observer
    ------------------------------------------------------- */
    const animatedElements = document.querySelectorAll('section > div, section > h2');
    animatedElements.forEach(el => el.classList.add('fade-in'));

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    /* -----------------------------------------------------
       2. Smooth Scrolling for Anchor Links
    ------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* -----------------------------------------------------
       3. Scroll Progress Bar & Back to Top Button
    ------------------------------------------------------- */
    const progressBar = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Calculate scroll progress
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';

        // Toggle Back to Top Button
        if (winScroll > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    /* -----------------------------------------------------
       4. Typewriter Effect for Hero Headline
    ------------------------------------------------------- */
    const typewriterElement = document.getElementById('typewriter-text');
    const textToType = "FUTURE // UNDER CONSTRUCTION";
    let typeIndex = 0;

    function typeWriter() {
        if (typeIndex < textToType.length) {
            typewriterElement.innerHTML += textToType.charAt(typeIndex);
            typeIndex++;
            setTimeout(typeWriter, 100); // 100ms delay per character
        }
    }

    // Start typing after a short delay on page load
    setTimeout(typeWriter, 500);

    /* -----------------------------------------------------
       5. Sticky Phase Indicator in Story Section
    ------------------------------------------------------- */
    const storyScrollBox = document.querySelector('.story-scroll-box');
    const phaseSections = document.querySelectorAll('.phase-section');
    const phaseDots = document.querySelectorAll('.phase-dot');

    // Create an observer specifically for the inner scrolling container
    const phaseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all dots
                phaseDots.forEach(dot => dot.classList.remove('active'));
                
                // Get the ID of the currently visible section
                const targetId = entry.target.getAttribute('id');
                
                // Find and highlight the corresponding dot
                const activeDot = document.querySelector(`.phase-dot[data-target="${targetId}"]`);
                if (activeDot) {
                    activeDot.classList.add('active');
                }
            }
        });
    }, {
        root: storyScrollBox, // Observe scroll within the story box
        threshold: 0.3 // Trigger when 30% of the section is visible
    });

    // Observe each phase section
    phaseSections.forEach(section => {
        phaseObserver.observe(section);
    });

    // Allow clicking the dots to scroll smoothly to the phase inside the box
    phaseDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetId = dot.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection && storyScrollBox) {
                storyScrollBox.scrollTo({
                    top: targetSection.offsetTop - 20, // offset slightly for aesthetics
                    behavior: 'smooth'
                });
            }
        });
    });
});