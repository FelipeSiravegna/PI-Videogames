const express = require("express");
const router = express.Router();
const { Genre, Videogame } = require("../db");

router.post("/", async (req, res) => {
  //Agarro la info desde el body
  const { name, description, image, releaseDate, rating, platforms, genres } =
    req.body;

  if (!name || !description || !platforms) {
    res.status(404).send("Missing info!");
  }

  if (rating > 5 || rating < 1) {
    res.status(404).send("Invalid rating!");
  }

  try {
    //Creo un nuevo juego en la DB con los datos que recibí del formulario
    const newGame = await Videogame.create({
      name: name,
      createdByUser: true,
      description: description,
      image: image,
      releaseDate: releaseDate,
      rating: rating,
      platforms: platforms,
    });

    //Busco cada Genre en la DB y se los agrego a newGame
    genres.forEach(async (g) => {
      let genresGame = await Genre.findOne({ where: { name: g } });
      await newGame.addGenre(genresGame);
    });

    res.send("Videogame created successfully!");
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = router;
