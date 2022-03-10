const CounterModel = require("../server/models/Counter");

async function getNextSequenceValue(sequenceName) {

    const filter = {_id: sequenceName};

    let counterFetchedData = await CounterModel.findOne(filter).exec();

    if (!counterFetchedData) {

        let counterModel = new CounterModel({_id:sequenceName, sequence_value:0});

        await counterModel.save();
    }

    const update = {$inc: {sequence_value: 1}};

    let sequenceDocument = await CounterModel.findOneAndUpdate(filter, update, {
        new: true
    });

    return sequenceDocument.sequence_value;
}

module.exports = {getNextSequenceValue};
