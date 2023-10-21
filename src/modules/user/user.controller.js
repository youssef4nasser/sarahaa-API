import { userModel } from "../../../models/userModel.js"
import { asyncHandler } from "../../utils/errorHanding.js";

export const getUsers = asyncHandler(
    async (req, res, next)=>{
        return res.json({message: "successe", user: req.user});
    }
)

export const profileImage = asyncHandler(
    async (req, res, next) => {
        const user = await userModel.findByIdAndUpdate(req.user._id,
             {profileImage: req.file.finalDest}, {new: true});
        return res.json({message: "successe", user});
    }
)

export const coverImage = asyncHandler(
    async (req, res, next) => {
        console.log(req.files);
        const images = [];
        for (const file of req.files) {
            images.push(file.finalDest)
        }
        const user = await userModel.findByIdAndUpdate(req.user._id, {coverImages:images}, {new: true});

        return res.json({message: "successe", user});
    }
)
