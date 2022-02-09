const express = require('express');
const router = express.Router();
const Sell = require('../models/Sell');
const Stock = require('../models/Stock');
const PurchaseOrderModel = require('../models/PurchaseOrder');


router.get('/', async (req, res) => {

    try {
        const sell = await Sell.find().populate('product').populate('customer');
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
router.post('/', async (req, res)=>{

    res.setHeader('Content-Type', 'application/json')

    //console.log(req.body);

    let po = new PurchaseOrderModel({
        customer: req.body[0].customer,
    });

    let poPromise = await po.save()

    /*let stock = await Stock.findById('61efd4c6402f74aafb221294')

    stock.description = 'this des bt TS';

    await stock.save();*/


    req.body.forEach((sellData, ind)=>{

        try {
            Stock.findById(sellData.stock).then(async stock=>{

                    stock.quantityStock = stock.quantityStock - sellData.quantity;

                    //console.log(ind, '---->', stock);

                    await stock.save();

                });

        } catch (err){
            res.json({massage: err});
        }

        let sell = new Sell({
            //name: sellData.name,
            purchaseOrder: poPromise._id,
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
