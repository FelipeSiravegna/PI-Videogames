const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const axios = require("axios");
const { Genre } = require("./src/db");
const { API_KEY } = process.env;

const checkDB = async () => {
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
};

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, async () => {
    console.log(`Listening on port ${process.env.PORT}`, await checkDB()); // eslint-disable-line no-console
  });
});
