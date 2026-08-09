// =====================================
// MAGO BARAHONA - SCRIPT MÁGICO
// ILUSIONISMO · MAGIA · ANIMACIONES
// =====================================

// =====================================
// PARTÍCULAS MÁGICAS (estrellas flotantes)
// =====================================
function crearParticulas() {
    const contenedor = document.getElementById('particulas');
    if (!contenedor) return;

    const colores = ['#cc0000', '#ff1a1a', '#ffffff', '#ff6600', '#cc0033'];
    const cantidad = 40;

    for (let i = 0; i < cantidad; i++) {
        const particula = document.createElement('div');
        particula.className = 'particula';

        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const duracion = Math.random() * 15 + 10;
        const delay = Math.random() * 15;
        const color = colores[Math.floor(Math.random() * colores.length)];

        particula.style.width = size + 'px';
        particula.style.height = size + 'px';
        particula.style.left = x + '%';
        particula.style.background = color;
        particula.style.animationDuration = duracion + 's';
        particula.style.animationDelay = delay + 's';
        particula.style.boxShadow = `0 0 ${size * 2}px ${color}`;

        contenedor.appendChild(particula);
    }
}

// =====================================
// MENÚ HAMBURGUESA
// =====================================
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');

if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
        menuBtn.innerHTML = menu.classList.contains('active')
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    document.querySelectorAll('.menu a').forEach(enlace => {
        enlace.addEventListener('click', () => {
            menu.classList.remove('active');
            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

// =====================================
// MENÚ ACTIVO POR SCROLL
// =====================================
const secciones = document.querySelectorAll('section[id]');
const enlacesMenu = document.querySelectorAll('.menu a');

window.addEventListener('scroll', () => {
    let actual = '';
    secciones.forEach(seccion => {
        const top = seccion.offsetTop - 150;
        if (window.scrollY >= top) {
            actual = seccion.getAttribute('id');
        }
    });

    enlacesMenu.forEach(enlace => {
        enlace.classList.remove('active');
        if (enlace.getAttribute('href') === '#' + actual) {
            enlace.classList.add('active');
        }
    });
});

// =====================================
// BOTÓN SUBIR CON EFECTO MÁGICO
// =====================================
const btnSubir = document.getElementById('subir');

if (btnSubir) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btnSubir.classList.add('visible');
        } else {
            btnSubir.classList.remove('visible');
        }
    });

    btnSubir.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// =====================================
// ANIMACIÓN DE CONTADORES (NÚMEROS MÁGICOS) - CORREGIDA
// =====================================
function animarContadores() {
    const contadores = document.querySelectorAll('.stat-magico .numero');

    contadores.forEach(contador => {
        const target = parseInt(contador.dataset.count);
        const duration = 2000;
        const steps = 60;
        const stepTime = duration / steps;
        const increment = target / steps;
        let animationStarted = false;

        // Primero, aseguramos que el número empiece en 0
        contador.textContent = '0';

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animationStarted) {
                    animationStarted = true;
                    let counter = 0;
                    const intervalo = setInterval(() => {
                        counter += increment;
                        if (counter >= target) {
                            // Mostrar el valor final con formato
                            if (target === 100) {
                                contador.textContent = '100%';
                            } else {
                                contador.textContent = target + '+';
                            }
                            clearInterval(intervalo);
                        } else {
                            // Mostrar el número actual
                            const valorActual = Math.floor(counter);
                            if (target === 100) {
                                contador.textContent = valorActual + '%';
                            } else {
                                contador.textContent = valorActual;
                            }
                        }
                    }, stepTime);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(contador);
    });
}

// =====================================
// ANIMACIONES AL HACER SCROLL
// =====================================
const elementosMagicos = document.querySelectorAll(
    '.espectaculo-card, .galeria-item, .sobre-texto, .contacto-info, .contacto-formulario'
);

const observerMagico = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.filter = 'blur(0)';
        }
    });
}, { threshold: 0.15 });

elementosMagicos.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.filter = 'blur(4px)';
    el.style.transition = `all 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.1}s`;
    observerMagico.observe(el);
});

// =====================================
// EFECTO DE APARICIÓN MÁGICA EN TARJETAS (hover)
// =====================================
document.querySelectorAll('.espectaculo-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
});

