"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomUsers = exports.getCurrentUser = exports.removeUser = exports.addUser = void 0;
var users = [];
var addUser = function (id, email, room) {
    var user = {
        id: id,
        email: email,
        room: room,
    };
    users.push(user);
};
exports.addUser = addUser;
var removeUser = function (id) {
    users = users.filter(function (user) { return user.id !== id; });
};
exports.removeUser = removeUser;
var getCurrentUser = function (id) {
    return users.find(function (user) { return user.id === id; });
};
exports.getCurrentUser = getCurrentUser;
var getRoomUsers = function (room) {
    return users.filter(function (user) { return user.room === room; });
};
exports.getRoomUsers = getRoomUsers;
