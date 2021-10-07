import express from 'express';
import http from 'http';
import io from 'socket.io';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import routes from './routes';
import { initChat } from './models/Chat';
import passport from './middlewares/auth';
import { isLogged } from './middlewares/isLogged';

const app = express();
const port = process.env.PORT || 8081;
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

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
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      mongoOptions: advancedOptions,
    }),
    secret: process.env.SESSION_SECRET || 'secretin',
    resave: false,
    saveUninitialized: false,
    // cookie: { maxAge: 1000 * 60 },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(isLogged);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));

const myServer = http.Server(app);
const myWSServer = io(myServer);

app.use((req, res, next) => {
  req.io = myWSServer;
  next();
});

app.get('/', (req, res) => {
  res.render('home', { auth: global.auth });
});

app.use(routes);

mongoose.connect(process.env.MONGO_URI, advancedOptions, (err) => {
  if (err) return console.log('err => ', err);
  console.log('Mongo DB Connected');
  const server = myServer.listen(port, () =>
    console.log(`🚀 Server ready at http://localhost:${port}`)
  );
  server.on('error', () => console.log('Error del servidor'));
});

initChat(myWSServer);
