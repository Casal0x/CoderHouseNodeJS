import Config from "./config";
import app from "./services/server";
import minimist from "minimist";
import { exec } from "child_process";

const commandFork =
  'pm2 start src/index.js --name="ServerFork" --watch -- 8080';
const commandCluster =
  'pm2 start src/index.js --name="ServerCluster"--watrch -i max -- 8081';

const param = minimist(process.argv.slice(2));
console.log(param);

if (param.s == "cluster") {
  exec(commandCluster, (err, stdout, stderr) => {
    if (err) {
      console.log(`Error => ${err.message}`);
      return;
    }
    console.log(stderr);

    if (stderr) {
      console.log("STDERR");
      console.log(stderr);
      return;
    }
    console.log(stdout);
    console.log(process.pid);
    app.listen(8080, () => console.log(`Escuchando puerto $8080`));
  });
} else {
  exec(commandFork, (err, stdout, stderr) => {
    if (err) {
      console.log(`Error => ${err.message}`);
      return;
    }
    console.log(stderr);

    if (stderr) {
      console.log("STDERR");
      console.log(stderr);
      return;
    }

    console.log(stdout);
    //Imprimo PID
    console.log(process.pid);
    app.listen(8080, () => console.log(`Escuchando puerto 8080`));
  });
}
