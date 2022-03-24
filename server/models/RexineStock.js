const mongoose = require('mongoose');


const RexineStockSchema = mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Product"
    },
    supplier: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Supplier',
    },
    supplierPurchaseOrder: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Supplier_Purchase_Order'
    },
    quantityPurchased: {
        type: Number,
        required: false
    },
    amountPurchased: {
        type: Number,
        required: false
    },
    quantityStock: {
        type: Number,
        required: false
    },
    quantitySold: {
        type: Number,
        required: false
    },
    unitPrice: { // actual/buying price
        type: Number,
        required: false
    },
    description: {
        type: String,
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Rexine_Stock', RexineStockSchema);
