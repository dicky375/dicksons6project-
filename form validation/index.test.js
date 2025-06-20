// index.js
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
password.addEventListener('input', (e) => {
    updatePasswordSuggestions(e.target.value, 'password-suggestions');
});
confirmPassword.addEventListener('input', (e) => {
    updatePasswordSuggestions(e.target.value, 'confirm-password-suggestions');
});

// Update the validateInputs function's password section
const validateInputs = () => {
    // ... existing username and email validation ...

    if(passwordValue === '') {
        setError(password, 'Password is required');
        updatePasswordSuggestions(passwordValue, 'password-suggestions');
    } else if (!isStrongPassword(passwordValue)) {
        setError(password, 'Password must meet all criteria');
        updatePasswordSuggestions(passwordValue, 'password-suggestions');
    } else {
        setSuccess(password);
        updatePasswordSuggestions(passwordValue, 'password-suggestions');
    }
 if(confirmPasswordValue === '') {
        setError(confirmPassword, 'Please confirm your password');
        updatePasswordSuggestions(confirmPasswordValue, 'confirm-password-suggestions');
    } else if (confirmPasswordValue !== passwordValue) {
        setError(confirmPassword, 'Passwords do not match');
        updatePasswordSuggestions(confirmPasswordValue, 'confirm-password-suggestions');
    } else {
        setSuccess(confirmPassword);
        updatePasswordSuggestions(confirmPasswordValue, 'confirm-password-suggestions');
    }
    // ... existing confirm password validation ...
};

const updatePasswordSuggestions = (password, elementId) => {
    const suggestions = document.getElementById(elementId);
    if (!suggestions) return;
    suggestions.innerHTML = `
        <ul>
            <li class="${password.length >= 8 ? 'valid' : 'invalid'}">
                �${password.length >= 8 ? '✓' : '✗'} At least 8 characters
            </li>
            <li class="${hasUpperCase(password) ? 'valid' : 'invalid'}">
                ✓${hasUpperCase(password) ? '✓' : '✗'} At least one uppercase letter
            </li>
            <li class="${hasLowerCase(password) ? 'valid' : 'invalid'}">
                ✓${hasLowerCase(password) ? '✓' : '✗'} At least one lowercase letter
            </li>
            <li class="${hasNumber(password) ? 'valid' : 'invalid'}">
                ✓${hasNumber(password) ? '✓' : '✗'} At least one number
            </li>
            <li class="${hasSpecialChar(password) ? 'valid' : 'invalid'}">
                ✓${hasSpecialChar(password) ? '✓' : '✗'} At least one special character
            </li>
        </ul>
    `;
};
