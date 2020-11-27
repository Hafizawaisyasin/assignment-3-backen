var mongoose = require("mongoose");
const Joi = require("joi");

var productSchema = mongoose.Schema({
	name: String,
	price: String,
	weight: String,
});
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
