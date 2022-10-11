const express = require("express");
const router = express.Router();
const { Genre } = require("../db");

router.get("/", async (req, res) => {
  try {
    const genresDB = await Genre.findAll();

    res.json(genresDB);
  } catch (e) {
    res.status(404).json({ e });
  }
});

module.exports = router;
