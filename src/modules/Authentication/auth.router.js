import { validation } from "../../middleware/validation.js";
import { confirmEmail, forgotPassword, logIn, resendVerification, resetPassword, signUp } from "./auth.controller.js";
import { forgotPasswordSchema, loginSchema, resendVerificationSchema, resetPasswordSchema, signupSchema, tokenSchema } from "./auth.validation.js";
const authRouter = express.Router();
import express from 'express'


authRouter.post("/signup", validation(signupSchema), signUp)
authRouter.post("/login", validation(loginSchema), logIn)
authRouter.get("/confirmemail/:token", validation(tokenSchema), confirmEmail)
authRouter.post("/resend-verification", validation(resendVerificationSchema), resendVerification)
authRouter.post("/forgot-password", validation(forgotPasswordSchema), forgotPassword)
authRouter.post("/reset-password", validation(resetPasswordSchema), resetPassword)

export default authRouter

