const { ctrlWrapper } = require("../../utils");
const { Contact } = require("../../models/contact");

async function getAll(req, res) {
	const { _id: owner } = req.user;
	const result = await Contact.find({ owner });
	res.json(result);
}

module.exports = { getAll: ctrlWrapper(getAll) };
