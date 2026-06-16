import Joi from "joi";


export const registerSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
        .required()
        .messages({
            "string.pattern.base": "Password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",
            "string.min": "Password must be at least 8 characters long",
            "any.required": "Password is required",
        }),
});


export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .required()
        .messages({
            "any.required": "Password is required",
        }),
});

export const postSchema = Joi.object({
    title: Joi.string().min(3).max(255).required().messages({
        "string.empty": "Title is required",
        "string.min": "Title must be at least 3 characters",
        "string.max": "Title must be at most 255 characters",
        "any.required": "Title is required",
    }),
    content: Joi.string().min(10).required().messages({
        "string.empty": "Content is required",
        "string.min": "Content must be at least 10 characters",
        "any.required": "Content is required",
    }),
});