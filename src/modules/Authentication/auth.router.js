import { validation } from "../../middleware/validation.js";
import { confirmEmail, logIn, resendVerification, signUp } from "./auth.controller.js";
import { loginSchema, signupSchema, tokenSchema } from "./auth.validation.js";
const authRouter = express.Router();
import express from 'express'


authRouter.post("/signup", validation(signupSchema), signUp)
authRouter.post("/login", validation(loginSchema), logIn)
authRouter.get("/confirmemail/:token", validation(tokenSchema), confirmEmail)
authRouter.get("/resend-verification", validation(tokenSchema), resendVerification)

export default authRouter

