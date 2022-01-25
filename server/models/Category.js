const mongoose = require('mongoose');


const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
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

module.exports = mongoose.model('Category', CategorySchema);
