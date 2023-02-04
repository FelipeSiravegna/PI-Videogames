import axios from "axios";

export function getVideogames() {
  return async function (dispatch) {
    await axios.get(`/videogames`)
      .then(json => {
        dispatch({ type: "GET_VIDEOGAMES", payload: json.data });
      })
      .catch((error) => { console.error(error); })
  }
}

export function getGenres() {
  return async function (dispatch) {
    await axios.get(`/genres`)
      .then(json => {
        dispatch({ type: "GET_GENRES", payload: json.data });
      })
      .catch((error) => { console.error(error); })
  }
}

export function getNameVideogames(name) {
  return async function (dispatch) {
    await axios.get(`/videogames?name=${name}`)
      .then(json => {
        dispatch({ type: "GET_NAME_VIDEOGAMES", payload: json.data });
      })
      .catch((error) => { console.error(error); })
  }
}

export function postVideogame(payload) {
  return async (dispatch) => {
    const response = await axios.post(
      `/videogame`,
      payload
    );
    return response;
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

export function getDetail(id) {
  return async function (dispatch) {
    await axios.get(`/videogame/${id}`)
      .then(json => {
        dispatch({ type: "GET_DETAILS", payload: json.data });
      })
      .catch((error) => console.error(error));
  }
}

export function resetDetail() {
  return (dispatch) => {
    dispatch({
      type: "RESET_DETAIL",
    });
  };
}
