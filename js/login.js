import { API_BASE_URL } from '../js/constants/constants.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', loginUser);

  async function loginUser(event) {
    event.preventDefault();

    const emailInput = document.getElementById('loginEmailInput');
    const passwordInput = document.getElementById('loginPasswordInput');
    const userLogin = {
      email: emailInput.value,
      password: passwordInput.value,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/social/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userLogin),
      });
      const json = await response.json();
      const accessToken = json.accessToken;
      localStorage.setItem('accessToken', accessToken);
      console.log(json);

      window.location.href = '/feed';
    } catch (error) {
      console.log(error);
    }
  }
});
