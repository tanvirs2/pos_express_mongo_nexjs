const mongoose = require('mongoose');


const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Category"
    },
    description: {
        type: String,
    }
});

module.exports = mongoose.model('Product', ProductSchema);
