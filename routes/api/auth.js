const express = require("express");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user");
const {register, login} = require("../../controllers/auth")

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchemaJoi), register);

router.post("/login", validateBody(schemas.loginSchemaJoi), login)

module.exports = router;
