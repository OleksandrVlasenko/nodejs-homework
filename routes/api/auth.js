const express = require("express");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");
const {
	register,
	login,
	getCurrent,
	logout,
	updateSubscription,
	updateAvatar,
	verifyEmail,
	resendVerifyEmail,
} = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchemaJoi), register);

router.get("/verify/:verificationCode", verifyEmail);

router.post("/verify", validateBody(schemas.emailSchemaJoi), resendVerifyEmail);

router.post("/login", validateBody(schemas.loginSchemaJoi), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch(
	"/",
	authenticate,
	validateBody(schemas.updateSubscription),
	updateSubscription,
);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
