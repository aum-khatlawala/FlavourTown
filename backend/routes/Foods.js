var express = require("express");
var router = express.Router();

// Load Buyer model
const Food = require("../models/Food");

// GET request 
// Getting all the vendors
router.get("/", function (req, res) {
    Food.find(function (err, foods) {
        if (err) {
            console.log(err);
        } else {
            res.json(foods);
        }
    })
});
router.post("/getfooddata", function (req, res) {
    const foodid = req.body._id;
    Food.findOne({ _id: foodid }).then(food => {
        res.json(food)
        return food;
    });
});
router.post("/forcurrentvendor", function (req, res) {
    const shopkeeperemail = req.body.shopkeeperemail;
    Food.find({ shopkeeperemail: shopkeeperemail }).then(food => {
        if (!food) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.json(food);
        }
    })
});
router.post("/updatefooditem", (req, res) => {
    const id = req.body._id;
    Food.findOne({ _id: id }).then(food => {
        if (!food) {
            return res.status(404).json({
                error: "Item Name not found"
            });
        }
        else {
            if (req.body.itemname) {
                food.itemname = req.body.itemname
            }
            if (req.body.price) {
                food.price = req.body.price
            }
            if (req.body.rating) {
                food.rating = req.body.rating
            }
            if (req.body.vegornonveg) {
                food.vegornonveg = req.body.vegornonveg
            }
            if (req.body.addons) {
                food.addons = req.body.addons
            }
            if (req.body.tags) {
                food.tags = req.body.tags
            }
            food.save()
                .then(food => {
                    return res.status(200).json(food);
                })
                .catch(err => {
                    return res.status(400).send(err);
                });
        }
    }
    )
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a buyer to db
router.post("/add", (req, res) => {
    const newFood = new Food({
        shopkeeperemail: req.body.shopkeeperemail,
        shopkeepername: req.body.shopkeepername,
        itemname: req.body.itemname,
        price: req.body.price,
        rating: req.body.rating,
        vegornonveg: req.body.vegornonveg,
        addons: req.body.addons,
        tags: req.body.tags
    });

    newFood.save()
        .then(food => {
            res.status(200).json(food);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});
router.post("/deletefooditem", (req, res) => {
    const id = req.body._id;
    Food.findOne({ _id: id }).then(foodtbd => {
        foodtbd.remove()
            .then(() => {
                res.status(200).json(foodtbd);
            });
    });
});
/*
router.post("/login", (req, res) => {
    const email = req.body.email;
    // Find buyer by email
    Vendor.findOne({ email }).then(vendor => {
        // Check if buyer email exists
        if (!vendor) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.send("Email Found");
            return vendor;
        }
    });
});
*/
module.exports = router;
