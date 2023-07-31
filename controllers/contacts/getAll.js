const { ctrlWrapper } = require("../../utils");
const { Contact } = require("../../models/contact");

async function getAll(req, res) {
	const result = await Contact.find();
	res.json(result);
}

module.exports = { getAll: ctrlWrapper(getAll) };
