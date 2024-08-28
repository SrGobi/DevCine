import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';
import movies from './movies';
import movie from './movie';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);
router.use('/movies', movies);
router.use('/movie', movie);

export default router;