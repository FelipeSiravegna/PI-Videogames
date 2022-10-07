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

export function filterByCreator(createdByUser) {
  return {
    type: "FILTER_BY_CREATOR",
    payload: createdByUser,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload: payload,
  };
}
