const mongoose = require('mongoose');


const CounterSchema = mongoose.Schema({
    _id: '',
    sequence_value: 0
},{
    timestamps: true
});

module.exports = mongoose.model('Counter', CounterSchema);
