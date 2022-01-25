const mongoose = require('mongoose');


const CustomerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    picture: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        required: true,
        default: 'active'
    },
    description: {
        type: String,
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Customer', CustomerSchema);
