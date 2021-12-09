import { UserModel } from "../models/users";
//import { email } from "../middleware/mail";

class User {
  async addUser(req, res, next) {
    UserModel.register(
      new UserModel({
        email: req.body.email,
      }),
      req.body.password,
      (err, user) => {
        if (err) {
          return res.json({ err });
        }
        //Envio de mail
        // email(req.body);
        next();
      }
    );
  }
}

export const UserController = new User();
