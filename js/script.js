// =====================================
// MAGO BARAHONA
// SCRIPT PRINCIPAL
// =====================================

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

    // Cerrar menú al hacer clic en un enlace
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
// BOTÓN SUBIR
// =====================================
const btnSubir = document.getElementById('subir');

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

// =====================================
// ANIMACIONES AL HACER SCROLL
// =====================================
const elementos = document.querySelectorAll('.espectaculo-card, .galeria-item, .sobre-texto');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.15 });

elementos.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
    observer.observe(el);
});

// =====================================
// FORMULARIO DE CONTACTO
// =====================================
const form = document.getElementById('contactForm');
const formMensaje = document.getElementById('formMensaje');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const evento = document.getElementById('evento').value;

        if (!nombre || !email) {
            mostrarMensaje('⚠️ Por favor, completa los campos obligatorios.', 'error');
            return;
        }

        // Aquí iría la lógica para enviar el correo
        mostrarMensaje('✅ ¡Mensaje enviado! Te contactaré pronto.', 'success');
        form.reset();
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
// EFECTO DE TIPEO EN EL TÍTULO
// =====================================
const tituloHero = document.querySelector('.hero-contenido h1 span');
if (tituloHero) {
    const textoOriginal = tituloHero.textContent;
    let index = 0;
    let escribiendo = true;

    // No implementamos tipeo automático para no saturar, pero dejamos el efecto visual
    tituloHero.style.display = 'inline-block';
    tituloHero.style.transition = 'all 0.3s ease';
}

console.log('🎩 Mago Barahona - Sitio oficial cargado correctamente.');