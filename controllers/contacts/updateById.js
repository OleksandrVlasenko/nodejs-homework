const { HttpError, ctrlWrapper } = require("../../utils");
const { Contact } = require("../../models/contact");

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

module.exports = {
	updateById: ctrlWrapper(updateById),
};
