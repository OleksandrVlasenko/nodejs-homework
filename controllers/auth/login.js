const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const { ctrlWrapper, HttpError } = require("../../utils");
const { User } = require("../../models/user");

async function login(req, res) {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		throw HttpError(401, "Login or password is invalid");
	}

	const passwordCompare = await bcrypt.compare(password, user.password);

	if (!passwordCompare) {
		throw HttpError(401, "Password is invalid");
	}

	const payload = {
		id: user._id,
	};

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
	await User.findByIdAndUpdate(user._id, { token });
	res.json({ token });
}

module.exports = {
	login: ctrlWrapper(login),
};
