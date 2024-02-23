import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    // userName: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    // }
    userName: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
})
export const messageModel = mongoose.model("Message", messageSchema);