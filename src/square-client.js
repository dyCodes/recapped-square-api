const { Client, Environment } = require("square");
const { randomUUID } = require("crypto");

const client = new Client({
	accessToken: process.env.SQUARE_ACCESS_TOKEN,
	environment: Environment.Sandbox,
});

const location_id = process.env.SQUARE_LOCATION_ID;
const plan_id = "DGRCVV4WR2S5YYHQSO244JBG";
// const { locationsApi } = client;

module.exports = {
	client,
	randomUUID,
	location_id,
	plan_id,
};
