// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const headerRight = document.querySelector('.header-right');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    headerRight.classList.toggle('active');
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        if(this.getAttribute('href') !== '#') {
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }
        if(headerRight.classList.contains('active')) {
            headerRight.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// Sticky header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 50);
});

// Price ticker simulation
function updatePriceTicker() {
    const priceElement = document.querySelector('.price');
    const changeElement = document.querySelector('.change');
    
    const currentPrice = parseFloat(priceElement.textContent.replace('$', ''));
    const changePercent = (Math.random() * 4 - 2).toFixed(2);
    const newPrice = (currentPrice * (1 + changePercent / 100)).toFixed(4);
    
    priceElement.textContent = `$${newPrice}`;
    changeElement.textContent = `${changePercent > 0 ? '+' : ''}${changePercent}%`;
    changeElement.className = `change ${changePercent > 0 ? 'positive' : 'negative'}`;
}

setInterval(updatePriceTicker, 5000);

// Coin animation
const coinVisual = document.querySelector('.coin-visual');
if(coinVisual) {
    coinVisual.addEventListener('mouseenter', () => {
        coinVisual.style.animation = 'rotate-coin 3s infinite linear';
    });
    
    coinVisual.addEventListener('mouseleave', () => {
        coinVisual.style.animation = 'rotate-coin 20s infinite linear';
    });
}

// Добавьте этот код в script.js
document.addEventListener('DOMContentLoaded', () => {
    // Закрытие меню при клике вне его области
    document.addEventListener('click', (e) => {
        const isClickInsideMenu = headerRight.contains(e.target) || menuToggle.contains(e.target);
        
        if (!isClickInsideMenu && headerRight.classList.contains('active')) {
            headerRight.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
    
    // Предотвращение скролла при открытом меню
    const body = document.body;
    menuToggle.addEventListener('click', () => {
        if (headerRight.classList.contains('active')) {
            body.style.overflow = 'auto';
        } else {
            body.style.overflow = 'hidden';
        }
    });
    
    // Оптимизация для touch-устройств
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('touchstart', () => {
            link.style.transform = 'scale(0.98)';
        });
        link.addEventListener('touchend', () => {
            link.style.transform = '';
        });
    });
});