const producto1 = 200;
const producto2 = 5000;
const producto3 = 1000;

// Sample users for login
const users = [
    { usuario: "usuario", password: "pase" },
    { usuario: "usuario2", password: "pase2" },
    { usuario: "admin", password: "admin123" }
];

let cantidad; 
let product;
let resultado;

// Funcion para checkear login
function login(usuario, password) {
    return users.find(user => user.usuario === usuario && user.password === password);
}
// Funccion para registrar un nuevo usuario
function registro(usuario, password) {
    // Checkea si el usuario existe
    const UsuarioExiste  = users.find(user => user.usuario === usuario);
    if (UsuarioExiste ) {
        alert("El nombre de usuario ya está en uso. Intente con otro.");
        return false; 
    } else {
        // Añade nuevo user al array
        users.push({ usuario, password });
        alert("Registro exitoso. Puede iniciar sesión ahora.");
        return true; 
    }
}

// Ejecutar luego del cargado de pagina
window.addEventListener('load', (event) => {
    console.log('La pagina ha cargado correctamente');

    // Proceso login
    let logeado = false;
    let usuario, password;

    while (!logeado) {
        const entrada = prompt("Ingrese '1' para iniciar sesión o '2' para registrarse. '0' para Cerrar");
        if (entrada === '0') { break; }
        else if (entrada === '1') {
            // Login 
            usuario = prompt("Ingrese su nombre de usuario:");
            password = prompt("Ingrese su contraseña:");

            const user = login(usuario, password);
            if (user) {
                logeado = true;
                alert("Bienvenido " + usuario);
            } else {
                alert("Credenciales incorrectas. Intente de nuevo.");
            }
        } else if (entrada === '2') {
            // Registro
            usuario = prompt("Ingrese un nuevo nombre de usuario:");
            password = prompt("Ingrese una nueva contraseña:");

            if (registro(usuario, password)) {
                logeado = true;
                alert("Bienvenido " + usuario);
            }
        } else {
            alert("Opción no válida. Intente de nuevo.");
        }
    }

    // Operacion de multiplicacion por cantidad de producto
    function multiplicar(valor1, valor2) {
        return valor1 * valor2;
    }

    // Operacion de suma total
    function suma(valor1, valor2) {
        return valor1 + valor2;
    }

    while (true && logeado) {
        cantidad = parseInt(prompt("Ingresar cantidad de productos para comprar, presione 0 para cerrar"));
        if (cantidad === 0) { break; }

        product = prompt("Ingrese el número del producto que desee (1, 2 o 3):");

        switch (product) {
            case "1":
                resultado = multiplicar(producto1, cantidad);
                alert("Debe pagar $ " + resultado + " por su compra del producto 1");
                break;
            case "2":
                resultado = multiplicar(producto2, cantidad);
                alert("Debe pagar $ " + resultado + " por su compra del producto 2");
                break;
            case "3":
                resultado = multiplicar(producto3, cantidad);
                alert("Debe pagar $ " + resultado + " por su compra del producto 3");
                break;
            default:
                alert("Número de Producto Invalido");
                break;
        }

        let valorEnvio;
        if (cantidad <= 4) {
            valorEnvio = 200;
            alert("Su costo de envio será de $" + valorEnvio);
            alert("Su total será de $" + suma(resultado, valorEnvio) + " Gracias por su compra");
        } else if (cantidad >= 5) {
            valorEnvio = 0;
            alert("Su envio es gratis");
            alert("Su total será de $" + suma(resultado, valorEnvio) + " Gracias por su compra");
        } else {
            alert("Envío No Realizable");
        }
    }
});