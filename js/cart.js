let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [];

// Fetch de los productos de products.json
fetch('../products.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        products = data; 
        renderProducts(products); 
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

// Render de productos en la pagina principal
function renderProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; 

    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item justify-content-between align-items-center';
        
        // Muestra el boton añadir al carrito solo si está logueado el usuario
        listItem.innerHTML = `
            <div class="align-items-center carrito">
                <div>
                    <strong>${product.nombre}</strong><br>
                    Precio: ${product.precio}$
                </div>
            </div>
            <img src="${product.image}" alt="${product.alt}" style="width: 200px; height: 200px; margin-bottom: 50px; margin-top: 20px;">
            <div>
                ${isLoggedIn ? `
                    <input type="number" class="cantidad custom-quantity" data-id="${product.id}" value="1" min="1" style="width: 40px; margin-right: 50px;">
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}" data-precio="${product.precio}">Añadir al Carrito</button>
                ` : `
   
                `}
            </div>
        `;

        productList.appendChild(listItem);
    });
}


// funcionpara añadir productos al carrito
function addToCart(productId, precio, cantidad) {
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    if (existingProductIndex > -1) {
        // Actualiza la cantidad del producto existente
        cart[existingProductIndex].cantidad += cantidad;
    } else {
        // Añade nuevo producto al carrito
        const product = products.find(p => p.id === productId);
        cart.push({ 
            id: productId, 
            precio: precio, 
            cantidad: cantidad, 
            nombre: product.nombre, 
            image: product.image, 
            alt: product.alt 
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // Guardar el carrito en LocalStorage
    showNotification('Producto añadido al carrito'); // Muestra notificación del producto añadido
    updateCartDisplay(); // Actualiza el cart display despues del producto anadido
}

function showNotification(message) {
    Swal.fire({
        title: message,
        timer: 2000,
        showConfirmButton: false
    });
}

// Event listener para añadir productos al carrito
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        const button = event.target;
        const productId = parseInt(button.getAttribute('data-id'));
        const precio = parseFloat(button.getAttribute('data-precio'));
        const cantidad = parseInt(button.previousElementSibling.value);

        addToCart(productId, precio, cantidad);
        updateCartDisplay(); // Actualiza el cart display despues de añadir al carrito
    }
});


// Actualizar cart display en la pagina cart
function updateCartDisplay() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; // Vaciar la lista del carrito
    let totalPrecio = 0;

    cart.forEach(item => {
        // Ajustar la direccion de la imagen segun la localizacion del html
        const imagePath = (window.location.pathname.includes('/pages/')) 
            ? `../assets/img/${item.image.split('/').pop()}` // si esta en pages, subir un nivel
            : `assets/img/${item.image.split('/').pop()}`; // si esta en root, usar ruta directa

        const totalItemPrecio = item.precio * item.cantidad; // calcula el precio total por el producto
        totalPrecio += totalItemPrecio; // Añade al precio total

        const listItem = document.createElement('div');
        listItem.className = 'align-items-center';
        listItem.innerHTML = `
            <img src="${imagePath}" alt="${item.alt}" style="width: 100px; height: 100px;">
            <div>
                <strong>${item.nombre}</strong><br>
                Precio: ${item.precio}$<br>
                Cantidad: ${item.cantidad}<br>
                Precio Total: ${totalItemPrecio}$ 
            </div>
        `;

        cartList.appendChild(listItem);
    });

    document.getElementById('total-price').innerHTML = `<strong class="total-price"> Total: ${totalPrecio}$ <strong>`; // Mostrar total de todo
}

// Vaciar carrito
document.getElementById('clear-cart')?.addEventListener('click', () => {
    cart = [];
    localStorage.removeItem('cart'); // Vaciar carrito de LocalStorage
    updateCartDisplay();
});

// Proceder al pago
document.getElementById('proceed-to-payment')?.addEventListener('click', () => {
    const comingSoonMessage = document.getElementById('coming-soon-message');
    comingSoonMessage.style.display = 'block'; // Mostrar mensaje

    setTimeout(() => {
        comingSoonMessage.style.display = 'none';
    }, 2000); 
});

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartDisplay(); 
});

// Inicializar el carrito en la pagina del cart
if (document.getElementById('cart-list')) {
    updateCartDisplay();
}