import express, { Request, Response, NextFunction } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import urlRoutes from './routes/index';

const app = express();

// Use environment variables for sensitive data
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || 'mongodb://mongo:27017/url_shortener';

app.use(express.json());
app.use('/', urlRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const options: ConnectOptions = { };

mongoose.connect(mongoUri, options)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is listening at http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });