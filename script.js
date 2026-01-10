// ==============================================
// SCRIPT.JS UNIFICADO - PORTAFOLIO PROFESIONAL
// ==============================================

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. AÑO ACTUAL EN FOOTER ==========
    const currentYear = new Date().getFullYear();
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = currentYear;
    }
    
    // ========== 2. FORMULARIO DE CONTACTO ==========
    inicializarFormulario();
    
    // ========== 3. NAVEGACIÓN Y SCROLL ==========
    inicializarNavegacion();
    
    // ========== 4. MENÚ HAMBURGUESA ==========
    inicializarMenuHamburguesa();
    
    // ========== 5. ANIMACIONES SCROLL ==========
    inicializarAnimaciones();
});

// ==============================================
// FUNCIONES ESPECÍFICAS
// ==============================================

// ========== 2. FORMULARIO DE CONTACTO - VERSIÓN CORREGIDA ==========
function inicializarFormulario() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    // ✅ TU URL (sin cambios)
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwkO-HF1f4egV0LkesVb6fWUjTkx4UTRz-maJ1ALuxvDyju51zKjqwokb1Is1cC4xG4wA/exec';
    
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
        
        if (!validarEmail(email)) {
            alert('Por favor, ingresa un email válido.');
            return;
        }
        
        // Cambiar botón
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Enviando...';
        btn.disabled = true;
        
        try {
            // IMPORTANTE: Usar mode 'no-cors' para Google Apps Script
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // ← ¡ESTO ES IMPORTANTE!
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            });
            
            // Con 'no-cors' no podemos leer la respuesta, pero asumimos éxito
            // Revisa si realmente se guardó en Sheets
            
            alert('✅ ¡Mensaje enviado con éxito! Te contactaré pronto.');
            form.reset();
            
            // Opcional: Mostrar mensaje más bonito
            mostrarAlerta('✅ ¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
            
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Error al enviar. Por favor, usa el email directamente: diegosmk16@gmail.com');
        } finally {
            // Restaurar botón
            btn.textContent = originalText;
            btn.disabled = false;
        }
    });
}

// ========== 3. NAVEGACIÓN Y SCROLL ==========
function inicializarNavegacion() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navLinks.length === 0) return;
    
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
    
    // Ejecutar una vez al cargar
    setActiveLink();
}

// ========== 4. MENÚ HAMBURGUESA ==========
function inicializarMenuHamburguesa() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navMenu) return;
    
    // Crea el overlay dinámicamente si no existe
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
    }
    
    // Función para abrir/cerrar menú
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }
    
    // Función para cerrar menú
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
    
    // Evento click en hamburguesa
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation(); // Previene que el click se propague
        toggleMenu();
    });
    
    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });
    
    // Cerrar menú al hacer click en el overlay
    overlay.addEventListener('click', closeMenu);
    
    // Cerrar menú al presionar Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
    
    // Cerrar menú al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Cerrar menú al redimensionar ventana (si se hace grande)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

// ========== 5. ANIMACIONES SCROLL ==========
function inicializarAnimaciones() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: dejar de observar después de mostrar
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observa todos los elementos con clase 'fade-in'
    document.querySelectorAll('.timeline-item, .about-content, .contact-form, .certifications-list').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ==============================================
// FUNCIONES AUXILIARES
// ==============================================

// Función para mostrar alertas personalizadas
function mostrarAlerta(mensaje, tipo = 'info') {
    // Crear elemento de alerta si no existe
    let alertaContainer = document.getElementById('alerta-global');
    if (!alertaContainer) {
        alertaContainer = document.createElement('div');
        alertaContainer.id = 'alerta-global';
        alertaContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            max-width: 400px;
        `;
        document.body.appendChild(alertaContainer);
    }
    
    // Crear alerta
    const alerta = document.createElement('div');
    alerta.style.cssText = `
        padding: 15px 20px;
        margin-bottom: 10px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 4.7s forwards;
        display: flex;
        align-items: center;
        justify-content: space-between;
    `;
    
    // Establecer color según tipo
    switch(tipo) {
        case 'success':
            alerta.style.backgroundColor = '#10b981'; // Verde
            break;
        case 'error':
            alerta.style.backgroundColor = '#ef4444'; // Rojo
            break;
        case 'warning':
            alerta.style.backgroundColor = '#f59e0b'; // Amarillo
            break;
        default:
            alerta.style.backgroundColor = '#3b82f6'; // Azul
    }
    
    alerta.innerHTML = `
        <span>${mensaje}</span>
        <button onclick="this.parentElement.remove()" style="background:none; border:none; color:white; cursor:pointer; margin-left:10px; font-size:1.2em;">×</button>
    `;
    
    alertaContainer.appendChild(alerta);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        if (alerta.parentNode) {
            alerta.remove();
        }
    }, 5000);
    
    // Añadir estilos CSS para animaciones
    if (!document.getElementById('estilos-alerta')) {
        const estilos = document.createElement('style');
        estilos.id = 'estilos-alerta';
        estilos.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(estilos);
    }
}

// Función para validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ==============================================
// FUNCIONES ADICIONALES ÚTILES
// ==============================================

// Prevenir envío de formulario con Enter en campos no deseados
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
            }
        });
    }
});

// Suavizar scroll para todos los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Actualizar año en tiempo real (por si la página está abierta hasta año nuevo)
function actualizarAnioAutomatico() {
    const ahora = new Date();
    const yearElement = document.getElementById('currentYear');
    
    if (yearElement) {
        const currentYear = parseInt(yearElement.textContent);
        const actualYear = ahora.getFullYear();
        
        if (currentYear !== actualYear) {
            yearElement.textContent = actualYear;
        }
    }
}

// Verificar cada hora (3600000 ms = 1 hora)
setInterval(actualizarAnioAutomatico, 3600000);







