const express = require("express");

const { validateBody } = require("../../middlewares");
const { contactSchema } = require("../../schemas");
const {
	getAll,
	getById,
	add,
	remove,
	update,
} = require("../../controllers/controllers");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validateBody(contactSchema), add);

router.delete("/:contactId", remove);

router.put("/:contactId", validateBody(contactSchema), update);

module.exports = router;
