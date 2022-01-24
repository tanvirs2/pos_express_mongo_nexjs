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
    description: {
        type: String,
    }
});

module.exports = mongoose.model('Stock', StockSchema);
