const Joi = require("joi");
const mongoose = require("mongoose");

const dietSchema = new mongoose.Schema({
	type: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
	description: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 900,
	},
});

const Diet = mongoose.model("Diet", dietSchema);

module.exports = Diet;
