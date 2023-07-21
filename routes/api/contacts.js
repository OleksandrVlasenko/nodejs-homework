const express = require("express");

const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const {
	getAll,
	getById,
	add,
	remove,
	updateById,
	updateStatusContact,
} = require("../../controllers/controllers");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", isValidId, getById);

router.post("/", validateBody(schemas.contactSchemaJoi), add);

router.delete("/:contactId", isValidId, remove);

router.put(
	"/:contactId",
	isValidId,
	validateBody(schemas.contactSchemaJoi),
	updateById,
);

router.patch(
	"/:contactId/favorite",
	isValidId,
	validateBody(schemas.updateFavoriteSchemaJoi),
	updateStatusContact,
);

module.exports = router;
