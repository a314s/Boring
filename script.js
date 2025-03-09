document.addEventListener('DOMContentLoaded', function() {
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
