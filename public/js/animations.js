// Función para manejar las animaciones al hacer scroll
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-animate');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        // Si el elemento está en el viewport
        if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
}

// Función para manejar el navbar al hacer scroll
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar animaciones
    handleScrollAnimations();
    handleNavbarScroll();
    
    // Agregar event listeners para scroll
    window.addEventListener('scroll', () => {
        handleScrollAnimations();
        handleNavbarScroll();
    });
    
    // Optimización de rendimiento con requestAnimationFrame
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScrollAnimations();
                handleNavbarScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
});

// Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.classList.add('loader-hidden');
        loader.addEventListener('transitionend', () => {
            loader.remove();
        });
    }
}); 