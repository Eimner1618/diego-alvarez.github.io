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

// ========== AÑADE ESTO AL CSS PARA LOS EFECTOS ==========
/*
.fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}
*/