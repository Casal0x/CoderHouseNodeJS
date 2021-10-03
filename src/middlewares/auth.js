export const isLogged = (req, res, next) => {
  if (!req.session.name && global.auth.islogged) {
    global.auth.islogged = false;
    global.auth.isTimedOut = true;
    global.auth.isTimedOut = false;
    global.auth.name = '';
  }
  if (global.auth.isDestroyed) {
    global.auth.name = '';
    global.auth.isDestroyed = false;
  }
  if (req.session.name) {
    global.auth.name = req.session.name;
    global.auth.islogged = true;
  }
  next();
};
