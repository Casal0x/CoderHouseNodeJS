const authCtrl = {};

authCtrl.loginView = (req, res) => {
  res.render('login', { auth: global.auth });
};

authCtrl.logoutView = (req, res) => {
  if (global.auth.islogged) {
    req.session.destroy;
    global.auth.islogged = false;
    global.auth.isDestroyed = true;
    res.render('logout', { auth: global.auth });
  } else {
    res.redirect('/');
  }
};

authCtrl.login = (req, res) => {
  if (req.body.name) {
    req.session.name = req.body.name;
    global.auth.name = req.body.name;
    global.auth.islogged = true;
  }
  res.redirect('/');
};

export default authCtrl;
