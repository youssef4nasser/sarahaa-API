import { userModel } from "../../../models/userModel.js"
import { asyncHandler } from "../../utils/errorHanding.js";

// get user profile
export const getUserProfile = asyncHandler(
    async (req, res, next)=>{
        const user = await userModel.findById(req.user.id)
        return res.status(200).json({message:"success", user})
    }
)

// update user profile


export const profileImage = asyncHandler(
    async (req, res, next) => {
        const user = await userModel.findByIdAndUpdate(req.user._id,
             {profileImage: req.file.finalDest}, {new: true});
        return res.json({message: "successe", user});
    }
)

export const coverImage = asyncHandler(
    async (req, res, next) => {
        const images = [];
        for (const file of req.files) {
            images.push(file.finalDest)
        }
        const user = await userModel.findByIdAndUpdate(req.user._id, {coverImages:images}, {new: true});

        return res.json({message: "successe", user});
    }
)
