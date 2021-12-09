import { Router } from 'express'
import { ProductValidator } from '../models/product'
import { validateInformation } from '../middleware/validator'
import { ProductController } from '../controllers/product'
import { graphqlHTTP } from 'express-graphql'
import { graphqlRoot, graphqlSchema } from '../services/graphql'

const router = Router()

router.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    graphiql: true,
  })
)

router.put('/', (req, res) => {
  res.json({ msg: 'Put' })
})
router.delete('/', (req, res) => {
  res.json({ msg: 'Delete' })
})

export default router
