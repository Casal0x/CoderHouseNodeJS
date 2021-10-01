import {
  addUser,
  getCurrentUser,
  getRoomUsers,
  removeUser,
} from '../utils/chatUsers';
import { formatMessages } from '../utils/formatMessage';
import { normalize, schema } from 'normalizr';
import Mensajes from './Mensajes';

const data = {
  email: undefined,
  text: undefined,
};

const BOT_NAME = 'CoderHouse-BOT 😁';
const message = new schema.Entity('mensaje', { idAttribute: '_id' });
const logSchema = new schema.Array(message);

const getMessages = async (socket) => {
  try {
    const chatMessages = await Mensajes.find();
    let normalized = normalize(chatMessages, logSchema);
    console.log(chatMessages[0], normalized);
    socket.emit('initChat', normalized);
  } catch (error) {
    return [];
  }
};

export const initChat = (io) => {
  io.on('connection', (socket) => {
    socket.on('joinRoom', (msg) => {
      addUser(socket.client.id, msg.email, msg.room);
      const user = getCurrentUser(socket.client.id);

      socket.join(user.room);

      data.email = BOT_NAME;
      data.text = 'Bienvenido al Centro de Mensajes!';
      socket.emit('message', formatMessages({ ...data, bot: true }));

      getMessages(socket);

      data.text = `<b>${user.email}</b> se conecto al chat!`;

      socket.broadcast
        .to(user.room)
        .emit('message', formatMessages({ ...data, bot: true }));

      //Send Room info
      const roomInfo = {
        room: user.room,
        users: getRoomUsers(user.room),
      };
      io.to(user.room).emit('roomUsers', roomInfo);
    });

    socket.on('chatMessage', async (msg) => {
      const user = getCurrentUser(socket.client.id);
      data.email = user.email;
      data.text = msg;
      try {
        const mensaje = new Mensajes({
          ...formatMessages(data),
        });
        await mensaje.save();

        io.to(user.room).emit('message', mensaje);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('disconnect-web', () => {
      const user = getCurrentUser(socket.client.id);
      if (user) {
        removeUser(socket.client.id);
        data.email = BOT_NAME;
        data.text = `<b>${user.email}</b> salio del chat.`;
        io.to(user.room).emit(
          'message',
          formatMessages({ ...data, bot: true })
        );

        const roomInfo = {
          room: user.room,
          users: getRoomUsers(user.room),
        };
        io.to(user.room).emit('roomUsers', roomInfo);
      }
    });

    socket.on('disconnect', () => {
      const user = getCurrentUser(socket.client.id);
      if (user) {
        removeUser(socket.client.id);
        data.email = BOT_NAME;
        data.text = `<b>${user.email}</b> salio del chat.`;
        io.to(user.room).emit(
          'message',
          formatMessages({ ...data, bot: true })
        );

        const roomInfo = {
          room: user.room,
          users: getRoomUsers(user.room),
        };
        io.to(user.room).emit('roomUsers', roomInfo);
      }
    });
  });
};
