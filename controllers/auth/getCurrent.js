const { ctrlWrapper } = require("../../utils");

async function getCurrent(req, res) {
	const { name, email } = req.user;

	res.json({ name, email });
}

module.exports = {
	getCurrent: ctrlWrapper(getCurrent),
};
