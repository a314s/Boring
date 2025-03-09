document.addEventListener('DOMContentLoaded', function() {
    // Text slider functionality with 3D cube flip
    const slides = document.querySelectorAll('.slide');
    const slider = document.querySelector('.text-slider');
    let currentSlide = 0;
    let previousSlide = 0;
    const totalSlides = slides.length;
    let sliderInterval;
    let pauseOnLastSlide = false;
    let isAnimating = false;
    let isHeroSectionVisible = false;
    
    // Touch and swipe variables for hero slider
    let touchStartX = 0;
    let touchEndX = 0;
    let mouseStartX = 0;
    let mouseEndX = 0;
    let isDragging = false;
    
    // Determine if we're on a mobile device
    const isMobile = window.innerWidth <= 480;
    
    // Animation duration based on device
    const animationDuration = isMobile ? 400 : 600; // Reduced from 600/800 to 400/600 for faster transitions
    
    // Hide all slides initially except the first one
    slides.forEach((slide, index) => {
        if (index !== 0) {
            slide.style.visibility = 'hidden';
        }
    });
    
    // Set initial slide
    slides[currentSlide].classList.add('active');
    slides[currentSlide].style.visibility = 'visible';
    
    function startSlider() {
        // Clear any existing interval first
        if (sliderInterval) {
            clearInterval(sliderInterval);
        }
        
        sliderInterval = setInterval(() => {
            // Don't start a new animation if one is already in progress or if section is not visible
            if (isAnimating || !isHeroSectionVisible) return;
            
            // If we're on the last slide and it's set to pause
            if (currentSlide === totalSlides - 1 && pauseOnLastSlide) {
                // Don't advance, just keep showing the last slide
                return;
            }
            
            isAnimating = true;
            
            // Store previous slide index
            previousSlide = currentSlide;
            
            // Make sure the next slide is ready but hidden
            currentSlide = (currentSlide + 1) % totalSlides;
            slides[currentSlide].style.visibility = 'visible';
            
            // Add prev class to the current slide (which will become the previous)
            slides[previousSlide].classList.remove('active');
            slides[previousSlide].classList.add('prev');
            
            // Add active class to new current slide
            slides[currentSlide].classList.add('active');
            
            // After animation completes, clean up and prepare for next animation
            setTimeout(() => {
                // Hide the previous slide
                slides[previousSlide].style.visibility = 'hidden';
                slides[previousSlide].classList.remove('prev');
                
                // Animation is complete
                isAnimating = false;
                
                // If we've reached the last slide (Why choose NaviTechAid)
                if (currentSlide === totalSlides - 1) {
                    // Pause on this slide for longer (10 seconds)
                    pauseOnLastSlide = true;
                    
                    // After 10 seconds, allow the slider to continue
                    setTimeout(() => {
                        pauseOnLastSlide = false;
                    }, 10000);
                }
            }, animationDuration); // Match this to the CSS transition duration
        }, 6000); // Changed from 12000 to 6000 - display each slide for 6 seconds
    }
    
    // Function to go to next slide for hero slider
    function goToNextSlide() {
        if (isAnimating || !isHeroSectionVisible) return;
        
        isAnimating = true;
        previousSlide = currentSlide;
        
        // Calculate next slide index
        currentSlide = (currentSlide + 1) % totalSlides;
        
        // Make sure the next slide is ready but hidden
        slides[currentSlide].style.visibility = 'visible';
        slides[currentSlide].style.transform = 'rotateX(90deg)';
        
        // Animate current slide out
        slides[previousSlide].style.transform = 'rotateX(-90deg)';
        
        // After half the animation duration, start rotating the new slide in
        setTimeout(() => {
            slides[currentSlide].style.transform = 'rotateX(0deg)';
        }, animationDuration / 2);
        
        // After animation completes, hide previous slide and reset animation flag
        setTimeout(() => {
            slides[previousSlide].classList.remove('active');
            slides[previousSlide].style.visibility = 'hidden';
            slides[currentSlide].classList.add('active');
            isAnimating = false;
        }, animationDuration);
    }
    
    // Function to go to previous slide for hero slider
    function goToPrevSlide() {
        if (isAnimating || !isHeroSectionVisible) return;
        
        isAnimating = true;
        previousSlide = currentSlide;
        
        // Calculate previous slide index
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        
        // Make sure the previous slide is ready but hidden
        slides[currentSlide].style.visibility = 'visible';
        slides[currentSlide].style.transform = 'rotateX(-90deg)';
        
        // Animate current slide out
        slides[previousSlide].style.transform = 'rotateX(90deg)';
        
        // After half the animation duration, start rotating the new slide in
        setTimeout(() => {
            slides[currentSlide].style.transform = 'rotateX(0deg)';
        }, animationDuration / 2);
        
        // After animation completes, hide previous slide and reset animation flag
        setTimeout(() => {
            slides[previousSlide].classList.remove('active');
            slides[previousSlide].style.visibility = 'hidden';
            slides[currentSlide].classList.add('active');
            isAnimating = false;
        }, animationDuration);
    }

    // Add click event for hero slider
    slider.addEventListener('click', function(e) {
        // Prevent click from triggering if we're dragging
        if (isDragging) {
            isDragging = false;
            return;
        }
        
        // Reset the interval to prevent immediate auto-advance
        if (sliderInterval) {
            clearInterval(sliderInterval);
            startSlider();
        }
        
        goToNextSlide();
    });
    
    // Add click event for the entire hero-animation-container
    const heroAnimationContainer = document.querySelector('.hero-animation-container');
    if (heroAnimationContainer) {
        heroAnimationContainer.addEventListener('click', function(e) {
            // Don't propagate the click to avoid double triggering with the slider click
            e.stopPropagation();
            
            // Don't trigger if we're already animating or if the hero section isn't visible
            if (isAnimating || !isHeroSectionVisible) return;
            
            // Reset the interval to prevent immediate auto-advance
            if (sliderInterval) {
                clearInterval(sliderInterval);
                startSlider();
            }
            
            goToNextSlide();
        });
        
        // Make the container clickable by removing pointer-events: none
        heroAnimationContainer.style.pointerEvents = 'auto';
    }
    
    // Touch events for hero slider
    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    // Mouse events for hero slider (for drag/swipe with mouse)
    slider.addEventListener('mousedown', function(e) {
        mouseStartX = e.clientX;
        isDragging = false;
    });
    
    slider.addEventListener('mousemove', function(e) {
        if (e.buttons === 1) { // Left mouse button is pressed
            isDragging = true;
        }
    });
    
    slider.addEventListener('mouseup', function(e) {
        if (isDragging) {
            mouseEndX = e.clientX;
            handleMouseSwipe();
        }
    });
    
    // Handle touch swipe
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance required for a swipe
        const swipeDistance = touchEndX - touchStartX;
        
        // Reset the interval to prevent immediate auto-advance
        if (sliderInterval) {
            clearInterval(sliderInterval);
            startSlider();
        }
        
        if (swipeDistance > swipeThreshold) {
            // Swiped right - go to previous slide
            goToPrevSlide();
        } else if (swipeDistance < -swipeThreshold) {
            // Swiped left - go to next slide
            goToNextSlide();
        }
    }
    
    // Handle mouse swipe
    function handleMouseSwipe() {
        const swipeThreshold = 50; // Minimum distance required for a swipe
        const swipeDistance = mouseEndX - mouseStartX;
        
        // Reset the interval to prevent immediate auto-advance
        if (sliderInterval) {
            clearInterval(sliderInterval);
            startSlider();
        }
        
        if (swipeDistance > swipeThreshold) {
            // Swiped right - go to previous slide
            goToPrevSlide();
        } else if (swipeDistance < -swipeThreshold) {
            // Swiped left - go to next slide
            goToNextSlide();
        }
        
        isDragging = false;
    }
    
    // About section slider functionality
    const aboutSlides = document.querySelectorAll('.about-slide');
    let currentAboutSlide = 0;
    let previousAboutSlide = 0;
    const totalAboutSlides = aboutSlides.length;
    let aboutSliderInterval;
    let isAboutSectionVisible = false;
    
    // Touch and swipe variables for about slider
    let aboutTouchStartX = 0;
    let aboutTouchEndX = 0;
    let aboutMouseStartX = 0;
    let aboutMouseEndX = 0;
    let isAboutDragging = false;
    
    // Set initial about slide
    aboutSlides[currentAboutSlide].classList.add('active');
    
    function startAboutSlider() {
        // Clear any existing interval first
        if (aboutSliderInterval) {
            clearInterval(aboutSliderInterval);
        }
        
        aboutSliderInterval = setInterval(() => {
            // Only proceed if the about section is visible
            if (!isAboutSectionVisible) return;
            
            // Store previous slide index
            previousAboutSlide = currentAboutSlide;
            
            // Move to next slide or back to first
            currentAboutSlide = (currentAboutSlide + 1) % totalAboutSlides;
            
            // Add exit class to the previous slide
            aboutSlides[previousAboutSlide].classList.remove('active');
            aboutSlides[previousAboutSlide].classList.add('exit');
            
            // Add active class to new current slide
            aboutSlides[currentAboutSlide].classList.add('active');
            
            // Remove exit class after animation completes
            setTimeout(() => {
                aboutSlides[previousAboutSlide].classList.remove('exit');
            }, 2000); // Increased from 1500ms to 2000ms to match the new CSS transition time
        }, 6000); // Changed from 12000 to 6000 - display each slide for 6 seconds
    }
    
    // Function to go to next slide for about slider
    function goToNextAboutSlide() {
        if (!isAboutSectionVisible) return;
        
        // Store previous slide index
        previousAboutSlide = currentAboutSlide;
        
        // Move to next slide or back to first
        currentAboutSlide = (currentAboutSlide + 1) % totalAboutSlides;
        
        // Remove any existing animation classes first
        aboutSlides.forEach(slide => {
            slide.classList.remove('exit-reverse', 'active-reverse');
        });
        
        // Add exit class to the previous slide
        aboutSlides[previousAboutSlide].classList.remove('active');
        aboutSlides[previousAboutSlide].classList.add('exit');
        
        // Add active class to new current slide
        aboutSlides[currentAboutSlide].classList.add('active');
        
        // Remove exit class after animation completes
        setTimeout(() => {
            aboutSlides[previousAboutSlide].classList.remove('exit');
        }, 2000);
        
        // Reset the interval to prevent immediate auto-advance
        if (aboutSliderInterval) {
            clearInterval(aboutSliderInterval);
            startAboutSlider();
        }
    }
    
    // Function to go to previous slide for about slider
    function goToPrevAboutSlide() {
        if (!isAboutSectionVisible) return;
        
        // Store previous slide index
        previousAboutSlide = currentAboutSlide;
        
        // Move to previous slide or to last
        currentAboutSlide = (currentAboutSlide - 1 + totalAboutSlides) % totalAboutSlides;
        
        // Remove any existing animation classes first
        aboutSlides.forEach(slide => {
            slide.classList.remove('exit', 'exit-reverse', 'active-reverse');
        });
        
        // Add exit-reverse class to the previous slide for reverse animation
        aboutSlides[previousAboutSlide].classList.remove('active');
        aboutSlides[previousAboutSlide].classList.add('exit-reverse');
        
        // Add active class to new current slide with reverse entry
        aboutSlides[currentAboutSlide].classList.add('active-reverse');
        aboutSlides[currentAboutSlide].classList.add('active');
        
        // Remove classes after animation completes
        setTimeout(() => {
            aboutSlides[previousAboutSlide].classList.remove('exit-reverse');
            aboutSlides[currentAboutSlide].classList.remove('active-reverse');
        }, 2000);
        
        // Reset the interval to prevent immediate auto-advance
        if (aboutSliderInterval) {
            clearInterval(aboutSliderInterval);
            startAboutSlider();
        }
    }
    
    // Get the about slider container
    const aboutSliderContainer = document.querySelector('.about-slider-container');
    
    // Add click event for about slider
    aboutSliderContainer.addEventListener('click', function(e) {
        // Prevent click from triggering if we're dragging
        if (isAboutDragging) {
            isAboutDragging = false;
            return;
        }
        
        goToNextAboutSlide();
    });
    
    // Touch events for about slider
    aboutSliderContainer.addEventListener('touchstart', function(e) {
        aboutTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    aboutSliderContainer.addEventListener('touchend', function(e) {
        aboutTouchEndX = e.changedTouches[0].screenX;
        handleAboutSwipe();
    }, { passive: true });
    
    // Mouse events for about slider (for drag/swipe with mouse)
    aboutSliderContainer.addEventListener('mousedown', function(e) {
        aboutMouseStartX = e.clientX;
        isAboutDragging = false;
    });
    
    aboutSliderContainer.addEventListener('mousemove', function(e) {
        if (e.buttons === 1) { // Left mouse button is pressed
            isAboutDragging = true;
        }
    });
    
    aboutSliderContainer.addEventListener('mouseup', function(e) {
        if (isAboutDragging) {
            aboutMouseEndX = e.clientX;
            handleAboutMouseSwipe();
        }
    });
    
    // Handle touch swipe for about slider
    function handleAboutSwipe() {
        const swipeThreshold = 50; // Minimum distance required for a swipe
        const swipeDistance = aboutTouchEndX - aboutTouchStartX;
        
        if (swipeDistance > swipeThreshold) {
            // Swiped right - go to previous slide
            goToPrevAboutSlide();
        } else if (swipeDistance < -swipeThreshold) {
            // Swiped left - go to next slide
            goToNextAboutSlide();
        }
    }
    
    // Handle mouse swipe for about slider
    function handleAboutMouseSwipe() {
        const swipeThreshold = 50; // Minimum distance required for a swipe
        const swipeDistance = aboutMouseEndX - aboutMouseStartX;
        
        if (swipeDistance > swipeThreshold) {
            // Swiped right - go to previous slide
            goToPrevAboutSlide();
        } else if (swipeDistance < -swipeThreshold) {
            // Swiped left - go to next slide
            goToNextAboutSlide();
        }
        
        isAboutDragging = false;
    }
    
    // Set up Intersection Observer for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isHeroSectionVisible = entry.isIntersecting;
                
                if (isHeroSectionVisible) {
                    startSlider();
                } else {
                    clearInterval(sliderInterval);
                }
            });
        }, { threshold: 0.3 }); // Trigger when at least 30% of the section is visible
        
        heroObserver.observe(heroSection);
    }
    
    // Set up Intersection Observer for about section
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isAboutSectionVisible = entry.isIntersecting;
                
                if (isAboutSectionVisible) {
                    startAboutSlider();
                } else {
                    clearInterval(aboutSliderInterval);
                }
            });
        }, { threshold: 0.3 }); // Trigger when at least 30% of the section is visible
        
        aboutObserver.observe(aboutSection);
    }
    
    // Pause slider on hover (only on desktop)
    const sliderContainer = document.querySelector('.text-slider-container');
    if (sliderContainer && !isMobile) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(sliderInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            if (isHeroSectionVisible) {
                startSlider();
            }
        });
    }
    
    // Pause about slider on hover
    aboutSliderContainer.addEventListener('mouseenter', () => {
        clearInterval(aboutSliderInterval);
    });
    
    aboutSliderContainer.addEventListener('mouseleave', () => {
        if (isAboutSectionVisible) {
            startAboutSlider();
        }
    });
    
    // Language translations
    const translations = {
        en: {
            'service1': 'Knowledge Preservation Training',
            'service1-desc': 'Creating clear and structured content to ensure continuity and effective knowledge sharing.',
            'service2': 'Technical Training',
            'service2-desc': 'Visual guides, videos, and customized solutions tailored to your needs.',
            'service3': 'Customized AI Solutions',
            'service3-desc': 'Utilizing artificial intelligence to enhance training processes and automate technical content.',
            'service4': 'Technical Writing and Translation',
            'service4-desc': 'Professional documentation, user-friendly guides, and precise technical content in multiple languages.',
            'service5': 'Technical Animations',
            'service5-desc': 'Creating advanced simulation videos that illustrate processes and products in a clear and visual way.',
            'service6': 'Organic Effectiveness Processes',
            'service6-desc': 'We use the Lean Six Sigma methodology to improve processes and increase efficiency.'
        },
        he: {
            'service1': 'הכשרת שימור ידע',
            'service1-desc': 'יצירת תוכן ברור ומובנה כדי להבטיח המשכיות ושיתוף ידע יעיל.',
            'service2': 'הכשרה טכנית',
            'service2-desc': 'מדריכים ויזואליים, סרטונים ופתרונות מותאמים אישית לצרכים שלך.',
            'service3': 'פתרונות AI מותאמים אישית',
            'service3-desc': 'שימוש בבינה מלאכותית לשיפור תהליכי הדרכה ואוטומציה של תוכן טכני.',
            'service4': 'כתיבה טכנית ותרגום',
            'service4-desc': 'תיעוד מקצועי, מדריכים ידידותיים למשתמש ותוכן טכני מדויק במספר שפות.',
            'service5': 'אנימציות טכניות',
            'service5-desc': 'יצירת סרטוני סימולציה מתקדמים המדגימים תהליכים ומוצרים בצורה ברורה וויזואלית.',
            'service6': 'תהליכי יעילות אורגניים',
            'service6-desc': 'אנו משתמשים במתודולוגיית Lean Six Sigma לשיפור תהליכים והגדלת היעילות.'
        },
        de: {
            'service1': 'Schulungen zur Wissensbewahrung',
            'service1-desc': 'Klare und strukturierte Inhalte erstellen, um Kontinuität und effektiven Wissensaustausch zu gewährleisten.',
            'service2': 'Technische Schulungen',
            'service2-desc': 'Visuelle Anleitungen, Videos und maßgeschneiderte Lösungen, die auf Ihre Bedürfnisse zugeschnitten sind.',
            'service3': 'Individuelle KI-Lösungen',
            'service3-desc': 'Nutzung künstlicher Intelligenz zur Verbesserung von Schulungsprozessen und zur Automatisierung technischer Inhalte.',
            'service4': 'Technische Dokumentation und Übersetzung',
            'service4-desc': 'Professionelle Dokumentation, benutzerfreundliche Anleitungen und präzise technische Inhalte in mehreren Sprachen.',
            'service5': 'Technische Animationen',
            'service5-desc': 'Erstellung fortschrittlicher Simulationsvideos, die Prozesse und Produkte klar und anschaulich darstellen.',
            'service6': 'Organische Effektivitätsprozesse',
            'service6-desc': 'Wir verwenden die Lean Six Sigma-Methodik, um Prozesse zu verbessern und die Effizienz zu steigern.'
        },
        zh: {
            'service1': '知识保存培训',
            'service1-desc': '创建清晰、结构化的内容，确保知识的连续性和有效共享。',
            'service2': '技术培训',
            'service2-desc': '视觉指南、视频和定制解决方案，满足您的需求。',
            'service3': '定制 AI 解决方案',
            'service3-desc': '利用人工智能增强培训流程并自动化技术内容。',
            'service4': '技术写作和翻译',
            'service4-desc': '专业文档、用户友好指南和多种语言的精确技术内容。',
            'service5': '技术动画',
            'service5-desc': '创建高级模拟视频，以清晰直观的方式说明流程和产品。',
            'service6': '有机效率流程',
            'service6-desc': '我们使用精益六西格玛方法来改进流程并提高效率。'
        }
    };

    // Language switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            
            // Update active button
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    function setLanguage(lang) {
        const elements = document.querySelectorAll('[data-key]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Set text direction for Hebrew
        if (lang === 'he') {
            document.body.setAttribute('dir', 'rtl');
        } else {
            document.body.setAttribute('dir', 'ltr');
        }
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form submission handler
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Update the reply-to field with the user's email
            const replyToField = contactForm.querySelector('input[name="_replyto"]');
            if (replyToField) {
                replyToField.value = email;
            }
            
            // Show sending status
            formStatus.textContent = "Sending message...";
            formStatus.style.color = "#0066cc";
            
            // Function to create mailto fallback
            const openEmailClient = () => {
                // Get the email address from the contact info
                const recipientEmail = 'Avi@navitechaid.com';
                
                // Create email subject and body
                const subject = `NaviTechAid Contact Form: ${name}`;
                const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
                
                // Create mailto link
                const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                
                // Open email client
                window.location.href = mailtoLink;
            };
            
            // Set a timeout for the API call - if it takes longer than 10 seconds, offer the fallback
            let timeoutId = setTimeout(() => {
                formStatus.innerHTML = "The server is taking too long to respond. <a href='#' id='email-fallback'>Click here</a> to send via email client instead.";
                formStatus.style.color = "#ff9800";
                
                // Add event listener to the fallback link
                document.getElementById('email-fallback').addEventListener('click', function(e) {
                    e.preventDefault();
                    openEmailClient();
                });
            }, 10000); // 10 second timeout
            
            // Send the form using fetch API
            fetch(contactForm.action, {
                method: contactForm.method,
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                // Clear the timeout since we got a response
                clearTimeout(timeoutId);
                
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Show success message
                formStatus.textContent = "Thank you! Your message has been sent.";
                formStatus.style.color = "#4CAF50";
                
                // Reset form
                contactForm.reset();
                
                // Clear status message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = "";
                }, 5000);
            })
            .catch(error => {
                // Clear the timeout since we got an error response
                clearTimeout(timeoutId);
                
                // Show error message with fallback option
                formStatus.innerHTML = "There was a problem sending your message. <a href='#' id='email-fallback'>Click here</a> to open your email client instead.";
                formStatus.style.color = "#f44336";
                console.error('Error:', error);
                
                // Add event listener to the fallback link
                document.getElementById('email-fallback').addEventListener('click', function(e) {
                    e.preventDefault();
                    openEmailClient();
                });
            });
        });
    }

    // Scroll animation for service cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });

    // Add animation class
    document.documentElement.style.setProperty('--animate-in', `
        opacity: 1;
        transform: translateY(0);
    `);

    // Add CSS rule for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Shrinking header on mobile scroll
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    function handleHeaderOnScroll() {
        const isMobileView = window.innerWidth <= 768;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (isMobileView) {
            if (scrollTop > 50) {
                // User has scrolled down more than 50px
                header.classList.add('header-scrolled');
            } else {
                // User is at the top of the page
                header.classList.remove('header-scrolled');
            }
        } else {
            // On desktop, always show the full header
            header.classList.remove('header-scrolled');
        }
        
        lastScrollTop = scrollTop;
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleHeaderOnScroll);
    
    // Also check on resize to handle device orientation changes
    window.addEventListener('resize', handleHeaderOnScroll);
    
    // Initial check
    handleHeaderOnScroll();
});
