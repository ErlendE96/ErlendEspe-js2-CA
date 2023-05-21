import { API_BASE_URL } from '../js/constants/constants.js';

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  registerForm.addEventListener('submit', registerUser);

  async function registerUser(event) {
    event.preventDefault();

    const nameInput = document.getElementById('registerName');
    const emailInput = document.getElementById('registerEmail');
    const passwordInput = document.getElementById('registerPassword');
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const user = { name, email, password };

    try {
      const response = await fetch(`${API_BASE_URL}/social/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const json = await response.json();
      console.log(json);

      if (response.ok) {
        window.location.href = '/'; 
      } else {
        const error = json.errors[0]; 
        console.log('Registration error:', error);
      }
    } catch (error) {
      console.log('Registration error:', error);
    }
  }
});
