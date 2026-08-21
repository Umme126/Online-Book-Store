// ==========================================
// ANIMATED COUNTERS
// ==========================================

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 100;

    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let count = 0;
        
        // Extract numeric value from text like "50K+" or "100K+"
        const numericTarget = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = numericTarget / speed;

        const updateCounter = () => {
            count += increment;
            if (count < numericTarget) {
                counter.textContent = Math.ceil(count) + counter.textContent.replace(/\d+/g, '');
                setTimeout(updateCounter, 30);
            } else {
                counter.textContent = counter.textContent.replace(/\d+/, numericTarget);
            }
        };

        updateCounter();
    });
}

// Trigger counter animation when section is visible
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};

const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('hero')) {
            animateCounters();
            countObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.hero').forEach(section => {
    countObserver.observe(section);
});

// ==========================================
// PARALLAX SCROLLING EFFECT
// ==========================================

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    
    // Parallax for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroImage = hero.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    }
});

// ==========================================
// MOUSE FOLLOW EFFECT FOR HERO
// ==========================================

const heroElement = document.querySelector('.hero');
if (heroElement) {
    document.addEventListener('mousemove', (e) => {
        const circles = heroElement.querySelectorAll('.hero-circle-1, .hero-circle-2, .hero-circle-3');
        const x = (e.clientX - heroElement.offsetLeft) * 0.1;
        const y = (e.clientY - heroElement.offsetTop) * 0.1;

        circles.forEach((circle, index) => {
            circle.style.transform = `translate(${x * (index + 1) * 0.5}px, ${y * (index + 1) * 0.5}px)`;
        });
    });
}

function smoothScroll(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ==========================================
// HAMBURGER MENU FUNCTIONALITY
// ==========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle hamburger menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ==========================================
// PRODUCT FILTER FUNCTIONALITY
// ==========================================

const filterButtons = document.querySelectorAll('.filter-btn');
const bookCards = document.querySelectorAll('.book-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        // Filter books
        bookCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 10);
            } else {
                const cardCategory = card.getAttribute('data-category');
                if (cardCategory === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// Add transition for smooth fade effect
bookCards.forEach(card => {
    card.style.transition = 'opacity 0.3s ease';
    card.style.opacity = '1';
});

// ==========================================
// ADD TO CART FUNCTIONALITY
// ==========================================

const addToCartButtons = document.querySelectorAll('.add-to-cart');
let cartCount = 0;

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const bookCard = e.target.closest('.book-card');
        const bookTitle = bookCard.querySelector('h3').textContent;
        const bookPrice = bookCard.querySelector('.price').textContent;

        // Show success message
        const originalText = button.textContent;
        button.textContent = '✓ Added!';
        button.style.backgroundColor = 'var(--success-color)';

        // Reset button after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 2000);

        // Increment cart count
        cartCount++;
        console.log(`Added "${bookTitle}" (${bookPrice}) to cart. Total items: ${cartCount}`);

        // Create and show toast notification
        showToast(`${bookTitle} added to cart!`);
    });
});

// ==========================================
// TOAST NOTIFICATION FUNCTION
// ==========================================

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.textContent = message;
    
    const backgroundColor = type === 'error' ? 'var(--error-color)' : 'var(--success-color)';
    
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: ${backgroundColor};
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        font-weight: bold;
        z-index: 10000;
        animation: slideInUp 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100px);
            opacity: 0;
        }
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 215, 0, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    @keyframes cardPop {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-5px);
        }
    }
    @keyframes itemScale {
        from {
            transform: scale(1);
        }
        to {
            transform: scale(1.05);
        }
    }
    .book-card:active {
        transform: scale(0.98);
    }
