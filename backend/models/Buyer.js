const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BuyerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	contact: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: false
	},
	age: {
		type: Number,
		required: true
	},
	batch: {
		type: String,
		required: true
	},
	typeofuser: {
		type: String,
		default: "Buyer"
	},
	wallet: {
		type: Number,
		default: 0
	}
});

module.exports = Buyer = mongoose.model("Buyers", BuyerSchema);
