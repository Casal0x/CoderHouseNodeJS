import passport from "passport";
import { UserModel } from "../models/users";

passport.use(UserModel.createStrategy());

passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.json({ msg: "You must to be login!" });
};

export default passport;
