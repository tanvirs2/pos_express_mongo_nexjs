const express = require('express');
const router = express.Router();
const RexineStock = require('../models/RexineStock');
const SupplierPurchaseOrderModel = require('../models/SupplierPurchaseOrder');
const {getNextSequenceValue} = require("../../utilities/functions");


const OwnModel = RexineStock;


router.get('/', async (req, res) => {

    try {
        const ownModel = await OwnModel.find().populate('product').populate('supplier');
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

// save RexineStock
router.post('/', async (req, res)=>{


    res.setHeader('Content-Type', 'application/json')

    const sequenceValue = await getNextSequenceValue('SupplierRexinePurchaseOrderModel');


    let supplierPurchaseOrderModel = new SupplierPurchaseOrderModel({
        poId: sequenceValue,
        supplier: req.body[0].supplier,
    });

    let supplierPOM = await supplierPurchaseOrderModel.save();

    //console.log('body---->', req.body);

    for (let inputs of req.body) {

        //console.log(inputs);

        const ownModel = new OwnModel({
            supplierPurchaseOrder: supplierPOM._id,
            supplier: inputs.supplier,
            description: inputs.description,
            quantityPurchased: inputs.quantityPurchased,
            quantityStock: inputs.quantityPurchased,
            amountPurchased: inputs.amountPurchased,
            unitPrice: inputs.unitPrice,
            product: inputs.product,
        });

        ownModel.save().then(data => {
            //console.log(data);
            res.send(data);
        })
    }

    /*const ownModel = new OwnModel({
        name: req.body.name,
        supplier: req.body.supplier,
        description: req.body.description,
        quantityPurchased: req.body.quantityPurchased,
        quantityStock: req.body.quantityPurchased,
        unitPrice: req.body.unitPrice,
        product: req.body.product,
    });

    ownModel.save().then(data => {
        console.log(data);
        res.send(data);
    })*/


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
