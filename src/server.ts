import dotenv from 'dotenv';
import app from './app';
import http from 'http';

dotenv.config();

const port = Number(process.env.PORT) || 8080;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listening on ${port}...`);
});