import { messageModel } from "../../../models/messageModel.js";
import { userModel } from "../../../models/userModel.js";
import { AppError } from "../../utils/appError.js";
import { asyncHandler } from "../../utils/errorHanding.js";

export const addMessage = asyncHandler(
    async (req, res, next) => {
        const {userName} = req.params
        const { message } = req.body;
        const user = await userModel.findOne({userName});
        if (!user) {
            return next(new AppError(`User not found`, 404));
        }
        await messageModel.create({message, userName});
        return res.status(201).json({message: "success"});
    }
)

export const getUserMessage = asyncHandler(
    async (req, res, next) => {
        const messages = await messageModel.find({userName: req.user.userName});
        return res.status(201).json({message: "success", messages});
    }
)

export const deleteUserMessage = asyncHandler(
    async (req, res, next) => {
        const {id} = req.params;
        const message = await messageModel.findById(id)
        if(!message){
            next(new AppError("No Message Found", 400))
        }
        if(req.user.userName !== message.userName){
            next(new AppError("Not Authorized"))
        } 
        await messageModel.deleteOne({_id: id})
        return res.status(201).json({message: "success"})
    }
)