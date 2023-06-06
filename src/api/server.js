const mongoose = require('mongoose');
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const Movies = require("../data/models/movies");

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

// Conexión a la base de datos MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {
  autoCreate: true,
  autoIndex: true,
});

// Configurar el servidor
const app = express();

// Configurar la Política de Seguridad de Contenido
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "https://srgobi.com/DevCine/api"], // Agrega aquí la URL de tu API
      // Otras directivas de CSP que necesites...
    },
  })
);

app.use(cors());
app.use(express.json());

// Ruta para obtener todas las películas
app.get("/api/movies", async (_req, res) => {
  const movies = await Movies.find();
  res.json(movies);
});

app.get("/api/movie/:id", async (req, res) => {
  const movieId = req.params.id;
  try {
    const movie = await Movies.findById(movieId);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Ruta para servir archivos estáticos
app.use(express.static(__dirname));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});