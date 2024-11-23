let users = JSON.parse(localStorage.getItem('users')) || [];
let loggedInUser  = JSON.parse(localStorage.getItem('loggedInUser ')) || null; // Removed extra space

//Actualiza visibilidad de producto según el estado de inicio de sesión
function updateProductVisibility() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart, .cantidad');
    if (loggedInUser ) {
        addToCartButtons.forEach(button => button.style.display = 'inline-block');
        document.getElementById('logout-button').style.display = 'inline-block'; // Show logout button 
    } else {
        addToCartButtons.forEach(button => button.style.display = 'none');
        document.getElementById('logout-button').style.display = 'none'; // Hide logout button
    }
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
        
        // Renderizar despues del inicio de sesión
        fetch('../products.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(products => {
                renderProducts(products);
                updateProductVisibility(); 
            })
            .catch(error => {
                console.error('Ha habido un error:', error);
            });

        document.getElementById('login-form').style.display = 'none'; 
    } else {
        showNotification('Credenciales incorrectas');
    }
});

// Renderizar productos
function renderProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; 

    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item justify-content-between align-items-center';
        
        //mostrar productos y añadir al carrito solo si esta logueado
        listItem.innerHTML = `
            <div class="align-items-center carrito">
                <div>
                    <strong>${product.nombre}</strong><br>
                    Precio: ${product.precio}$
                </div>
            </div>
            <img src="${product.image}" alt="${product.alt}" style="width: 200px; height: 200px; margin-bottom: 50px; margin-top: 20px;">
            <div>
                ${loggedInUser  ? `
                    <input type="number" class="cantidad custom-quantity" data-id="${product.id}" value="1" min="1" style="width: 40px; margin-right: 50px;">
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}" data-precio="${product.precio}">Añadir al Carrito</button>
                ` : ''}
            </div>
        `;

        productList.appendChild(listItem);
    });
}

// Visibilidad del login
document.getElementById('toggle-login').addEventListener('click', () => {
    const loginForm = document.getElementById('login-form');
    if (loggedInUser ) {
        showNotification('Ya estás logueado');
    } else {
        loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    }
});

// Notificaciones
function showNotification(message) {
    Swal.fire({
        title: message,
        timer: 2000,
        showConfirmButton: false
    });
}

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
    localStorage.removeItem('loggedInUser '); // Remove user from localStorage
    document.getElementById('logout-button').style.display = 'none'; // Hide logout button
    document.getElementById('login-form').style.display = 'none'; // Hide login form when logging out
    updateProductVisibility(); // Update product visibility
    showNotification('Has cerrado sesión exitosamente'); // Show logout notification
    setTimeout(() => {
        notificationBar.style.display = 'none';
    }, 2000);
}

// boton logout
document.getElementById('logout-button').addEventListener('click', logout);

//actualizar visibilidad de producto
document.addEventListener('DOMContentLoaded', () => {
    updateProductVisibility();
    // login oculto al iniciar
    const loginForm = document.getElementById('login-form');
    loginForm.style.display = 'none'; 
});

