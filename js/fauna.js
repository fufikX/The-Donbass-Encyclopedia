// JavaScript для страницы фауны

document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления карточек животных при прокрутке
    const animalCards = document.querySelectorAll('.animal-card');
    
    // Функция для проверки, находится ли элемент в области видимости
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Функция для запуска анимации, если элемент в зоне видимости
    function checkVisibility() {
        animalCards.forEach(card => {
            if (isElementInViewport(card)) {
                card.style.animationPlayState = 'running';
            }
        });
    }
    
    // Изначально устанавливаем анимацию на паузу
    animalCards.forEach(card => {
        card.style.animationPlayState = 'paused';
    });
    
    // Проверяем видимость при загрузке и при прокрутке
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    
    // Слайдер для блока "Знаете ли вы?"
    const factsSlider = document.querySelector('.facts-slider');
    const factSlides = document.querySelectorAll('.fact-slide');
    let currentSlideIndex = 0;
    let sliderInterval;
    
    if (factsSlider && factSlides.length > 0) {
        // Функция для автоматического пролистывания слайдов
        function autoScrollSlider() {
            currentSlideIndex = (currentSlideIndex + 1) % factSlides.length;
            factsSlider.scrollTo({
                left: factSlides[currentSlideIndex].offsetLeft - factsSlider.offsetLeft,
                behavior: 'smooth'
            });
        }
        
        // Запускаем автоматическое пролистывание каждые 5 секунд
        sliderInterval = setInterval(autoScrollSlider, 5000);
        
        // Останавливаем автоматическое пролистывание при наведении
        factsSlider.addEventListener('mouseenter', () => {
            clearInterval(sliderInterval);
        });
        
        // Возобновляем автоматическое пролистывание при убирании курсора
        factsSlider.addEventListener('mouseleave', () => {
            clearInterval(sliderInterval);
            sliderInterval = setInterval(autoScrollSlider, 5000);
        });
    }
    
    // Анимация при наведении на изображения в секции введения
    const introImage = document.querySelector('.intro-image');
    if (introImage) {
        introImage.addEventListener('mouseenter', () => {
            introImage.querySelector('img').style.transform = 'scale(1.05)';
        });
        
        introImage.addEventListener('mouseleave', () => {
            introImage.querySelector('img').style.transform = 'scale(1)';
        });
    }
    
    // Плавная прокрутка для внутренних ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Анимация для карточек групп животных
    const groupCards = document.querySelectorAll('.group-card');
    
    groupCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.group-icon').style.transform = 'rotate(10deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.group-icon').style.transform = 'rotate(0deg)';
        });
    });
    
    // Анимация для иконок фактов
    document.querySelectorAll('.fact-slide').forEach(slide => {
        slide.addEventListener('mouseenter', () => {
            slide.querySelector('.fact-icon').style.transform = 'rotate(10deg)';
        });
        
        slide.addEventListener('mouseleave', () => {
            slide.querySelector('.fact-icon').style.transform = 'rotate(0deg)';
        });
    });
    
    // Добавляем интерактивность для карточек животных
    animalCards.forEach(card => {
        card.addEventListener('click', function() {
            // Можно добавить анимацию при клике или другие действия
            // Например, показывать дополнительные данные о животном
            this.classList.toggle('expanded');
        });
    });
});