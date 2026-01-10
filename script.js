// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. AÑO ACTUAL EN FOOTER ==========
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
    
   // ========== FORMULARIO GOOGLE SHEETS ==========
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    
    // URL DE TU WEB APP - ¡IMPORTANTE!
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwX1nWhbPiXQlhaEvP34aAAgjwERr75Xoe7pSZAkj9tF5bTNm35UYLz_7L4z23Ki9grZg/exec';
    // ↑ REEMPLAZA CON TU URL REAL ↑
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            // Validación básica
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                showFormStatus('Por favor, completa todos los campos.', 'error');
                return;
            }
            
            // Validar email
            if (!isValidEmail(email)) {
                showFormStatus('Por favor, ingresa un email válido.', 'error');
                return;
            }
            
            // Mostrar "enviando..."
            setFormLoading(true);
            
            // Datos a enviar
            const formData = {
                name: name,
                email: email,
                message: message,
                _gotcha: document.getElementById('_gotcha').value // Anti-spam
            };
            
            try {
                // Enviar a Google Apps Script
                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors', // Importante para Google Apps Script
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                // Con "no-cors" no podemos leer la respuesta, pero asumimos éxito
                showFormStatus('¡Mensaje enviado! Te contactaré pronto.', 'success');
                contactForm.reset();
                
            } catch (error) {
                console.error('Error:', error);
                showFormStatus('Error al enviar. Por favor, contáctame directamente por email.', 'error');
            } finally {
                setFormLoading(false);
            }
        });
    }
    
    // Función para mostrar estado del formulario
    function showFormStatus(message, type) {
        if (!formStatus) return;
        
        formStatus.textContent = message;
        formStatus.className = 'form-status form-status-' + type;
        formStatus.style.display = message ? 'block' : 'none';
        
        // Auto-ocultar después de 5 segundos
        if (message && type === 'success') {
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }
    
    // Función para estado de carga
    function setFormLoading(isLoading) {
        if (!submitBtn || !btnText || !btnLoader) return;
        
        if (isLoading) {
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline';
            submitBtn.disabled = true;
        } else {
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
        }
    }
    
    // Validación de email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Opcional: Validación en tiempo real
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#dddddd';
            }
        });
    }
});
    
    // ========== 3. SCROLL SUAVE PARA ENLACES INTERNOS ==========
    // (Ya funciona por el CSS: html { scroll-behavior: smooth; })
    // Pero añadimos una clase activa para el menú
    
    const navLinks = document.querySelectorAll('.nav-link');
    
    function setActiveLink() {
        // Obtiene posición actual de scroll
        const scrollPosition = window.scrollY + 100;
        
        // Recorre todas las secciones
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                
                // Remueve clase active de todos los links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Añade clase active al link correspondiente
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Escucha el evento scroll
    window.addEventListener('scroll', setActiveLink);
    
    // ========== 4. EFECTO DE REVELADO EN SCROLL ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observa todos los elementos con clase 'fade-in'
    document.querySelectorAll('.timeline-item, .about-content, .contact-form').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
});

// ========== MENÚ HAMBURGUESA ==========
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Crea el overlay dinámicamente
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    // Función para abrir/cerrar menú
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }
    
    // Evento click en hamburguesa
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation(); // Previene que el click se propague
            toggleMenu();
        });
    }
    
    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });
    
    // Cerrar menú al hacer click en el overlay
    overlay.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
    
    // Cerrar menú al presionar Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
    
    // Cerrar menú al hacer scroll (opcional)
    window.addEventListener('scroll', function() {
        if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
});