`;
document.head.appendChild(style);

// ==========================================
// FORM VALIDATION - CONTACT FORM
// ==========================================

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

// Password strength meter and toggle elements
const passwordStrengthBar = document.getElementById('passwordStrengthBar');
const passwordStrengthText = document.getElementById('passwordStrengthText');
const togglePassword = document.getElementById('togglePassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    const feedback = [];

    if (password.length >= 8) strength++;
    else feedback.push('At least 8 characters');

    if (/[a-z]/.test(password)) strength++;
    else feedback.push('Lowercase letter');

    if (/[A-Z]/.test(password)) strength++;
    else feedback.push('Uppercase letter');

    if (/[0-9]/.test(password)) strength++;
    else feedback.push('Number');

    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    else feedback.push('Special character');

    return { strength, feedback };
}

// Update password strength meter
function updatePasswordStrength(password) {
    if (!password) {
        passwordStrengthBar.style.width = '0%';
        passwordStrengthBar.style.backgroundColor = 'transparent';
        passwordStrengthText.textContent = '';
        return;
    }

    const { strength, feedback } = checkPasswordStrength(password);
    const percentage = (strength / 5) * 100;

    passwordStrengthBar.style.width = percentage + '%';

    if (strength <= 1) {
        passwordStrengthBar.style.backgroundColor = '#e74c3c';
        passwordStrengthText.textContent = 'Weak - Add: ' + feedback.join(', ');
        passwordStrengthText.style.color = '#e74c3c';
    } else if (strength === 2) {
        passwordStrengthBar.style.backgroundColor = '#f39c12';
        passwordStrengthText.textContent = 'Fair - Add: ' + feedback.join(', ');
        passwordStrengthText.style.color = '#f39c12';
    } else if (strength === 3) {
        passwordStrengthBar.style.backgroundColor = '#f1c40f';
        passwordStrengthText.textContent = 'Good - Add: ' + feedback.join(', ');
        passwordStrengthText.style.color = '#f1c40f';
    } else if (strength === 4) {
        passwordStrengthBar.style.backgroundColor = '#3498db';
        passwordStrengthText.textContent = 'Strong';
        passwordStrengthText.style.color = '#3498db';
    } else {
        passwordStrengthBar.style.backgroundColor = '#27ae60';
        passwordStrengthText.textContent = 'Very Strong';
        passwordStrengthText.style.color = '#27ae60';
    }
}

// Toggle password visibility
togglePassword.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    togglePassword.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
});

toggleConfirmPassword.addEventListener('click', () => {
    const type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
    confirmPasswordInput.type = type;
    toggleConfirmPassword.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
});

// Update strength meter as user types
passwordInput.addEventListener('input', () => {
    updatePasswordStrength(passwordInput.value);
});

// Validation rules
const validationRules = {
    name: {
        element: nameInput,
        errorElement: document.getElementById('nameError'),
        validate: (value) => {
            if (!value.trim()) {
                return { valid: false, message: 'Name is required' };
            }
            if (value.trim().length < 2) {
                return { valid: false, message: 'Name must be at least 2 characters' };
            }
            if (!/^[a-zA-Z\s]+$/.test(value)) {
                return { valid: false, message: 'Name can only contain letters and spaces' };
            }
            return { valid: true };
        }
    },
    email: {
        element: emailInput,
        errorElement: document.getElementById('emailError'),
        validate: (value) => {
            if (!value.trim()) {
                return { valid: false, message: 'Email is required' };
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return { valid: false, message: 'Please enter a valid email address' };
            }
            return { valid: true };
        }
    },
    phone: {
        element: phoneInput,
        errorElement: document.getElementById('phoneError'),
        validate: (value) => {
            if (value.trim() === '') {
                return { valid: true }; // Optional field
            }
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value)) {
                return { valid: false, message: 'Please enter a valid phone number' };
            }
            if (value.replace(/\D/g, '').length < 10) {
                return { valid: false, message: 'Phone number must have at least 10 digits' };
            }
            return { valid: true };
        }
    },
    password: {
        element: passwordInput,
        errorElement: document.getElementById('passwordError'),
        validate: (value) => {
            if (!value) {
                return { valid: false, message: 'Password is required' };
            }
            if (value.length < 8) {
                return { valid: false, message: 'Password must be at least 8 characters' };
            }
            if (!/[a-z]/.test(value)) {
                return { valid: false, message: 'Password must contain a lowercase letter' };
            }
            if (!/[A-Z]/.test(value)) {
                return { valid: false, message: 'Password must contain an uppercase letter' };
            }
            if (!/[0-9]/.test(value)) {
                return { valid: false, message: 'Password must contain a number' };
            }
            if (!/[^a-zA-Z0-9]/.test(value)) {
                return { valid: false, message: 'Password must contain a special character (!@#$%^&*)' };
            }
            return { valid: true };
        }
    },
    confirmPassword: {
        element: confirmPasswordInput,
        errorElement: document.getElementById('confirmPasswordError'),
        validate: (value) => {
            if (!value) {
                return { valid: false, message: 'Please confirm your password' };
            }
            if (value !== passwordInput.value) {
                return { valid: false, message: 'Passwords do not match' };
            }
            return { valid: true };
        }
    },
    subject: {
        element: subjectInput,
        errorElement: document.getElementById('subjectError'),
        validate: (value) => {
            if (!value.trim()) {
                return { valid: false, message: 'Subject is required' };
            }
            if (value.trim().length < 5) {
                return { valid: false, message: 'Subject must be at least 5 characters' };
            }
            return { valid: true };
        }
    },
    message: {
        element: messageInput,
        errorElement: document.getElementById('messageError'),
        validate: (value) => {
            if (!value.trim()) {
                return { valid: false, message: 'Message is required' };
            }
            if (value.trim().length < 10) {
                return { valid: false, message: 'Message must be at least 10 characters' };
            }
            return { valid: true };
        }
    }
};

// Real-time validation
Object.keys(validationRules).forEach(key => {
    const rule = validationRules[key];
    rule.element.addEventListener('blur', () => {
        validateField(key);
    });
    rule.element.addEventListener('input', () => {
        if (rule.element.classList.contains('error')) {
            validateField(key);
        }
    });
});

// Revalidate confirm password when password changes
passwordInput.addEventListener('input', () => {
    if (confirmPasswordInput.value && confirmPasswordInput.classList.contains('error')) {
        validateField('confirmPassword');
    }
});

// Validate single field
function validateField(fieldName) {
    const rule = validationRules[fieldName];
    const value = rule.element.value;
    const result = rule.validate(value);

    if (!result.valid) {
        rule.element.classList.add('error');
        rule.errorElement.textContent = result.message;
        rule.errorElement.classList.add('show');
        return false;
    } else {
        rule.element.classList.remove('error');
        rule.errorElement.textContent = '';
        rule.errorElement.classList.remove('show');
        return true;
    }
}

// Validate all fields
function validateAllFields() {
    let isValid = true;
    Object.keys(validationRules).forEach(key => {
        if (!validateField(key)) {
            isValid = false;
        }
    });
    return isValid;
}

// Form submission - Send to Backend
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateAllFields()) {
        // Prepare form data
        const formData = {
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            subject: subjectInput.value,
            message: messageInput.value
        };

        console.log('Sending form data to backend:', formData);

        // Send to backend API
        fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Backend response:', data);

            if (data.success) {
                // Show success message
                const successMessage = document.getElementById('formSuccess');
                successMessage.style.display = 'block';

                // Reset form
                contactForm.reset();

                // Reset password visibility
                passwordInput.type = 'password';
                confirmPasswordInput.type = 'password';
                togglePassword.innerHTML = '<i class="fas fa-eye"></i>';
                toggleConfirmPassword.innerHTML = '<i class="fas fa-eye"></i>';

                // Reset password strength meter
                updatePasswordStrength('');

                // Clear error classes
                Object.keys(validationRules).forEach(key => {
                    validationRules[key].element.classList.remove('error');
                    validationRules[key].errorElement.classList.remove('show');
                });

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);

                // Show toast
                showToast('Thank you! Your information has been saved successfully.');
            } else {
                showToast('Error: ' + (data.message || 'Failed to save contact information'), 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showToast('Error connecting to server. Please make sure the backend is running.', 'error');
        });
    } else {
        showToast('Please fix the errors in the form', 'error');
    }
});



// ==========================================
// SCROLL ANIMATIONS
// ==========================================

const observerOptionsScroll = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observerScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptionsScroll);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observerScroll.observe(section);
});

// ==========================================
// ACTIVE NAVIGATION LINK
// ==========================================

window.addEventListener('scroll', () => {
    let current = '';

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: var(--secondary-color);
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'flex';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopButton.addEventListener('mouseenter', () => {
    backToTopButton.style.backgroundColor = 'var(--primary-color)';
    backToTopButton.style.transform = 'scale(1.1)';
});

backToTopButton.addEventListener('mouseleave', () => {
    backToTopButton.style.backgroundColor = 'var(--secondary-color)';
    backToTopButton.style.transform = 'scale(1)';
});

// ==========================================
// INTERACTIVE CARD EFFECTS
// ==========================================

// Add ripple effect to author cards
const authorCards = document.querySelectorAll('.author-card');
authorCards.forEach(card => {
    card.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.className = 'ripple';

        card.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple effect to testimonial cards
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.animation = 'cardPop 0.3s ease';
    });
});

// Add animation for gallery items on hover
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.animation = 'itemScale 0.4s ease';
    });
});

// ==========================================
// PAGE LOAD ANIMATION
// ==========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log('%cWelcome to BookStore!', 'color: #8B4513; font-size: 20px; font-weight: bold;');
console.log('Thank you for visiting our online book store. Enjoy exploring our collection!');
console.log('Cart Items:', cartCount);

// Store enhanced toast notification function with error support
window.showToast = function(message, type = 'success') {
    const toast = document.createElement('div');
    toast.textContent = message;

    const bgColor = type === 'error' ? '#e74c3c' : '#27ae60';
    const icon = type === 'error' ? '✗' : '✓';

    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: ${bgColor};
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        font-weight: bold;
        z-index: 10000;
        animation: slideInUp 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
};
