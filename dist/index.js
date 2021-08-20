"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = require("socket.io");
var path_1 = __importDefault(require("path"));
var routes_1 = __importDefault(require("./routes"));
var Chat_1 = require("./models/Chat");
var app = express_1.default();
var port = 8080;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../public')));
app.set('view engine', 'pug');
app.set('views', path_1.default.join(__dirname, '../views'));
var myServer = new http_1.default.Server(app);
var myWSServer = new socket_io_1.Server(myServer);
app.use(function (req, res, next) {
    req.io = myWSServer;
    next();
});
app.get('/', function (req, res) { return res.render('home'); });
app.use(routes_1.default);
var server = myServer.listen(port, function () {
    return console.log("\uD83D\uDE80 Server ready at http://localhost:" + port);
});
server.on('error', function () { return console.log('Error del servidor'); });
Chat_1.initChat(myWSServer);
