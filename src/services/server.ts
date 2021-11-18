import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';

import mainRouter from '../routes';
import config from '../config';
import passport from '../middlewares/passportAuth';
import path from 'path';

const app = express();

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.MONGO_URI,
    }),
    secret: config.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    contentSecurityPolicy: process.env.NODE_ENV === 'dev' ? false : undefined,
  })
);
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   req.user = req.user as IUser;
//   next();
// });

app.use(express.static(path.resolve(__dirname + '../../../' + 'public')));

// app.use('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname + '../../../' + 'public/index.html'));
// });

//routes

app.use('/api', mainRouter);

//Error route

app.use('*', (req, res) =>
  res.status(404).json({ error: 404, message: 'Page not found.' })
);

export default app;
