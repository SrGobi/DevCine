import express from 'express';
import { Movies } from '../data/models/movies';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const movieId = req.params.id;
  try {
    const movie = await Movies.findById(movieId);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;