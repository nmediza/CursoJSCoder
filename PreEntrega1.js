let precio_eventoA = 1500;
let precio_eventoB = 1800;
let precio_eventoC = 2100;
let precio_parking = 200;


function calcular_entradas(cantidad_entradas, evento) {

    cantidad_entradas = parseInt(cantidad_entradas);
    evento = parseInt(evento);
    let total_entradas = cantidad_entradas * evento;
    return total_entradas
}

function calcular_parking(cantidad_parking, precio_parking) {

    cantidad_parking = parseInt(cantidad_parking);
    let total_parking = cantidad_parking * precio_parking;
    return total_parking
}

function calcular_cupon(cupon, resultado_entradas) {
    if (cupon == "SI") {
       let total_cupon = resultado_entradas * 0.2;
       return total_cupon
    }
    else {
        return 0
    }
}

function calcular_total(resultado_entradas, resultado_parking, resultado_cupon) {
    total_a_pagar = (resultado_entradas - resultado_cupon) + resultado_parking;
    return total_a_pagar
}



// COMPRAR ENTRADAS //

let evento = "";

while (evento != "CANCELAR") {

    evento = prompt("Seleccione el evento para comprar su entrada: A, B, C o ingrese CANCELAR para salir");

    if (evento != "CANCELAR") {
        if (evento == "A") {
            evento = precio_eventoA;
        }
        else if (evento == "B") {
            evento = precio_eventoB;
        }
        else if (evento == "C") {
            evento = precio_eventoC;
        }
    
        let cantidad_entradas = prompt("Ingrese la cantidad de entradas a comprar");
        let parking = prompt("¿Desea adquirir parking para vehículo? Precio $200 | SI o NO");
        let cantidad_parking = 0;
        if (parking == "SI") {
            cantidad_parking = prompt("¿Cuantos parking desea comprar?");
        }
        let cupon = prompt("¿Tiene un cupón de descuento?: SI o NO");
    
        let resultado_entradas = calcular_entradas(cantidad_entradas, evento);
        let resultado_parking = calcular_parking(cantidad_parking, precio_parking); 
        let resultado_cupon = calcular_cupon(cupon, resultado_entradas);
        let total_a_pagar = calcular_total(resultado_entradas, resultado_parking, resultado_cupon);
    
        console.log("Compraste ", cantidad_entradas,"entradas por un total de $", resultado_entradas);
        if (parking == "SI") {
            console.log("Compraste ", cantidad_parking, "parking por un total de $", resultado_parking);
        }
        if (resultado_cupon != 0) {
            console.log("Descuento por cupón: -$", resultado_cupon);
        }
        console.log("TOTAL A PAGAR $", total_a_pagar);
    }       

}



