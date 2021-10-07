import passport from '../middlewares/auth';
import { UserModel } from '../models/User';
const authCtrl = {};

authCtrl.loginView = (req, res) => {
  if (!req.user) {
    res.render('login');
  } else {
    res.redirect('/');
  }
};

authCtrl.logoutView = (req, res) => {
  if (global.auth.islogged) {
    req.session.destroy();
    global.auth.islogged = false;
    global.auth.isDestroyed = true;
    res.render('logout', { auth: global.auth });
  } else {
    res.redirect('/');
  }
};

authCtrl.login = (req, res) => {
  if (req.user) {
    global.auth.name = req.user.firstName;
    global.auth.islogged = true;
  }
  res.redirect('/');
};

authCtrl.signup = (req, res, next) => {
  passport.authenticate('signup', function (err, user, info) {
    console.log(err, user, info);
    if (err) {
      return next(err);
    }
    if (!user) return res.status(401).json({ data: info });

    res.json({ msg: 'signup OK' });
  })(req, res, next);
};

authCtrl.getUser = async (req, res) => {
  const data = await UserModel.find();
  res.json({ data });
};

authCtrl.postUser = async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;

  if (!username || !password || !email || !firstName || !lastName) {
    return res.status(400).json({ msg: 'Invalid fields' });
  }

  const userData = {
    username,
    password,
    email,
    firstName,
    lastName,
  };

  const newUser = new UserModel(userData);

  await newUser.save();

  res.json({ data: newUser });
};

export default authCtrl;
