// 1. DOM Elements
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

// 2. Helper Functions
const hasUpperCase = (str) => /[A-Z]/.test(str);
const hasLowerCase = (str) => /[a-z]/.test(str);
const hasNumber = (str) => /\d/.test(str);
const hasSpecialChar = (str) => /[!@#$%^&*(),.?":{}|<>]/.test(str);
const isValidEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const isStrongPassword = (password) => {
    return password.length >= 8 &&
           hasUpperCase(password) &&
           hasLowerCase(password) &&
           hasNumber(password) &&
           hasSpecialChar(password);
};
// 3. Validation State Functions
const setError = (element, message) => {
    const inputControl = element.closest('.input-control');

    if (!inputControl) return;

    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.remove('success');
    inputControl.classList.add('error');
};
const setSuccess = (element) => {
    const inputControl = element.closest('.input-control');
 if( !inputControl) return;
     const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.remove('error');
    inputControl.classList.add('success');
};
const validateEmail = (emailValue) => {
    const inputControl = email.closest('.input-control');
    const errorDisplay = inputControl.querySelectorAll('.error');
    if(emailValue ==='') {
        setError(email, 'Email is required');
        inputControl.classList.remove('success');
        inputControl.classList.add('error');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        inputControl.classList.remove('success');
        inputControl.classList.add('error');
    }else{
        setSuccess(email);
        inputControl.classList.remove('error');
        inputControl.classList.add('success');
    }
};
const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    // Username validation
    if(usernameValue === '') {
        setError(username, 'Username is required');
    } else {
        setSuccess(username);
    }

    // Email validation
    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }
     // Password validation
    validatePasswords(passwordValue, confirmPasswordValue);
};
const validatePasswords = (passwordValue, confirmPasswordValue) => {
    // Validate main password
    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if (!isStrongPassword(passwordValue)) {
        setError(password, 'Password must meet all criteria');
        return false;
    } else {
        setSuccess(password);
    }
      // Validate confirm password
    if(confirmPasswordValue === '') {
        setError(confirmPassword, 'Please confirm your password');
        return false;
    } else if (confirmPasswordValue !== passwordValue) {
        setError(confirmPassword, 'Passwords do not match');
    } else if (isStrongPassword(passwordValue)) {
        setSuccess(confirmPassword);
        return true;
    }
};


// 5. UI Update Functions
const updatePasswordSuggestions = (password, elementId) => {
    const suggestions = document.getElementById(elementId);
    if (!suggestions) return;

    suggestions.innerHTML = `
        <ul>
            <li class="${password.length >= 8 ? 'valid' : 'invalid'}">
                ${password.length >= 8 ? '✓' : '✗'} At least 8 characters
            </li>
            <li class="${hasUpperCase(password) ? 'valid' : 'invalid'}">
                ${hasUpperCase(password) ? '✓' : '✗'} At least one uppercase letter
            </li>
            <li class="${hasLowerCase(password) ? 'valid' : 'invalid'}">
                ${hasLowerCase(password) ? '✓' : '✗'} At least one lowercase letter
            </li>
            <li class="${hasNumber(password) ? 'valid' : 'invalid'}">
                ${hasNumber(password) ? '✓' : '✗'} At least one number
            </li>
             <li class="${hasSpecialChar(password) ? 'valid' : 'invalid'}">
                ${hasSpecialChar(password) ? '✓' : '✗'} At least one special character
            </li>
        </ul>
    `;
};

// 6. Event Listeners
password.addEventListener('input', (e) => {
    const passwordValue = e.target.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();
    updatePasswordSuggestions(passwordValue, 'password-suggestions');
    validatePasswords(passwordValue, confirmPasswordValue);
});

confirmPassword.addEventListener('input', (e) => {
    const confirmPasswordValue = e.target.value.trim();
    const passwordValue = password.value.trim();
    validatePasswords(passwordValue, confirmPasswordValue);
});

form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
});
email.addEventListener('input',(e) =>{
    const emailValue = e.target.value.trim();
    validateEmail(emailValue);
});

// 7. Toggle Password Visibility
function togglePasswordVisibility(inputId) {
    const passwordField = document.getElementById(inputId);
    const icon = passwordField.nextElementSibling.querySelector('i');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    } else {
        passwordField.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
}