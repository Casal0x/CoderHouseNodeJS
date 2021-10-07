import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import passport, { isLoggedIn } from '../middlewares/auth';

const router = Router();

router.post('/login', passport.authenticate('login'), AuthController.login);
router.post('/signup', AuthController.signup);

router.get('/user', isLoggedIn, AuthController.getUser);
router.post('/user', isLoggedIn, AuthController.postUser);

export default router;
