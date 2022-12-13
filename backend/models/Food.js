const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const addonSchema = new Schema({ addon: { type: String, required: true }, price: { type: Number, required: true, get: v => Math.round(v), set: v => Math.round(v) } }, { noId: true });
// const tagSchema = new Schema({ tag: { type: String, required: true } });
// Create Schema
const FoodSchema = new Schema({
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
    // itemimage: {
    //     data: Buffer,
    //     contentType: String
    // },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 5
    },
    vegornonveg: {
        type: Boolean,
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
    tags: {
        type: [String]
    }
});
// FoodSchema.index({ shopkeeperemail: 1, itemname: 1 }, { unique: true });
module.exports = Food = mongoose.model("Food", FoodSchema);
