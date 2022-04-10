/* eslint-disable no-unreachable */
import axios from "axios"; 
export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_ALL_GENRES = "GET_ALL_GENRES";
export const GET_ALL_PLATFORMS = "GET_ALL_PLATFORMS";
export const GET_GAMES_BY_NAME = "GET_GAMES_BY_NAME";
export const GET_GAME_DETAILS = "GET_GAME_DETAILS";
export const FILTER_GAMES_BY_GENRE = "FILTER_GAMES_BY_GENRE";
export const FILTER_CREATED_OR_EXISTING = "FILTER_CREATED_OR_EXISTING";
export const SORT_ALPHABETICALLY = "SORT_ALPHABETICALLY";
export const SORT_BY_RATING = "SORT_BY_RATING";
export const CLEAR_STATE_DETAILS = "CLEAR_STATE_DETAILS";
export const CLEAR_STATE_VIDEOGAMES = "CLEAR_STATE_VIDEOGAMES";

export function getAllVideogames() { // Esta función se encarga de llamar a la API y obtener todos los videojuegos
  try {
    return async function (dispatch) {
      var json = await axios.get("http://localhost:3001/videogames/");
      return dispatch({
        type: GET_ALL_VIDEOGAMES,
        payload: json.data,
      });
    };
  // eslint-disable-next-line no-unreachable
  } catch (error) {
    console.log(error + "error");
  }
}

export function getAllGenres () { // Esta función se encarga de llamar a la API y obtener todos los géneros
    try {
        return function(dispatch) {
            return fetch("http://localhost:3001/genres/")
            .then(response => response.json())
            .then (json =>{
                dispatch({
                    type: GET_ALL_GENRES,
                    payload: json
                })
            })
        }
    } catch (error) {
        console.log(error + "error");
    }
}

export function getAllPlatforms() { // Esta función se encarga de llamar a la API y obtener todos los plataformas
    try {
        return function(dispatch) {
            return fetch("http://localhost:3001/platforms")
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: GET_ALL_PLATFORMS,
                    payload: json
                })
            })
        }
    } catch (error) {
        console.log(error + "error");
    }
}

export const getGamesByName = (name) => { // Esta función se encarga de llamar a la API y obtener todos los videojuegos que coincidan con el nombre
    return async function (dispatch) {
        try {
            let json = await axios(`http://localhost:3001/videogames?name=${name}`)
            return dispatch({
            type: GET_GAMES_BY_NAME,
            payload: json.data
        })
        } catch (error) {
            console.log(error)
            return dispatch({
                type: GET_GAMES_BY_NAME,
                payload: [{msg: "Did not found any games"}]
            })
        } 
    } 
}

export function getGameDetails(id) { // Esta función se encarga de llamar a la API y obtener los detalles de un videojuego
    try {
        return async function(dispatch) {
            var json = await axios(`http://localhost:3001/videogame/${id}`)
            return dispatch ({
                type: GET_GAME_DETAILS,
                payload: json.data
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export function filterGamesByGenre(payload) { // Esta función se encarga de filtrar los videojuegos por género
    console.log(payload)
    return {
        type: FILTER_GAMES_BY_GENRE,
        payload
    }
}

export function filterCreatedOrExist(payload) { // Esta función se encarga de filtrar los videojuegos por si ya existen o no
    return {
        type: FILTER_CREATED_OR_EXISTING,
        payload
    }
}

export function sortAlphabetically(payload) { // Esta función se encarga de ordenar los videojuegos alfabéticamente
    return {
        type: SORT_ALPHABETICALLY,
        payload
    }
}

export function sortByRating(payload) { // Esta función se encarga de ordenar los videojuegos por puntuación
    return {
        type: SORT_BY_RATING,
        payload
    }
}

export function clearStateDetail(payload) { // Esta función se encarga de limpiar el estado de los detalles de un videojuego
    return {
        type: CLEAR_STATE_DETAILS,
        payload
    }
}

export function clearStateVideogames(payload) { // Esta función se encarga de limpiar el estado de los videojuegos
    return {
        type: CLEAR_STATE_VIDEOGAMES,
        payload
    }
}