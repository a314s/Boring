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
    
    // Determine if we're on a mobile device
    const isMobile = window.innerWidth <= 480;
    
    // Animation duration based on device
    const animationDuration = isMobile ? 600 : 800; // Faster on mobile
    
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
        sliderInterval = setInterval(() => {
            // Don't start a new animation if one is already in progress
            if (isAnimating) return;
            
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
        }, 8000); // Change slide every 8 seconds
    }
    
    // Start the slider
    startSlider();
    
    // Pause slider on hover (only on desktop)
    const sliderContainer = document.querySelector('.text-slider-container');
    if (sliderContainer && !isMobile) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(sliderInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            startSlider();
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const wasIsMobile = isMobile;
        const newIsMobile = window.innerWidth <= 480;
        
        // Only update if the device type changed
        if (wasIsMobile !== newIsMobile) {
            // Clear existing interval
            clearInterval(sliderInterval);
            
            // Restart with new timing
            startSlider();
        }
    });

    // About section slider functionality
    const aboutSlides = document.querySelectorAll('.about-slide');
    let currentAboutSlide = 0;
    let previousAboutSlide = 0;
    const totalAboutSlides = aboutSlides.length;
    let aboutSliderInterval;
    
    // Set initial about slide
    aboutSlides[currentAboutSlide].classList.add('active');
    
    function startAboutSlider() {
        aboutSliderInterval = setInterval(() => {
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
            }, 1500);
        }, 9000); // Change slide every 9 seconds (slightly different timing from hero slider)
    }
    
    // Start the about slider
    startAboutSlider();
    
    // Pause about slider on hover
    const aboutSliderContainer = document.querySelector('.about-slider-container');
    if (aboutSliderContainer) {
        aboutSliderContainer.addEventListener('mouseenter', () => {
            clearInterval(aboutSliderInterval);
        });
        
        aboutSliderContainer.addEventListener('mouseleave', () => {
            startAboutSlider();
        });
    }

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

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
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
});
