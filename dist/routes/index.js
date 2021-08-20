"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var products_controller_1 = __importDefault(require("../controllers/products.controller"));
var products_1 = __importDefault(require("./products"));
var router = express_1.Router();
router.use('/api/productos', products_1.default);
// Web Routes
router.get('/productos/vista', products_controller_1.default.getView);
router.get('/productos/guardar', products_controller_1.default.addProductView);
router.get('/productos/guardarWs', products_controller_1.default.addProductViewWs);
router.get('/chat', function (req, res) {
    res.render('chat');
});
exports.default = router;
