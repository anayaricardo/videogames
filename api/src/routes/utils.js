const axios = require("axios"); // importar axios
const { API_KEY } = process.env; // trae la key de la api
const { Genre, Platform, Videogame } = require("../db"); // importa los modelos

const getApiInfo = async () => {
  var pages = [1, 2, 3, 4].map(
    async (page) =>
      await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=25`
      )
  ); // trae las paginas 1,2,3 y 4 de la api que tienen 25 juegos
  let data = await Promise.all(pages); // espera a que todas las promesas se resuelvan
  let videogamesApi = data.reduce(
    (accumulator, currentValue) =>
      accumulator.concat(currentValue.data.results),
    []
  ); // reduce para concatenar todas las paginas

  const apiData = videogamesApi.map((game) => {
    // map para crear un nuevo arreglo con los datos de la api
    return {
      // crear un objeto con los datos de la api
      id: game.id,
      name: game.name,
      rating: game.rating,
      released: game.released,
      image: game.background_image,
      genres: game.genres.map((game) => game.name),
      platforms: game.platforms.map((game) => game.platform.name),
    };
  });
  return apiData; // retornar el nuevo arreglo
};

const getDbInfo = async () => {
  return await Videogame.findAll({
    // buscar todos los datos de la Db
    include: [
      {
        // incluir los datos de la tabla Genre
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: Platform,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
};

const getAllVideogames = async () => {
  const infoApi = await getApiInfo(); // traer los datos de la api
  const infoDb = await getDbInfo(); // traer los datos de la db
  const videogames = infoApi.concat(infoDb); // concatenar los datos de la api y la db
  return videogames; // retornar el arreglo con los datos de la api y la db
};

const getVideogamesByName = async (name) => {
  const Api = await axios.get(
    `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`
  ); // traer los datos de la api
  const data = await Api.data.results.map((game) => {
    // map para crear un nuevo arreglo con los datos de la api
    return {
      // crear un objeto con los datos de la api
      id: game.id,
      name: game.name,
      rating: game.rating,
      image: game.background_image,
      genres: game.genres,
      platforms: game.platforms,
    };
  });
  return data; // retornar el nuevo arreglo
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllVideogames,
  getVideogamesByName,
};
