const Jimp = require("jimp");

async function resizeImg(url) {
	const image = await Jimp.read(url);
	image.resize(250, 250);
	image.write(url);
}

module.exports = { resizeImg };
