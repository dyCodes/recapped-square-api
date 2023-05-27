const express = require("express");
const router = express.Router();
const { client, randomUUID, location_id, plan_id } = require("./square-client");

// POST - Sign up/Create customer
router.post("/signup", async (req, res) => {
	const { name, username, email } = req.body;

	try {
		const response = await client.customersApi.createCustomer({
			givenName: name,
			nickname: username,
			emailAddress: email,
		});

		console.log(response.result);
		res.send({
			id: response.result.customer.id,
			name: response.result.customer.givenName,
			username: response.result.customer.nickname,
			email: response.result.customer.emailAddress,
		});
	} catch (error) {
		console.log(error);
		res.status(400).send(error.result);
	}
});

// GET - Subscription plan
router.get("/subscription-plan", async (req, res) => {
	try {
		const response = await client.catalogApi.retrieveCatalogObject(plan_id);
		let subscriptionPlan = response.result.object.subscriptionPlanData;

		subscriptionPlan = {
			name: subscriptionPlan.name,
			cadence: subscriptionPlan.phases[0].cadence,
			price: subscriptionPlan.phases[0].recurringPriceMoney.amount.toString(),
			currency: subscriptionPlan.phases[0].recurringPriceMoney.currency,
		};

		// console.log(subscriptionPlan);
		res.send(subscriptionPlan);
	} catch (error) {
		console.log(error);
		res.send(error.result);
	}
});

// POST - Subscribe customer
router.post("/subscribe/:customerId", async (req, res) => {
	const { customerId } = req.params;

	try {
		const response = await client.subscriptionsApi.createSubscription({
			idempotencyKey: randomUUID(),
			locationId: location_id,
			planId: plan_id,
			customerId: customerId,
			cardId: "ccof:CBASEFpXl3YnX0CvG9Kva0RUaIY",
		});

		console.log(response.result);
		res.send({
			status: response.result.subscription.status,
			subscriptionId: response.result.subscription.id,
		});
	} catch (error) {
		console.log(error);
		res.status(400).send(error.result);
	}
});

module.exports = router;
