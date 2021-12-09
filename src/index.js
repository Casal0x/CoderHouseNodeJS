import { PORT } from "./config";
import server from "./services/server";
import initWsServer from "./services/socket";

let port = process.env.PORT || PORT;

//Imprimo PID
console.log(process.pid);

initWsServer(server);

server.listen(port, () => console.log(`Escuchando puerto ${port}`));
