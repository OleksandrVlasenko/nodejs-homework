const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { ctrlWrapper, HttpError, sendEmail } = require("../../utils");
const { User } = require("../../models/user");
const { BASE_URL } = process.env;

async function register(req, res) {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user) {
		throw HttpError(409, "Email already is use");
	}

	const hashPassword = await bcrypt.hash(password, 10);
	const avatarURL = gravatar.url(email);
	const verificationCode = nanoid();

	const newUser = await User.create({
		...req.body,
		password: hashPassword,
		avatarURL,
		verificationCode,
	});

	const verifyEmail = {
		to: email,
		subject: "Verify email",
		html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click to verify email</a>`,
	};

	await sendEmail(verifyEmail);

	res.status(201).json({ name: newUser.name, email: newUser.email });
}

module.exports = {
	register: ctrlWrapper(register),
};
