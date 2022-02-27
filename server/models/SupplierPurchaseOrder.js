const mongoose = require('mongoose');


const SupplierPurchaseOrder = mongoose.Schema({
    name: {
        type: String,
        required: false,
        default: 'not set'
    },
    chalanNo: {
        type: String,
        required: true,
        default: 'not set'
    },
    supplier: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Supplier'
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

module.exports = mongoose.model('Supplier_Purchase_Order', SupplierPurchaseOrder);
