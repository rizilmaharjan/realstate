import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "username is required"],
        unique: [true, "username already exists"]

    },
    email:{
        type: String,
        required: [true, "email is required"],
        unique: [true, "email already exists"]

    },
    password:{
        type: String,
        required: [true, "password is required"],

    },

},{
    timestamps: true
})

export const User = mongoose.model("User", userSchema)