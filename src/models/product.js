import mongoose from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'
import Joi from 'joi'

const Schema = mongoose.Schema

const ProductSchema = new Schema({
  product: {
    type: String,
    required: true,
    unique: true,
  },
  qty: {
    type: Number,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
})

export const ProductModel = mongoose.model('products', ProductSchema)
export const ProductTC = composeWithMongoose(ProductModel)

export const ProductValidator = Joi.object({
  product: Joi.string(),
  qty: Joi.number(),
  description: Joi.string(),
})
