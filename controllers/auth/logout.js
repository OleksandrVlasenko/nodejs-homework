const { User } = require("../../models/user");
const { ctrlWrapper } = require("../../utils");

async function logout(req, res) {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: "" });
	res.json({ message: "Logout success" });
}

module.exports = {
	logout: ctrlWrapper(logout),
};
