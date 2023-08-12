const { User } = require("../../models/user");
const { ctrlWrapper, HttpError } = require("../../utils");

async function verifyEmail(req, res) {
	const { verificationCode } = req.params;
	const user = await User.findOne({ verificationCode });

	if (!user) {
		throw HttpError(401, "Not found");
	}

	await User.findByIdAndUpdate(user._id, {
		verify: true,
		verificationCode: null,
	});

	res.json({ message: "Verification successful" });
}

module.exports = { verifyEmail: ctrlWrapper(verifyEmail) };
