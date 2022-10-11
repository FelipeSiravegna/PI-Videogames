const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

//Traigo el videojuego que tenga el id que recibo por params
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    //Busco el juego en la db
    if (id.includes("-")) {
      const gameDB = await Videogame.findOne({
        where: { id },
        //Me traigo la tabla de Genre
        include: {
          model: Genre,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });

      //Guardo gameDB en juego para que sea más cómodo al crear gameDetails
      const juego = gameDB;

      let newDescription = juego.description.slice(3, -4);
      newDescription = newDescription.replaceAll("<p>", "");
      newDescription = newDescription.replaceAll("</p>", "");

      //Creo un juego con toda la información que contiene gameDB (ahora almacenado en juego)
      const gameDetails = {
        id: juego.id,
        name: juego.name,
        createdByUser: juego.createdByUser,
        image: juego.image,
        genres: juego.genres.map((j) => j.name).join(", "),
        description: newDescription,
        releaseDate: juego.releaseDate,
        rating: juego.rating,
        platforms: juego.platforms,
        createdAt: juego.createdAt,
        updatedAt: juego.updatedAt,
      };

      //Devuelvo el juego
      res.json(gameDetails);
    } else {
      //Si no está en la DB lo traigo desde la API
      const APIResponse = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );

      //Guardo la data de la respuesta de la API en juego para que sea más cómodo a la hora de crear gameDetails
      const juego = APIResponse.data;

      let newDescription = juego.description.slice(3, -4);
      newDescription = newDescription.replaceAll("<p>", "");
      newDescription = newDescription.replaceAll("</p>", "");

      //Creo un juego con la info que trae la API (ahora almacenada en juego)
      const gameDetails = {
        name: juego.name,
        createdByUser: false,
        image: juego.background_image,
        genres: juego.genres
          .map((j) => j.name)
          .filter((j) => j !== null)
          .join(", "),
        description: newDescription,
        releaseDate: juego.released,
        rating: juego.rating,
        platforms: juego.platforms
          .map((p) => p.platform.name)
          .filter((p) => p !== null)
          .join(", "),
      };

      //Devuelvo el juego creado
      return res.json(gameDetails);
    }
  } catch (e) {
    //En caso de no encontrarse el juego devuelve el siguiente error
    res.status(404).json({ error: "No se encontró el ID" });
  }
});

module.exports = router;
