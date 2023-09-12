import { buscarPersonaje, buscarPersonajePorNombre} from "./Controllers.js";
 let  root = document.getElementById("root");
 let botonDeBusqueda = document.getElementById("buscar-personaje");
 let barraDeBusqueda = document.getElementById("barra-personaje");
 let previousBtn = document.getElementById("previous");
 let nextBtn = document.getElementById("next");
 let previousUrl = "";
 let nextUrl = "";
 let html = "";

 root.innerHTML = "CARGANDO";

 async function mostrarPersonajes(url) {
    root.innerHTML = "CARGANDO";

    let objetoPersonaje = await buscarPersonaje(url);

    previousUrl = objetoPersonaje.previous;
    nextUrl = objetoPersonaje.next;

    objetoPersonaje.arrayDePersonajes.forEach((personaje) => {
        let cardPersonaje = `<div class= 'card'>
        <span>${personaje.nombre}</span>
        <img class= 'card-image' src ='${personaje.imagen}'/>
        </div>`;

        html += cardPersonaje;
    });

    root.innerHTML = html;
 }

 previousBtn.addEventListener("click", async () => {
    mostrarPersonajes(previousUrl);
 });
 nextBtn.addEventListener("click", async () => {
    mostrarPersonajes(nextUrl);
 });

 botonDeBusqueda.addEventListener("click", async () => {
    let nombrePersonaje = barraDeBusqueda.value.trim();
    if (nombrePersonaje){
        let personajesEncontrados = await buscarPersonajePorNombre(nombrePersonaje);
        let html ="";
        if (personajesEncontrados.length > 0) {
      
      personajesEncontrados.forEach((personaje) => {
       let cardPersonaje =

            `<div class= 'card'>
            <span>${personaje.nombre}</span>
            <span>${personaje.id} </span>
                <img class= 'card-image' src = '${personaje.imagen}'/>
             </div>`;

             html +=cardPersonaje;
           
                    
             });

        root.innerHTML = html;
            }

        else {
            root.innerHTML = "No se encontro ningun personaje con ese nombre.";
         }
    }

    else {
        root.innerHTML = "Ingrese un nombre de personaje valido.";
    }
 });

 mostrarPersonajes();