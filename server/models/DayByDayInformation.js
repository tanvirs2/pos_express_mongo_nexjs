const mongoose = require('mongoose');


const DayByDayInformationSchema = mongoose.Schema({
    todayPrice: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now()
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Day_By_Day_Information', DayByDayInformationSchema);
