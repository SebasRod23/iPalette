import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import CONFIG from './config/config';
import authRouter from './routers/auth';

const app = express();

(async () => {
  mongoose.connect(CONFIG.uri).then(
    () => console.log('Connected to databse'),
    (error) => console.log(error),
  );
})();

const db = mongoose.connection;

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);

app.get('/', (_: Request, res: Response) => {
  res.send('Server is running');
});

app.listen(CONFIG.port, () => {
  console.log('Server is listening on port: ' + CONFIG.port);
});
