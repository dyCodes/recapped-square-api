const { Client, Environment } = require("square");
const { randomUUID } = require("crypto");

const client = new Client({
	accessToken: process.env.SQUARE_ACCESS_TOKEN,
	environment: Environment.Sandbox,
});

const location_id = process.env.SQUARE_LOCATION_ID;
const plan_id = process.env.SQUARE_PLAN_ID;

module.exports = {
	client,
	randomUUID,
	location_id,
	plan_id,
};
