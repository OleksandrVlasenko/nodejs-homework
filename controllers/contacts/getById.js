const { HttpError, ctrlWrapper } = require("../../utils");
const { Contact } = require("../../models/contact");

async function getById(req, res) {
	const { contactId } = req.params;
	const result = await Contact.findById(contactId);
	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.json(result);
}

module.exports = {
	getById: ctrlWrapper(getById),
};
