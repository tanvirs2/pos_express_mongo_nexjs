const mongoose = require('mongoose');


const RexineSellSchema = mongoose.Schema({
    name: {
        type: String,
        required: false,
        default: 'not set'
    },
    product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product'
    },
    customer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Customer'
    },
    purchaseOrder: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Purchase_Order'
    },
    payment: {
        type: Number,
    },
    quantity: {
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
        default: 'description'
    },
},{
    timestamps: true
});

module.exports = mongoose.model('Rexine_Sell', RexineSellSchema);
