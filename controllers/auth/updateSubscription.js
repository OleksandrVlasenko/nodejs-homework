const { HttpError, ctrlWrapper } = require("../../utils");
const { User } = require("../../models/user");

async function updateSubscription(req, res) {
	if (Object.keys(req.body).length === 0) {
		throw HttpError(400, "missing field subscription");
	}

	if (req.body.subscription === req.user.subscription) {
		throw HttpError(400, "don't update the same subscription");
	}
	const { _id } = req.user;

	await User.findByIdAndUpdate(_id, req.body, {
		new: true,
	});

	res.json({ message: `Subscription updated on "${req.body.subscription}"` });
}

module.exports = {
	updateSubscription: ctrlWrapper(updateSubscription),
};
