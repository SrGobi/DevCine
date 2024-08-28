import express from 'express';
import { Movies } from '../data/models/movies';

const router = express.Router();
// Ruta para obtener todas las películas
router.get('/', async (req, res) => {
  const movies = await Movies.find();
  res.json(movies);
});

export default router;