const express = require('express');
const router = express.Router();
const Sell = require('../models/Sell');


router.get('/', async (req, res) => {

    try {
        const sell = await Sell.find();
        res.json(sell);
    } catch (err) {
        res.json({massage: err});
    }

});

router.get('/:sellId', async (req, res) => {

    try {
        const sell = await Sell.find();
        res.json(sell);
    } catch (err) {
        res.json({massage: err});
    }

});

// save sell
router.post('/', (req, res)=>{

    res.setHeader('Content-Type', 'application/json')


    const sell = new Sell({
        name: req.body.name,
        description: req.body.description
    });

    sell.save().then(data => {
        console.log(data);
        res.send(data);
    })


});

router.put('/:sellId', async (req, res)=>{

    res.setHeader('Content-Type', 'application/json')

    //console.log('tnvwwwwwwwwwww');
    //console.log('tnv',req.params.sellId);

    try {
        const sell = await Sell.updateOne({_id: req.params.sellId}, req.body);
        res.json(sell);
    } catch (err){
        res.json({massage: err});
    }



});

// delete sell
router.delete('/:sellId', async (req, res)=>{

    try {
        let sellDel = await Sell.remove({_id: req.params.sellId});
        res.json(sellDel);
    } catch (err){
        res.json({massage: err});
    }
});

module.exports = router;
