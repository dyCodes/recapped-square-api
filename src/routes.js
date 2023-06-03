const express = require("express");
const router = express.Router();
const { client, randomUUID, location_id, plan_id } = require("./square-client");

// POST - Sign up/Create customer
router.post("/signup", async (req, res) => {
	const { name, email } = req.body;

	try {
		const response = await client.customersApi.createCustomer({
			givenName: name,
			emailAddress: email,
		});
		const userID = response.result.customer.id;
		// Return the customer ID
		res.send({ userID });
	} catch (error) {
		console.log(error);
		res.status(400).send(error.result);
	}
});

// POST - Subscribe customer
router.post("/subscribe/:customerId", async (req, res) => {
	const { customerId } = req.params;
	const { name, address } = req.body;

	// Create a card for the customer
	response = await client.cardsApi.createCard({
		idempotencyKey: randomUUID(),
		sourceId: "cnon:card-nonce-ok",
		card: {
			cardholderName: name,
			billingAddress: {
				addressLine1: address,
				country: "US",
			},
			customerId: customerId,
		},
	});
	const cardID = response.result.card.id;

	// Subscribe the customer to the subscription plan
	response = await client.subscriptionsApi.createSubscription({
		idempotencyKey: randomUUID(),
		locationId: location_id,
		planId: plan_id,
		customerId: customerId,
		cardId: cardID,
	});
	const responseDetails = { status: response.result.subscription.status };

	res.send(responseDetails);
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
		res.send(subscriptionPlan);
	} catch (error) {
		console.log(error);
		res.send(error.result);
	}
});

module.exports = router;
