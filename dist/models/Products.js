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
var Products = /** @class */ (function () {
    function Products(products) {
        if (products === void 0) { products = []; }
        this.products = products;
        this.id = this.products.length;
    }
    Products.prototype.getProducts = function () {
        return this.products;
    };
    Products.prototype.addProduct = function (product) {
        product.id = this.id;
        if (product.web)
            product.web = undefined;
        this.id++;
        this.products.push(product);
        return product;
    };
    Products.prototype.getProductById = function (id) {
        var product = this.products.find(function (prod) { return prod.id === id; });
        return product ? product : null;
    };
    Products.prototype.updateProduct = function (id, data) {
        var product = this.products.find(function (prod) { return prod.id === id; });
        if (!product)
            return null;
        var filteredProducts = this.products.filter(function (prod) { return prod.id !== id; });
        product = __assign(__assign({}, product), data);
        filteredProducts.push(product);
        filteredProducts.sort(function (a, b) { return a.id - b.id; });
        this.products = filteredProducts;
        return product;
    };
    Products.prototype.removeProduct = function (id) {
        var product = this.products.find(function (prod) { return prod.id === id; });
        if (!product)
            return null;
        this.products = this.products.filter(function (prod) { return prod.id !== id; });
        return product;
    };
    return Products;
}());
exports.default = Products;
