const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Customer = require("../models/Customer");


router.get('/', async (req, res) => {

    try {
        const product = await Product.find().populate('category');
        res.json(product);
    } catch (err) {
        res.json({massage: err});
    }

});

router.get('/:productId', async (req, res) => {

    try {
        const product = await Product.find();
        res.json(product);
    } catch (err) {
        res.json({massage: err});
    }

});

router.get('/productName/:productName', async (req, res) => {

    try {
        let colName= req.params.productName;

        const product = await Product.find({ name: { $regex: '.*' + colName + '.*' } });

        res.json(product);

    } catch (err) {
        res.json({massage: err});
    }

});

// save product
router.post('/', (req, res)=>{

    res.setHeader('Content-Type', 'application/json')

    console.log('tttttttttttttt',req.body);


    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
    });

    product.save().then(data => {
        console.log(data);
        res.send(data);
    })


});

router.put('/:productId', async (req, res)=>{

    res.setHeader('Content-Type', 'application/json')

    //console.log('tnvwwwwwwwwwww');
    //console.log('tnv',req.params.productId);

    try {
        const product = await Product.updateOne({_id: req.params.productId}, req.body);
        res.json(product);
    } catch (err){
        res.json({massage: err});
    }



});

// delete product
router.delete('/:productId', async (req, res)=>{

    try {
        let productDel = await Product.remove({_id: req.params.productId});
        res.json(productDel);
    } catch (err){
        res.json({massage: err});
    }
});

module.exports = router;
