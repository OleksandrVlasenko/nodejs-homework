const ctrlWrapper = ctrl => {
	return (func = async (req, res, next) => {
		try {
			await ctrl(req, res, next);
		} catch (error) {
			next(error);
		}
	});
};

module.exports = { ctrlWrapper };
