const scriptPath = path.resolve(__dirname, "../utils/calculo.js");

app.get("/randoms", (req, res) => {
  let qty = req.query.cant || 1000000000;

  const process = fork(scriptPath);
  process.send(qty);

  process.on("message", (message) => {
    res.json(message);
  });
});
