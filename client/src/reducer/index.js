import {
  GET_ALL_VIDEOGAMES,
  GET_ALL_GENRES,
  GET_ALL_PLATFORMS,
  GET_GAMES_BY_NAME,
  GET_GAME_DETAILS,
  FILTER_GAMES_BY_GENRE,
  FILTER_CREATED_OR_EXISTING,
  SORT_ALPHABETICALLY,
  SORT_BY_RATING,
  CLEAR_STATE_DETAILS,
  CLEAR_STATE_VIDEOGAMES,
} from "../actions"; // Importamos las acciones que se van a realizar

const initialState = {
  // Estado inicial de la aplicación
  videogames: [],
  allTheVideogames: [],
  genres: [],
  platforms: [],
  gameDetails: [],
};

function rootReducer(state = initialState, action) {
  // Esta función es la que se encarga de todo el estado de la aplicación
  switch (
    action.type // Switch es una función que se encarga de comparar el tipo de acción que se está realizando
  ) {
    case GET_ALL_VIDEOGAMES: // Acción que se encarga de obtener todos los juegos
      return {
        ...state,
        videogames: action.payload,
        allTheVideogames: action.payload,
      };
    case GET_ALL_GENRES: // Acción que se encarga de obtener todos los géneros
      return {
        ...state,
        genres: action.payload,
      };
    case GET_ALL_PLATFORMS: // Acción que se encarga de obtener todas las plataformas
      return {
        ...state,
        platforms: action.payload,
      };
    case GET_GAMES_BY_NAME: // Acción que se encarga de buscar un juego por nombre
      return {
        ...state,
        videogames: action.payload,
      };
    case GET_GAME_DETAILS: // Acción que se encarga de obtener los detalles de un juego
      return {
        ...state,
        gameDetails: [],
      };
    case FILTER_GAMES_BY_GENRE: // Función que filtra los juegos por género
      const videogamesByGenre = state.allTheVideogames;
      const gamesApi = videogamesByGenre.filter((game) =>
        game.genres.includes(action.payload)
      );
      // eslint-disable-next-line array-callback-return
      const gamesDb = videogamesByGenre.filter((game) => {
        for (let i = 0; i < game.genres.length; i++) {
          if (game.genres[i].name === action.payload) {
            return game;
          }
        }
      });
      const videogames = gamesApi.concat(gamesDb);
      return {
        ...state,
        videogames: videogames,
      };
    case FILTER_CREATED_OR_EXISTING: // Función que filtra los juegos por si ya existen en la base de datos o no
      var videogameCreated;
      if (action.payload === "DB") {
        videogameCreated = state.allTheGames.filter((game) => game.createdInDb);
        if (!videogameCreated.length)
          videogameCreated = [{ dbError: "No Video games found" }];
      } else {
        videogameCreated = state.allTheVideogames.filter(
          (game) => !game.createdInDb
        );
      }
      return {
        ...state,
        videogames: videogameCreated,
      };
    case SORT_ALPHABETICALLY: // Función que ordena los juegos alfabéticamente
      let sortedAlphabetically =
        action.payload === "A - Z"
          ? state.videogames.sort((a, b) => {
              // Ordena los juegos alfabéticamente de A a Z
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort((a, b) => {
              // Función que ordena los juegos alfabéticamente de Z a A
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sortedAlphabetically,
      };
    case SORT_BY_RATING: // Función que ordena los juegos por puntuación
      let sortedRating =
        action.payload === "Lowest to Highest Rating"
          ? state.videogames.sort((a, b) => {
              // Ordena los juegos por puntuación de forma ascendente
              if (a.rating > b.rating) {
                return 1;
              }
              if (a.rating < b.rating) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort((a, b) => {
              // Ordena los juegos por puntuación de forma descendente
              if (a.rating > b.rating) {
                return -1;
              }
              if (a.rating < b.rating) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sortedRating,
      };
    case CLEAR_STATE_DETAILS: // Función que limpia el estado de los detalles del juego
      return {
        ...state,
        gameDetails: [],
      };
    case CLEAR_STATE_VIDEOGAMES: // Función que limpia el estado de los juegos
      return {
        ...state,
        videogames: [],
      };

    default:
      return state;
  }
}

export default rootReducer;
