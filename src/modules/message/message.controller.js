import { messageModel } from "../../../models/messageModel.js";
import { userModel } from "../../../models/userModel.js";
import { AppError } from "../../utils/appError.js";
import { asyncHandler } from "../../utils/errorHanding.js";

export const addMessage = asyncHandler(
    async (req, res, next) => {
        const { message, receivedId } = req.body;
        const user = await userModel.findById(receivedId);
        if (!user) {
            return next(new AppError(`User not found with id of ${id}`, 404));
        }
        await messageModel.create({message, receivedId});
        return res.status(201).json({message: "success"});
    }
)

export const getUserMessage = asyncHandler(
    async (req, res, next) => {
        const messages = await messageModel.find({receivedId: req.user._id});
        return res.status(201).json({message: "success", messages});
    }
)

export const deleteUserMessage = asyncHandler(
    async (req, res, next) => {
        const userId = req.user._id
        const {id} = req.params;
        const message = await messageModel.findById(id)
        if(!message){
            next(new AppError("No Message Found", 400))
        }
        if(userId.toString() != message.receivedId.toString()){
            next(new AppError("Not Authorized"))
        } 
        await messageModel.deleteOne({_id: id})
        return res.status(201).json({message: "success"})
    }
)