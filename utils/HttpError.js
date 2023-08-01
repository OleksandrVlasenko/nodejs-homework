const errorMessageList = {
	400: "Bad Request",
	401: "Unauthorized",
	403: "Forbidden",
	404: "Not found",
	509: "Conflict",
};

const HttpError = (status, message = errorMessageList[status]) => {
	const error = new Error(message);
	console.log("HttpError  message:", message)
	error.status = status;
	return error;
};

module.exports = { HttpError };
