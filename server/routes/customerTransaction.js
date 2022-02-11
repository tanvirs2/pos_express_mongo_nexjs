const express = require('express');
const router = express.Router();
const Sell = require('../models/Sell');
const CustomerTransaction = require('../models/CustomerTransaction');


router.get('/', async (req, res) => {

    try {
        const ct = await CustomerTransaction.find().populate('customer');
        res.json(ct);
    } catch (err) {
        res.json({massage: err});
    }

});

router.get('/:customerId', async (req, res) => {

    try {
        const ct = await CustomerTransaction.find({ customer: req.params.customerId });
        res.json(ct);
    } catch (err) {
        res.json({massage: err});
    }

});

// save sell
router.post('/', async (req, res)=>{

    res.setHeader('Content-Type', 'application/json')

    //console.log(req.body[0].customer);

    let po = new CustomerTransaction({
        customer: req.body[0].customer,
    });

    let poPromise = await po.save()

    console.log('---->', poPromise);

        /*.then(data => {
            console.log(data);
            //res.send(data);
        })*/


    req.body.forEach((sellData)=>{
        let sell = new Sell({
            //name: sellData.name,
            customer: sellData.customer,
            product: sellData.product,
            quantity: sellData.quantity,
            payment: sellData.price,
            //description: req.body.description
        });

        sell.save().then(data => {
            //console.log(data);
            res.send(data);
        })
    });




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
