"use strict";

window.addEventListener('DOMContentLoaded', () => {

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link,.nav-cta').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Initialize EmailJS
    (function() {
        // IMPORTANTE: Reemplaza estas claves con las tuyas de EmailJS
        emailjs.init({
            publicKey: "TU_PUBLIC_KEY" // Reemplazar con tu Public Key de EmailJS
        });
    })();

    // Form submission with EmailJS
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validation
            if (!data.nombre ||!data.email ||!data.mensaje) {
                showNotification('Por favor complete todos los campos obligatorios.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Por favor ingrese un email válido.', 'error');
                return;
            }
            
            // Prepare email data
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Enviando...';
            submitBtn.disabled = true;
            
            // Template parameters for EmailJS
            const templateParams = {
                from_name: data.nombre,
                from_email: data.email,
                from_telefono: data.telefono || 'No proporcionado',
                from_empresa: data.empresa || 'No proporcionada',
                servicio_interes: data.servicio || 'No especificado',
                message: data.mensaje,
                to_email: 'ricardoandresbonilla@gmail.com', // Tu email de destino
                reply_to: data.email
            };
            
            // Send email using EmailJS
            emailjs.send(
                'TU_SERVICE_ID',        // Reemplazar con tu Service ID
                'TU_TEMPLATE_ID',       // Reemplazar con tu Template ID
                templateParams
            ).then(function(response) {
                console.log('Email enviado exitosamente:', response);
                showNotification('¡Solicitud enviada exitosamente! Nos contactaremos con usted en las próximas 24 horas.', 'success');
                contactForm.reset();
            }).catch(function(error) {
                console.error('Error al enviar email:', error);
                showNotification('Hubo un error al enviar la solicitud. Por favor intente nuevamente.', 'error');
            }).finally(function() {
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success'? '#4CAF50' : type === 'error'? '#f44336' : '#2196F3'};
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10000;
                max-width: 400px;
                font-weight: 500;
            ">
                ${message}
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // Add loading states to service buttons
    document.querySelectorAll('.service-card.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Scroll to contact form
            const contactSection = document.querySelector('#contacto');
            if (!contactSection) return;

            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = contactSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Pre-fill service field
            setTimeout(() => {
                const serviceSelect = document.querySelector('#servicio');
                const serviceCard = this.closest('.service-card');
                if (!serviceSelect ||!serviceCard) return;

                const serviceName = serviceCard.querySelector('.service-title').textContent;
                
                // Map service names to select values
                const serviceMap = {
                    'Desarrollo de Software': 'desarrollo-software',
                    'Desarrollo de Software a la Medida': 'desarrollo-software',
                    'Venta de Equipos y Accesorios': 'venta-equipos',
                    'Mantenimiento de Equipos': 'mantenimiento',
                    'Reparación de Hardware': 'reparacion-hardware',
                    'Instalación de Redes': 'instalacion-redes',
                    'Instalación de Cámaras': 'instalacion-camaras'
                };
                
                if (serviceMap[serviceName]) {
                    serviceSelect.value = serviceMap[serviceName];
                    serviceSelect.style.borderColor = 'var(--sp-green)';
                    serviceSelect.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.1)';
                }
            }, 800); // Wait for scroll to finish
        });
    });

    // Add typing effect to hero title (stable version)
    function addTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        const originalHTML = heroTitle.innerHTML;
        const text = heroTitle.textContent.trim();
        
        // Guardar dimensiones originales exactas
        const rect = heroTitle.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(heroTitle);
        
        // Fijar dimensiones completamente para mantener el layout
        heroTitle.style.width = rect.width + 'px';
        heroTitle.style.height = rect.height + 'px';
        heroTitle.style.minHeight = rect.height + 'px';
        heroTitle.style.maxHeight = rect.height + 'px';
        heroTitle.style.boxSizing = 'border-box';
        heroTitle.style.overflow = 'hidden';
        heroTitle.style.whiteSpace = 'pre-wrap';
        
        // Limpiar y crear estructura para typing
        heroTitle.innerHTML = '';
        
        // Crear texto de escritura y cursor
        const textSpan = document.createElement('span');
        const cursorSpan = document.createElement('span');
        
        textSpan.className = 'typing-text';
        cursorSpan.className = 'typing-cursor';
        cursorSpan.textContent = '|';
        
        heroTitle.appendChild(textSpan);
        heroTitle.appendChild(cursorSpan);
        
        // Variables para el efecto
        let currentText = '';
        let charIndex = 0;
        
        const typeTimer = setInterval(() => {
            if (charIndex < text.length) {
                currentText += text[charIndex];
                
                // Aplicar highlight a las últimas palabras si es necesario
                const highlightStart = text.indexOf('integral para su empresa');
                if (highlightStart!== -1 && charIndex >= highlightStart) {
                    const beforeHighlight = text.substring(0, highlightStart);
                    const highlightText = text.substring(highlightStart);
                    const currentHighlight = highlightText.substring(0, charIndex - beforeHighlight.length + 1);
                    
                    if (currentHighlight.length > 0) {
                        textSpan.innerHTML = beforeHighlight + '<span class="highlight">' + currentHighlight + '</span>';
                    } else {
                        textSpan.textContent = currentText;
                    }
                } else {
                    textSpan.textContent = currentText;
                }
                
                charIndex++;
            } else {
                clearInterval(typeTimer);
                // Restaurar contenido original después de una pausa
                setTimeout(() => {
                    heroTitle.innerHTML = originalHTML;
                    // Limpiar estilos forzados
                    heroTitle.style.width = '';
                    heroTitle.style.height = '';
                    heroTitle.style.minHeight = computedStyle.minHeight;
                    heroTitle.style.maxHeight = '';
                    heroTitle.style.boxSizing = '';
                    heroTitle.style.overflow = '';
                    heroTitle.style.whiteSpace = '';
                }, 2000);
            }
        }, 60); // Velocidad balanceada
    }

    // Initialize typing effect after page load
    setTimeout(addTypingEffect, 500);

    // Add parallax effect to hero section
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
            }
        });
    }

    // Add counter animation to stats
    function animateCounters() {
        const stats = document.querySelectorAll('.stat-number');
        
        stats.forEach(stat => {
            const targetText = stat.textContent;
            const target = parseInt(targetText.replace(/[^0-9]/g, ''));
            if (isNaN(target)) return;

            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (targetText.includes('%')) {
                    stat.textContent = Math.floor(current) + '%';
                } else if (targetText.includes('+')) {
                    stat.textContent = Math.floor(current) + '+';
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 20);
        });
    }

    // Trigger counter animation when stats come into view
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions); // Re-using the same options as fade-in
        
        statsObserver.observe(heroStats);
    }

});