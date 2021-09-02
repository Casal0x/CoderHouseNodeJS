import express from 'express';
import http from 'http';
import io from 'socket.io';
import path from 'path';
import routes from './routes';
import { initChat } from './models/Chat';
import { DBService } from './services/db';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));

const myServer = http.Server(app);
const myWSServer = io(myServer);

app.use((req, res, next) => {
  req.io = myWSServer;
  next();
});

app.get('/', (req, res) => res.render('home'));

app.use(routes);

const server = myServer.listen(port, () =>
  console.log(`🚀 Server ready at http://localhost:${port}`)
);

DBService.init();

server.on('error', () => console.log('Error del servidor'));

initChat(myWSServer);
