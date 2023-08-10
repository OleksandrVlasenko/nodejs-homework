const { User } = require("../../models/user");
const { ctrlWrapper, HttpError, sendEmail } = require("../../utils");

const { BASE_URL } = process.env;

async function resendVerifyEmail(req, res) {
	const { email } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		throw HttpError(401, "Email not found");
	}

	if (!user) {
		throw HttpError(401, "Email is already verify");
	}

	const verifyEmail = {
		to: email,
		subject: "Verify email",
		html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click to verify email</a>`,
	};

	await sendEmail(verifyEmail);

	res.json({ message: "Email for verify is send" });
}

module.exports = { resendVerifyEmail: ctrlWrapper(resendVerifyEmail) };
