export function getVideogames() {
  return (dispatch) => {
    fetch(`http://localhost:3001/videogames`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_VIDEOGAMES", payload: json });
      });
  };
}

export function getGenres() {
  return (dispatch) => {
    fetch(`http://localhost:3001/genres`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: "GET_GENRES",
          payload: json,
        });
      });
  };
}

export function filterVideogamesByGenre(genre) {
  return {
    type: "FILTER_BY_GENRE",
    payload: genre,
  };
}
