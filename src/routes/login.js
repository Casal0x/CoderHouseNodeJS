import { Router } from 'express'
import passportFB from '../middleware/auth'
import passportMongoose from '../middleware/passport'
import { validateInformation } from '../middleware/validator'
import { UsersValidator } from '../models/users'
import { UserController } from '../controllers/user'
import { sendGmailLogin, sendGmailLogout } from '../middleware/gmail'
import { isLoggedIn } from "../middleware/auth";

const router = Router()

router.post(
  '/',
  passportMongoose.authenticate('local', {
    successRedirect: '/api/login/loginsuccess',
    failureRedirect: '/api/login/loginerror',
  })
)

router.get('/loginerror', (req, res) => {
  res.json({ msg: 'Logged Error' })
})

router.get('/loginsuccess', (req, res) => {
  sendGmailLogin(req.user.email)
  res.json({ msg: 'Login Success' })
})

router.post(
  '/signup',
  validateInformation(UsersValidator),
  UserController.addUser,
  (req, res) => {
    return res.json({ msg: ' Signup OK' })
  }
)

router.get('/logout', isLoggedIn, (req, res) => {
  console.log(req.user)
  sendGmailLogout(req.user.email)
  req.logout()
  res.redirect('/')
})

router.get('/profile', isLoggedIn, function (req, res) {
  const user = req.user
  res.render('profile', {
    user,
  })
})

router.get(
  '/auth/facebook',
  passportFB.authenticate('facebook', { scope: 'email,user_photos' })
)

router.get(
  '/facebook/callback',
  passportFB.authenticate('facebook', {
    successRedirect: '/api/profile',
    failureRedirect: '/api',
  })
)

export default router
