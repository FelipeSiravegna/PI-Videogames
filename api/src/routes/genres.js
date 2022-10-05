const express = require("express");
const router = express.Router();
const { Genre } = require("../db");

router.get("/", async (req, res) => {
  try {
    //Los traigo a todos de la db
    const genresDB = await Genre.findAll();

    //Los devuelvo
    res.json(genresDB);
  } catch (e) {
    res.status(404).json({ e });
  }
});

module.exports = router;
