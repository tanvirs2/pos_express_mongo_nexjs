const mongoose = require('mongoose');


const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: false
    },
    price: { //selling price
        type: Number,
        required: true
    },
    picture: {
        type: String,
    },
    unitType: {
        type: String,
        enum: ['bag', 'kg', 'pound'],
        required: true,
        default: 'bag'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        required: true,
        default: 'active'
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Category"
    },
    description: {
        type: String,
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
