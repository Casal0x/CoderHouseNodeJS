import express from 'express';
import http from 'http';
import io from 'socket.io';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import routes from './routes';
import { initChat } from './models/Chat';

const app = express();
const port = process.env.PORT || 8081;

global.auth = {
  islogged: false,
  isTimedOut: false,
  isDestroyed: false,
  name: '',
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secretin',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: 1000 * 60 },
  })
);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));

const myServer = http.Server(app);
const myWSServer = io(myServer);

app.use((req, res, next) => {
  req.io = myWSServer;
  next();
});

app.get('/', (req, res) => {
  if (!req.session.name && global.auth.islogged) {
    global.auth.islogged = false;
    global.auth.isTimedOut = true;
    global.auth.isTimedOut = false;
    global.auth.nombre = '';
  }
  if (global.auth.isDestroyed) {
    global.auth.name = ``;
    global.auth.isDestroyed = false;
  }
  res.render('home', { auth: global.auth });
});

app.use(routes);

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.log('err => ', err);
    console.log('Mongo DB Connected');
    const server = myServer.listen(port, () =>
      console.log(`🚀 Server ready at http://localhost:${port}`)
    );
    server.on('error', () => console.log('Error del servidor'));
  }
);

initChat(myWSServer);
