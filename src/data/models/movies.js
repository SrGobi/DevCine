const mongoose = require("mongoose");

// Definir el esquema de la película
const moviesSchema = new mongoose.Schema({
  title: String,
  image: String,
  genre: String,
  year: Number,
  links: Array,
});

// Definir el modelo de la película
const Movies = mongoose.model("Movies", moviesSchema);

module.exports = Movies;