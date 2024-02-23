import Joi from "joi";

export const signupSchema = Joi.object({
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
    userName: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string().email({
        tlds: {
            allow: ["com", "net", "org", "eg", "me", "co", "io"],
         },
    }).required(),
    password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    gender: Joi.string().valid('male', 'female').required(),
    phone: Joi.string().max(15).required(),
})

export const loginSchema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(20),
    email: Joi.string().email(),
    password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
}).required().or('userName', 'email').messages({
    'required': 'Please enter your userName or email',
});

// validation token from params
export const tokenSchema = Joi.object({
    token: Joi.string().trim().required().pattern(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
})