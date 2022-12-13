var express = require("express");
var router = express.Router();

// Load Buyer model
const Order = require("../models/Order");

// GET request 
// Getting all the vendors
router.get("/", function (req, res) {
    Order.find(function (err, foods) {
        if (err) {
            console.log(err);
        } else {
            res.json(foods);
        }
    })
});
router.post("/add", (req, res) => {
    const newOrder = new Order({
        buyeremail: req.body.buyeremail,
        shopkeeperemail: req.body.shopkeeperemail,
        shopkeepername: req.body.shopkeepername,
        itemname: req.body.itemname,
        price: req.body.price,
        addons: req.body.addons,
        quantity: req.body.quantity,
        time: req.body.time,
        status: "PLACED"
    });

    newOrder.save()
        .then(order => {
            res.status(200).json(order);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});
router.post("/forcurrentvendor", function (req, res) {
    const shopkeeperemail = req.body.shopkeeperemail;
    Order.find({ shopkeeperemail: shopkeeperemail }).then(order => {
        if (!order) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.json(order);
        }
    })
});

router.post("/forcurrentbuyer", function (req, res) {
    const buyeremail = req.body.buyeremail;
    Order.find({ buyeremail: buyeremail }).then(order => {
        if (!order) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.json(order);
        }
    })
});

router.post("/updateorderstatus", (req, res) => {
    const id = req.body._id;
    Order.findOne({ _id: id }).then(order => {
        if (!order) {
            return res.status(404).json({
                error: "Item Name not found"
            });
        }
        else {
            order.status = req.body.status;
            order.save()
                .then(order => {
                    return res.status(200).json(order);
                })
                .catch(err => {
                    return res.status(400).send(err);
                });
        }
    })
});
module.exports = router;
