import express from 'express';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';

import CONFIG from './config/config';

const app = express();

mongoose.connect(
  CONFIG.uri,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
  } as ConnectOptions,
  () => console.log('Connected to databse'),
);

const db = mongoose.connection;

app.use(cors());

app.listen(CONFIG.port, () => {
  console.log('Server is listening on port: ' + CONFIG.port);
});
