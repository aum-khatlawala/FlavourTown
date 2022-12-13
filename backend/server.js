const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "dass_assignment_1_2020113008"

// routes
var testAPIRouter = require("./routes/testAPI");
var BuyerRouter = require("./routes/Buyers");
var VendorRouter = require("./routes/Vendors");
var foodRouter = require("./routes/Foods");
var orderRouter = require("./routes/Orders");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/buyer", BuyerRouter);
app.use("/vendor", VendorRouter);
app.use("/food", foodRouter);
app.use("/order", orderRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
