const mongoose = require('mongoose');


const StockSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Product"
    },
    quantityPurchased: {
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

module.exports = mongoose.model('Stock', StockSchema);
