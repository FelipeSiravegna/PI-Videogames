//Traigo todos los videojuegos
export function getVideogames() {
  return function (dispatch) {
    return fetch(`http://localhost:3001/videogames`)
      .then((response) => response.json())
      .then((responsejson) => {
        return dispatch({
          type: "GET_VIDEOGAMES",
          payload: responsejson,
        });
      });
  };
}

//Busco un videojuego usando el searchBar
export function searchVideogame(videogameName) {
  // console.log("Buscando videojuegos");
  return function (dispatch) {
    return fetch(`http://localhost:3001/videogames?name=${videogameName}`)
      .then((response) => response.json())
      .then((responsejson) => {
        return dispatch({
          type: "SEARCH_VIDEOGAME",
          payload: responsejson,
        });
      });
  };
}
