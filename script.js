// Navigation highlighting - automatically set active class based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a[href]');
    
    navLinks.forEach(function(link) {
        const linkHref = link.getAttribute('href');
        
        // Check if this link points to the current page
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else if (linkHref.startsWith('#')) {
            // For anchor links, check if we're on the same page
            // Don't mark as active if it's just an anchor
        } else if (linkHref.startsWith('http')) {
            // External links - don't mark as active
        } else {
            // Remove active class from other links
            link.classList.remove('active');
        }
    });
    
    // Set active state for index.html explicitly
    if (currentPage === '' || currentPage === 'index.html') {
        const indexLink = document.querySelector('nav a[href="index.html"]');
        if (indexLink) {
            indexLink.classList.add('active');
        }
    }
});

// Form validation - prevent sending empty default values
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let hasErrors = false;
    
    inputs.forEach(function(input) {
        // Skip hidden inputs
        if (input.type === 'hidden') {
            return;
        }
        
        // Skip submit buttons
        if (input.type === 'submit' || input.tagName === 'BUTTON') {
            return;
        }
        
        // Check required fields
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.classList.add('error');
            hasErrors = true;
            return;
        }
        
        // Remove error class if field is valid
        input.classList.remove('error');
        
        // For radio buttons, check if at least one in group is selected (if required)
        if (input.type === 'radio' && input.hasAttribute('required')) {
            const radioGroup = form.querySelectorAll(`input[name="${input.name}"]`);
            const isSelected = Array.from(radioGroup).some(radio => radio.checked);
            
            if (!isSelected) {
                radioGroup.forEach(radio => radio.classList.add('error'));
                hasErrors = true;
            } else {
                radioGroup.forEach(radio => radio.classList.remove('error'));
            }
        }
        
        // For number inputs, ensure they have meaningful values (not just 0 or empty if required)
        if (input.type === 'number' && input.hasAttribute('required')) {
            const value = parseFloat(input.value);
            if (isNaN(value) || value <= 0) {
                input.classList.add('error');
                hasErrors = true;
            }
        }
        
        // Remove empty default values from optional fields before submission
        if (!input.hasAttribute('required') && input.value.trim() === '') {
            // Clear empty optional fields so they're not submitted
            if (input.type !== 'radio' && input.type !== 'checkbox') {
                input.value = '';
            }
        }
    });
    
    if (hasErrors) {
        alert('Пожалуйста, заполните все обязательные поля корректно.');
        return false;
    }
    
    // Clean up form data - remove empty optional fields
    cleanFormData(form);
    
    return true;
}

// Remove empty optional fields from form before submission
function cleanFormData(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(function(input) {
        // Skip hidden, submit, and required fields
        if (input.type === 'hidden' || 
            input.type === 'submit' || 
            input.tagName === 'BUTTON' ||
            input.hasAttribute('required')) {
            return;
        }
        
        // Remove empty text/email/tel/date inputs
        if ((input.type === 'text' || 
             input.type === 'email' || 
             input.type === 'tel' || 
             input.type === 'date' ||
             input.type === 'number' ||
             input.tagName === 'TEXTAREA') && 
            input.value.trim() === '') {
            input.disabled = true; // Disable empty optional fields so they're not submitted
        }
        
        // For checkboxes, if not checked, disable them
        if (input.type === 'checkbox' && !input.checked) {
            input.disabled = true;
        }
    });
}

// Form submission handlers
function validateContactForm(form) {
    if (!validateForm(form)) {
        return false;
    }
    
    // Additional validation for contact form
    const email = form.querySelector('[name="email"]');
    if (email && email.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            alert('Пожалуйста, введите корректный email адрес.');
            email.focus();
            return false;
        }
    }
    
    return true;
}

function validateOrderForm(form) {
    if (!validateForm(form)) {
        return false;
    }
    
    // Ensure at least one radio button is selected
    const productType = form.querySelector('input[name="product_type"]:checked');
    if (!productType) {
        alert('Пожалуйста, выберите тип продукта.');
        return false;
    }
    
    // Validate order number is positive
    const orderNumber = form.querySelector('[name="order_number"]');
    if (orderNumber && orderNumber.value) {
        const num = parseInt(orderNumber.value);
        if (isNaN(num) || num <= 0) {
            alert('Номер заказа должен быть положительным числом.');
            orderNumber.focus();
            return false;
        }
    }
    
    return true;
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});


