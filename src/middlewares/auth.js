import passport from 'passport';
import passportLocal from 'passport-local';
import { UserModel } from '../models/User';

const LocalStrategy = passportLocal.Strategy;

const strategyOptions = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
};

const loginFunc = async (req, username, password, done) => {
  const user = await UserModel.findOne({ username });
  const isValidPassword = user ? await user.isValidPassword(password) : null;

  if (!user) {
    return done(null, false, { message: 'User does not exist.' });
  }
  if (!isValidPassword) {
    return done(null, false, { message: 'Invalid Password.' });
  }
  return done(null, user);
};

const signUpFunc = async (req, username, password, done) => {
  try {
    const { username, password, email, firstName, lastName } = req.body;
    console.log(req.body);
    if (!username || !password || !email || !firstName || !lastName) {
      console.log('Invalid body fields');
      return done(null, false);
    }

    const query = {
      $or: [{ username: username }, { email: email }],
    };

    console.log(query);
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
      };

      const newUser = new UserModel(userData);

      await newUser.save();

      return done(null, newUser);
    }
  } catch (error) {
    done(error);
  }
};

passport.use('login', new LocalStrategy(strategyOptions, loginFunc));
passport.use('signup', new LocalStrategy(strategyOptions, signUpFunc));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  UserModel.findById(userId, function (err, user) {
    done(err, user);
  });
});

export const isLoggedIn = (req, res, done) => {
  if (!req.user) return res.status(401).json({ msg: 'Unathorized' });

  done();
};

export default passport;
