const express = require("express");
const router = express.Router();

// GET - Test
router.get("/", (req, res) => {
	res.send("Hello World");
});

// POST - Sign up/Create customer
router.post("/signup", (req, res) => {
	res.send("Sign up/Create customer");
});

// GET - Subscription plan
router.get("/subscription-plan", (req, res) => {
	const subscriptionPlan = {
		name: "Basic",
		price: 9.99,
		description: "This is a basic subscription plan",
	};
	res.send(subscriptionPlan);
});

// POST - Subscribe customer
router.post("/subscribe/:id", (req, res) => {
	console.log(req.body);
	const { id } = req.params;
	res.send(`Subscribe customer ${id}`);
});

module.exports = router;
