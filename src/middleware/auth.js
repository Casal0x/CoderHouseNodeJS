import passport from "passport";
import Config from "../config";
import minimist from "minimist";
import { Strategy as FaceBookStrategy } from "passport-facebook";

const param = minimist(process.argv.slice(2));

if (param.fbu) Config.FACEBOOK_ID = param.fbu;
if (param.fbc) Config.FACEBOOK_CLIENT_ID = param.fbc;

const strategyOptions = {
  clientID: Config.FACEBOOK_ID,
  clientSecret: Config.FACEBOOK_CLIENT_ID,
  callbackURL: "http://localhost:8080/api/facebook/callback",
  profileFields: ["id", "displayName", "photos", "emails"],
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
  res.redirect("/");
};

export default passport;
