import { SchemaComposer } from 'graphql-compose';
import {
  ProductMutation,
  ProductQuery,
} from '../controllers/products.controller';

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
  ...ProductQuery,
});

schemaComposer.Mutation.addFields({
  ...ProductMutation,
});

export const graphqlSchema = schemaComposer.buildSchema();
