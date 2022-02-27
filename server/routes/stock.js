const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');


router.get('/', async (req, res) => {

    try {
        const stock = await Stock.find().populate('product').populate('supplier');
        res.json(stock);
    } catch (err) {
        res.json({massage: err});
    }

});

router.get('/:stockId', async (req, res) => {

    try {
        const stock = await Stock.find();
        res.json(stock);
    } catch (err) {
        res.json({massage: err});
    }

});

// save stock
router.post('/', (req, res)=>{

    res.setHeader('Content-Type', 'application/json')


    const stock = new Stock({
        name: req.body.name,
        supplier: req.body.supplier,
        description: req.body.description,
        quantityPurchased: req.body.quantityPurchased,
        quantityStock: req.body.quantityPurchased,
        unitPrice: req.body.unitPrice,
        product: req.body.product,
    });

    stock.save().then(data => {
        console.log(data);
        res.send(data);
    })


});

router.put('/:stockId', async (req, res)=>{

    res.setHeader('Content-Type', 'application/json')

    //console.log('tnvwwwwwwwwwww');
    //console.log('tnv',req.params.stockId);

    try {
        const stock = await Stock.updateOne({_id: req.params.stockId}, req.body);
        res.json(stock);
    } catch (err){
        res.json({massage: err});
    }



});

// delete stock
router.delete('/:stockId', async (req, res)=>{

    try {
        let stockDel = await Stock.remove({_id: req.params.stockId});
        res.json(stockDel);
    } catch (err){
        res.json({massage: err});
    }
});

module.exports = router;
