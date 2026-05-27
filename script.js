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

    // ========== 6. MODO OSCURO ==========
    inicializarModoOscuro();
    
    // ========== 7. BOTÓN PDF ==========  ← AÑADE ESTA LÍNEA
    inicializarPDF();
});

// ==============================================
// FUNCIONES ESPECÍFICAS
// ==============================================

// ========== 2. FORMULARIO DE CONTACTO ==========
function inicializarFormulario() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx2Eq6dAImdV6FZb5eWc8VgXfkHWFG0UWDs7RCni3QqKniB0ti6yN5mmVhhgT6uktnZSg/exec';
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        
        if (!validarEmail(email)) {
            alert('Por favor, ingresa un email válido.');
            return;
        }
        
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Enviando...';
        btn.disabled = true;
        
        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message })
            });
            
            alert('✅ ¡Mensaje enviado con éxito! Te contactaré pronto.');
            form.reset();
            mostrarAlerta('✅ ¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
            
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Error al enviar. Por favor, usa el email directamente: diegosmk16@gmail.com');
        } finally {
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
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    setActiveLink();
}

// ========== 4. MENÚ HAMBURGUESA ==========
function inicializarMenuHamburguesa() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navMenu) return;
    
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
    }
    
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }
    
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
    
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });
    
    overlay.addEventListener('click', closeMenu);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
    
    window.addEventListener('scroll', function() {
        if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
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
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.timeline-item, .about-content, .contact-form, .certifications-list, .project-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ========== 6. MODO OSCURO ==========
function inicializarModoOscuro() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    
    if (!themeToggle) {
        console.log('⚠️ Botón de tema no encontrado');
        return;
    }
    
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme-preference');
    
    function aplicarTema(esOscuro) {
        if (esOscuro) {
            document.body.classList.add('dark-mode');
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme-preference', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme-preference', 'light');
        }
    }
    
    if (savedTheme === 'dark') {
        aplicarTema(true);
    } else if (savedTheme === 'light') {
        aplicarTema(false);
    } else if (prefersDarkScheme.matches) {
        aplicarTema(true);
    } else {
        aplicarTema(false);
    }
    
    themeToggle.addEventListener('click', function() {
        const esModoOscuro = !document.body.classList.contains('dark-mode');
        aplicarTema(esModoOscuro);
        
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 150);
    });
    
    prefersDarkScheme.addEventListener('change', function(e) {
        if (!localStorage.getItem('theme-preference')) {
            aplicarTema(e.matches);
        }
    });
    
    console.log('✅ Modo oscuro inicializado');
}

// ========== 7. BOTÓN PDF ==========
function inicializarPDF() {
    // Verificar si ya existe el botón
    if (document.getElementById('btnDescargarPDF')) {
        return;
    }
    
    const pdfContainer = document.createElement('div');
    pdfContainer.className = 'pdf-button-container';
    pdfContainer.innerHTML = `
        <button class="btn-pdf" id="btnDescargarPDF">
            📄 Descargar Portafolio (PDF)
        </button>
    `;
    document.body.appendChild(pdfContainer);
    
    const btnPDF = document.getElementById('btnDescargarPDF');
    if (!btnPDF) return;
    
    btnPDF.addEventListener('click', function() {
        const originalText = btnPDF.innerHTML;
        btnPDF.innerHTML = '⏳ Generando PDF...';
        btnPDF.disabled = true;
        
        try {
            window.print();
            
            setTimeout(() => {
                btnPDF.innerHTML = originalText;
                btnPDF.disabled = false;
            }, 2000);
        } catch (error) {
            console.error('Error:', error);
            btnPDF.innerHTML = '❌ Error';
            setTimeout(() => {
                btnPDF.innerHTML = originalText;
                btnPDF.disabled = false;
            }, 2000);
        }
    });
    
    console.log('✅ Botón PDF inicializado');
}

// ==============================================
// FUNCIONES AUXILIARES
// ==============================================

function mostrarAlerta(mensaje, tipo = 'info') {
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
    
    switch(tipo) {
        case 'success':
            alerta.style.backgroundColor = '#10b981';
            break;
        case 'error':
            alerta.style.backgroundColor = '#ef4444';
            break;
        case 'warning':
            alerta.style.backgroundColor = '#f59e0b';
            break;
        default:
            alerta.style.backgroundColor = '#3b82f6';
    }
    
    alerta.innerHTML = `
        <span>${mensaje}</span>
        <button onclick="this.parentElement.remove()" style="background:none; border:none; color:white; cursor:pointer; margin-left:10px; font-size:1.2em;">×</button>
    `;
    
    alertaContainer.appendChild(alerta);
    
    setTimeout(() => {
        if (alerta.parentNode) {
            alerta.remove();
        }
    }, 5000);
    
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

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ==============================================
// FUNCIONES ADICIONALES
// ==============================================

// Prevenir envío con Enter
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

// Scroll suave
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

// Actualizar año automáticamente
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

setInterval(actualizarAnioAutomatico, 3600000);
