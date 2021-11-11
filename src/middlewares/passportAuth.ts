import { Request, Response } from 'express';
import passport from 'passport';
import passportLocal, { IStrategyOptionsWithRequest } from 'passport-local';
import config from '../config';
import { IUser } from '../interfaces/user.interface';
import Cart from '../models/Cart';
import { UserModel } from '../models/User';
import { EmailService } from '../services/email';
import { newUserTemplate } from '../templates/newUser.template';

const LocalStrategy = passportLocal.Strategy;

const strategyOptions: IStrategyOptionsWithRequest = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
};

const loginFunc = async (
  req: Request,
  username: string,
  password: string,
  done: any
) => {
  const user = await UserModel.findOne({ username });

  if (!user) {
    return done(null, false, { message: 'User does not exist' });
  }
  if (!user.isValidPassword(password)) {
    return done(null, false, { message: 'Password is not valid.' });
  }
  return done(null, user);
};

const signUpFunc = async (
  req: Request,
  username: string,
  password: string,
  done: any
) => {
  try {
    const {
      username,
      password,
      email,
      firstName,
      lastName,
      phone,
      age,
      image,
    }: IUser = req.body;

    if (!username || !password || !email || !firstName || !lastName) {
      // console.log('Invalid body fields');
      return done(null, false);
    }

    const query = {
      $or: [{ username: username }, { email: email }],
    };

    const user = await UserModel.findOne(query);

    if (user) {
      return done(null, false, 'User already exists');
    } else {
      const userData = {
        username,
        password,
        email,
        firstName,
        lastName,
        phone,
        age,
        image,
        role: 'user',
      };

      const newUser = new UserModel(userData);

      const userCart = new Cart({
        owner: newUser._id,
      });

      await newUser.save();
      await userCart.save();

      await EmailService.sendEmail(
        config.ADMIN_EMAIL,
        'Nuevo Registro',
        newUserTemplate(newUser)
      );

      return done(null, newUser);
    }
  } catch (error) {
    done(error);
  }
};

passport.use('login', new LocalStrategy(strategyOptions, loginFunc));
passport.use('signup', new LocalStrategy(strategyOptions, signUpFunc));

passport.serializeUser((user: any, done: any) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  UserModel.findById(userId, function (err: any, user: IUser) {
    done(err, user);
  });
});

export const isLoggedIn = (req: Request, res: Response, done: any) => {
  if (!req.user) return res.status(401).json({ msg: 'Unathorized' });

  done();
};

export default passport;
