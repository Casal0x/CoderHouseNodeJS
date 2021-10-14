import Config from "./config";
import app from "./services/server";

let port = Config.PORT;

let args;

//Busco puerto por parametro, esto se repite en el middleware de FB
process.argv.forEach((val, index, array) => {
  array.push([index + ": " + val]);
  return (args = array);
});

if (args[2]) port = args[2];

//Imprimo PID
console.log(process.pid);

app.listen(port, () => console.log(`Escuchando puerto ${port}`));
