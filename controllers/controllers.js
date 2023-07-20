const { HttpError, ctrlWrapper } = require("../utils");
const { Contact } = require("../models/contact");

async function getAll(req, res) {
	const result = await Contact.find();
	res.json(result);
}

async function getById(req, res) {
	const { contactId } = req.params;
	const result = await Contact.findById(contactId);
	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.json(result);
}

async function add(req, res) {
	const result = await Contact.create(req.body);
	res.status(201).json(result);
}

async function remove(req, res) {
	const { contactId } = req.params;
	const result = await Contact.findByIdAndRemove(contactId);

	if (!result) {
		throw HttpError(404, "Not Found");
	}

	res.json({ message: "contact deleted" });
}

async function updateById(req, res) {
	if (Object.keys(req.body).length === 0) {
		throw HttpError(400, "missing fields");
	}

	const { contactId } = req.params;
	const result = await Contact.findByIdAndUpdate(contactId, req.body, {
		new: true,
	});
	if (!result) {
		throw HttpError(404, "Not Found");
	}

	res.json(result);
}

async function updateStatusContact(req, res) {
	if (Object.keys(req.body).length === 0) {
		throw HttpError(400, "missing field favorite");
	}

	const { contactId } = req.params;
	const result = await Contact.findByIdAndUpdate(contactId, req.body, {
		new: true,
	});
	console.log("updateStatusContact  result:", result)
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
	updateById: ctrlWrapper(updateById),
	updateStatusContact: ctrlWrapper(updateStatusContact),
};
