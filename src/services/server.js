import express from "express";
import passport from "../middleware/auth";
import session from "express-session";
import mainRouter from "../routes";
import { fork } from "child_process";
import path from "path";

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

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", mainRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/info", (req, res) => {
  res.json({
    Path: process.execPath,
    Plataforma: process.platform,
    NodeJS: process.version,
    CurrentDIR: process.cwd(),
    Memoria: process.memoryUsage(),
    PID: process.pid,
    Argumentos: process.argv,
  });
});

const scriptPath = path.resolve(__dirname, "../utils/calculo.js");

app.get("/randoms", (req, res) => {
  let qty = req.query.cant || 1000000000;

  const process = fork(scriptPath);
  process.send(qty);

  process.on("message", (message) => {
    res.json(message);
  });
});

export default app;
