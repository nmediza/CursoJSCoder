
// VARIABLES

let eventoAComprar = "";
let comprarParking = "";
let cupon = "";
let cantidadParking = "";
let confirmarCompra = "";
let cantidadEntradas = "";
let nombreUsuario = "";
let lista_entradas = [];
let lista_eventos = [];
let carrito = [];


class Evento {
    constructor (id, id_carrito, flyer, nombre, fecha, horario, djs, precio_entrada, stock_entrada, parking, precio_parking, stock_parking, direccion) {
        this.id = id, 
        this.id_carrito = id_carrito,
        this.flyer = flyer,
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

const evento1 = new Evento ("1", "C1", "img/evento-01-flyer.png","COCOON", "29/04/2023", "23:00 a 08:00", ["Enrico Sangiuiliano", "Sven Väth", "Phoro"], 1800, 4000, true, 250, 300, "Av.Wilson Ferreira Aldunate 7201, Ciudad de la Costa, Canelones");
const evento2 = new Evento ("2", "C2", "img/evento-02-flyer.png","MUSIC CONTENT E01", "18/03/23", "23:00 a 07.00", ["Jay Lumen", "Brian Gross", "SPECTRUM DJs"], 1200, 1500, false, 0, 0, "Río Branco 1627, Centro, Montevideo");
const evento3 = new Evento ("3", "C3", "img/evento-03-flyer.png","MOTION", "01/04/2023", "23:00 a 08:00", ["Jorge Savoretti", "Alex Font", "Indra"], 1800, 2500, true, 300, 100, "Ex Tequila, Ruta 10, La Barra, Maldonado"); 
const evento4 = new Evento ("4", "C4", "img/evento-04-flyer.png","Phonotheque", "12/02/2022", "22:00 a 06:00", ["Manuel Jelen", "Emilio B2B Kino", "Christian"], 1000, 500, false, 0, 0, "Rambla Pte. Wilson 2133, Parque Rodó, Montevideo"); 


lista_eventos.push(evento1, evento2, evento3, evento4);

const eventosContenedor = document.getElementById('eventos');

function renderizarEventos(evento) {
    const article = document.createElement('article');
    article.className = 'eventoCard';
    article.dataset.evento = evento.id;

    const flyer = document.createElement('img');
    const fechaEvento = document.createElement('h5');
    const nombreEvento = document.createElement('h3');
    const direccionEvento = document.createElement('p');
    const precioEvento = document.createElement('h5');
    const comprar = document.createElement('button');

    flyer.src = evento.flyer;
    flyer.alt = evento.nombre;
    fechaEvento.textContent = evento.fecha;
    nombreEvento.textContent = evento.nombre;
    direccionEvento.textContent = evento.direccion;
    precioEvento.textContent = evento.precio_entrada;
    comprar.textContent = 'COMPRAR';
    comprar.className = 'btnComprar';
    comprar.addEventListener("click", agregarAlCarrito);

    
    article.appendChild(flyer);
    article.appendChild(fechaEvento);
    article.appendChild(nombreEvento);
    article.appendChild(direccionEvento);
    article.appendChild(precioEvento);
    article.appendChild(comprar);

    eventosContenedor.appendChild(article);
}

lista_eventos.forEach(renderizarEventos);


function agregarAlCarrito(e) {
    const eventoABuscar = e.target.parentNode.dataset.evento;
    const eventoAAgregar = lista_eventos.find(Evento => Evento.id == eventoABuscar);
    if (carrito.includes(eventoAAgregar)) {
        alert("Ya agregaste este evento al carrito");
    }
    else {
        carrito.push(eventoAAgregar);
    }
    carritoContenedor.innerHTML = "";
    carrito.forEach(renderizarCarrito);
} 


function borrarProductoCarrito(e) {
    const buscarItemCarritoEliminar = e.target.parentNode.parentNode.parentNode.dataset.itemCarrito;
    const itemCarritoEliminar = carrito.findIndex(carrito => carrito.id_carrito == buscarItemCarritoEliminar);
    carrito.splice(itemCarritoEliminar, 1);
    carritoContenedor.innerHTML = "";
    carrito.forEach(renderizarCarrito);
} 

const carritoContenedor = document.getElementById('carritoBody');

function renderizarCarrito(itemCarrito) {
    const articleCarrito = document.createElement('article');
    articleCarrito.className = 'itemCarritoContainer';
    articleCarrito.dataset.itemCarrito = itemCarrito.id_carrito;

    const carritoItemTop = document.createElement('div');
    const carritoItemCHO = document.createElement('div');
    const carritoItemCHOEntradas = document.createElement('div');
    const carritoItemCHOParking = document.createElement('div');
    const carritoItemCHOErase = document.createElement('div');
    const carritoItemCHOBottom = document.createElement('div');

    carritoItemTop.className = 'carritoItemTop';
    carritoItemCHO.className = 'carritoItemCHO';
    carritoItemCHOEntradas.className = 'carritoItemCHOEntradas';
    carritoItemCHOParking.className = 'carritoItemCHOParking';
    carritoItemCHOErase.className = 'carritoItemCHOErase';
    carritoItemCHOBottom.className = 'carritoItemCHOBottom';


    articleCarrito.append(carritoItemTop);
    articleCarrito.append(carritoItemCHO);
    carritoItemCHO.append(carritoItemCHOEntradas);
    carritoItemCHO.append(carritoItemCHOParking);
    carritoItemCHO.append(carritoItemCHOErase);
    articleCarrito.append(carritoItemCHOBottom);

    carritoItemTop.innerHTML = `<img src=${itemCarrito.flyer}></img>
                                <div><h4>${itemCarrito.nombre}</h4>
                                <h6>${itemCarrito.fecha}</h6></div>`
    carritoItemCHOEntradas.innerHTML = `<label for="qEntradas">Cantidad<br>entradas</label>
                                        <input type="number" id="qEntradas" name="qEntradas" min="1">`;
    if (itemCarrito.parking) {
        carritoItemCHOParking.innerHTML = `<label for="qParking">Cantidad<br>parking</label>
                                            <input type="number" id="qParking" name="qParking" min="1">`;
    }
    else {
        carritoItemCHOParking.innerHTML = `<p>Este evento<br>no cuenta<br>con parking</p>`;
    }
    carritoItemCHOErase.innerHTML = `<p>BORRAR</p>
                                     <button class="btnBorrar"><img src="./img/borrar.png"></button>`
    carritoItemCHOBottom.innerHTML = `<p>subtotal</p>
                                    <h6>$${itemCarrito.precio_entrada}</h6>`;

    const borrar = articleCarrito.querySelector(".btnBorrar");
    borrar.addEventListener("click", borrarProductoCarrito);
                                       
    carritoContenedor.append(articleCarrito);
    
}










// FUNCIONES

/* function calcularEntradas(cantidadEntradas, eventoAComprar) {

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
} */

// COMPRAR ENTRADAS //


/* while (eventoAComprar != "CANCELAR") {

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


 */