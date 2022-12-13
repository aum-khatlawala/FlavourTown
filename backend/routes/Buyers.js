var express = require("express");
var router = express.Router();

// Load Buyer model
const Buyer = require("../models/Buyer");
const Vendor = require("../models/Vendor");

// GET request 
// Getting all the buyers
router.get("/", function (req, res) {
    //res.send("test");
    Buyer.find(function (err, buyers) {
        if (err) {
            console.log(err);
        } else {
            res.json(buyers);
        }
    })

});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a buyer to db
router.post("/register", (req, res) => {
    const email = req.body.email;
    Vendor.findOne({ email }).then(vendor => {
        // const password = bsr.hash(req.)
        if (!vendor) {
            const newBuyer = new Buyer({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                contact: req.body.contact,
                date: req.body.date,
                age: req.body.age,
                batch: req.body.batch
            });

            newBuyer.save()
                .then(buyer => {
                    res.status(200).json(buyer);
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
// POST request 
// Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // Find buyer by email
    Buyer.findOne({ email, password }).then(buyer => {
        // Check if buyer email exists
        if (!buyer) {
            Vendor.findOne({ email, password }).then(vendor => {
                if (!vendor) {
                    return res.status(404).json({
                        error: "Email not found",
                    });
                }
                else {
                    res.send(vendor);
                    // res.write(vendor._id);
                    //res.json(vendor);
                    return vendor;
                }
            });
        }
        else {
            // buyer.password,req
            res.send(buyer);
            //res.json(buyer);
            return buyer;
        }
    });
});

router.post("/getbuyerdata", function (req, res) {
    const id = req.body._id;
    Buyer.findOne({ _id: id }).then(buyer => {
        res.json(buyer)
        return buyer;
    });
});
router.post("/updateprofile", (req, res) => {
    const id = req.body._id;
    Buyer.findOne({ _id: id }).then(buyer => {
        if (!buyer) {
            return res.status(404).json({
                error: "Account not found",
            });
        }
        else {
            if (req.body.name) {
                buyer.name = req.body.name;
            }
            if (req.body.email) {
                buyer.email = req.body.email;
            }
            if (req.body.password) {
                buyer.password = req.body.password;
            }
            if (req.body.contact) {
                buyer.contact = req.body.contact;
            }
            if (req.body.age) {
                buyer.age = req.body.age;
            }
            if (req.body.batch) {
                buyer.batch = req.body.batch;
            }
            if (req.body.wallet) {
                buyer.wallet = parseInt(buyer.wallet) + parseInt(req.body.wallet);
            }
            buyer.save()
                .then(buyer => {
                    return res.status(200).json(buyer);
                })
                .catch(err => {
                    return res.status(400).send(err);
                });
        }
    }
    )
});
router.get("/search", (req, res) => {
    const name = req.body.name;
    Buyer.findOne({ name }).then(buyer => {
        return res.status(200).json(buyer);
    });
});
router.post("/updatewallet", (req, res) => {
    const buyeremail = req.body.buyeremail;
    Buyer.findOne({ email: buyeremail }).then(buyer => {
        if (!buyer) {
            return res.status(404).json({
                error: "Account not found",
            });
        }
        else {
            buyer.wallet = req.body.wallet;

            buyer.save()
                .then(buyer => {
                    return res.status(200).json(buyer);
                })
                .catch(err => {
                    return res.status(400).send(err);
                });
        }
    })
});
router.post("/addtowallet", (req, res) => {
    const email = req.body.buyeremail;
    Buyer.findOne({ email: email }).then(buyer => {
        if (!buyer) {
            return res.status(404).json({
                error: "Account not found",
            });
        }
        else {
            buyer.wallet = parseInt(buyer.wallet) + parseInt(req.body.wallet);
            buyer.save()
                .then(buyer => {
                    return res.status(200).json(buyer);
                })
                .catch(err => {
                    return res.status(400).send(err);
                });
        }
    }
    )
});
/*
router.get("/search", async (req, res) => {
    const { buyerName } = req.query;
    const buyers = await Buyer.find({ $text: { $search: buyerName } })
    res.render('buyers', { buyers });
})
*/

module.exports = router;
