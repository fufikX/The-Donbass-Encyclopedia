// Дожидаемся полной загрузки DOM перед запуском скриптов
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех скриптов на странице
    initScrollAnimations();
    initContactForm();
    initTeamCardEffects();
});

/**
 * Анимации при прокрутке страницы
 */
function initScrollAnimations() {
    // Получаем все элементы, которые нужно анимировать
    const animatedElements = document.querySelectorAll('.team-member, .about-content, .form-container');
    
    // Настраиваем Observer для отслеживания элементов в видимой области
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Если элемент видим
            if (entry.isIntersecting) {
                // Сбрасываем opacity и добавляем класс для анимации
                entry.target.style.opacity = "1";
                entry.target.classList.add('animated');
                // Перестаем отслеживать элемент после того, как он появился
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // относительно viewport
        threshold: 0.2, // элемент считается видимым, когда его 20% в поле зрения
        rootMargin: '0px' // без дополнительных отступов
    });

    // Начинаем отслеживать все элементы
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Дополнительная анимация для заголовка страницы
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        setTimeout(() => {
            pageHeader.classList.add('header-animated');
        }, 300);
    }
}

/**
 * Обработка формы обратной связи с валидацией
 */
function initContactForm() {
    const form = document.getElementById('feedback-form');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Проверяем валидность формы
            if (validateForm()) {
                // Отображаем сообщение об успешной отправке
                showFormSuccess();
                // Очищаем форму
                form.reset();
            }
        });
        
        // Добавляем анимацию для полей ввода
        addFormFieldsAnimation();
    }
}

/**
 * Валидация полей формы
 */
function validateForm() {
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    // Очищаем предыдущие сообщения об ошибках
    clearErrorMessages();
    
    // Проверка имени
    if (name.value.trim() === '') {
        displayError(name, 'Пожалуйста, введите ваше имя');
        isValid = false;
    }
    
    // Проверка email
    if (email.value.trim() === '') {
        displayError(email, 'Пожалуйста, введите ваш email');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        displayError(email, 'Пожалуйста, введите корректный email адрес');
        isValid = false;
    }
    
    // Проверка темы
    if (subject.value.trim() === '') {
        displayError(subject, 'Пожалуйста, введите тему сообщения');
        isValid = false;
    }
    
    // Проверка сообщения
    if (message.value.trim() === '') {
        displayError(message, 'Пожалуйста, введите текст сообщения');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        displayError(message, 'Сообщение должно содержать не менее 10 символов');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Проверка корректности email
 */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Отображение сообщения об ошибке под полем
 */
function displayError(inputElement, errorMessage) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = errorMessage;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '13px';
    errorDiv.style.marginTop = '5px';
    errorDiv.style.animationName = 'fadeIn';
    errorDiv.style.animationDuration = '0.3s';
    
    // Добавляем красную рамку для поля с ошибкой
    inputElement.style.borderColor = '#e74c3c';
    
    // Вставляем сообщение об ошибке после поля
    inputElement.parentNode.appendChild(errorDiv);
    
    // Добавляем обработчик для удаления сообщения об ошибке при фокусе
    inputElement.addEventListener('focus', function() {
        this.style.borderColor = '#4CAF50';
        const errorMsg = this.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    });
}

/**
 * Очистка всех сообщений об ошибках
 */
function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    
    // Возвращаем стили полей к исходным
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.style.borderColor = '#ddd';
    });
}

/**
 * Отображение сообщения об успешной отправке
 */
function showFormSuccess() {
    // Создаем элемент для сообщения
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = `
        <div style="background-color: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin-top: 20px; display: flex; align-items: center;">
            <i class="fas fa-check-circle" style="font-size: 24px; margin-right: 10px;"></i>
            <span>Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.</span>
        </div>
    `;
    
    // Добавляем анимацию
    successMsg.style.animation = 'fadeInUp 0.5s forwards';
    
    // Добавляем сообщение после формы
    const form = document.getElementById('feedback-form');
    form.appendChild(successMsg);
    
    // Удаляем сообщение через 5 секунд
    setTimeout(() => {
        successMsg.style.animation = 'fadeOut 0.5s forwards';
        setTimeout(() => {
            successMsg.remove();
        }, 500);
    }, 5000);
}

/**
 * Добавление анимации для полей формы
 */
function addFormFieldsAnimation() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Анимация при фокусе
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('input-focused');
        });
        
        // Анимация при потере фокуса
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.parentNode.classList.remove('input-focused');
            }
        });
        
        // Проверяем, если поле уже содержит значение
        if (input.value.trim() !== '') {
            input.parentNode.classList.add('input-focused');
        }
    });
    
    // Добавляем стили для анимации
    const style = document.createElement('style');
    style.textContent = `
        .form-group {
            position: relative;
        }
        
        .input-focused label {
            transform: translateY(-20px) scale(0.9);
            color: #4CAF50;
        }
        
        .form-group label {
            transition: all 0.3s ease;
            transform-origin: left top;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
}

// Дополнительные декоративные анимации
document.addEventListener('DOMContentLoaded', function() {
    // Создаем эффект "плавающих листьев" в декораторе формы
    const formDecorator = document.querySelector('.form-decorator');
    if (formDecorator) {
        for (let i = 0; i < 5; i++) {
            const leaf = document.createElement('div');
            leaf.className = 'floating-leaf';
            leaf.style.position = 'absolute';
            leaf.style.width = `${Math.random() * 30 + 20}px`;
            leaf.style.height = `${Math.random() * 30 + 20}px`;
            leaf.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            leaf.style.borderRadius = '50% 50% 0 50%';
            leaf.style.transform = 'rotate(45deg)';
            leaf.style.left = `${Math.random() * 100}%`;
            leaf.style.top = `${Math.random() * 100}%`;
            leaf.style.animation = `float ${Math.random() * 5 + 5}s infinite alternate`;
            formDecorator.appendChild(leaf);
        }
        
        // Добавляем стиль для анимации листьев
        const leafStyle = document.createElement('style');
        leafStyle.textContent = `
            @keyframes float {
                0% {
                    transform: translate(0, 0) rotate(45deg);
                }
                100% {
                    transform: translate(10px, 10px) rotate(90deg);
                }
            }
        `;
        document.head.appendChild(leafStyle);
    }
});