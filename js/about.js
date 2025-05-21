document.addEventListener('DOMContentLoaded', function() {
    // Анимация для элементов roadmap при прокрутке
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    
    // Функция для проверки видимости элемента в окне просмотра
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Функция для анимации видимых элементов
    function animateVisibleElements() {
        roadmapItems.forEach(item => {
            if (isElementInViewport(item)) {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }
        });
    }
    
    // Изначально скрываем все элементы roadmap
    roadmapItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'opacity 0.8s, transform 0.8s';
    });
    
    // Анимируем элементы при загрузке страницы
    animateVisibleElements();
    
    // Анимируем элементы при прокрутке
    window.addEventListener('scroll', animateVisibleElements);
    
    // Плавная прокрутка к разделам при клике на ссылки
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Проверяем, что у нас есть якорь и соответствующий элемент
            if (targetId !== '#' && document.querySelector(targetId)) {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                const headerOffset = 100; // Отступ от верха страницы
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Эффект hover для карточек команды
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.08)';
        });
    });
    
    // Интерактивные точки в roadmap
    const roadmapPoints = document.querySelectorAll('.roadmap-point');
    
    roadmapPoints.forEach(point => {
        point.addEventListener('click', function() {
            // Находим родительский элемент roadmap-item
            const parentItem = this.closest('.roadmap-item');
            
            // Находим содержимое родительского элемента
            const content = parentItem.querySelector('.roadmap-content');
            
            // Добавляем/удаляем класс active для выделения текущего пункта
            parentItem.classList.toggle('active');
            
            // Визуальное выделение активного пункта
            if (parentItem.classList.contains('active')) {
                content.style.borderLeft = '5px solid #2b7b2b';
                content.style.backgroundColor = '#f0f7e6';
                this.style.backgroundColor = '#2b7b2b';
            } else {
                content.style.borderLeft = '5px solid #4CAF50';
                content.style.backgroundColor = 'white';
                this.style.backgroundColor = '#4CAF50';
            }
        });
    });
    
    // Обработка клика на кнопку "Связаться с нами"
    const contactButton = document.querySelector('.collaboration .btn');
    
    if (contactButton) {
        contactButton.addEventListener('click', function(e) {
            // Уже есть ссылка на contacts.html, но можно добавить дополнительную логику
            console.log('Переход на страницу контактов');
            
            // Здесь можно добавить какую-то анимацию или другие эффекты
            this.classList.add('btn-clicked');
            
            // Убираем класс после завершения анимации
            setTimeout(() => {
                this.classList.remove('btn-clicked');
            }, 300);
        });
    }
    
    // Добавление эффекта масштабирования для изображений при наведении
    const aboutImage = document.querySelector('.about-image');
    
    if (aboutImage) {
        aboutImage.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.05)';
            }
        });
        
        aboutImage.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    }
});