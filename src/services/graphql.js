import { SchemaComposer } from 'graphql-compose'
import { ProductQuery, ProductMutation } from '../controllers/product'

const schemaComposer = new SchemaComposer()

schemaComposer.Query.addFields({
  ...ProductQuery,
})

schemaComposer.Mutation.addFields({
  ...ProductMutation,
})

export const graphqlSchema = schemaComposer.buildSchema()
