import { Router } from 'express';
import passport, { isLoggedIn } from '../middlewares/auth';

const router = Router();

router.get('/profile', isLoggedIn, function (req, res) {
  const user = req.user;
  res.render('profile', {
    user,
  });
});

router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: 'email,user_photos' })
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/api/profile',
    failureRedirect: '/api',
  })
);

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

export default router;
