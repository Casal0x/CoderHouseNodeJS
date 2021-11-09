import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import Joi from "joi";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  picture: {
    type: String,
  },
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

export const UserModel = mongoose.model("users", UserSchema);

export const UsersValidator = Joi.object({
  email: Joi.string().email(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  address: Joi.string(),
  phone: Joi
    .string()
    .regex(/^[0-9]{12}$/)
    .messages({ "string.pattern.base": `Phone number must have 12 digits.` })
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  repeat_password: Joi.ref("password"),
});
