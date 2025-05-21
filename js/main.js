// Ждем, пока документ загрузится полностью
document.addEventListener('DOMContentLoaded', function() {
    // Плавный скролл для навигации
    setupSmoothScroll();
    
    // Анимация при прокрутке
    setupScrollAnimation();
    
    // Проверка видео на фоне
    checkVideoBackground();
});

// Настройка плавного скролла
function setupSmoothScroll() {
    // Получаем все якорные ссылки
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    // Добавляем обработчик событий для каждой ссылки
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Предотвращаем стандартное поведение ссылки
            e.preventDefault();
            
            // Получаем идентификатор целевого элемента
            const targetId = this.getAttribute('href');
            
            // Проверяем, не является ли ссылка просто якорем
            if (targetId === '#') return;
            
            // Получаем целевой элемент
            const targetElement = document.querySelector(targetId);
            
            // Проверяем, существует ли целевой элемент
            if (targetElement) {
                // Плавно прокручиваем до целевого элемента
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Настройка анимации при прокрутке
function setupScrollAnimation() {
    // Все элементы, которые нужно анимировать при прокрутке
    const animatedElements = document.querySelectorAll('.category-card, .fact-container, .cta');
    
    // Опции для IntersectionObserver
    const options = {
        root: null, // используем viewport как корневой элемент
        rootMargin: '0px',
        threshold: 0.1 // срабатывает, когда 10% элемента видно
    };
    
    // Создаем новый IntersectionObserver
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Если элемент виден
            if (entry.isIntersecting) {
                // Добавляем класс для запуска анимации
                entry.target.classList.add('visible');
                // Прекращаем наблюдение за этим элементом
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Начинаем наблюдение за всеми элементами
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Проверка видео фона
function checkVideoBackground() {
    const video = document.querySelector('.hero-video');
    
    // Если видео существует
    if (video) {
        // Обработка ошибки загрузки видео
        video.addEventListener('error', () => {
            console.log('Ошибка загрузки видео. Используется запасное изображение.');
            
            // Скрываем видео
            video.style.display = 'none';
            
            // Создаем запасное изображение, если его еще нет
            let fallbackImage = video.querySelector('img');
            if (!fallbackImage) {
                fallbackImage = document.createElement('img');
                fallbackImage.src = 'images/backgrounds/nature-background.jpg';
                fallbackImage.alt = 'Природа Донецкого края';
                video.parentNode.insertBefore(fallbackImage, video);
            }
            
            // Применяем стили к запасному изображению
            fallbackImage.style.display = 'block';
            fallbackImage.style.position = 'absolute';
            fallbackImage.style.top = '0';
            fallbackImage.style.left = '0';
            fallbackImage.style.width = '100%';
            fallbackImage.style.height = '100%';
            fallbackImage.style.objectFit = 'cover';
        });
        
        // Проверяем, если видео не может воспроизводиться
        if (video.readyState === 0) {
            // Проверяем доступность видео после небольшой задержки
            setTimeout(() => {
                if (video.readyState === 0) {
                    console.log('Видео не может быть загружено. Отображаем запасное изображение.');
                    // Вызываем принудительно событие ошибки
                    const errorEvent = new Event('error');
                    video.dispatchEvent(errorEvent);
                }
            }, 2000);
        }
    }
}

// Предзагрузка изображений для улучшения производительности
function preloadImages() {
    // Массив с путями к изображениям, которые нужно предзагрузить
    const imagePaths = [
        'images/backgrounds/flora-bg.jpg',
        'images/backgrounds/fauna-bg.jpg',
        'images/backgrounds/landscapes-bg.jpg',
        'images/backgrounds/reserves-bg.jpg',
        'images/backgrounds/quiz-bg.jpg',
        'images/backgrounds/nature-background.jpg'
    ];
    
    // Создаем изображения для предзагрузки
    imagePaths.forEach(path => {
        const img = new Image();
        img.src = path;
    });
}

// Запускаем предзагрузку изображений после загрузки страницы
window.addEventListener('load', preloadImages);

// Добавляем класс видимости к элементам при загрузке, если они видны сразу
window.addEventListener('load', function() {
    // Небольшая задержка для корректной работы после полной загрузки страницы
    setTimeout(() => {
        const elementsInViewport = document.querySelectorAll('.category-card, .fact-container, .cta');
        
        elementsInViewport.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            if (rect.top <= windowHeight && rect.bottom >= 0) {
                element.classList.add('visible');
            }
        });
    }, 300);
});

// Обработка проигрывания видео на мобильных устройствах
function handleMobileVideo() {
    const video = document.querySelector('.hero-video');
    
    if (video && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Для мобильных устройств добавляем атрибут playsinline
        video.setAttribute('playsinline', '');
        
        // Пытаемся запустить видео после взаимодействия пользователя
        document.addEventListener('touchstart', function videoStart() {
            video.play();
            document.removeEventListener('touchstart', videoStart);
        }, {once: true});
    }
}

// Запускаем обработку видео для мобильных устройств
document.addEventListener('DOMContentLoaded', handleMobileVideo);
