const { ctrlWrapper, resizeImg } = require("../../utils");
const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

async function updateAvatar(req, res) {
	const { _id } = req.user;
	const { path: tempUpload, originalname } = req.file;

	await resizeImg(tempUpload);

	const fileName = `${_id}_${originalname}`;
	const resultUpload = path.join(avatarsDir, fileName);

	await fs.rename(tempUpload, resultUpload);

	const avatarURL = path.join("avatars", fileName);

	const user = await User.findByIdAndUpdate(_id, { avatarURL });

	if (user.avatarURL.includes("avatars") && avatarURL !== user.avatarURL) {
		const oldAvatarsURL = path.join(
			__dirname,
			"../",
			"../",
			"public",
			user.avatarURL,
		);

		await fs.rm(oldAvatarsURL);
	}

	res.status(201).json({ avatarURL });
}

module.exports = {
	updateAvatar: ctrlWrapper(updateAvatar),
};
