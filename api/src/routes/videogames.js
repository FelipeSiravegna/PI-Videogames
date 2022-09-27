const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

// router.get("/", (req, res) => {
//   res.json("Hola");
// });

//Traer todos los juegos tanto de la db como de la API
//Se puede traer todos los juegos que contengan la palabra que se reciba por query tanto de la db como de la API
router.get("/", async (req, res) => {
  //Guardo el nombre que recibo por query
  const { name } = req.query;

  try {
    //Traer juegos que contengan name tanto de la db como de la api
    if (name) {
      //Busco en la db un juego con el nombre que recibí
      let gamesDB = await Videogame.findOne({
        where: { name: name },
        include: [Genre],
      });

      //Si encontró algo creo un nuevo objeto al que le agrego la propiedad source para saber de donde fue obtenido
      if (gamesDB) {
        gamesDBFull = {
          id: gamesDB.id,
          name: gamesDB.name,
          image: gamesDB.image,
          rating: gamesDB.rating,
          source: "DB",
          genres: gamesDB.genres.map((genre) => genre.name).join(", "),
        };

        //Traigo de la API los 15 juegos que coincidan con la palabra ingresada por query
        let gamesAPI = await axios.get(
          `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`
        );

        //gamesAPIFull es un array de objetos (game)
        gamesAPIFull = gamesAPI.data.results.map((g) => {
          //game contiene solo la información que necesito y la propiedad source para saber de donde fue obtenido
          let game = {
            id: g.id,
            name: g.name,
            image: g.background_image,
            rating: g.rating,
            source: "API",
            genres:
              //Si tiene generos definidos hago un map y devuelvo un string de generos separados por ,
              g.genres &&
              g.genres
                .map((genre) => genre.name)
                .filter((genre) => genre !== null)
                .join(", "),
          };

          //Devuelvo game
          return game;
        });
        if (gamesAPIFull.concat(gamesDBFull).length === 0) {
          res
            .status(404)
            .json({ error: "No se encontraron juegos con ese nombre" });
        } else {
          res.status(200).json(gamesAPIFull.concat(gamesDBFull));
        }
      } else {
        //Traigo solo los juegos de la API con el nombre que recibí
        let gamesAPI = await axios.get(
          `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`
        );

        //gamesAPIFull es un array de objetos (game)
        gamesAPIFull = gamesAPI.data.results.map((g) => {
          //game contiene solo la información que necesito y la propiedad source para saber de donde fue obtenido
          let game = {
            id: g.id,
            name: g.name,
            image: g.background_image,
            rating: g.rating,
            source: "API",
            genres:
              //Si tiene generos definidos hago un map y devuelvo un string de generos separados por ,
              g.genres &&
              g.genres
                .map((genre) => genre.name)
                .filter((genre) => genre !== null)
                .join(", "),
          };

          //Devuelvo game
          return game;
        });
        //Si en el array con toda la info no hay nada devuelvo un error. Y si tiene info dentro devuelvo el array
        if (gamesAPIFull.length === 0) {
          res
            .status(404)
            .json({ error: "No se encontraron juegos con ese nombre" });
        } else {
          res.status(200).json(gamesAPIFull);
        }
      }
      //Traer todos los juegos de la db y la API
    } else {
      //Arreglo donde voy guardando los juegos
      let gameResults = [];

      //Guardo el endpoint en una variable
      let allGamesAPI = `https://api.rawg.io/api/games?key=${API_KEY}`;

      //Traigo 120 juegos de la API
      for (let i = 0; i < 3; i++) {
        //En games almaceno la data
        let games = (await axios.get(allGamesAPI)).data;

        //Creo un nuevo game por cada resultado en games
        let dataGame = games.results.map((g) => {
          let game = {
            id: g.id,
            name: g.name,
            image: g.background_image,
            rating: g.rating,
            source: "API",
            genres:
              //Si tiene generos definidos hago un map y devuelvo un string de generos separados por ,
              g.genres &&
              g.genres
                .map((genre) => genre.name)
                .filter((genre) => genre !== null)
                .join(", "),
          };

          //Devuelvo game
          return game;
        });
        //Ahora el endpoint es igual al link que se encuentra en games.next, que trae los siguientes 40 juegos
        allGamesAPI = games.next;
        //A gameResults le contateno todos los juegos que traje (el objeto que cree)
        gameResults = gameResults.concat(dataGame);
      }

      //Traigo todos los juegos de la DB junto con la tabla Genre
      const gamesDB = await Videogame.findAll({
        include: [Genre],
      });

      //Paso lo que está en gamesDB a JSON
      let jsonGamesDB = gamesDB.map((g) => g.toJSON());

      jsonGamesDB.forEach((X) => {
        (X.source = "Created"),
          (X.genres = X.genres
            .map((genre) => genre.name)
            .filter((g) => g !== null)
            .join(", "));
      });

      //Concateno a gameResulst los juegos de la api
      gameResults = gameResults.concat(jsonGamesDB);

      //Devuelvo todos los juegos
      res.json(gameResults);
    }
  } catch (e) {
    res.status(404).json({ e });
  }
});

module.exports = router;
