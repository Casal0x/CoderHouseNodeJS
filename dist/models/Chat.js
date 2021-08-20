"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initChat = void 0;
var chatUsers_1 = require("../utils/chatUsers");
var formatMessage_1 = require("../utils/formatMessage");
var data = {
    email: '',
    text: '',
};
var BOT_NAME = 'CoderHouse-BOT';
var initChat = function (io) {
    io.on('connection', function (socket) {
        socket.on('joinRoom', function (msg) {
            chatUsers_1.addUser(socket.client.id, msg.email, msg.room);
            var user = chatUsers_1.getCurrentUser(socket.client.id);
            socket.join(user.room);
            data.email = BOT_NAME;
            data.text = 'Bienvenido al Centro de Mensajes!';
            socket.emit('message', formatMessage_1.formatMessages(__assign(__assign({}, data), { bot: true })));
            data.text = "<b>" + user.email + "</b> se conecto al chat!";
            socket.broadcast.to(user.room).emit('message', formatMessage_1.formatMessages(data));
            //Send Room info
            var roomInfo = {
                room: user.room,
                users: chatUsers_1.getRoomUsers(user.room),
            };
            io.to(user.room).emit('roomUsers', roomInfo);
        });
        socket.on('chatMessage', function (msg) {
            var user = chatUsers_1.getCurrentUser(socket.client.id);
            data.email = user.email;
            data.text = msg;
            io.to(user.room).emit('message', formatMessage_1.formatMessages(data));
        });
        socket.on('disconnect-web', function () {
            var user = chatUsers_1.getCurrentUser(socket.client.id);
            if (user) {
                chatUsers_1.removeUser(socket.client.id);
                data.email = BOT_NAME;
                data.text = "<b>" + user.email + "</b> salio del chat.";
                io.to(user.room).emit('message', formatMessage_1.formatMessages(__assign(__assign({}, data), { bot: true })));
                var roomInfo = {
                    room: user.room,
                    users: chatUsers_1.getRoomUsers(user.room),
                };
                io.to(user.room).emit('roomUsers', roomInfo);
            }
        });
        socket.on('disconnect', function () {
            var user = chatUsers_1.getCurrentUser(socket.client.id);
            if (user) {
                chatUsers_1.removeUser(socket.client.id);
                data.email = BOT_NAME;
                data.text = "<b>" + user.email + "</b> salio del chat.";
                io.to(user.room).emit('message', formatMessage_1.formatMessages(__assign(__assign({}, data), { bot: true })));
                var roomInfo = {
                    room: user.room,
                    users: chatUsers_1.getRoomUsers(user.room),
                };
                io.to(user.room).emit('roomUsers', roomInfo);
            }
        });
    });
};
exports.initChat = initChat;
