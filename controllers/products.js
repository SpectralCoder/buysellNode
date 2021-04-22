var express = require('express');
var router = express.Router();
const Model = require('../models/Product');
const mongoose = require('../utils/mongoose')
const jwt = require('passport-jwt')
const Auth = require('./../middlewares/Auth')

// Lazy Responder :)
function responder(res, err, data) {
    if (err || !data) {
        console.log({
            err, data
        })
        res.status(400).send({
            err, data
        })
    } else {
        console.log("Data: " + data)
        res.status(200).send(data)
    }
}
// C
router.post('/', Auth.isAuthenticated,  (req, res) => {
    // req.body.user=req.user
    Model.createData(req.body, (err, data) => {
        responder(res, err, data)
    })
})

// Ra
router.get('/', Auth.isAuthenticated, async (req, res) => {
    try {
        const products = await Model.aggregate([
            {
                $sample: { size: 4 }
            }
        ])
        res.send(products);
    } catch (e) {
        res.send(e);
        console.log("nothing");
    }
})
router.get('/categories', Auth.isAuthenticated, async (req, res) => {
    try {
        const category = req.query.categories

        const products = await Model.aggregate([

            { $match: { category: category }},
            { $sample: { size: 4 }},

        ])
        res.send(products);
    } catch (e) {
        res.send(e);
        console.log("nothing");
    }
})

router.get('/allData/categories', Auth.isAuthenticated, async (req, res) => {
        const category = req.query.categories
        const skip= Number(req.query.skip)
        const limit= Number(req.query.limit)

        const products = await Model.aggregate([
            { $match: { category: category } },
            {
                $facet: {
                    edges: [
                        { $sort:{"products.timestamp": -1} },
                        { $skip: skip },
                        { $limit: limit },
                    ],
                    pageInfo: [
                        { $group: { _id: null, count: { $sum: 1 } } },
                    ],
                },
            },
        ])
    res.send(products);
})


// R1
router.get('/byemail/:id', Auth.isAuthenticated, (req, res) => {
    Model.getOneData({email: req.params['id']}, (err, data) => {
        responder(res, err, data)
    })
})

// R1
router.get('/byid/:id', Auth.isAuthenticated, (req, res) => {
    Model.getOneData({_id: req.params['id']}, (err, data) => {
        responder(res, err, data)
        console.log(data)
    })
})

// U1
router.put('/:id', Auth.isAuthenticated, (req, res) => {
    delete req.body.email

    Model.updateOneData({_id: req.params.id}, req.body, (err, data) => {
        responder(res, err, data)
    })
})

// D1
router.delete('/:id', Auth.isAuthenticated, (req, res) => {
    Model.removeOneData({_id: req.params['id']}, (err, data) => {
        responder(res, err, data)
    })
})

// Da
router.delete('/', Auth.isAuthenticated, (req, res) => {
    Model.removeAllData((err, data) => {
        responder(res, err, data)
    })
})

module.exports = router;