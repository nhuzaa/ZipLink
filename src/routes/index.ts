import express, { Request, Response } from 'express';
import Url from '../models/url';
import crypto from 'crypto';

const router = express.Router();

router.post('/shorten', async (req: Request, res: Response) => {
  const { originalUrl } = req.body;
    const url = new Url({ originalUrl, shortUrl: generateShortUrl() });
    await url.save();
    res.json({ shortUrl: url.shortUrl });

  // try {

  // } catch (error) {
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }
});


function generateShortUrl(): string {
  // Generate a 6 characters long random string
  return crypto.randomBytes(3).toString('base64').replace(/[^a-zA-Z0-9]/g, '0');
}


export default router;