// =====================================
// FORMULARIO DE CONTACTO - ENVÍO A WHATSAPP
// =====================================
const form = document.getElementById('contactForm');
const formMensaje = document.getElementById('formMensaje');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Obtener valores del formulario
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const evento = document.getElementById('evento');
        const tipoEvento = evento.options[evento.selectedIndex]?.text || 'No especificado';
        const mensaje = document.getElementById('mensaje').value.trim();

        // Validar campos obligatorios
        if (!nombre || !email) {
            mostrarMensaje('⚠️ Por favor, completa los campos obligatorios (Nombre y Email).', 'error');
            return;
        }

        // Número de WhatsApp (sin el +, solo el código de país y número)
        const numeroWhatsApp = '50660739309';

        // Construir el mensaje
        let mensajeWhatsApp = `Hola Mago Barahona,%0A%0A`;
        mensajeWhatsApp += `Mi nombre es ${nombre}.%0A`;
        mensajeWhatsApp += `Mi correo electrónico es ${email}.%0A`;

        if (telefono) {
            mensajeWhatsApp += `Mi teléfono es ${telefono}.%0A`;
        }

        mensajeWhatsApp += `%0AEstoy interesado en: ${tipoEvento}.%0A%0A`;

        if (mensaje) {
            mensajeWhatsApp += `Detalles del evento:%0A${mensaje}`;
        } else {
            mensajeWhatsApp += `Me gustaría obtener más información sobre sus servicios.`;
        }

        // Efecto mágico al enviar
        const btn = form.querySelector('.btn-magico');
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Abriendo WhatsApp...';
        btn.disabled = true;

        // Pequeño retraso para mostrar el efecto
        setTimeout(() => {
            // Abrir WhatsApp con el mensaje predefinido
            const url = `https://wa.me/${numeroWhatsApp}?text=${mensajeWhatsApp}`;
            window.open(url, '_blank');

            // Restaurar el botón
            btn.innerHTML = '<i class="fa-regular fa-paper-plane"></i> Enviar Mensaje <span class="chispa"></span>';
            btn.disabled = false;

            // Mostrar mensaje de éxito
            mostrarMensaje('✅ ¡Redirigiendo a WhatsApp! Completa el mensaje y envíalo. ✨', 'success');
        }, 1000);
    });
}

function mostrarMensaje(texto, tipo) {
    formMensaje.textContent = texto;
    formMensaje.className = 'form-mensaje ' + tipo;
    formMensaje.style.display = 'block';

    setTimeout(() => {
        formMensaje.style.display = 'none';
    }, 5000);
}

// =====================================
// EFECTO DE BRILLO MÁGICO EN EL TÍTULO
// =====================================
function efectoBrilloTitulo() {
    const titulo = document.querySelector('.titulo-magico');
    if (!titulo) return;

    setInterval(() => {
        titulo.style.textShadow = '0 0 60px rgba(204, 0, 0, 0.5)';
        setTimeout(() => {
            titulo.style.textShadow = '0 0 20px rgba(204, 0, 0, 0.2)';
        }, 300);
    }, 3000);
}

// =====================================
// EFECTO DE REVELADO EN GALERÍA FLIP
// =====================================
document.querySelectorAll('.flip-card').forEach((card) => {
    card.addEventListener('click', function () {
        this.style.transition = 'transform 0.1s';
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
});

// =====================================
// EFECTO DE "CHISPA" EN LOS BOTONES
// =====================================
document.querySelectorAll('.btn-magico').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const chispa = document.createElement('span');
        chispa.style.position = 'absolute';
        chispa.style.left = e.clientX - this.getBoundingClientRect().left + 'px';
        chispa.style.top = e.clientY - this.getBoundingClientRect().top + 'px';
        chispa.style.width = '20px';
        chispa.style.height = '20px';
        chispa.style.background = 'rgba(255,255,255,0.6)';
        chispa.style.borderRadius = '50%';
        chispa.style.pointerEvents = 'none';
        chispa.style.transform = 'scale(0)';
        chispa.style.transition = 'all 0.5s ease';
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(chispa);

        setTimeout(() => {
            chispa.style.transform = 'scale(4)';
            chispa.style.opacity = '0';
        }, 10);

        setTimeout(() => {
            chispa.remove();
        }, 600);
    });
});

// =====================================
// EFECTO DE PARALLAX EN EL HERO
// =====================================
document.addEventListener('mousemove', function (e) {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;

    const overlay = hero.querySelector('.hero-overlay');
    if (overlay) {
        overlay.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    }
});

// =====================================
// INICIALIZAR TODAS LAS MAGIAS
// =====================================
document.addEventListener('DOMContentLoaded', function () {
    // 1. Crear partículas
    crearParticulas();

    // 2. Animar contadores - SE INICIALIZA CORRECTAMENTE
    animarContadores();

    // 3. Efecto de brillo en título
    efectoBrilloTitulo();

    console.log('🎩✨ Magia cargada correctamente - Mago Barahona');
});

// =====================================
// EFECTO DE TRANSICIÓN ENTRE SECCIONES
// =====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =====================================
// EFECTO DE APARICIÓN MÁGICA AL RECARGAR
// =====================================
window.addEventListener('load', function () {
    const hero = document.querySelector('.hero');
    if (hero) {
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.inset = '0';
        flash.style.background = 'rgba(204, 0, 0, 0.1)';
        flash.style.pointerEvents = 'none';
        flash.style.zIndex = '99999';
        flash.style.transition = 'opacity 0.5s ease';
        document.body.appendChild(flash);

        setTimeout(() => {
            flash.style.opacity = '0';
            setTimeout(() => {
                flash.remove();
            }, 500);
        }, 300);
    }
});

console.log('✨ ¡La magia está en el aire! ✨');