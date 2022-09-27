const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Genre } = require("../db");
const { API_KEY } = process.env;

router.get("/", async (req, res) => {
  try {
    //Traigo todos los genres de la API
    const genresAPI = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );

    //Por cada genre me hago un findorcreate
    genresAPI.data.results.forEach((g) => {
      Genre.findOrCreate({
        where: { name: g.name },
      });
    });

    //Los traigo a todos de la db
    const genresDB = await Genre.findAll();

    //Los devuelvo
    res.json(genresDB);
  } catch (e) {
    res.status(404).json({ e });
  }
});

module.exports = router;
