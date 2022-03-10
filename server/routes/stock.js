const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');
const SupplierPurchaseOrderModel = require('../models/SupplierPurchaseOrder');
const {getNextSequenceValue} = require("../../utilities/functions");


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
router.post('/', async (req, res)=>{

    res.setHeader('Content-Type', 'application/json')

    const sequenceValue = await getNextSequenceValue('SupplierPurchaseOrderModel');

    //console.log(sequenceValue);

    //return;

    //console.log(req.body);

    //SupplierPurchaseOrderModel {
    //         customer: req.body[0].customer,
    //     }

    let supplierPurchaseOrderModel = new SupplierPurchaseOrderModel({
        poId: sequenceValue,
        supplier: req.body[0].supplier,
    });

    let supplierPOM = await supplierPurchaseOrderModel.save();

    for (let inputs of req.body) {

        const stock = new Stock({
            supplierPurchaseOrder: supplierPOM._id,
            supplier: inputs.supplier,
            description: inputs.description,
            quantityPurchased: inputs.quantityPurchased,
            quantityStock: inputs.quantityPurchased,
            unitPrice: inputs.unitPrice,
            product: inputs.product,
        });

        stock.save().then(data => {
            console.log(data);
            res.send(data);
        })
    }

    /*const stock = new Stock({
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
    })*/


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
