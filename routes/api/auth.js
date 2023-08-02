const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");
const {
	register,
	login,
	getCurrent,
	logout,
	updateSubscription,
} = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchemaJoi), register);

router.post("/login", validateBody(schemas.loginSchemaJoi), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch(
	"/",
	authenticate,
	validateBody(schemas.updateSubscription),
	updateSubscription,
);

module.exports = router;
