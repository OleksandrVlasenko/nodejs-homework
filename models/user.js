const Joi = require("joi");
const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../utils");

const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const enumSubscription = ["starter", "pro", "business"];

const userSchema = Schema(
	{
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: [true, "Set password for user"],
			minlength: 6,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			match: emailRegexp,
		},
		subscription: {
			type: String,
			enum: enumSubscription,
			default: "starter",
		},
		token: { type: String, default: "" },
		avatarURL: { type: String, required: true },
	},
	{ versionKey: false, timestamps: true },
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

const registerSchemaJoi = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
});

const loginSchemaJoi = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
});

const updateSubscription = Joi.object({
	subscription: Joi.string()
		.valid(...enumSubscription)
		.required(),
});

const schemas = { registerSchemaJoi, loginSchemaJoi, updateSubscription };

module.exports = { User, schemas };
