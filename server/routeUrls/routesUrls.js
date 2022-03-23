const categoriesRoute = require("../routes/categories");
const productsRoute = require("../routes/products");
const stockRoute = require("../routes/stock");
const rexineStockRoute = require("../routes/rexineStock");
const rexineSellRoute = require("../routes/rexineSell");
const sellRoute = require("../routes/sell");
const customerRoute = require("../routes/customer");
const purchaseOrder = require("../routes/purchaseOrder");
const customerTransaction = require("../routes/customerTransaction");
const supplierRoute = require("../routes/supplier");

const routeList = [
    { url: '/categories',           routeFile: categoriesRoute},
    { url: '/products',             routeFile: productsRoute},
    { url: '/stock',                routeFile: stockRoute},
    { url: '/sell',                 routeFile: sellRoute},
    { url: '/customer',             routeFile: customerRoute},
    { url: '/purchaseOrder',        routeFile: purchaseOrder},
    { url: '/customerTransaction',  routeFile: customerTransaction},
    { url: '/suppliers',            routeFile: supplierRoute},
    { url: '/rexine-stock',         routeFile: rexineStockRoute},
    { url: '/rexine-sell',          routeFile: rexineSellRoute},
];

module.exports = routeList;
