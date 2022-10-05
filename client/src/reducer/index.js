const initialState = {
  videogames: [],
  genres: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        //Devuelve una copia del state y le concatena en la propiedad videogames todos los videojuegos
        ...state,
        videogames: action.payload,
      };
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    default:
      return { ...state };
  }
}
