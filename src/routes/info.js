import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  console.log(req.user);
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

export default router;
