import { Router } from "express";
import { isLoggedIn } from "../middleware/auth";
import passportFB from "../middleware/auth";
import passportMongoose from "../middleware/passport";
import { validateInformation } from "../middleware/validator";
import { UsersValidator } from "../models/users";
import { UserController } from "../controllers/user";
import { sendGmailLogin, sendGmailLogout } from "../middleware/gmail";
import chatRoute from "./chat";
import infoRoute from "./info";

const router = Router();

router.use("/info", isLoggedIn, infoRoute);
router.use("/chat", chatRoute);

router.post(
  "/login",
  passportMongoose.authenticate("local", {
    successRedirect: "/api/loginsuccess",
    failureRedirect: "/api/loginerror",
  })
);

router.get("/loginerror", (req, res) => {
  res.json({ msg: "Logged Error" });
});

router.get("/loginsuccess", (req, res) => {
  sendGmailLogin(req.user.email);
  res.json({ msg: "Login Success" });
});

router.post(
  "/signup",
  validateInformation(UsersValidator),
  UserController.addUser,
  (req, res) => {
    return res.json({ msg: " Signup OK" });
  }
);

router.get("/logout", isLoggedIn, (req, res) => {
  console.log(req.user);
  sendGmailLogout(req.user.email);
  req.logout();
  res.redirect("/");
});

router.get("/profile", isLoggedIn, function (req, res) {
  const user = req.user;
  res.render("profile", {
    user,
  });
});

router.get(
  "/auth/facebook",
  passportFB.authenticate("facebook", { scope: "email,user_photos" })
);

router.get(
  "/facebook/callback",
  passportFB.authenticate("facebook", {
    successRedirect: "/api/profile",
    failureRedirect: "/api",
  })
);

export default router;
