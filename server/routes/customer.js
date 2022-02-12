const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');


router.get('/', async (req, res) => {

    try {
        const customer = await Customer.find()
            //.populate('');
        res.json(customer);
    } catch (err) {
        res.json({massage: err});
    }

});

router.get('/:customerId', async (req, res) => {

    try {
        const customer = await Customer.find();
        res.json(customer);
    } catch (err) {
        res.json({massage: err});
    }

});

router.get('/customerName/:customerName', async (req, res) => {

    try {
        let colName= req.params.customerName;

        const customer = await Customer.find({ name: { $regex: new RegExp(`.*${colName}.*`), $options: 'i' } });

        res.json(customer);
    } catch (err) {
        res.json({massage: err});
    }

});


// save customer
router.post('/', (req, res)=>{

    res.setHeader('Content-Type', 'application/json')

    console.log('tttttttttttttt',req.body);


    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        organizationName: req.body.organizationName,
        address: req.body.address,
        description: req.body.description,
    });

    customer.save().then(data => {
        console.log(data);
        res.send(data);
    })


});

router.put('/:customerId', async (req, res)=>{

    res.setHeader('Content-Type', 'application/json')

    //console.log('tnvwwwwwwwwwww');
    //console.log('tnv',req.params.customerId);

    try {
        const customer = await Customer.updateOne({_id: req.params.customerId}, req.body);
        res.json(customer);
    } catch (err){
        res.json({massage: err});
    }



});

// delete customer
router.delete('/:customerId', async (req, res)=>{

    try {
        let customerDel = await Customer.remove({_id: req.params.customerId});
        res.json(customerDel);
    } catch (err){
        res.json({massage: err});
    }
});

module.exports = router;
