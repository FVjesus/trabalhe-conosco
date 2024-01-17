import express from 'express';
import { db } from '../db';

const router = express.Router();

router.get('/producer', async (req, res) => {
  try {
    const users = await db.any('SELECT * FROM producers');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export { router };