import { DBService } from '../services/db';
import {
  addUser,
  getCurrentUser,
  getRoomUsers,
  removeUser,
} from '../utils/chatUsers';
import { formatMessages } from '../utils/formatMessage';

const data = {
  email: undefined,
  text: undefined,
};

const BOT_NAME = 'CoderHouse-BOT';

const getMessages = async (socket) => {
  try {
    const chatMessages = await DBService.get('mensajes');
    socket.emit('initChat', chatMessages);
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

    socket.on('chatMessage', (msg) => {
      const user = getCurrentUser(socket.client.id);
      data.email = user.email;
      data.text = msg;
      DBService.create('mensajes', formatMessages(data)).then(() => {
        io.to(user.room).emit('message', formatMessages(data));
      });
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
