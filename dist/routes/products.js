"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var products_controller_1 = __importDefault(require("../controllers/products.controller"));
var checkIfAdmin_1 = require("../middlewares/checkIfAdmin");
var router = express_1.Router();
router.get('/listar', products_controller_1.default.getProducts);
router.get('/listar/:id', products_controller_1.default.getProductById);
router.post('/guardar', checkIfAdmin_1.isAdmin, products_controller_1.default.addProduct);
router.put('/actualizar/:id', checkIfAdmin_1.isAdmin, products_controller_1.default.updateProductById);
router.delete('/borrar/:id', checkIfAdmin_1.isAdmin, products_controller_1.default.removeProductById);
exports.default = router;
