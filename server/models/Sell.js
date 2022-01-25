const mongoose = require('mongoose');


const SellSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product'
    },
    customer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Customer'
    },
    payment: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    paymentType: {
        type: String,
        enum: ['cash', 'bank', 'mobile bank', 'down payment'],
        required: true,
        default: 'cash'
    },
    description: {
        type: String,
    },
},{
    timestamps: true
});

module.exports = mongoose.model('Sell', SellSchema);
