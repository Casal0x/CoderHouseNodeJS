"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var products_1 = __importDefault(require("./products"));
var cart_1 = __importDefault(require("./cart"));
var router = express_1.Router();
router.use('/api/productos', products_1.default);
router.use('/api/carrito', cart_1.default);
router.use('*', function (req, res) {
    return res.status(404).json({ notFound: 'Error 404, ruta no encontrada.' });
});
exports.default = router;
