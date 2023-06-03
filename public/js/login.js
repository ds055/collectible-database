const loginFormEl = document.querySelector('#login-form');
const signupFormEl = document.querySelector('#signup-form');

const showError = (parentEl, errorText) => {
  const errorPEl = document.createElement('div');
  errorPEl.classList.add('error-element', 'text-white', 'text-center', 'font-bold', 'text-2xl');
  errorPEl.textContent = errorText;
  parentEl.appendChild(errorPEl);
};

const removeAllErrors = () => {
  const allErrors = document.querySelectorAll('.error-element');
  console.log(allErrors)
  allErrors.forEach((el) => el.remove());
};


const loginFormHandler = async (event) => {
  event.preventDefault();
  removeAllErrors();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (!email || !password) {
    showError(loginFormEl, "Please provide both an email and password.")
    return;
  }

  const bodyObj = {
    email,
    password
  }

  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(bodyObj),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const res = await response.json();
      console.log(res);
      const errorMsg = res.message;
      showError(loginFormEl, errorMsg);
      return;
    }

    document.location.replace('/dashboard');
  } catch (err) {
    console.log(err);
    showError(loginFormEl, "A login error has ocurred.")
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  removeAllErrors();

  const first_name = document.querySelector('#first-name-signup').value.trim();
  const last_name = document.querySelector('#last-name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const password_confirmation = document.querySelector('#password-signup-confirmation').value.trim();

  if (password !== password_confirmation) {
    showError(signupFormEl, "Passwords do not match.")
    return;
  }

  const bodyObj = {
    first_name,
    last_name,
    email,
    password
  }

  if (!first_name || !last_name || !email || !password) {
    console.log(bodyObj)
    showError(signupFormEl, 'Please fill out all fields.');
    return;
  }

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(bodyObj),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const res = await response.json();
      console.log(res);
      const errorMsg = res.errors[0].message;
      showError(signupFormEl, errorMsg);
      return;
    }

    document.location.replace('/home');
  } catch (err) {
    console.log(err);
    showError(signupFormEl, "A signup error has ocurred.");
  }
};

if (loginFormEl) {
  loginFormEl.addEventListener('submit', loginFormHandler);
}

if (signupFormEl) {
  signupFormEl.addEventListener('submit', signupFormHandler);
}