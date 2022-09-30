const initialState = {
  videogames: [],
  detail: {},
  videogamesSearch: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        //Devuelve una copia del state y le concatena en la propiedad videogames todos los videojuegos
        ...state,
        videogames: action.payload,
      };
    case "SEARCH_VIDEOGAME":
      return {
        //Devuelve una copia del state y le concatena en la propiedad videogamesSearch los videojuegos que traiga de la busqueda
        ...state,
        videogamesSearch: action.payload,
      };
    default:
      return { ...state };
  }
}
