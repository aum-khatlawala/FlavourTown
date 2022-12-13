var express = require("express");
var router = express.Router();

// Load Buyer model
const Vendor = require("../models/Vendor");
const Buyer = require("../models/Buyer");
// GET request 
// Getting all the vendors
router.get("/", function (req, res) {
    Vendor.find(function (err, vendors) {
        if (err) {
            console.log(err);
        } else {
            res.json(vendors);
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a buyer to db
router.post("/register", (req, res) => {
    const email = req.body.email;
    Buyer.findOne({ email }).then(buyer => {
        if (!buyer) {
            const newVendor = new Vendor({
                managername: req.body.managername,
                shopname: req.body.shopname,
                email: req.body.email,
                password: req.body.password,
                contact: req.body.contact,
                date: req.body.date,
                openingtime: req.body.openingtime,
                closingtime: req.body.closingtime
            });

            newVendor.save()
                .then(vendor => {
                    res.status(200).json(vendor);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
        else {
            res.status(400).send();
        }
    });
});
/*
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // Find buyer by email
    Vendor.findOne({ email, password }).then(vendor => {
        // Check if buyer email exists
        if (!vendor) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            // buyer.password,req
            res.send(vendor);
            //res.json(buyer);
            return vendor;
        }
    });
});
*/
router.post("/getvendordata", function (req, res) {
    const id = req.body._id;
    Vendor.findOne({ _id: id }).then(vendor => {
        return res.status(200).json(vendor);
    });
});

router.post("/updateprofile", (req, res) => {
    const id = req.body._id;
    Vendor.findOne({ _id: id }).then(vendor => {
        if (!vendor) {
            return res.status(404).json({
                error: "Account not found",
            });
        }
        else {
            if (req.body.managername) {
                vendor.managername = req.body.managername;
            }
            if (req.body.shopname) {
                vendor.shopname = req.body.shopname;
            }
            if (req.body.email) {
                vendor.email = req.body.email;
            }
            if (req.body.password) {
                vendor.password = req.body.password;
            }
            if (req.body.contact) {
                vendor.contact = req.body.contact;
            }
            if (req.body.openingtime) {
                vendor.openingtime = req.body.openingtime;
            }
            if (req.body.closingtime) {
                vendor.closingtime = req.body.closingtime
            }
            vendor.save()
                .then(vendor => {
                    return res.status(200).json(vendor);
                })
                .catch(err => {
                    return res.status(404).send(err);
                });
        }
    }
    )
});

module.exports = router;
