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
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../utils/constants");
var fileCheck_1 = require("../utils/fileCheck");
var Products = /** @class */ (function () {
    function Products() {
        this.id = 0;
        this.getLastID();
    }
    Products.prototype.getLastID = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var data, lastProductId, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fileCheck_1.getDbData(constants_1.DB_PATH)];
                    case 1:
                        data = _c.sent();
                        lastProductId = ((_b = data === null || data === void 0 ? void 0 : data.productos[((_a = data === null || data === void 0 ? void 0 : data.productos) === null || _a === void 0 ? void 0 : _a.length) - 1]) === null || _b === void 0 ? void 0 : _b.id) || 0;
                        this.id = lastProductId ? lastProductId + 1 : lastProductId;
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _c.sent();
                        console.error('error ====>', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Products.prototype.getProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fileCheck_1.getDbData(constants_1.DB_PATH)];
                    case 1:
                        data = _a.sent();
                        if (data)
                            return [2 /*return*/, data.productos];
                        else
                            return [2 /*return*/, null];
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Products.prototype.addProduct = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        product.id = this.id;
                        product.admin = undefined;
                        this.id++;
                        return [4 /*yield*/, fileCheck_1.getDbData(constants_1.DB_PATH)];
                    case 1:
                        data = _a.sent();
                        if (data === null || data === void 0 ? void 0 : data.productos)
                            data.productos.push(product);
                        if (!data) return [3 /*break*/, 3];
                        return [4 /*yield*/, fileCheck_1.writeDbData(constants_1.DB_PATH, data)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, product];
                    case 4:
                        error_3 = _a.sent();
                        return [2 /*return*/, null];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Products.prototype.getProductById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data, product, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fileCheck_1.getDbData(constants_1.DB_PATH)];
                    case 1:
                        data = _a.sent();
                        product = data === null || data === void 0 ? void 0 : data.productos.find(function (prod) { return prod.id === id; });
                        return [2 /*return*/, product ? product : null];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Products.prototype.updateProduct = function (id, prodToUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var data, products, product, filteredProducts, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, fileCheck_1.getDbData(constants_1.DB_PATH)];
                    case 1:
                        data = _a.sent();
                        if (!data) return [3 /*break*/, 3];
                        products = data.productos;
                        product = products.find(function (prod) { return prod.id === id; });
                        if (!product)
                            return [2 /*return*/, null];
                        filteredProducts = products === null || products === void 0 ? void 0 : products.filter(function (prod) { return prod.id !== id; });
                        product = __assign(__assign({}, product), prodToUpdate);
                        filteredProducts.push(product);
                        filteredProducts.sort(function (a, b) { return a.id - b.id; });
                        data.productos = filteredProducts;
                        return [4 /*yield*/, fileCheck_1.writeDbData(constants_1.DB_PATH, data)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, product];
                    case 3: return [2 /*return*/, null];
                    case 4:
                        error_5 = _a.sent();
                        return [2 /*return*/, null];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Products.prototype.removeProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data, product, filteredProducts, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, fileCheck_1.getDbData(constants_1.DB_PATH)];
                    case 1:
                        data = _a.sent();
                        if (!data) return [3 /*break*/, 3];
                        product = data.productos.find(function (prod) { return prod.id === id; });
                        filteredProducts = data.productos.filter(function (prod) { return prod.id !== id; });
                        data.productos = filteredProducts;
                        return [4 /*yield*/, fileCheck_1.writeDbData(constants_1.DB_PATH, data)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, product ? product : null];
                    case 3: return [2 /*return*/, null];
                    case 4:
                        error_6 = _a.sent();
                        return [2 /*return*/, null];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return Products;
}());
exports.default = Products;
