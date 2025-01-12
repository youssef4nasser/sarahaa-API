import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    confirmEmail:{
        type: Boolean,
        default: false,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        default: "male",
    },
    profileImage: String,
    coverImages: [String]
},
{
    timestamps: true,
})
export const userModel = mongoose.model("User", userSchema);