import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "too short name"],
        maxLength: [15, "too short name"]
    },
    lastName: {
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
    phone: {
        type: String,
        required: true,
    },
    profileImage: String,
    coverImages: [String]
},
{
    timestamps: true,
})
export const userModel = mongoose.model("User", userSchema);