import express from "express";
import compression from "compression";
import passport from "../middleware/auth";
import session from "express-session";
import mainRouter from "../routes";
import os from "os";
import log4js from "log4js";

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

log4js.configure({
  appenders: {
    miLoggerConsole: { type: "console" },
    miLoggererrorFile: { type: "file", filename: "error.log" },
    miLoggerwarnFile: { type: "file", filename: "warn.log" },
  },
  categories: {
    default: { appenders: ["miLoggerConsole"], level: "trace" },
    error: { appenders: ["miLoggererrorFile"], level: "error" },
    warn: { appenders: ["miLoggerwarnFile"], level: "warn" },
  },
});

let logger = log4js.getLogger("error");

logger.info("Imprimimos Info");
logger.warn("Imprimimos Warn");
logger.error("Imprimimos Error");

logger = log4js.getLogger("warn");

logger.info("Imprimimos Info");
logger.warn("Imprimimos Warn");
logger.error("Imprimimos Error");

logger = log4js.getLogger();

logger.info("Imprimimos Info");
logger.warn("Imprimimos Warn");
logger.error("Imprimimos Error");

app.use(compression());

app.set("view engine", "ejs");

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", mainRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/info", (req, res) => {
  logger.warn("Mensaje Warn");
  logger.error("Mensaje Error");
  logger.info("Mensaje Info");

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
