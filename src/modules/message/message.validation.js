import Joi from "joi";

export const addMessageSchema = Joi.object({
    message: Joi.string().min(3).max(250).required(),
    userName : Joi.string().alphanum().min(3).max(30).required()
})

export const deleteMessageSchema = Joi.object({
    id: Joi.string().hex().length(24)
})