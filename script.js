// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. AÑO ACTUAL EN FOOTER ==========
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
    
// FORMULARIO GOOGLE SHEETS - VERSIÓN SIMPLIFICADA
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    // ✅ REEMPLAZA CON TU URL REAL
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxnjCQcs2XkQtgaOaG9nVcZCEc81llomXfjPuNdoFTlKNnmyF5yynTY9uehvAR2KAyCzA/exec';
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Obtener datos
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validar
            if (!name || !email || !message) {
                alert('Por favor, completa todos los campos.');
                return;
            }
            
            // Cambiar botón
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Enviando...';
            btn.disabled = true;
            
            try {
                // Enviar datos
                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message
                    })
                });
                
                // Intentar leer respuesta
                let result;
                try {
                    result = await response.json();
                } catch {
                    result = { status: 'success' }; // Si no puede parsear, asumir éxito
                }
                
                if (result.status === 'success') {
                    alert('✅ ¡Mensaje enviado con éxito! Te contactaré pronto.');
                    form.reset();
                } else {
                    alert('⚠️ ' + (result.message || 'Error al enviar.'));
                }
                
            } catch (error) {
                console.error('Error:', error);
                alert('❌ Error de conexión. Por favor, contáctame directamente por email.');
            } finally {
                // Restaurar botón
                btn.textContent = originalText;
                btn.disabled = false;
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






