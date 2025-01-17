import express from 'express'
import { auth } from "../../middleware/auth.js";
import { fileUpload, fileValidation } from "../../utils/multer.js";
import { coverImage, getUserProfile, profileImage} from "./user.controller.js"
const userRouter = express.Router()

userRouter.get("/profile", auth, getUserProfile)

userRouter.patch('/profile/image', auth, fileUpload(fileValidation.image).single("image"), profileImage)

userRouter.patch('/profile/coverImages', auth, fileUpload(fileValidation.image).array("images", 5), coverImage)

export default userRouter

