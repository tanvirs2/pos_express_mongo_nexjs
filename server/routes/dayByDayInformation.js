const express = require('express');
const router = express.Router();
const DayByDayInformation = require('../models/DayByDayInformation');

const OwnModel = DayByDayInformation;


router.get('/latest-one', async (req, res) => {

    try {
        const ownModel = await OwnModel.find().limit(1).sort({_id: -1});
        res.json(ownModel[0]);
    } catch (err) {
        res.json({massage: err});
    }

});

router.get('/', async (req, res) => {

    try {
        const ownModel = await OwnModel.find();
        res.json(ownModel);
    } catch (err) {
        res.json({massage: err});
    }

});

router.get('/:ownModelId', async (req, res) => {

    try {
        const ownModel = await OwnModel.find();
        res.json(ownModel);
    } catch (err) {
        res.json({massage: err});
    }


});

// save ownModel
router.post('/', (req, res)=>{

    res.setHeader('Content-Type', 'application/json')

    //console.log(req.body);

    const ownModel = new OwnModel({
        todayPrice: req.body.todayPrice,
    });

    ownModel.save().then(data => {
        //console.log("day by--->", data);
        res.send(data);
    })


});

router.put('/:ownModelId', async (req, res)=>{

    res.setHeader('Content-Type', 'application/json')

    //console.log('tnvwwwwwwwwwww');
    //console.log('tnv',req.params.ownModelId);

    try {
        const ownModel = await OwnModel.updateOne({_id: req.params.ownModelId}, req.body);
        res.json(ownModel);
    } catch (err){
        res.json({massage: err});
    }



});

// delete ownModel
router.delete('/:ownModelId', async (req, res)=>{

    try {
        let ownModelDel = await OwnModel.remove({_id: req.params.ownModelId});
        res.json(ownModelDel);
    } catch (err){
        res.json({massage: err});
    }
});

module.exports = router;
