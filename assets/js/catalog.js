// Función para contactar con Sistemas Pamplona
function contactSistemasP(producto) {
    // Validación defensiva (no por XSS, sino por robustez)
    if (!producto || typeof producto !== 'string' || producto.trim() === '') {
        console.error('Invalid product parameter');
        return;
    }

    const mensaje = `Hola, estoy interesado en el producto: ${producto}. ¿Podrían darme más información y cotización?`;
    const whatsappUrl = `https://wa.me/573185471853?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, '_blank');
}

// Crear partículas animadas
function createParticles() {
    const particlesContainer = document.getElementById('particles');

    // Validación robusta
    if (!particlesContainer) {
        console.error('Particles container not found');
        return;
    }

    const colors = ['#4CAF50', '#1565C0', '#FF9800'];

    // Guardar referencia para poder limpiar después
    const intervalId = setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = particle.style.height = Math.random() * 4 + 2 + 'px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';

        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 25000);
    }, 800);

    // Limpiar al salir de la página
    window.addEventListener('beforeunload', () => {
        clearInterval(intervalId);
    });

    // Retornar función de limpieza (opcional, para uso programático)
    return () => clearInterval(intervalId);
}

// Mostrar categorías
function showCategory(category, element) {
    document.querySelectorAll('.category-pill').forEach(pill => {
        pill.classList.remove('active');
    });
    element.classList.add('active');

    const allProducts = document.querySelectorAll('.product-card');
    let visibleCount = 0;

    allProducts.forEach((productCard) => {
        if (productCard.dataset.category === category) {
            productCard.style.display = 'block';
            productCard.style.animation = `fadeUp 0.6s ease forwards ${visibleCount * 0.1}s`;
            visibleCount++;
        } else {
            productCard.style.display = 'none';
        }
    });

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
}

// Búsqueda
function setupSearch() {
    const searchInput = document.getElementById('searchInput');

    // Validación robusta
    if (!searchInput) {
        console.error('Search input not found');
        return;
    }

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const products = document.querySelectorAll('.product-card');

        if (searchTerm === '') {
            const activeCategory = document.querySelector('.category-pill.active');
            if (activeCategory) {
                // ✨ Método moderno y robusto
                const categoryData = activeCategory.dataset.category;

                if (!categoryData) {
                    console.error('Category data not found on pill');
                    return;
                }

                showCategory(categoryData, activeCategory);
            }
            return;
        }

        // Búsqueda sin cambios
        products.forEach(product => {
            const title = product.querySelector('.product-title')?.textContent.toLowerCase() || '';
            const description = product.querySelector('.product-description')?.textContent.toLowerCase() || '';
            const category = product.querySelector('.product-category')?.textContent.toLowerCase() || '';
            const specs = Array.from(product.querySelectorAll('.spec-chip'))
                .map(chip => chip.textContent.toLowerCase())
                .join(' ');

            const isMatch = title.includes(searchTerm) ||
                        description.includes(searchTerm) ||
                        category.includes(searchTerm) ||
                        specs.includes(searchTerm);

            product.style.display = isMatch ? 'block' : 'none';
        });
    });
}

// Event delegation para botones de producto
function setupProductButtons() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('product-cta')) {
            const productName = e.target.dataset.product;
            if (productName) {
                contactSistemasP(productName);
            }
        }
    });
}

// Init
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    setupSearch();
    setupProductButtons();
});
