const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogames = require("./videogames");
const videogame = require("./videogame");
const genres = require("./genres");
const createVideogame = require("./createVideogame");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//Traigo todos los juegos
router.use("/videogames", videogames);
//Traigo un juego por su id
router.use("/videogame", videogame);
//Creo un videojuego
router.use("/videogame", createVideogame);
//Traigo todos los generos
router.use("/genres", genres);

module.exports = router;
