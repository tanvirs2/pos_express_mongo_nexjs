const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');


router.get('/', async (req, res) => {

    try {
        const supplier = await Supplier.find()
            //.populate('');
        res.json(supplier);
    } catch (err) {
        res.json({massage: err});
    }

});

router.get('/:customerId', async (req, res) => {

    try {
        const supplier = await Supplier.find();
        res.json(supplier);
    } catch (err) {
        res.json({massage: err});
    }

});

router.get('/customerName/:customerName', async (req, res) => {

    try {
        let colName= req.params.customerName;

        const supplier = await Supplier.find({ name: { $regex: new RegExp(`.*${colName}.*`), $options: 'i' } });

        res.json(supplier);
    } catch (err) {
        res.json({massage: err});
    }

});


// save supplier
router.post('/', (req, res)=>{

    res.setHeader('Content-Type', 'application/json')

    console.log('tttttttttttttt',req.body);


    const supplier = new Supplier({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        organizationName: req.body.organizationName,
        address: req.body.address,
        description: req.body.description,
    });

    supplier.save().then(data => {
        console.log(data);
        res.send(data);
    })


});

router.put('/:customerId', async (req, res)=>{

    res.setHeader('Content-Type', 'application/json')

    //console.log('tnvwwwwwwwwwww');
    //console.log('tnv',req.params.customerId);

    try {
        const supplier = await Supplier.updateOne({_id: req.params.customerId}, req.body);
        res.json(supplier);
    } catch (err){
        res.json({massage: err});
    }

});

// delete supplier
router.delete('/:customerId', async (req, res)=>{

    try {
        let customerDel = await Supplier.remove({_id: req.params.customerId});
        res.json(customerDel);
    } catch (err){
        res.json({massage: err});
    }
});

module.exports = router;
