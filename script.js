// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. AÑO ACTUAL EN FOOTER ==========
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
    
    // ========== 2. ENVÍO DE FORMULARIO ==========
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Previene el envío normal
            
            // Obtiene los valores del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validación simple
            if (!name || !email || !message) {
                alert('Por favor, completa todos los campos.');
                return;
            }
            
            // Aquí normalmente enviarías los datos a un servidor
            // Por ahora, solo mostraremos un mensaje
            alert(`Gracias ${name}, tu mensaje ha sido enviado. Te contactaré pronto.`);
            
            // Limpia el formulario
            contactForm.reset();
        });
    }
    
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

