const SERVER_PORT = process.env.PORT || 3001;

const DB_URI = process.env.ATLAS_URI || 'localhost:27017';

const CONFIG = {
  port: SERVER_PORT,
  uri: DB_URI,
};

export default CONFIG;
