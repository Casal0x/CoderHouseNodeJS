import express from 'express';
import routes from './routes';
import { DB_PATH } from './utils/constants';
import { checkDbExist } from './utils/fileCheck';

const app = express();
const port = process.env.PORT || 8080;

checkDbExist(DB_PATH);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

const server = app.listen(port, () =>
  console.log(`🚀 Server ready at http://localhost:${port} 🚀`)
);

server.on('error', () => console.log('Error del servidor'));
