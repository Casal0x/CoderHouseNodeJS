export const isLogged = (req, res, next) => {
  if (!req.user && global.auth.islogged) {
    global.auth.islogged = false;
    global.auth.isTimedOut = true;
    global.auth.isTimedOut = false;
    global.auth.name = '';
  }
  if (global.auth.isDestroyed) {
    global.auth.name = '';
    global.auth.isDestroyed = false;
  }
  if (req.user) {
    global.auth.name = `${req.user.firstName} ${req.user.lastName}`;
    global.auth.islogged = true;
  }
  next();
};
