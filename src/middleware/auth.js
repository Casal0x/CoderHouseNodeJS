import passport from "passport";
import Config from "../config";
import { Strategy as FaceBookStrategy } from "passport-facebook";

let args;

process.argv.forEach((val, index, array) => {
  array.push([index + ": " + val]);
  return (args = array);
});

if (args[3]) Config.FACEBOOK_ID = args[3];
if (args[4]) Config.FACEBOOK_CLIENT_ID = args[4];

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
