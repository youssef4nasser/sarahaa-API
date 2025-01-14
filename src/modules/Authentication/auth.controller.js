import { userModel } from "../../../models/userModel.js";
import { sendEmail } from "../../utils/email.js";
import { asyncHandler } from "../../utils/errorHanding.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { htmlCode } from "../../utils/htmlEmailCode.js";
import { AppError } from "../../utils/appError.js";

export const signUp = asyncHandler(
    async (req, res, next) => {
        const { name, userName, email, password, gender } = req.body;
        const chekUser = await userModel.findOne({ 
            $or: [
                {userName},
                {email}
            ]
         })
        if (chekUser) {
            if(chekUser.email == email) return next(new AppError("email already exists"))
            if(chekUser.userName == userName) return next(new AppError("userName already exists"))
        }
        const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUED));
        const user = await userModel.create({ 
            name, userName, email, password: hashPassword, gender
        });
       
        const token = jwt.sign({id: user._id, email: user.email}, process.env.EMAIL_SIGNATURE, {expiresIn: '15m'})
        // confirm link
        const confirmLink = `${req.protocol}://${req.headers.host}/auth/confirmemail/${token}`
        // resend link
        const resendLink = `${req.protocol}://${req.headers.host}/auth/resend-verification`
        // html email code
        const template = htmlCode(confirmLink, resendLink);
        // send email
        await sendEmail({to:email, subject: "Confirm Your Account (available 15m only)", template})
        return res.json({ message: "Account created successfully"})
    }
)

export const confirmEmail = asyncHandler(
    async (req, res, next)=>{
        const {token} = req.params;
        const decoded = jwt.verify(token, process.env.EMAIL_SIGNATURE)
        // if token is expired redirect to register page
        if(!decoded) return res.redirect("https://sarahah-app.vercel.app/confirm-failed")
        // if user is not exist redirect to register page
        const user = await userModel.findById(decoded.id);
        if (!user)  return res.redirect("https://sarahah-app.vercel.app/register");
        // if user is already confirm email redirect to login page
        if(user.isConfirmed) return res.redirect("https://sarahah-app.vercel.app/confirm-verified")
        // update user isConfirmed to true
        await userModel.findByIdAndUpdate(decoded.id, {confirmEmail: true})
        // redirect to confirm-verified page
        return res.redirect("https://sarahah-app.vercel.app/confirm-verified")
    }
)

export const newConfirmEmail = asyncHandler(
    async (req, res, next)=>{
        const { email } = req.body;
        const user = await userModel.findOne({email})
        if(!user) return next(new AppError("Not register account", 404))
        if(user.confirmEmail) return next(new AppError("User is already confirm email", 409))

        const token = jwt.sign({id: user._id, email: user.email}, process.env.EMAIL_SIGNATURE, {expiresIn: '15m'})
        // confirm link
        const link = `${req.protocol}://${req.headers.host}/auth/confirmemail/${token}`
        const template = htmlCode(link, "https://sarahah-app.vercel.app/resend-verification");
        await sendEmail({to:email, subject: "Confirm Your Account (available 15m only)", template})
        return res.json({message: "success check your Email"})

        // const {token} = req.params;
        // const decoded = jwt.verify(token, process.env.EMAIL_SIGNATURE)
        // const user = await userModel.findById(decoded.id)
        // if(!user){
        //     return next(new AppError("User is ont exist", 409))
        // }
        // if(user.confirmEmail){
        //     return next(new AppError("User is already confirm email", 409))
        // }

        // const newToken = jwt.sign({id: user._id, email: user.email}, process.env.EMAIL_SIGNATURE, {expiresIn:'15m'})
        // const template = `<a href="${req.protocol}://${req.headers.host}/auth/confirmemail/${newToken}">Click Here To Confirm your Email</a>`
        // await sendEmail({to:user.email, subject: "Confirm Email Saraha", template})
        // return res.json({message: "success chek your Email"})
    }
)

export const logIn = asyncHandler(
    async (req, res, next) => {
        const { userName, email, password } = req.body;
        const user = await userModel.findOne({
            $or: [
                { userName },
                { email }
            ]
        })
        if (!user) {
            return next(new AppError("User is ont exist", 401))
        }
        const match = bcrypt.compareSync(password, user.password)
        if (!match) {
            return next(new AppError("Password incorrect", 401))
        }
        let token = jwt.sign({id: user._id, firstName: user.firstName, lastName: user.lastName, userName: user.userName}, process.env.TOKEN_SIGNATURE)
        return res.status(200).json({ message: "success", token, user})
    }
)
