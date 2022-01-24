const express = require('express');
const router = express.Router();
const Category = require('../models/Category');


router.get('/', async (req, res) => {

    try {
        const category = await Category.find();
        res.json(category);
    } catch (err) {
        res.json({massage: err});
    }

    /*try {
        Category.find({}, (err, category) =>{
            // If there's an error, this will fire and continue
            if (err) res.status(500).send(err)

            // This fires next even if there is an error
            res.json(category)
        });

    } catch (err) {
        res.json({massage: err});
    }*/
    //res.send('test category');
});

router.get('/:categoryId', async (req, res) => {

    try {
        const category = await Category.find();
        res.json(category);
    } catch (err) {
        res.json({massage: err});
    }

    /*try {
        Category.find({}, (err, category) =>{
            // If there's an error, this will fire and continue
            if (err) res.status(500).send(err)

            // This fires next even if there is an error
            res.json(category)
        });

    } catch (err) {
        res.json({massage: err});
    }*/
    //res.send('test category');
});

// save category
router.post('/', (req, res)=>{

    res.setHeader('Content-Type', 'application/json')

    //console.log(req.body);

    const category = new Category({
        name: req.body.name,
        description: req.body.description
    });

    category.save().then(data => {
        console.log(data);
        res.send(data);
    })


});

router.put('/:categoryId', async (req, res)=>{

    res.setHeader('Content-Type', 'application/json')

    //console.log('tnvwwwwwwwwwww');
    //console.log('tnv',req.params.categoryId);

    try {
        const category = await Category.updateOne({_id: req.params.categoryId}, req.body);
        res.json(category);
    } catch (err){
        res.json({massage: err});
    }

    /*category.updateOne({_id: req.params.categoryId}).then(data => {
        console.log(data);
        res.send(data);
    })*/


});

// delete category
router.delete('/:categoryId', async (req, res)=>{

    try {
        let categoryDel = await Category.remove({_id: req.params.categoryId});
        res.json(categoryDel);
    } catch (err){
        res.json({massage: err});
    }
});

module.exports = router;
