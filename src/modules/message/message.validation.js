import Joi from "joi";

export const addMessageSchema = Joi.object({
    message: Joi.string().min(3).max(250).required(),
    receivedId : Joi.string().hex().length(24)
})

export const deleteMessageSchema = Joi.object({
    id: Joi.string().hex().length(24)
})