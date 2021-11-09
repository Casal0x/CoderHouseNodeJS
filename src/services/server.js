import express, { Router } from "express";
import passport from "../middleware/auth";
import session from "express-session";
import mainRouter from "../routes/index";
import { mongoDB } from "./db";
import path from "path";
import http from "http";

const app = express();

app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60,
    },
  })
);

app.set("view engine", "ejs");

//Disponibiliza carpeta public
export const publicPath = path.resolve(__dirname, "../../public");
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", mainRouter);

mongoDB.run();

const server = http.createServer(app);

export default server;
