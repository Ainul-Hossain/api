const router = require('express').Router();
const Category = require('../models/Category');

// CREATE
router.post('/', async (req, res)=>{
    const newCat = new Category(req.body);

    try{
        const savedCat = await newCat.save();

        res.status(200).json(savedCat);
    }catch(err){
        // res.status(500).json(err);
        console.log('This err is: ', err);
    }
});

// GET ALL CATEGORIES
router.get('/', async (req, res)=>{
    try{
        const categories = await Category.find();

        res.status(200).json(categories);
    }catch(err){
        // res.status(500).json(err);
        console.log('This err is: ', err);
    }
});

module.exports = router;