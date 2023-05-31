
// VARIABLES

let eventoAComprar = "";
let comprarParking = "";
let cupon = "";
let cantidadParking = "";
let confirmarCompra = "";
let cantidadEntradas = "";
let nombreUsuario = "";
let lista_entradas = [];


class Evento {
    constructor (nombre, fecha, horario, djs, precio_entrada, stock_entrada, parking, precio_parking, stock_parking, direccion) {
        this.nombre = nombre;
        this.fecha = fecha;
        this.horario = horario;
        this.djs = djs;
        this.precio_entrada = parseInt(precio_entrada);
        this.stock_entrada = parseInt(stock_entrada);
        this.parking = parking;
        this.precio_parking = parseInt(precio_parking);
        this.stock_parking = parseInt(stock_parking);
        this.direccion = direccion;
    }

    get_stock_entradas() {
        if(this.stock_entrada <= 0) {
            return false
        }
        else {
            return true
        }
    }

    get_stock_parking() {
        if(this.stock_parking <= 0) {
            return false
        }
        else {
            return true
        }
    }

}

class Entradas {
    constructor (usuario, evento, entradasCompradas, parkingComprados, totalPagado) {
        this.usuario = usuario;
        this.evento = evento;
        this.entradasCompradas = entradasCompradas;
        this.parkingComprados = parkingComprados;
        this.totalPagado = totalPagado;
    }
}

const evento1 = new Evento ("Key Conference", "25/08/2023", "23:00 a 07:00", ["Adam Beyer", "Camelphat", "Gabriel Gil"], 1500, 4000, true, 250, 300, "Av.Wilson Ferreira Aldunate 7201, Ciudad de la Costa, Canelones");
const evento2 = new Evento ("Phonotheque", "03/07/2023", "23:59 a 10:00", ["DJ Koolt", "Manuel Jelen", "Michele", "Muten"], 800, 200, false, 0, 0, "Piedra Alta 1781, Cordón, Montevideo");
const evento3 = new Evento ("COCOON", "29/04/2023", "23:00 a 08:00", ["Enrico Sangiuiliano", "Sven Väth", "Phoro"], 1800, 4000, true, 250, 300, "Av.Wilson Ferreira Aldunate 7201, Ciudad de la Costa, Canelones"); 



// FUNCIONES

function calcularEntradas(cantidadEntradas, eventoAComprar) {

    cantidadEntradas = parseInt(cantidadEntradas);
    let totalEntradas = cantidadEntradas * eventoAComprar.precio_entrada;
    return totalEntradas
}

function calcularParking(cantidadParking, eventoAComprar) {

    cantidadParking = parseInt(cantidadParking);
    let totalParking = cantidadParking * eventoAComprar.precio_parking;
    return totalParking
}

function calcularCupon(cupon, resultadoEntradas) {
    if (cupon == "SI") {
       let totalCupon = resultadoEntradas * 0.2;
       return totalCupon
    }
    else {
        totalCupon = 0;
        return totalCupon
    }
     
}

function calcularTotal(resultadoEntradas, resultadoParking, resultadoCupon) {
    totalAPagar = (resultadoEntradas - resultadoCupon) + resultadoParking;
    return totalAPagar
}

// COMPRAR ENTRADAS //


while (eventoAComprar != "CANCELAR") {

    eventoAComprar = prompt("Seleccione el número de evento para comprar su entrada: 1 > Key Conference, 2 > Phonotheque, 3 > COCOON o ingrese CANCELAR para salir");

    if (eventoAComprar != "CANCELAR") {
        
        if (eventoAComprar == 1) {
            eventoAComprar = evento1;
        }
        else if (eventoAComprar == 2) {
            eventoAComprar = evento2;
        }
        else if (eventoAComprar == 3) {
            eventoAComprar = evento3;
        }

        if (eventoAComprar.get_stock_entradas()) {

            nombreUsuario = prompt("Ingrese su nombre");

            cantidadEntradas = prompt("Ingrese la cantidad de entradas a comprar");

            if (eventoAComprar.parking && eventoAComprar.get_stock_parking()) {
                comprarParking = prompt(`¿Desea adquirir parking para vehículo? Precio $${eventoAComprar.precio_parking} | SI o NO")`);
                if(comprarParking == "SI") {
                    cantidadParking = prompt("¿Cuantos parking desea comprar?");
                }
                else {
                    cantidadParking = 0;  
                }
            }

            cupon = prompt("¿Tiene un cupón de descuento?: SI o NO");

            let resultadoEntradas = calcularEntradas(cantidadEntradas, eventoAComprar);
            let resultadoParking = calcularParking(cantidadParking, eventoAComprar); 
            let resultadoCupon = calcularCupon(cupon, resultadoEntradas);
            let totalAPagar = calcularTotal(resultadoEntradas, resultadoParking, resultadoCupon);

            if (resultadoParking > 0) {
                confirmarCompra = prompt(`RESUMEN DE TU COMPRA:
                ${cantidadEntradas} acceso/s para ${eventoAComprar.nombre} el ${eventoAComprar.fecha} + ${cantidadParking} parking
                Total entradas: $${resultadoEntradas}
                Total parking: $${resultadoParking}
                Descuento por cupón: -$${resultadoCupon}
                TOTAL A PAGAR: $${totalAPagar}
                
                Ingrese COMPRAR para confirmar la operación o CANCELAR para salir`)
            }
            else {
                confirmarCompra = prompt(`RESUMEN DE TU COMPRA:
                ${cantidadEntradas} acceso/s para ${eventoAComprar.nombre} el ${eventoAComprar.fecha}
                Total entradas: $${resultadoEntradas}
                Descuento por cupón: -$${resultadoCupon}
                TOTAL A PAGAR: $${totalAPagar}
            
                Ingrese COMPRAR para confirmar la operación o CANCELAR para salir`)
            }

            if (confirmarCompra == "COMPRAR") {
                console.log(`¡FELICIDADES ${nombreUsuario}! compraste ${cantidadEntradas} acceso/s para ${eventoAComprar.nombre} el ${eventoAComprar.fecha} en ${eventoAComprar.direccion}, 
            podrás ingresar al recinto a partir de las ${eventoAComprar.horario} hs
            
            Vas a ver a los siguientes DJs: ${eventoAComprar.djs.join(", ")}

            ¡Nos vemos en la pista!`);
            eventoAComprar.stock_entrada = eventoAComprar.stock_entrada - cantidadEntradas;
            eventoAComprar.stock_parking = eventoAComprar.stock_parking - cantidadParking;

            let entrada = new Entradas(nombreUsuario, eventoAComprar.nombre, cantidadEntradas, cantidadParking, totalAPagar);
            lista_entradas.push(entrada);  
            }
            else {
                eventoAComprar = "CANCELAR";
            }
        }
        else {
            console.log("Lo sentimos, no hay más entradas disponibles para este evento. Por favor, seleccione otro evento.");
            eventoAComprar = "CANCELAR";
        }
        let verCompras = prompt("Presione 1 para ver su última compra, 2 para continuar comprando, 3 para salir")
        if (verCompras == 1) {
            const compras = lista_entradas.find((le) => le.usuario == nombreUsuario);
            console.log(compras);
        }
        else if (verCompras == 3) {
            eventoAComprar = "CANCELAR";
        }
    }       
} 


