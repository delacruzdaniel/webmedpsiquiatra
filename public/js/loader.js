// Función para manejar el loader
function handleLoader() {
    const loader = document.querySelector('.loader');
    
    // Ocultar el loader cuando la página esté completamente cargada
    window.addEventListener('load', () => {
        // Asegurarse de que todos los recursos estén cargados
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 500);
    });
}

// Inicializar el loader
document.addEventListener('DOMContentLoaded', handleLoader);

// Mostrar el loader antes de navegar a otra página
document.addEventListener('click', function(e) {
    // Verificar si el click fue en un enlace
    if (e.target.tagName === 'A' || e.target.closest('a')) {
        const link = e.target.tagName === 'A' ? e.target : e.target.closest('a');
        // Solo mostrar el loader si es un enlace interno
        if (link.href && link.href.includes(window.location.origin)) {
            showLoader();
        }
    }
});

function showLoader() {
    document.querySelector('.loader').style.display = 'flex';
}

function hideLoader() {
    document.querySelector('.loader').style.display = 'none';
} 