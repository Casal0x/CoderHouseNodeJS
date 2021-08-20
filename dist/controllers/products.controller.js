"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Products_1 = __importDefault(require("../models/Products"));
var prodCtrl = {};
var PRODUCTS = new Products_1.default([]);
prodCtrl.getProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, PRODUCTS.getProducts()];
            case 1:
                products = _a.sent();
                if (products.length === 0) {
                    throw new Error('no hay productos cargados');
                }
                res.json(products);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.json({ error: error_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
prodCtrl.getProductById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, parsedId, product;
    return __generator(this, function (_a) {
        id = req.params.id;
        parsedId = Number(id);
        try {
            if (typeof parsedId !== 'number') {
                throw new Error('El ID debe ser un numero.');
            }
            product = PRODUCTS.getProductById(parsedId);
            if (!product) {
                throw new Error('producto no encontrado');
            }
            res.json(product);
        }
        catch (error) {
            res.json({ error: error.message });
        }
        return [2 /*return*/];
    });
}); };
prodCtrl.addProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, isWeb, product, products, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                isWeb = body.web === 'true' ? true : false;
                return [4 /*yield*/, PRODUCTS.addProduct(body)];
            case 2:
                product = _a.sent();
                if (!product) {
                    throw new Error('producto no encontrado');
                }
                if (!isWeb) return [3 /*break*/, 3];
                res.render('addProduct');
                return [3 /*break*/, 6];
            case 3:
                if (!body.ws) return [3 /*break*/, 5];
                return [4 /*yield*/, PRODUCTS.getProducts()];
            case 4:
                products = _a.sent();
                req.io.emit('products', products);
                _a.label = 5;
            case 5:
                res.json(product);
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_2 = _a.sent();
                res.json({ error: error_2.message });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
prodCtrl.updateProductById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, body, parsedId, updatedProduct;
    return __generator(this, function (_a) {
        id = req.params.id, body = req.body;
        parsedId = Number(id);
        try {
            if (typeof parsedId !== 'number') {
                throw new Error('El ID debe ser un numero.');
            }
            updatedProduct = PRODUCTS.updateProduct(parsedId, body);
            if (!updatedProduct) {
                throw new Error('producto no encontrado');
            }
            res.json(updatedProduct);
        }
        catch (error) {
            res.json({ error: error.message });
        }
        return [2 /*return*/];
    });
}); };
prodCtrl.removeProductById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, parsedId, updatedProduct;
    return __generator(this, function (_a) {
        id = req.params.id;
        parsedId = Number(id);
        try {
            if (typeof parsedId !== 'number') {
                throw new Error('El ID debe ser un numero.');
            }
            updatedProduct = PRODUCTS.removeProduct(parsedId);
            if (!updatedProduct) {
                throw new Error('producto no encontrado');
            }
            res.json(updatedProduct);
        }
        catch (error) {
            res.json({ error: error.message });
        }
        return [2 /*return*/];
    });
}); };
prodCtrl.getView = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, PRODUCTS.getProducts()];
            case 1:
                products = _a.sent();
                res.render('products', { products: products });
                return [2 /*return*/];
        }
    });
}); };
prodCtrl.addProductView = function (req, res) {
    res.render('addProduct');
};
prodCtrl.addProductViewWs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, PRODUCTS.getProducts()];
            case 1:
                products = _a.sent();
                res.render('addProductWithSockets', { products: products });
                return [2 /*return*/];
        }
    });
}); };
exports.default = prodCtrl;
