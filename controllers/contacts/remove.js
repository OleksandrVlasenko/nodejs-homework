const { HttpError, ctrlWrapper } = require("../../utils");
const { Contact } = require("../../models/contact");

async function remove(req, res) {
	const { contactId } = req.params;
	const result = await Contact.findByIdAndRemove(contactId);

	if (!result) {
		throw HttpError(404, "Not Found");
	}

	res.json({ message: "contact deleted" });
}

module.exports = {
	remove: ctrlWrapper(remove),
};
