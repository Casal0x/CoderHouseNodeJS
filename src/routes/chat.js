import { Router } from 'express'
import { publicPath } from '../services/server'
const router = Router()

// Chat Page
router.get('/', (req, res) => {
  const user = req.user
  res.sendFile(publicPath + '/chat.html', user)
})

export default router
