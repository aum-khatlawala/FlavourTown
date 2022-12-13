const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const addonSchema = new Schema({ addon: { type: String, required: true }, price: { type: Number, required: true, get: v => Math.round(v), set: v => Math.round(v) } }, { noId: true });
// const tagSchema = new Schema({ tag: { type: String, required: true } });
// Create Schema
const OrderSchema = new Schema({
    buyeremail: {
        type: String,
        required: true
    },
    shopkeeperemail: {
        type: String,
        required: true
    },
    shopkeepername: {
        type: String,
        required: true
    },
    itemname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    addons: {
        type: [{
            addonname: {
                type: String,
                required: true
            },
            addonprice: {
                type: String,
                required: true
            }
        }]
    },
    quantity: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});
OrderSchema.index({ buyeremail: 1, time: 1 }, { unique: true });
module.exports = Order = mongoose.model("Order", OrderSchema);
