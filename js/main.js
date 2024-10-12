const producto1 = 200
const producto2 = 5000
const producto3 = 1000

let cantidad; 
let product;
let resultado;

//ejecutar despues de cargar la pagina completamente
window.addEventListener('load', (event) => {
    console.log('La pagina ha cargado correctamente');

//nombre del usuario
const nombre = prompt("Ingrese su nombre")

//operacion de multiplicacion por cantidad de productos
function multiplicar(valor1, valor2){
    const resultado = valor1 * valor2;
    return resultado;
}
//operacion de sumar el precio total
function suma (valor1, valor2){
    const total = valor1 + valor2;
    return total
}

while (nombre != "" && nombre != null) {

    cantidad = parseInt(prompt("Bienvenido " + nombre +", Ingresar cantidad de productos para comprar, presione 0 para cerrar"));
    if (cantidad === 0){break}

    product = prompt("Ingrese el número del producto que desee:");
     
    switch (product){
        case "1":
           resultado = multiplicar(producto1, cantidad);
           alert("Debe pagar $ "+ resultado + " por su compra del producto 1");
           break;
        case "2":
            resultado = multiplicar(producto2, cantidad);
            alert("Debe pagar $ "+ resultado + " por su compra del producto 2");
            break;
        case "3":
            resultado = multiplicar(producto3, cantidad);
            alert("Debe pagar $ "+ resultado + " por su compra del producto 3");
            break;
        default:
            alert("Número de Producto Invalido");
            break;
    }

    if (cantidad <= 4 ){
        valorEnvio = 200
        alert("Su costo de envio será de $"+ valorEnvio);
        alert("Su total será de $" + suma(resultado, valorEnvio) + " Gracias por su compra")
        break;
    }
    else if (cantidad >= 5){
        valorEnvio = 0
        alert("Su envio es gratis");
        alert("Su total será de $" + suma(resultado, valorEnvio) + " Gracias por su compra")
        break;
    }
    else {
        alert("Envío No Realizable");
        break;
    }
}

});

