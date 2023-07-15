const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../utils");

async function getAll(req, res, next) {
	const result = await contacts.listContacts();
	res.json(result);
}

async function getById(req, res, next) {
	const { contactId } = req.params;
	const result = await contacts.getContactById(contactId);
	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.json(result);
}

async function add(req, res, next) {
	const { name, email, phone } = req.body;
	const result = await contacts.addContact(name, email, phone);
	res.status(201).json(result);
}

async function remove(req, res, next) {
	const { contactId } = req.params;
	const result = await contacts.removeContact(contactId);

	if (!result) {
		throw HttpError(404, "Not Found");
	}

	res.json({ message: "contact deleted" });
}

async function update(req, res, next) {
	if (Object.keys(req.body).length === 0) {
		throw HttpError(400, "missing fields");
	}

	const { contactId } = req.params;
	const result = await contacts.updateContact(contactId, req.body);
	if (!result) {
		throw HttpError(404, "Not Found");
	}

	res.json(result);
}

module.exports = {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	add: ctrlWrapper(add),
	remove: ctrlWrapper(remove),
	update: ctrlWrapper(update),
};
