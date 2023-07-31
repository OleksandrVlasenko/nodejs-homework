const { ctrlWrapper } = require("../../utils");
const { Contact } = require("../../models/contact");

async function add(req, res) {
	const result = await Contact.create(req.body);
	res.status(201).json(result);
}

module.exports = {
	add: ctrlWrapper(add),
};
