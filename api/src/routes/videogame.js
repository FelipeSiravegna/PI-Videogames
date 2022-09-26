const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    //Busco el juego en la db
    if (id.includes("-")) {
      const gameDB = await Videogame.findOne({
        where: { id },
        include: {
          model: Genre,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });

      const juego = gameDB;

      const gameDetails = {
        id: juego.id,
        name: juego.name,
        image: juego.image,
        genres: juego.genres.map((j) => j.name).join(", "),
        description: juego.description,
        releaseDate: juego.releaseDate,
        rating: juego.rating,
        platforms: juego.platforms,
        createdAt: juego.createdAt,
        updatedAt: juego.updatedAt,
      };

      res.json(gameDetails);
    } else {
      const APIResponse = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );

      const juego = APIResponse.data;

      const gameDetails = {
        name: juego.name,
        image: juego.background_image,
        genres: juego.genres
          .map((j) => j.name)
          .filter((j) => j !== null)
          .join(", "),
        description: juego.description,
        releaseDate: juego.released,
        rating: juego.rating,
        platforms: juego.platforms
          .map((p) => p.platform.name)
          .filter((p) => p !== null)
          .join(", "),
      };

      return res.json(gameDetails);
    }
  } catch (e) {
    res.status(404).json({ error: "No se encontró el ID" });
  }
});

module.exports = router;
