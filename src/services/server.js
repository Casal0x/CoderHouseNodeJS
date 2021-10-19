import express from "express";
import passport from "../middleware/auth";
import session from "express-session";
import mainRouter from "../routes";
import os from "os";

const numCPUs = os.cpus().length;

const app = express();

const getRandomInt = () => {
  return Math.floor(Math.random() * (1000 - 1)) + 1;
};

export const calculo = (qty) => {
  const salida = {};
  for (let i = 0; i < qty; i++) {
    const data = getRandomInt();

    if (salida[data]) salida[data] += 1;
    else salida[data] = 1;
  }
  return salida;
};

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
    CPUs: numCPUs,
  });
});

app.get("/randoms", (req, res) => {
  let qty = req.query.cant || 1000000000;
  const message = calculo(qty);
  res.json(message);
});

export default app;
