import { use } from "passport";
import * as socketio from "socket.io";
import { sms } from "../middleware/sms";

const initWsServer = (server) => {
  const ioServer = new socketio.Server();
  ioServer.attach(server);

  //Conexion Websocket
  ioServer.on("connection", (socket) => {
    console.log(`👾 New socket connected! >> ${socket.id}`);

    socket.on("disconnect", () => {
      console.log("User disconnected - Username: " + socket.username);
    });

    socket.on("new message", (msg) => {
      
      const msgAdmin = msg.toLowerCase();
      if (msgAdmin.includes("administrador")) sms(msg);

      ioServer.emit("send message", { message: msg, user: socket.username });
    });

    socket.on("new user", (usr) => {
      socket.username = usr;
      console.log("User connected - Username: " + socket.username);
    });
  });
  return ioServer;
};

export default initWsServer;
