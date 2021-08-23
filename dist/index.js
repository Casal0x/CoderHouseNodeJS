"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var constants_1 = require("./utils/constants");
var fileCheck_1 = require("./utils/fileCheck");
var app = express_1.default();
var port = process.env.PORT || 8080;
fileCheck_1.checkDbExist(constants_1.DB_PATH);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(routes_1.default);
var server = app.listen(port, function () {
    return console.log("\uD83D\uDE80 Server ready at http://localhost:" + port + " \uD83D\uDE80");
});
server.on('error', function () { return console.log('Error del servidor'); });
