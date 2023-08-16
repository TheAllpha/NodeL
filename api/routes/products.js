const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Hnadling Get request to /product'
    });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product
    .save()
    .then(result => {
        console.log(result)
    })
    .catch(err => console.log(err))
    res.status(201).json({
        message: 'Handling Post request to /products',
        createdProduct: product
    });
});

router.get('/:productId', (req,res,next) => {
    const id = req.params.productId;
    if(id==='special') {
        res.status(200).json({
            message: 'Discovered thee special id',
            id : id
        })
    } else {
        res.status(200).json({
            message: 'you passed an Id'
        })
    }
})

router.patch('/:productId', (req,res,next) => {
    res.status(200).json({
        message: 'Updated product'
    })
})

router.delete('/:productId', (req,res,next) => {
    res.status(200).json({
        message: 'Deleted product'
    })
})


module.exports = router; 