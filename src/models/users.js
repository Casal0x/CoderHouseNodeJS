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
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

export const UserModel = mongoose.model("users", UserSchema);

export const UsersValidator = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  repeat_password: Joi.ref("password"),
});
