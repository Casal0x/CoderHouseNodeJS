import passport from 'passport';
import { Strategy as FaceBookStrategy } from 'passport-facebook';

const strategyOptions = {
  clientID: process.env.FACEBOOK_ID || '728016611206403',
  clientSecret:
    process.env.FACEBOOK_CLIENT_SECRET || 'b0d7d5055fa260868dc89deb476b3db8',
  callbackURL: 'http://localhost:8080/api/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'emails'],
};

const loginFunc = async (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
};

passport.use(new FaceBookStrategy(strategyOptions, loginFunc));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  return done(null, id);
});

export const isLoggedIn = (req, res, done) => {
  if (req.isAuthenticated()) return done();
  res.redirect('/');
};

export default passport;
