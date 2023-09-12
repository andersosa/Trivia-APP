export async function buscarPersonaje(url) {
  let urlBusqueda = url || "https://rickandmortyapi.com/api/character";

  let data = await fetch(urlBusqueda);
  let dataParseada = await data.json();

  let arrayDePersonajes = [];

  for (let i = 0; i < dataParseada.results.length; i++) {
    const personajes = dataParseada.results[i];

    let personajesdata = await fetch(personajes.url);
    let personajesParseado = await personajesdata.json();

    let personajesFormateado = {
      id: personajesParseado.id,
      nombre: personajesParseado.name,
      imagen: personajesParseado.image,
    };

    arrayDePersonajes.push(personajesFormateado);
  }

  return {
    previous: dataParseada.previous,
    next: dataParseada.next,
    arrayDePersonajes: arrayDePersonajes,
  };
}

export async function buscarPersonajePorNombre(nombre) {
  let data = await fetch(
    `https://rickandmortyapi.com/api/character/?name=${nombre}`
  );

  let personajesParseado = await data.json();

  if (personajesParseado.results.length > 0) {
    return personajesParseado.results.map((personaje) => ({
      id: personaje.id,
      nombre: personaje.name,
      imagen: personaje.image,
    }));
  } else {
    return [];
  }
}

export async function paginaSiguiente() {}
export async function paginaAnterior() {}
