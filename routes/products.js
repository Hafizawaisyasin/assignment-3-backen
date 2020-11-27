var express = require("express");
var router = express.Router();
var checkSessionAuth = require("../middlewares/checkSessionAuth");
var Product = require("../models/product");

/* GET home page. */
router.get("/", async function (req, res, next) {
	let products = await Product.find();
	console.log(req.session.user);
	res.render("products/list", { title: "Protiens In Our Stock", products });
});

router.get("/add", checkSessionAuth, async function (req, res, next) {
	res.render("products/add");
});

router.post("/add", async function (req, res, next) {
	let product = new Product(req.body);
	await product.save();
	res.redirect("/products");
});
router.get("/delete/:id", async function (req, res, next) {
	let product = await Product.findByIdAndDelete(req.params.id);
	res.redirect("/products");
});

//for edit
router.get("/edit/:id", async function (req, res, next) {
	let product = await Product.findById(req.params.id);
	res.render("products/edit", { product });
});
router.post("/edit/:id", async function (req, res, next) {
	let product = await Product.findById(req.params.id);

	product.name = req.body.name;
	product.price = req.body.price;
	product.weight = req.body.weight;
	await product.save();
	res.redirect("/products");
});

//add to cart
router.get("/cart/:id", async function (req, res, next) {
	let product = await Product.findById(req.params.id);
	console.log("Add This Product in cart");
	let cart = [];
	if (req.cookies.cart) cart = req.cookies.cart;
	cart.push(product);
	res.cookie("cart", cart);
	res.redirect("/products");
});
//remove from cart
router.get("/cart/remove/:id", async function (req, res, next) {
	let cart = [];
	if (req.cookies.cart) cart = req.cookies.cart;
	cart.splice(
		cart.findIndex((c) => c._id == req.params.id),
		1
	);
	res.cookie("cart", cart);
	res.redirect("/cart");
});
module.exports = router;
