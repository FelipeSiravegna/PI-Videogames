const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

router.get("/videogames", async (req, res) => {
  //Guardo el nombre que recibo por query
  const { name } = req.query;

  try {
    //Si name tiene algo
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

        //Busco en la API algún juego con el nombre que recibí
        let gamesAPI = await axios.get(
          `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`
        );

        //gamesAPIFull es un array de objetos (game)
        gamesAPIFull = gamesAPI.data.results.map((g) => {
          //game contiene solo la información que necesito y la propiedad source para saber de donde fue obtenido
          let game = {
            id: g.id,
            name: g.name,
            rating: g.rating,
            source: "API",
            image: g.background_image,
            genres:
              //Si tiene generos definidos hago un map y devuelvo un string de generos separados por ,
              g.genres &&
              g.genres
                .map((genre) => genre.name)
                .filter((ge) => ge !== null)
                .join(", "),
          };

          //Devuelvo game
          return game;
        });

        //Devuelvo todos los resultados (tanto de la api como de la db)
        res.json(gamesDBFull.concat(gamesAPIFull));
      } else {
      }
    }
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
