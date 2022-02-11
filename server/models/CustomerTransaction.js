const mongoose = require('mongoose');


const CustomerTransactionSchema = mongoose.Schema({
    customer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Customer'
    },
    due: {
        type: Number,
        default: 0
    },
    deposit: {
        type: Number,
        default: 0
    },
    payment: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        required: true,
        default: 'active'
    },
    purpose: {
        type: String,
        enum: ['sell', 'due', 'deposit'],
        required: true,
        default: 'sell'
    },
    description: {
        type: String,
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Customer_Transaction', CustomerTransactionSchema);
