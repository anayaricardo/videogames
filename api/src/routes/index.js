const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Genre, Platform, Videogame } = require("../db");
const { API_KEY } = process.env;
const { getDbInfo, getAllVideogames, getVideogamesByName } = require("./utils");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", async (req, res) => { // traer todos los juegos de la api y la db
  const { name } = req.query;
  let allVideogames = await getAllVideogames();
  if (name) {  // si existe el parametro name
    const videogamesByName = await getVideogamesByName(name); // traer los juegos de la api que coincidan con el parametro name
    const videogamesByNameDb = await getDbInfo(); // traer los juegos de la db que coincidan con el parametro name
    let videogamesDb = videogamesByNameDb.filter((game) =>
    game.name.toLowerCase().includes(name.toLowerCase()) // filtrar los juegos de la db que coincidan con el parametro name
    ); 
    let videogames = videogamesByName.concat(videogamesDb); // concatenar los juegos de la api y la db
    if (videogames.length) {  // si existen juegos
      res.status(200).send(videogames); // retornar los juegos
    } else {  // si no existen juegos
      res.status(404).json("Game not found"); // retornar un mensaje de error
    }
  } else {  // si no existe el parametro name
    res.status(200).send(allVideogames); // retornar todos los juegos
  }
});

router.get("/genres", async (req, res) => { // traer todos los generos de la api y la db
  const api = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`); // traer los datos de la api
  const apiGenres = await api.data.results.map((genre) => genre.name); // crear un arreglo con los nombres de los generos de la api

  apiGenres.forEach((genre) => {  // recorrer los generos de la api
    Genre.findOrCreate({  // buscar si existe el genero en la db
      where: {  // buscar el genero con el nombre del genero de la api
        name: genre,
      },
    });
  });
  const genres = await Genre.findAll(); // traer todos los generos de la db
  res.status(200).send(genres); // retornar los generos
});

router.get("/platforms", async (req, res) => {
  const api = await axios.get( // traer los datos de la api
    `https://api.rawg.io/api/platforms?key=${API_KEY}`
  ); 
  const apiPlatforms = await api.data.results.map((platform) => platform.name); // crear un arreglo con los nombres de las plataformas de la api

  apiPlatforms.forEach((platforms) => { // recorrer las plataformas de la api
    Platform.findOrCreate({ // buscar si existe la plataforma en la db
      where: { // buscar la plataforma con el nombre de la plataforma de la api
        name: platforms, 
      },
    });
  });
  const platforms = await Platform.findAll(); // traer todas las plataformas de la db
  res.status(200).send(platforms); // retornar las plataformas
});

router.post("/videogame", async (req, res) => { // agregar un juego a la db
  const {  // obtener los datos del body
    name,
    description,
    released,
    rating,
    image,
    createdInDb,
    genres,
    platforms,
  } = req.body;
  const videogameCreated = await Videogame.create({ // crear un juego en la db
    name,
    description,
    released,
    rating,
    image,
    createdInDb,
  });
  let genreDb = await Genre.findAll({ // traer todos los generos de la db
    where: {
      name: genres,
    },
  });
  await videogameCreated.addGenre(genreDb); // agregar los generos al juego

  let platformDb = await Platform.findAll({     // traer todas las plataformas de la db
    where: {
      name: platforms,
    },
  });
  await videogameCreated.addPlatform(platformDb); // agregar las plataformas al juego

  res.send("Videogame created"); // retornar un mensaje de confirmacion
});

router.get("/videogame/:id", async (req, res) => { // traer un juego de la db
  const { id } = req.params; // obtener el id del juego
  if (id) { // si existe el id
    const detail = await axios.get( // traer los datos de la api
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    const data = await detail.data; // obtener los datos de la api
    let videogame = [ // crear un arreglo con los datos del juego
      {
        id: data.id,
        name: data.name,
        description: data.description,
        released: data.released,
        image: data.background_image,
        rating: data.rating,
        genres: data.genres.map((genre) => genre.name),
        platforms: data.platforms.map((platform) => platform.name),
      },
    ];
    videogame.length    // si existe el juego
      ? res.status(200).json(videogame) // retornar los datos del juego
      : res.status(404).send("Game not found"); // retornar un mensaje de error
  } else { // si no existe el id
    let videogameFound = await Videogame.findByPk(id, { // buscar el juego en la db
      include: [ // traer los datos de los generos y plataformas
        {
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
    var videogamesFound = []; // crear un arreglo con los datos del juego
    videogamesFound.push(videogameFound); // agregar los datos del juego al arreglo
    res.status(200).json(videogamesFound); // retornar los datos del juego
  }
});

module.exports = router;
