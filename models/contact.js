const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../utils");

const contactSchema = Schema(
	{
		name: {
			type: String,
			required: [true, "Set name for contact"],
		},
		email: {
			type: String,
		},
		phone: {
			type: String,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false },
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

const contactSchemaJoi = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
	favorite: Joi.boolean(),
});

const updateFavoriteSchemaJoi = Joi.object({
	favorite: Joi.boolean().required(),
});

const schemas = { contactSchemaJoi, updateFavoriteSchemaJoi };

module.exports = { Contact, schemas };
