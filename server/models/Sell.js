const mongoose = require('mongoose');


const SellSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
});

module.exports = mongoose.model('Sell', SellSchema);
