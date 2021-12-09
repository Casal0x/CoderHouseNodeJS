import { Router } from 'express'
import { isLoggedIn } from '../middleware/auth'
import chatRoute from './chat'
import infoRoute from './info'
import loginRoute from './login'
import productRoute from './product'

const router = Router()

router.use('/info', isLoggedIn, infoRoute)
router.use('/chat', chatRoute)
router.use('/login', loginRoute)
router.use('/product', productRoute)

export default router
