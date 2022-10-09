export function getVideogames() {
  return (dispatch) => {
    fetch(`http://localhost:3001/videogames`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_VIDEOGAMES", payload: json });
      })
      .catch((error) => {
        console.log(error);
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
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getNameCharacters(name) {
  return (dispatch) => {
    fetch(`http://localhost:3001/videogames?name=${name}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: "GET_NAME_CHARACTERS",
          payload: json,
        });
      })
      .catch((error) => {
        console.log(error);
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

export function sortByName(payload) {
  return {
    type: "SORT_BY_NAME",
    payload: payload,
  };
}

export function sortByRating(payload) {
  return {
    type: "SORT_BY_RATING",
    payload: payload,
  };
}
