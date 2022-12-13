const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema({
	managername: {
		type: String,
		required: true
	},
	shopname: {
		type: String,
		required: true,
		unique: true
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
	openingtime: {
		type: String,
		required: true
	},
	closingtime: {
		type: String,
		required: true
	},
	typeofuser: {
		type: String,
		default: "Vendor"
	}
});

module.exports = Vendor = mongoose.model("Vendors", VendorSchema);
