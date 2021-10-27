import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = parseInt(process.env.PORT!) || 5000;

const DB_URI = process.env.ATLAS_URI || 'localhost:27017';

const CONFIG = {
  port: SERVER_PORT,
  uri: DB_URI,
};

export default CONFIG;
