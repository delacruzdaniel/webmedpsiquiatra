// Smooth scrolling para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Función para mostrar mensajes
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `mensaje mensaje-${type}`;
    messageDiv.textContent = message;

    const form = type === 'exito' ? document.getElementById('turnoForm') : document.getElementById('contactForm');
    form.insertBefore(messageDiv, form.firstChild);

    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Manejar el formulario de turnos
const turnoForm = document.getElementById('turnoForm');
if (turnoForm) {
    turnoForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(turnoForm);
        const data = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            fecha: formData.get('fecha'),
            hora: formData.get('hora'),
            tipoConsulta: formData.get('tipoConsulta'),
            mensaje: formData.get('mensaje')
        };

        try {
            const response = await fetch('/api/turnos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                showMessage('¡Tu turno ha sido agendado exitosamente! Te enviaremos un correo de confirmación.', 'exito');
                turnoForm.reset();
            } else {
                showMessage(result.error || 'Hubo un error al agendar el turno. Por favor, intenta nuevamente.', 'error');
            }
        } catch (error) {
            showMessage('Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente.', 'error');
        }
    });
}

// Manejar el formulario de contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            mensaje: formData.get('mensaje')
        };

        try {
            const response = await fetch('/api/contacto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                showMessage('¡Tu mensaje ha sido enviado exitosamente! Nos pondremos en contacto contigo pronto.', 'exito');
                contactForm.reset();
            } else {
                showMessage(result.error || 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
            }
        } catch (error) {
            showMessage('Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente.', 'error');
        }
    });
}

// Animación del header al hacer scroll
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Animación de elementos al hacer scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.servicio-card, .sobre-mi-content, .contacto-content').forEach(element => {
    observer.observe(element);
}); 