const sgEmail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

sgEmail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async data => {
	const email = { ...data, from: "sania.rapsik@gmail.com" };
	await sgEmail.send(email);
	return true;
};

module.exports = { sendEmail };
