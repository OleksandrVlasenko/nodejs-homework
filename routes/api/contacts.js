const express = require("express");

const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const {
	getAll,
	getById,
	add,
	remove,
	updateById,
	updateStatusContact,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", authenticate, getAll);

router.get("/:contactId", authenticate, isValidId, getById);

router.post("/", authenticate, validateBody(schemas.contactSchemaJoi), add);

router.delete("/:contactId", authenticate, isValidId, remove);

router.put(
	"/:contactId",
	authenticate,
	isValidId,
	validateBody(schemas.contactSchemaJoi),
	updateById,
);

router.patch(
	"/:contactId/favorite",
	authenticate,
	isValidId,
	validateBody(schemas.updateFavoriteSchemaJoi),
	updateStatusContact,
);

module.exports = router;
