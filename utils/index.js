const Exception = function Exception(message, statusCode) {
	this.message = message;
	this.statusCode = statusCode;
};

module.exports = {
	Exception
};