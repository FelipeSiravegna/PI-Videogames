const initialState = {
  allVideogames: [],
  videogames: [],
  genres: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "FILTER_BY_GENRE":
      const allVideogames = state.allVideogames;
      const genreFiltered =
        action.payload === "All"
          ? allVideogames
          : allVideogames.filter((game) =>
              game.genres.includes(action.payload)
            );
      return {
        ...state,
        videogames: genreFiltered,
      };
    default:
      return { ...state };
  }
}
