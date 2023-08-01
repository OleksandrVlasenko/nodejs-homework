const { ctrlWrapper } = require("../../utils");
const { Contact } = require("../../models/contact");

async function add(req, res) {
	const { _id: owner } = req.user;
	console.log("add  owner:", owner);
	const result = await Contact.create({...req.body, owner});
	res.status(201).json(result);
}

module.exports = {
	add: ctrlWrapper(add),
};
