import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import config from './config/config';
import authRouter from './routers/auth';

const app = express();

(async () => {
  mongoose.connect(config.db.uri).then(
    () => console.log('Connected to database'),
    (error) => console.log(error),
  );
})();

const db = mongoose.connection;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use('/auth', authRouter);

app.get('/', (_: Request, res: Response) => {
  res.send('Server is running');
});

app.listen(config.server.port, () => {
  console.log('Server is listening on port: ' + config.server.port);
});
