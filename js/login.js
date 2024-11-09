let users = JSON.parse(localStorage.getItem('users')) || [];
let loggedInUser  = JSON.parse(localStorage.getItem('loggedInUser ')) || null;

// Mostrar productos y ocultar botones de compra basado en el status del login
function updateProductVisibility() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart, .cantidad');
    if (loggedInUser ) {
        addToCartButtons.forEach(button => button.style.display = 'inline-block');
        document.getElementById('logout-button').style.display = 'inline-block'; // mostrar boton de logout 
    } else {
        addToCartButtons.forEach(button => button.style.display = 'none');
        document.getElementById('logout-button').style.display = 'none'; // ocultar boton de logout
    }
}

// Visibilidad de login
document.getElementById('toggle-login').addEventListener('click', () => {
    const loginForm = document.getElementById('login-form');
    if (loggedInUser ) {
        // Si el usuario está logueado, no se muestra el formulario
        showNotification('Ya estás logueado'); 
    } else {
        loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    }
});

// Mostrar notificación
function showNotification(message) {
    const notificationBar = document.getElementById('notification-bar');
    notificationBar.innerText = message;
    notificationBar.style.display = 'block';

    setTimeout(() => {
        notificationBar.style.display = 'none';
    }, 2000);
}

// Login
document.getElementById('login-button').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        loggedInUser  = user;
        localStorage.setItem('loggedInUser ', JSON.stringify(loggedInUser )); // Save user to localStorage
        showNotification('Inicio de sesión exitoso');
        updateProductVisibility();
        document.getElementById('login-form').style.display = 'none'; // Hide login form after successful login
    } else {
        showNotification('Credenciales incorrectas');
    }
});

// Registro
document.getElementById('register-button').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (users.find(u => u.username === username)) {
        showNotification('El usuario ya existe');
    } else {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        showNotification('Usuario creado exitosamente');
    }
});

// Logout
function logout() {
    loggedInUser  = null;
    localStorage.removeItem('loggedInUser '); // Remover usuario de localStorage
    document.getElementById('logout-button').style.display = 'none'; // ocultar boton de logout
    document.getElementById('login-form').style.display = 'none'; // ocultar formulario de login cuando se cierra sesion
    updateProductVisibility(); // Actualizar visualización del producto
    showNotification('Has cerrado sesión exitosamente'); // Mostrar notificación de logout
}

// Event listener para el boton de logout
document.getElementById('logout-button').addEventListener('click', logout);

// Actualizar visualizacion del producto tras cargar la pagina
document.addEventListener('DOMContentLoaded', () => {
    updateProductVisibility();

    // Ocultar el login si el usuario ya inicio sesion
    if (loggedInUser ) {
        document.getElementById('login-form').style.display = 'none'; // Hide login form
        document.getElementById('logout-button').style.display = 'inline-block'; // Show logout button
    } else {
        document.getElementById('logout-button').style.display = 'none'; // Hide logout button
    }
});
